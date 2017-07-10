====
Project Name:
Things to Change:
- package.json (package name)
- config.json and all the config file types (package name)
- mongo_models/db.js (db name)
- bin/www (package name)

====
Skelton Express Stub for API Development
As per wiki: A method stub or simply stub in software development is a piece of code used to stand in for some other programming functionality. A stub may simulate the behavior of existing code or be a temporary substitute for yet-to-be-developed code.


install dependencies:
$ cd . && npm install

Runing the app:
URL: https://localhost:3000
$ npm test
$ npm start
$ DEBUG=sampleApp:* npm test
$ DEBUG=sampleApp:* npm start

//npm test =  NODE_ENV=development nodemon ./bin/www
//npm start =  NODE_ENV=production nodemon ./bin/www
====
For Debugging:

Debug is like an augmented version of console.log, but unlike console.log, you don’t have to comment out debug logs in production code.
Logging is turned off by default and can be conditionally turned on by using the DEBUG environment variable.

An application generated by the express command also uses the debug module and its debug namespace is scoped to the name of the application.
$ DEBUG=sample-app:* node ./bin/www

You can specify more than one debug namespace by assigning a comma-separated list of names:
$ DEBUG=http,mail,express:* node index.js
====

Webstorm Setting
Add Nodejs Runner Configuration
Working Directory: /server
Javascript file: bin/www
Application Parameters: DEBUG=sampleApp:* npm test

For generating SSL Certificate

openssl genrsa 1024 > file.pem
openssl req -new -key file.pem -out csr.pem
(No Passphase/Password)