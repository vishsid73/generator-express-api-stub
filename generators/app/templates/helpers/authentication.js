/**
 * Created by siddharthsrivastava on 11/10/16.
 */

var _ = require("underscore");
var Q = require('q');
var async = require('async');
var moment = require('moment');
var request = require('request');

var Status = require('../constants/status');
var Roles = require('../constants/roles');
var models  = require('../models');
var express = require('express');
var jwt    = require('jsonwebtoken');
var crypto = require('crypto');

var config    = require('config');  // we use node-config to handle environments
var tokenSecret = config.get('SampleApp.tokenSecret');


module.exports = {
    decodeToken: function(req, res, next){
        if(!req.headers['x-auth-token']){
            return res.status(401).json({status: 'error', error: 'Token Not Found'});
        }
        var token = req.headers['x-auth-token'];
        try{
            var decoded = jwt.verify(token, tokenSecret);
            console.log(decoded);
            req.body.requestUser = decoded;
        }
        catch(err){
            console.log(err);
            if(err.name == 'TokenExpiredError')
                return res.status(401).json({status: 'error', error: 'Token Expired'});
            else
                return res.status(401).json({status: 'error', error: err.message});
        }

        next();
    },

};