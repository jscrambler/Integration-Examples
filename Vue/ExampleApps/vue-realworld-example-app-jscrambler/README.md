# Vue.js Integration with Jscrambler

This integration example is based on a fork of the `vue-realworld-example-app` which can be found [here](https://github.com/gothinkster/vue-realworld-example-app).

Start by cloning `vue-realworld-example-app`:

```bash
git clone https://github.com/JscramblerBlog/vue-realworld-example-app.git
```

Install the required dependencies:

```bash
cd vue-realworld-example-app
npm i
```

Run the cloned app:

```bash
npm run serve
```

Check if everything looks right on `localhost:8080`.

## Configure Jscrambler

Create a `.jscramblerrc` file on the project's root folder.

Select the desired configuration. To do it quickly, visit the [Jscrambler Web App](https://app.jscrambler.com/dashboard) and create a new app. In the *Application Modes* tab, select the Language Specifications and application type. Select the transformations you want (check the *Templates* and *Fine-Tuning* tabs). In this tutorial, we used the *Obfuscation* template. For further help, see our [guide](https://blog.jscrambler.com/jscrambler-101-how-to-use-the-cli/).

Download the **JSON config file**.

![Download Jscrambler JSON](https://blog.jscrambler.com/content/images/2018/08/jscrambler-101-first-use-download-json.png)

Open `jscrambler.json` and copy all its contents to `.jscramblerrc`. Add two new sections to `.jscramblerrc`: `filesSrc` and `filesDest` (see below). Your final `.jscramblerrc` file should look like this: 

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

You can integrate Jscrambler into the Vue build process with the CLI.

```bash
npm install jscrambler --save-dev
```

Create a CLI hook in the *scripts* section of `package.json`. The section should look like this:

```json
"scripts": {
  "build": "cross-env BABEL_ENV=dev vue-cli-service build && jscrambler",
  "lint": "vue-cli-service lint",
  "serve": "cross-env BABEL_ENV=dev vue-cli-service serve",
  "test": "cross-env BABEL_ENV=test jest --coverage"
},
```

The `"build": "cross-env BABEL_ENV=dev vue-cli-service build && jscrambler"` hook will trigger the `jscrambler` command after the build process is finished.

Build the application:

```bash
npm run build
```

There you go. Jscrambler is now integrated in your build process and the protected production files will be placed on `dist/`.

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