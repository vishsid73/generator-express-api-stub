
var mongoose = require('mongoose');

var logSchema = new mongoose.Schema({
    api: String,
    method: String,
    host: String,
    user: String,
    date: { type: Date, default: Date.now }
});
var Log = mongoose.model('Log', logSchema);

// make this available to our users in our Node applications
module.exports = Log;
