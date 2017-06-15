/**
 * Created by LexStart on 01/07/16.
 */
var _ = require("underscore");
var moment = require("moment");
var Q = require('q');
var async = require('async');

var Roles = require('../constants/roles');
var Status = require('../constants/status');

var models  = require('../models');
var express = require('express');

mongoose = require('mongoose'); //mongo connection
mongoose.Promise = require('q').Promise;
var db = require('../mongo_models/db');
var log = require('../mongo_models/log');


module.exports = {
    getLogs: function(){
        return mongoose.model('Log').find({}).exec();

    },
    createLog: function(Log){
        var deferred = Q.defer();

        if(Log == null){
            throw new Error("No Log");
        }

        var newItem = new log(Log);
        newItem.save(function(err, result) {
            if (err)
                deferred.reject(err);
            deferred.resolve();
        });

        return deferred.promise;
    },
};