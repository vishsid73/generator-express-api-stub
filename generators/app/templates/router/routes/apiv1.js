var express = require('express');
var router = express.Router();
var config    = require('config');  // we use node-config to handle environments

var crypto = require('crypto');
var multer = require('multer');
var debug = require('debug');

//CONTROLLERS
var log_ctrl = require('../../controllers/log.controller');


//PATH
router.get('/',     function(req,res, next){
    res.json ('Hello!, Welcome to Skeleton API V2.');
});


module.exports = router;
