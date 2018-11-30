# Angular 6/7 Integration with Jscrambler

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

## Creating Boilerplate *Angular* Application

This tutorial uses an **Angular 6/7** boilerplate app. For Angular 5 or earlier, see [here](https://docs.jscrambler.com/code-integrity/frameworks-and-libraries/angular). For Angular JS, check [here](https://blog.jscrambler.com/how-to-protect-your-angular-js-application-with-jscrambler/).

Install Angular CLI using npm:

```
npm install -g @angular/cli
```

Create boilerplate app:

```
ng new angular6-7-cli-jscrambler-boilerplate
```

Serve the newly created boilerplate app:

```
cd angular6-7-cli-jscrambler-boilerplate
ng serve
```

Check if everything is in place by running the app on `http://localhost:4200/`.

## Configure Jscrambler

Create a `.jscramblerrc` file on the project's root folder.

Select the desired configuration. To do it quickly, visit the [Jscrambler Web App](https://app.jscrambler.com/dashboard) and create a new app. In the *Application Modes* tab, select the Language Specifications and application type. Select the transformations you want (check the *Templates* and *Fine-Tuning* tabs). In this tutorial, we used the *Obfuscation* template. For further help, see our [guide](https://blog.jscrambler.com/jscrambler-101-how-to-use-the-cli/).

Download the **JSON config file**.

![Download Jscrambler JSON](https://blog.jscrambler.com/content/images/2018/08/jscrambler-101-first-use-download-json.png)

Open `jscrambler.json` and copy all its contents to `.jscramblerrc`. Add two new sections to `.jscramblerrc`: `filesSrc` and `filesDest` (see below). Your final `.jscramblerrc` file should look like this: 

```
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
 "jscramblerVersion": "5.<X>"
}
```

## Integrating Jscrambler in the Build Process

You can integrate Jscrambler into the Angular build process with **Angular CLI** and **Webpack**. We will cover both below.

### Integrating Jscrambler via Angular CLI

Installing the [Jscrambler API Client](https://github.com/jscrambler/jscrambler/tree/master/packages/jscrambler-cli):

```
npm install jscrambler --save-dev
```

Create a CLI hook in the *scripts* section of `package.json`. The section should look like this:

```
"scripts": {
  "ng": "ng",
  "start": "ng serve",
  "build": "ng build",
  "build:prod": "ng build --prod && jscrambler",
  "test": "ng test",
  "lint": "ng lint",
  "e2e": "ng e2e"
},
```

The `"build:prod": "ng build --prod && jscrambler"` hook will trigger the `jscrambler` command after the build process is finished.

Build the application:

```
npm run build:prod
```

This will create the production files on `dist/<app-name>`. All your HTML and JavaScript files are protected with Jscrambler against code theft and reverse-engineering.

### Integrating Jscrambler via Webpack

With the `ng eject` command being deprecated on Angular 6 and above, to use a Webpack build process you must extend the underlying build configurations with an angular-builder.

We will use the [custom-webpack](https://github.com/meltedspark/angular-builders/tree/master/packages/custom-webpack#custom-webpack-config-object) builder:

```
npm i -D @angular-builders/custom-webpack
```

Create the Webpack config file that will be merged to the built-in configuration. You might want to have at least 2 different configurations, for development and production builds.

For our production configuration, we will only include the [Jscrambler Webpack  Plugin](https://github.com/jscrambler/jscrambler/tree/master/packages/jscrambler-webpack-plugin):

```
npm i --save-dev jscrambler-webpack-plugin
```

Our final production config looks like this:

```javascript
const JscramblerWebpack = require('jscrambler-webpack-plugin');

module.exports = {
  plugins: [
    new JscramblerWebpack({
     chunks: ['main']
    })
  ]
};
```

**Note that we are only protecting the main chunk** which is where all the application logic is contained.

Update the build options on the `angular.json` file.

```javascript
...
 "architect": {
   "build": {
     "builder": "@angular-builders/custom-webpack:browser",
     "options": {
       "customWebpackConfig": {
         "path": "./extra-webpack.config.js"
        },
        …
     },
     "configurations": {
       "production": {
         "customWebpackConfig": {
           "path": "./extra-webpack.config.prod.js"
         },
         …
         "vendorChunk": true,
   ...
```
By setting the `vendorChunk` flag to true, all the vendor content will be generated into a separate bundle file. This is optional.

Update the `package.json` build script for production accordingly. It should look as follows:

```
"scripts": {
  "ng": "ng",
  "start": "ng serve",
  "build": "ng build",
  "build:prod": "ng build --prod",
  "test": "ng test",
  "lint": "ng lint",
  "e2e": "ng e2e"
},
```
Production builds `npm run build:prod` will use the Jscrambler Webpack client to protect your code and use the previously defined `.jscramblerrc`.


## Testing the Protected Angular App

Install a local server where the app can run:

```
npm install http-server -g
```

Set your Angular app's files to run inside this local server.

```
http-server ./dist/angular6-7-cli-jscrambler-boilerplate/
```

Open the URL and your app will start in the browser.

You can check what your protected files look like by opening the browser's debugger and opening the files from the "Sources" tab. The protected code should look like this:

![Protected Angular 7 Code - Chrome Debugger](https://blog.jscrambler.com/content/images/2018/11/jscrambler-blog-how-to-protect-angular-code-debugger.jpg)

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
