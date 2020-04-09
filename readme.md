# Node To-Do App

Node To-Do App is a sample application which demonstrates the CRUD operations. This sample app can be used as a reference for creating similar applications.

### Tech

To-Do App uses a number of open source projects to work properly:

* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework for API development
* [Mongoose] -  a MongoDB object modeling tool designed to work in an asynchronous environment.
* [Winston] - A logger for just about everything.
* [Morgan] - HTTP request logger middleware for node.js
* [Eslint] - a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
* [Jest] Delightful JavaScript Testing
* [Supertest] - a high-level abstraction for testing HTTP
* [swagger-jsdoc] - Document your code and keep a live and reusable OpenAPI (Swagger) specification.
* [Swagger UI Express] - allows to serve auto-generated swagger-ui generated API docs from express

### Installation

CD to project directory, then Install the dependencies and devDependencies and start the server.

```sh
$ npm install -d
$ npm start
```
If you want to run the application in dev mode:
```sh
$ npm run dev
```

For production environments...

```sh
$ npm install --production
$ NODE_ENV=production npm start
```
### Test

We use Jest and Supertest to run the test. Run the following command to start the Test.

```sh
$ npm test
```
### Lint

[ESLint](https://eslint.org/) is a pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.

[.eslintrc.json file](<(https://eslint.org/docs/user-guide/configuring)>) (alternatively configurations can we written in Javascript or YAML as well) is used describe the configurations required for ESLint. Below is the .eslintrc.json file which we are using.

```javascript
{
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "airbnb-base",
        "plugin:jest/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
    }
}
```

We are using [Airbnb's Javascript Style Guide](https://github.com/airbnb/javascript) which is used by many JavaScript developers worldwide.

We can run the lint by running the following:
```sh
$ npm run lint
```

### API Documentation

After running the To-Do App, Please visit the https://APP_BASE_URL/api-docs/ to view the API endpoint details via browser, powered by swagger. (You can see the APP_BASE_URL in the console log on starting the Application). 

### Todos

 - Write MORE Tests
 - Review and modify swagger API documentaion
 - Review and Make improvement to the code base



   [node.js]: <http://nodejs.org>
   [Mongoose]: <https://www.npmjs.com/package/mongoose>
   [Winston]: <https://www.npmjs.com/package/winston>
   [Morgan]: <https://www.npmjs.com/package/morgan>
   [Eslint]: <https://www.npmjs.com/package/eslint>
   [Jest]: <https://www.npmjs.com/package/jest>
   [Supertest]: <https://www.npmjs.com/package/supertest>
   [swagger-jsdoc]: <https://www.npmjs.com/package/swagger-jsdoc>
   [Swagger UI Express]: <https://www.npmjs.com/package/swagger-ui-express>
