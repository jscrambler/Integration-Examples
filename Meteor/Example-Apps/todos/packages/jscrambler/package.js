// Information about this package:
Package.describe({
  // Short two-sentence summary
  summary: 'An extension of standard-minifier-js that protects your code using Jscrambler',
  // Version number
  version: '1.0.0',
  // Optional, default is package directory name
  name: 'jscrambler:protect'
});

// Depends on isobuild:minifier-plugin
Package.onUse((api) => {
  api.use('isobuild:minifier-plugin@1.0.0');
});

// Register a build plugin
Package.registerBuildPlugin({
  name: 'protectWithJscrambler',
  use: [
    'minifier-js',
    'babel-compiler',
    'ecmascript'
  ],
  sources: [
    'plugin/minify-js.js',
    'plugin/stats.js',
    'plugin/visitor.js',
    'plugin/utils.js'
  ],
  npmDependencies: {
    jscrambler: '1.3.3',
    deasync: '0.1.11'
  }
});
