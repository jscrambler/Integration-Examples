# React-Native Integration with Jscrambler

This Demo Application was forked from [React Native School - Grocery List](https://github.com/ReactNativeSchool/react-native-grocery-list)

## Configuring Jscrambler

Create a `.jscramblerrc` file on the project's root folder.

Select the desired configuration. To do it quickly, visit the [Jscrambler Web App](https://app.jscrambler.com/dashboard) and create a new app. In the *Application Modes* tab, select the Language Specifications and application type. Select the transformations you want (check the *Templates* and *Fine-Tuning* tabs). In this tutorial, we used the *Obfuscation* template. For further help, see our [guide](https://blog.jscrambler.com/jscrambler-101-how-to-use-the-cli/).

Download the **JSON config file**.

![Download Jscrambler JSON](https://blog.jscrambler.com/content/images/2018/08/jscrambler-101-first-use-download-json.png)

Open `jscrambler.json` and copy all its contents to `.jscramblerrc`. Your final `.jscramblerrc` file should look like this: 

```
{
 "keys": {
   "accessKey": <ACCESS_KEY_HERE>,
   "secretKey": <SECRET_KEY_HERE>
 },
 "applicationId": <APP_ID_HERE>,
 "params": [
   {
     "name": "objectPropertiesSparsing"
   },
   {
     "name": "variableMasking"
   },
   {
     "name": "whitespaceRemoval"
   },
   {
     "name": "dotToBracketNotation"
   },
   {
     "name": "stringConcealing"
   },
   {
     "name": "functionReordering"
   },
   {
     "name": "propertyKeysObfuscation",
     "options": {
       "encoding": [
         "hexadecimal"
       ]
     }
   },
   {
     "name": "regexObfuscation"
   },
   {
     "options": {
       "features": [
         "opaqueSteps"
       ]
     },
     "name": "controlFlowFlattening"
   },
   {
     "name": "booleanToAnything"
   },
   {
     "name": "identifiersRenaming"
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
 "useRecommendedOrder": true
}
```

### Integrating Jscrambler via Metro

Install the [Jscrambler Metro Plugin](https://github.com/jscrambler/jscrambler/tree/master/packages/jscrambler-metro-plugin):

```
npm install jscrambler-metro-plugin --save-dev
```

Create a `metro.config.js` file on the project's root folder.

```
const jscramblerMetroPlugin = require('jscrambler-metro-plugin')();

module.exports = jscramblerMetroPlugin;
```

Build the application:

```
# installDebug requires an attached Android device or emulator
# otherwise you can use assembleDebug

cd android && ./gradlew installDebug
```

or

```
# generate JavaScript bundle
react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios

# install and run your code with Xcode
```


This will create the mobile application package for Android (apk) or iOS (ipa) on `<android|ios>/app/build/outputs/<apk|ipa>/debug`.
