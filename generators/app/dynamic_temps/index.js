var fs        = require("fs");
var path      = require("path");
var Sequelize = require('sequelize');
var config    = require('config');  // we use node-config to handle environments

var dbConfig = config.get('<%= name %>.dbConfig');

var db        = {};
if(dbConfig.mysql.active){
  // initialize database connection
  var sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,{
      host: dbConfig.host,
      dialect: dbConfig.driver
    }
  );

  fs
    .readdirSync(__dirname)
    .filter(function(file) {
      return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
      var model = sequelize.import(path.join(__dirname, file));
      db[model.name] = model;
    });

  Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

}

module.exports = db;
