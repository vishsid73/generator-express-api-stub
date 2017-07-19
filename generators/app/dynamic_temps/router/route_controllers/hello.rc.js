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
var response_map = require('../../../constants/response_map');
var amqp_helper = require('../../../helpers/amqp.helper');


module.exports = {
    hello: function(req, res, next){
        res.json ('Hello!, Welcome to Skeleton API V2.');
    },
     /**
     * @api {get} /logs Get All Logs
     * @apiName getAllLogs
     * @apiGroup End Points
     * @apiVersion 0.0.1
     *
     *
     *
     * @apiSuccess {String} Status Success.
     *
     * @apiSuccessExample Success-Response: 200 Ok
     *     HTTP/1.1 200 Ok
     *     {
     *       "status": "success"
     *     }
     *
     */
    getLogs: function(req, res, next){
      var res_id = uuidv4();
      response_map.setMap(res_id,res);
      var msg = {
        key : 'fetch_log',
        res_id: res_id,
        data :{
          'name' : 'Pranav Anand',
          'phone_no' : '9407068021'
        }
      };
      return amqp_helper.publish(msg.key,new Buffer(JSON.stringify(msg)));
    },


};
