# React.js Integration with Jscrambler

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Creating Boilerplate *React* Application

Install `create-react-app` using npm:

```
npm install -g create-react-app
```

Create boilerplate app:

```
npx create-react-app react-jscrambler-boilerplate
```

Run the newly created boilerplate app:

```
cd react-jscrambler-boilerplate
npm start
```

Check if everything is in place by running the app on `localhost:3000`.

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
   "./build/**/*.html",
   "./build/**/*.js"
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

You can integrate Jscrambler into the React build process with the CLI.

Install the [Jscrambler API Client](https://github.com/jscrambler/jscrambler/tree/master/packages/jscrambler-cli):

```
npm install jscrambler --save-dev
```

Create a CLI hook in the *scripts* section of `package.json`. The section should look like this:

```
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build && jscrambler",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
},
```

The `"build": "react-scripts build && jscrambler"` hook will trigger the `jscrambler` command after the build process is finished.

Build the application:

```
npm run build
```

This will create the production files on `build/static/`. All your HTML and JavaScript files are protected with Jscrambler against code theft and reverse-engineering.

## Testing the Protected React App

Install the required dependencies:

```
npm i -g serve
```

Deploy the app build files to a local development server:

```
serve -s build
```

Open the URL and your app will start in the browser.

You can check what your protected files look like by opening the browser's debugger and opening the files from the "Sources" tab. The protected code should look like this:

![Protected React Code - Chrome Debugger](https://blog.jscrambler.com/content/images/2019/02/jscrambler-blog-protecting-react-source-code-with-jscrambler-protected-code.jpg)
