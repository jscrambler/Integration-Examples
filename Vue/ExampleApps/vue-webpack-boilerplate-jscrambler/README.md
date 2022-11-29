# Vue.js Integration with Jscrambler

This integration example is based on a [boilerplate Vue webpack app](https://vuejs-templates.github.io/webpack/).

Start a new app `vue-webpack-boilerplate-jscrambler`:

```bash
npm install -g vue-cli
vue init webpack vue-webpack-boilerplate-jscrambler
cd vue-webpack-boilerplate-jscrambler
npm install
npm run dev
```

Check if everything looks right on `localhost:8080`.

## Configure Jscrambler

Create a `.jscramblerrc` file on the project's root folder.

Select the desired configuration. To do it quickly, visit the [Jscrambler Web App](https://app.jscrambler.com/dashboard) and create a new app. In the *Application Modes* tab, select the Language Specifications and application type. Select the transformations you want (check the *Templates* and *Fine-Tuning* tabs). In this tutorial, we used the *Obfuscation* template. For further help, see our [guide](https://blog.jscrambler.com/jscrambler-101-how-to-use-the-cli/).

Download the **JSON config file**.

![Download Jscrambler JSON](https://blog.jscrambler.com/content/images/2018/08/jscrambler-101-first-use-download-json.png)

Open `jscrambler.json` and copy all its contents to `.jscramblerrc`. Add two new sections to `.jscramblerrc`: `filesSrc` and `filesDest` (see below). The final `.jscramblerrc` file should look like this: 

```json
{
 "keys": {
   "accessKey": <ACCESS_KEY_HERE>,
   "secretKey": <SECRET_KEY_HERE>
 },
 "applicationId": <APP_ID_HERE>,
 "filesSrc": [
   "./dist/**/*.html",
   "./dist/**/*.js"
 ],
 "filesDest": "./",
 "params": [
   {
     "name": "whitespaceRemoval"
   },
   {
     "name": "identifiersRenaming",
     "options": {
       "mode": "SAFEST"
     }
   },
   {
     "name": "dotToBracketNotation"
   },
   {
     "name": "deadCodeInjection"
   },
   {
     "name": "stringConcealing"
   },
   {
     "name": "functionReordering"
   },
   {
     "options": {
       "freq": 1,
       "features": [
         "opaqueFunctions"
       ]
     },
     "name": "functionOutlining"
   },
   {
     "name": "propertyKeysObfuscation"
   },
   {
     "name": "regexObfuscation"
   },
   {
     "name": "booleanToAnything"
   }
 ],
 "areSubscribersOrdered": false,
 "applicationTypes": {
   "webBrowserApp": true,
   "desktopApp": false,
   "serverApp": false,
   "hybridMobileApp": false,
   "javascriptNativeApp": false,
   "html5GameApp": false
 },
 "languageSpecifications": {
   "es5": true,
   "es6": false,
   "es7": false
 },
 "useRecommendedOrder": true,
 "jscramblerVersion": "6.<X>"
}
```

## Integrating Jscrambler in the Build Process

You can integrate Jscrambler into the webpack build process using [Jscrambler's webpack plugin](https://github.com/jscrambler/jscrambler/tree/master/packages/jscrambler-webpack-plugin). This plugin will use the configurations you specified on the `.jscramblerrc` file that is on the root folder of your project.

Install Jscrambler's webpack plugin as a dev dependency:

```bash
npm i --save-dev jscrambler-webpack-plugin
```

Configure the `webpack.prod.conf.js` file which is inside the `build` directory. First, by adding this line:

```javascript
const JscramblerWebpack = require('jscrambler-webpack-plugin');
```

And then by adding the Jscrambler webpack plugin **at the end** of the plugin array, so that it looks like this:

```javascript
plugins: [
    // other plugins
    new JscramblerWebpack({
      enable: true, // optional, defaults to true
      chunks: ['app'] // protect just our app.js file
    })
  ]
```

Run the production build:

```bash
npm run build
```

The protected app files will be found at `/dist/static/js/app.<HASH>.js`.

## Testing the Protected Vue App

Install the required dependencies:

```
npm i -g serve
```

Deploy the app build files to a local development server:

```
serve -s build
```

Open the URL and your app will start in the browser.

You can check what your protected files look like by opening the browser's debugger and opening the files from the "Sources" tab.