var _ = require("underscore");
var Q = require('q');
var async = require('async');
var moment = require('moment');

var models  = require('../models');
var express = require('express');

mongoose = require('mongoose'); //mongo connection
mongoose.Promise = require('q').Promise;

var log_dao = require('../dao/log.dao');



module.exports = {
    getAllLog: function(req, res, next){
        return log_dao.getLogs()
            .then(function(result){
                return res.status(200).json({status: 'success', log: result});
            })
            .catch(function(error){
                return res.status(400).json({status: 'error', error: error.message});
            });
    },
    createLog: function(req, res, next){
        return log_dao.createLog(req.body.log)
            .then(function(result){
                return res.status(201).json({status: 'success'});
            })
            .catch(function(error){
                return res.status(400).json({status: 'error', error: error.message});
            });
    },
};