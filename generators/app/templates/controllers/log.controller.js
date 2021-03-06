var _ = require("underscore");
var Q = require('q');
var async = require('async');
var moment = require('moment');
var hub = require('hub');

var models = require('../models');
var express = require('express');

mongoose = require('mongoose'); //mongo connection
mongoose.Promise = require('q').Promise;

var amqp_helper = require('../helpers/amqp.helper');
var log_dao = require('../dao/log.dao');


module.exports = {
  getAllLog: function (msg, channel) {
    if (msg == null) {
      throw ('No Message');
    }
    var message = JSON.parse(msg.content);
    console.log(message.toString());
    channel.ack(msg);
    return log_dao.getLogs('all')
      .then(function (result) {
        //return res.status(200).json({status: 'success', log: result});
        var send_msg = {
          key: 'send_response',
          res_id: message.res_id,
          data: {
            status: "success",
            truck: result
          }
        };
        return amqp_helper.publish(send_msg.key, new Buffer(JSON.stringify(send_msg)));
      })
      .catch(function (error) {
        console.log(error.message);
      });
  },
  createLog: function (req, res, next) {
    return log_dao.createLog(req.body.log)
      .then(function (result) {
        return res.status(201).json({status: 'success'});
      })
      .catch(function (error) {
        return res.status(400).json({status: 'error', error: error.message});
      });
  },
};
