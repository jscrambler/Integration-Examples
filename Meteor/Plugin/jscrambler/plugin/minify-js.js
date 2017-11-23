import { extractModuleSizesTree } from "./stats.js";
const jscrambler = Npm.require('jscrambler').default;
const {loopWhile} = Npm.require('deasync');
import config from './jscrambler_config.json';

Plugin.registerMinifier({
  extensions: ['js'],
  archMatching: 'web'
}, function () {
  var minifier = new MeteorBabelMinifier();
  return minifier;
});

function MeteorBabelMinifier () {};

MeteorBabelMinifier.prototype.processFilesForBundle = function(files, options) {
  var mode = options.minifyMode;

  // don't minify anything for development
  if (mode === 'development') {
    files.forEach(function (file) {
      file.addJavaScript({
        data: file.getContentsAsBuffer(),
        sourceMap: file.getSourceMap(),
        path: file.getPathInBundle(),
      });
    });
    return;
  }

  function maybeThrowMinifyErrorBySourceFile(error, file) {
    var minifierErrorRegex = /^(.*?)\s?\((\d+):(\d+)\)$/;
    var parseError = minifierErrorRegex.exec(error.message);

    if (!parseError) {
      // If we were unable to parse it, just let the usual error handling work.
      return;
    }

    var lineErrorMessage = parseError[1];
    var lineErrorLineNumber = parseError[2];

    var parseErrorContentIndex = lineErrorLineNumber - 1;

    // Unlikely, since we have a multi-line fixed header in this file.
    if (parseErrorContentIndex < 0) {
      return;
    }

    /*

    What we're parsing looks like this:

    /////////////////////////////////////////
    //                                     //
    // path/to/file.js                     //
    //                                     //
    /////////////////////////////////////////
                                           // 1
       var illegalECMAScript = true;       // 2
                                           // 3
    /////////////////////////////////////////

    Btw, the above code is intentionally not newer ECMAScript so
    we don't break ourselves.

    */

    var contents = file.getContentsAsString().split(/\n/);
    var lineContent = contents[parseErrorContentIndex];

    // Try to grab the line number, which sometimes doesn't exist on
    // line, abnormally-long lines in a larger block.
    var lineSrcLineParts = /^(.*?)(?:\s*\/\/ (\d+))?$/.exec(lineContent);

    // The line didn't match at all?  Let's just not try.
    if (!lineSrcLineParts) {
      return;
    }

    var lineSrcLineContent = lineSrcLineParts[1];
    var lineSrcLineNumber = lineSrcLineParts[2];

    // Count backward from the failed line to find the filename.
    for (var c = parseErrorContentIndex - 1; c >= 0; c--) {
      var sourceLine = contents[c];

      // If the line is a boatload of slashes, we're in the right place.
      if (/^\/\/\/{6,}$/.test(sourceLine)) {

        // If 4 lines back is the same exact line, we've found the framing.
        if (contents[c - 4] === sourceLine) {

          // So in that case, 2 lines back is the file path.
          var parseErrorPath = contents[c - 2]
            .substring(3)
            .replace(/\s+\/\//, "");

          var minError = new Error(
            "Babili minification error " +
            "within " + file.getPathInBundle() + ":\n" +
            parseErrorPath +
            (lineSrcLineNumber ? ", line " + lineSrcLineNumber : "") + "\n" +
            "\n" +
            lineErrorMessage + ":\n" +
            "\n" +
            lineSrcLineContent + "\n"
          );

          throw minError;
        }
      }
    }
  }

  // Check if a file should be protected
  // You can use a regex to select which files to protect,
  // in this example we are only protecting app/app.js (a bundle with the js files of our app)
  // We can also protect external packages, their path is "packages/*.js"
  function shouldProtect (filePath) {
    return filePath === 'app/app.js';
  }

  const toBeAdded = {
    data: "",
    stats: Object.create(null)
  };

  const sourcesToProtect = [];
  files.forEach((file) => {
    const filePath = file.getPathInBundle();

    if (shouldProtect(filePath)) {
      sourcesToProtect.push({
        filename: filePath,
        content: file.getContentsAsBuffer()
      });
    } else if (/\.min\.js$/.test(filePath)) { // Don't reminify *.min.js.
      toBeAdded.data += file.getContentsAsString();
      toBeAdded.data += '\n\n';
    } else {
      var minified;
      try {
        minified = meteorJsMinify(file.getContentsAsString());

        if (!(minified && typeof minified.code === "string")) {
          throw new Error();
        }
      } catch (err) {
        maybeThrowMinifyErrorBySourceFile(err, file);

        err.message += " while minifying " + filePath;
        throw err;
      }

      const tree = minified.code && extractModuleSizesTree(minified.code);
      if (tree) {
        toBeAdded.stats[file.getPathInBundle()] =
          [Buffer.byteLength(minified.code), tree];
      } else {
        toBeAdded.stats[file.getPathInBundle()] =
          Buffer.byteLength(minified.code);
      }

      toBeAdded.data += minified.code;
      toBeAdded.data += '\n\n';
    }

    Plugin.nudge();
  });

  config.sources = sourcesToProtect;
  let done = false;

  console.log('Protecting files with Jscrambler');
  jscrambler.protectAndDownload(config, (buffer, filePath) => {
    // add protected files to the resulting bundle
    // protection can return extra files like symbolTable.json, only add files from the actual app
    if (sourcesToProtect.find(s => s.filename === filePath)) {
      toBeAdded.data += buffer.toString('utf-8');
    }
  })
  .then(() => {
    done = true;
  })
  .catch((e) => {
    console.error('Error protecting with Jscrambler');
    throw e;
  });

  // hack!! 'processFilesForBundle' does not support promises (-.-)
  // only return when the protection is done
  loopWhile(() => !done);

  if (files.length) {
    files[0].addJavaScript(toBeAdded);
  }

  return;
};
