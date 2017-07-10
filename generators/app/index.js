'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      "Welcome to the Sid's " + chalk.red('Express-API-Stub') + " generator!"
    ));

    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.appname
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {

  this.fs.copyTpl(
      this.templatePath('../dynamic_temps/_package.json'),
      this.destinationPath('package.json'),
      { name: this.props.name }
  );
  this.fs.copyTpl(
    this.templatePath('../dynamic_temps/_www'),
    this.destinationPath('bin/www'),
    { name: this.props.name }
  );
  this.fs.copyTpl(
    this.templatePath('../dynamic_temps/default.json'),
    this.destinationPath('config/default.json'),
    { name: this.props.name }
  );
  this.fs.copyTpl(
    this.templatePath('../dynamic_temps/development.json'),
    this.destinationPath('config/development.json'),
    { name: this.props.name }
  );
  this.fs.copyTpl(
    this.templatePath('../dynamic_temps/production.json'),
    this.destinationPath('config/production.json'),
    { name: this.props.name }
  );
  this.fs.copyTpl(
    this.templatePath('../dynamic_temps/staging.json'),
    this.destinationPath('config/staging.json'),
    { name: this.props.name }
  );
  this.fs.copyTpl(
    this.templatePath('../dynamic_temps/test.json'),
    this.destinationPath('config/test.json'),
    { name: this.props.name }
  );
  this.fs.copyTpl(
    this.templatePath('../dynamic_temps/db.js'),
    this.destinationPath('mongo_models/db.js'),
    { name: this.props.name }
  );
  this.fs.copyTpl(
    this.templatePath('../dynamic_temps/authentication.js'),
    this.destinationPath('helpers/authentication.js'),
    { name: this.props.name }
  );
  this.fs.copyTpl(
    this.templatePath('../dynamic_temps/index.js'),
    this.destinationPath('models/index.js'),
    { name: this.props.name }
  );
  this.fs.copyTpl(
    this.templatePath('../dynamic_temps/readme.md'),
    this.destinationPath('readme.md'),
    { name: this.props.name }
  );
  this.fs.copyTpl(
    this.templatePath('../dynamic_temps/app.js'),
    this.destinationPath('app.js'),
    { name: this.props.name }
  );

  this.fs.copy(
      this.templatePath(),
      this.destinationPath()
    );
  }

  install() {
    this.installDependencies();
  }
};
