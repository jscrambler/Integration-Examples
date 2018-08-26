# Protecting Angular TodoApp

Example source code from [todomvc-angular-4](https://github.com/addyosmani/todomvc-angular-4.git) by Addy Osmani.

In order to protect your angular app with jscrambler:
  1. add [.jscramblerrc](https://github.com/jscrambler/jscrambler/tree/master/packages/jscrambler-cli#rc-configuration)
  2. Install jscrambler cli
      ```bash
      npm i jscrambler -D
     ```
  3. Add build:prod script to package.json
      ```json
      {
         "build:prod": "ng build --prod && jscrambler"
      }
      ```
## Update .jscramblerrc

- Fill accessKey and secretKey. You can get this info in your jscrambler account.
- Create an (or re-use an existing) application in [jscrambler webapp](https://app.jscrambler.com) and update applicationId field

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

### development
Run `npm run build` to build the project in development mode. The build artifacts will be stored in the `dist/` directory.

### production
Run `npm run build:prod` to build the project in production mode. It will call jscrambler cli to protect your bundle.
The build artifacts will be stored in the `dist/` directory. 

>**index.html** and **main\*.bundle.js** will be protected with jscrambler.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

Checkout [Integrating Jscrambler with Angular (2, 4 and 5)](https://docs.jscrambler.com/code-integrity/frameworks-and-libraries/angular) to get more help.  
