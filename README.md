<p align="center">
  <h1 align="center">NodeJS - HapiJS API Worker - Monolith</h1>
</p>

## Developing at NodeJS - HapiJS API Worker - Monolith

> NodeJS - HapiJS API Worker - Monolith built for study proposes, it provides **RESTFUL** services on resource oriented architecture projects (ROA).

> The barebone is located under `app/api` and `app/core`, it is desgined by default covered by an Users API which is the authentecion is supported by a JWT plugin (app/core/plugins). There is also a Workers layer which comes with the `webapi` as default but it also ables you to create your own workers such Notification (notify) or Transactions (shake data in db) workers. If you need more details of how apply in your business feel free to get in touch and I'll be happy to help.

## Configuring development environment

#### Step 1: installing tools

* install git: [git-scm](http://git-scm.com/)
* install NodeJS@12+: [nodejs.org](http://nodejs.org)

#### Step 2: preparing repository

Clone repository:
```
git clone https:/github.com/felipekm/nodejs-hapijs-monolith
```

Install project packages
```
cd nodejs-hapijs-monolith
npm install
```
### Step 3: run tests to check if things are fine, the tests file must be created in app/core/tests:

To run your tests:
```
npm test
```

## How to debug it

To debug we are explicity using the [Visual Code](https://code.visualstudio.com/):

* Open your the project in VS Code;
* Press `F5` or symply runs `node server.js` in this project folder;

### Development environment variables

For development, you must set this variables and values in your OS:
  * __NODE_ENV__: development
  * __ENGINE__: The engine to start the process, the defined value matches the folder name at `app/core/workers/NAME`, the defaut is `webapi, you can have several others such a Notificator or Transactions worker that keeps running every time.

### NPM tasks

Several tasks are scripted to make things easier to dev team. In this project, you will find:
  * ```npm start```     : this task is only used on AWS EC2 machine.
  * ```npm test```      : runs all automated tests and coding best practices check.
  * ```npm stop```      : kill the process.
  * ```npm dev```       : debug (dev) mode using nodemon.

### Support

If you find any problem or question please raise an issue
