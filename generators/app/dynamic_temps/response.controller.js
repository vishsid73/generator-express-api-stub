/**
 * Created by siddharthsrivastava on 12/07/17.
 */
var _ = require("underscore");
var Q = require('q');
var async = require('async');
var moment = require('moment');
var hub = require('hub');

var models  = require('../models');
var express = require('express');
var response_map = require('../constants/response_map');
mongoose = require('mongoose'); //mongo connection
mongoose.Promise = require('q').Promise;

var log_dao = require('../dao/log.dao');



module.exports = {
    sendResponse: function(msg, channel){
        var message = JSON.parse(msg.content);
        if(message.tag == '<%= name %>'){
            channel.ack(msg);
            var res = response_map.getMap(message.res_id);
            response_map.deleteMap(message.res_id);
            return res.json(message.data);
        }
    },
};