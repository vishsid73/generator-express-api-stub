var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error);

mongoose.connect('mongodb://localhost/<%= name %>V1', {
  useMongoClient: true,
});
