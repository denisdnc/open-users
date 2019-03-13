# USERS SERVICES

## An Node JS supercool REST API to administrate users
The idea was to build an REST API in Node JS using best practices, patterns and frameworks that can be used in an enterprise application.

[![Build Status](https://api.travis-ci.org/denisdnc/open-users.svg?branch=master)](https://travis-ci.com/denisdnc/open-users)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## TODOs

- [ ] Refactor to use promises and validate
- [ ] Refactor to use async and validate
- [ ] Integration Test for repositories
- [ ] Clean up database before End to End tests

## USER entity
```json
{
    "_id": "7d092a2c-1d4f-498a-9fb7-c3a939f4c6a3",
    "email": "jack@jackdaniels.com",
    "name": "Jack Daniels",
    "createdAt": "2018-11-06T22:57:00.000Z"
}
```

## REST APIs:

- [Postman collection](denisdnc-users.postman_collection.json)

### CREATE USER
  endpoint: /v1/users

  method: POST

  request body:
  ```json
  {
    "email": "email@email.com",
    "password": "string",
    "name": "string" // optional
  }
  ```

  response success:
  ```json
  {
    "_id": "string",
    "email": "email@email.com",
    "password": "string",
    "name": "string",
    "createdAt": "2019-12-30T00:00:00.000Z"
  }
  ```

  response error:

  http code: 422
  ```json
  {
    "errors": [{
      "message": "error message"
    }]
  }
  ```

  ### EDIT USER
  endpoint: /v1/users

  method: PUT

  request body:
  ```json
  {
    "email": "email@email.com",
    "password": "string", 
    "name": "string"
  }
  ```

  response success:
  ```json
  {
    "_id": "string",
    "email": "email@email.com",
    "password": "string",
    "name": "string",
    "createdAt": "2019-12-30T00:00:00.000Z"
  }
  ```

  response error:

  http code: 422
  ```json
  {
    "errors": [{
      "message": "error message"
    }]
  }
  ```

### FIND USER BY ID
  endpoint: /v1/users/:id

  method: GET
  
  response success:
  ```json
  {
    "_id": "string",
    "email": "email@email.com",
    "name": "string",
    "createdAt": "2019-12-30T00:00:00.000Z"
  }
  ```

  response error:

  http code: 404
  ```json
  {
    "errors": [{
      "message": "user not found"
    }]
  }
  ```
  

### VALIDATE USER PASSWORD

  endpoint: /v1/users/:id/password/valid
  
  method: POST
  
  request body:
  ```json
  {
    "value": "string"
  }
  ```
  
  response success:

  http code: 200
  ```json
  {
    "valid": true
  }
  ```

  response error:
  
  http code: 200

  ```json
  {
    "valid": false
  }
  ```

## For this, was used:

#### Architecture:
- [The Clean Architecture](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html)

#### Design patterns:
- [Revealing Module Pattern](https://toddmotto.com/mastering-the-module-pattern/)
- [Dependency Injection](https://www.nodejsdesignpatterns.com/)
- [Error-First Callbacks](http://fredkschott.com/post/2014/03/understanding-error-first-callbacks-in-node-js/)
- [REST API Design Patterns](https://pages.apigee.com/rs/apigee/images/api-design-ebook-2012-03.pdf)

#### Java Script:
- [JavaScript Standard Style](https://github.com/standard/standard)

#### Application Frameworks:
- [Express JS](http://expressjs.com/)

#### Testing Strategies
- [Testing Strategies in a Microservice Architecture](https://martinfowler.com/articles/microservice-testing/)
- [Test Driven Development](http://butunclebob.com/ArticleS.UncleBob.TheThreeRulesOfTdd)

#### Testing Frameworks:
- [Mocha](https://mochajs.org/)
- [Chai](http://chaijs.com/)

#### Code quality tools:
- [ESlint](https://github.com/eslint/eslint)
- [pre-push](https://github.com/dflourusso/pre-push)

#### Package manager:
- [npm](https://www.npmjs.com/)

## Running:
- clone the repository
- "docker-compose up" in main directory
- "npm install" to install dependencies
- "npm start" to start the application
- "npm test" to run @unit and @component tests
- "npm test -- --grep @unit", to run only unit tests
- "npm test -- --grep @component", to run only component tests
- "npm test -- --grep @e2e", ro run only end to end tests
- "npm run lint-js" to lint js files

###### Refencences:
- https://www.nodejsdesignpatterns.com/
- https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html
- https://toddmotto.com/mastering-the-module-pattern/
- http://fredkschott.com/post/2014/03/understanding-error-first-callbacks-in-node-js/
- http://expressjs.com/
- https://mochajs.org/
- http://chaijs.com/
- https://www.npmjs.com/
- https://github.com/standard/standard
- https://github.com/dflourusso/pre-push
- https://github.com/eslint/eslint
