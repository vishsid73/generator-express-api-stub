/**
 * Created by siddharthsrivastava on 12/07/17.
 */

var _ = require("underscore");
var Q = require('q');
var async = require('async');
var moment = require('moment');

var express = require('express');


var amqp_helper = require('../helpers/amqp.helper');
var log_controller = require('../controllers/log.controller');

module.exports = {
    fetch_log_listener: function(){
        var channel, queue;
        return amqp_helper.subscribe('fetch_log')
            .then(function(result) {
                return result.channel.consume(result.queue.queue, function(message){
                    return log_controller.getAllLog(message, result.channel);
                });
            })
            .catch(function(error){
                console.log(error.message);
            });
    },
};
