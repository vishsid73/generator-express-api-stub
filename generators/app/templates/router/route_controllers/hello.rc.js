var express = require('express');
var router = express.Router();
var config    = require('config');  // we use node-config to handle environments

var crypto = require('crypto');
var multer = require('multer');
var debug = require('debug');

var uuidv4 = require('uuid/v4');
var rabbit = config.get('rabbit');
var hub = require('hub');
var exchange = config.get('rabbit.exchange');
var wm1;
if(!hub.map){
    hub.map = new WeakMap();
    wm1 = hub.map;
}
else{
    wm1 = hub.map;
}

module.exports = {
    hello: function(req, res, next){
        res.json ('Hello!, Welcome to Skeleton API V2.');
    },


};
