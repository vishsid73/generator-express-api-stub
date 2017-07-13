/**
 * Created by siddharthsrivastava on 12/07/17.
 */

var _ = require("underscore");
var Q = require('q');
var async = require('async');
var moment = require('moment');

var express = require('express');


var amqp_helper = require('../helpers/amqp.helper');
var response_controller = require('../controllers/response.controller');

module.exports = {
    send_response_listener: function(){
        return amqp_helper.subscribe('send_response')
            .then(function(result) {
                return result.channel.consume(result.queue.queue, function(message){
                    return response_controller.sendResponse(message, result.channel);
                });
            })
            .catch(function(error){
                console.log(error.message);
            });
    },
};