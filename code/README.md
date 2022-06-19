<h1 align="center">
  <br>
  <h1 align="center">NodeJS APP Builder</h1>
</h1>

<br>
<h4 align="center">
	🚧 🚀 In Production  🚧
</h4>
<br>

# Sumário

- [Sumário](#sumário)
- [Project](#project)
  - [Pré-requisites](#pré-requisites)
    - [🎲 Running the Project](#-running-the-project)
- [Architecture](#architecture)
    - [Main Libs](#main-libs)
- [Scrits](#scrits)
- [Functionalities](#functionalities)
  - [**For Examples, verify the TESTS**](#for-examples-verify-the-tests)
- [Autores](#autores)

---

# Project

Create NodeJS applications with a Serverless handle, easily add routes and application loggers with `pino`.

> _Obs:_ `pino` is a logger for NodeJS, `pino-pretty` is a logger for NodeJS with pretty format.

<br>

## Pré-requisites

Before you start, install it on your machine:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).
Some code editor like [VSCode](https://code.visualstudio.com/)

### 🎲 Running the Project

```bash
# Clone the repository
$ git clone <https://github.com/celio1878/nodejs_appbuilder>

# Access the projeto in the terminal/cmd
$ cd nodejs_appbuilder

# Go to codes directory
$ cd code

# Install the dependencies
$ npm install

# Exec the tests
$ npm test

# Verify the test coverage
$ npm run test:coverage
```

---

# Architecture
Layered architecture with TDD.

Coverage all functionalities in the tests.
<br>
<br>

### Main Libs

-  [Express](https://expressjs.com/)
-  [Typescript](https://www.typescriptlang.org/)
-  [CORS](https://expressjs.com/en/resources/middleware/cors.html)
-  [Compression](https://www.npmjs.com/package/compression)
-  [Pino](https://www.npmjs.com/package/pino)
-  [TS-PRUNE](https://www.npmjs.com/package/ts-prune)

<br>
<br>

# Scrits
   `npm test`: Exec all tests of project
   <br>
	`npm run test:watch`: Exec all tests of project and watch for changes
   <br>
	`test:coverage`: Exec all tests of project and generate a coverage report
	<br>
   `build`: Build the project,
	<br>
   `prepare`: Prepare the project for production,
	<br>
   `find-deadcode`: Find dead code in the project,

---

# Functionalities

- [x] Create API
- [x] Create a new route
- [x] Add Logger
- [x] Test Coverage
- [x] Remove unused code
- [x] Build

<br>

## **For Examples, verify the TESTS**

<br>

---

# Autores
 <table>
  <tr>
    <td align="center"><a href="https://github.com/celio1878"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/40040827?&v=4" width="100px;" alt=""/><br /><sub><b>Célio Vieira</b></sub></a></td>
    <td align="center"><a href="https://github.com/rickonodera"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/7835329?v=4" width="100px;" alt=""/><br /><sub><b>Ricardo Onodera</b></sub></a></td>
  </tr>
</table>