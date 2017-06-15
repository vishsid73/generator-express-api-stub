var _ = require("underscore");
var Q = require('q');
var async = require('async');
var request = require('request');
var moment = require('moment');

var Status = require('../constants/status');
var models  = require('../models');
var express = require('express');

var sample_dao = require('../dao/sample.dao');


module.exports = {
    //:sampleid
    getSampleById: function(req, res, next){
        if(!req.params.sampleid){
            return res.status(400).json({status: 'error', error: 'Params Missing'});
        }
        sample_dao.getSample('one', req.params.sampleid)
            .then(function(resultFind){
                //var buffer = new Buffer( resultFind.data.value );
                //var model = JSON.parse(buffer.toString());
                return res.status(200).json({status: 'success', sample: resultFind});
            })
            .catch(function(error){
                return res.status(400).json({status: 'error', error: error.message});
            });
    },
    getSamples : function(req, res, next){
        var operation, id;
        operation = 'all';
        sample_dao.getSample(operation)
            .then(function(resultFind){
                //var buffer = new Buffer( resultFind.data.value );
                //var model = JSON.parse(buffer.toString());
                return res.status(200).json({status: 'success', sample: resultFind});
            })
            .catch(function(error){
                return res.status(400).json({status: 'error', error: error.message});
            });
    },
    createSample : function(req, res, next){
        if(!req.body.lawyer_hour){
            return res.status(400).json({status: 'error', error: 'Params Missing'});
        }
        var lawyerhourCreatedObject;
        req.body.lawyer_hour.organization_id = req.params.orgid;
        lawyer_hour_dao.createLawyerHours(req.body.lawyer_hour)
            .then(function(resultCreated){
                lawyerhourCreatedObject = resultCreated;
                var obj = {
                    total_hours_used : req.body.lawyer_hour.value
                };
                //return account_helper.updateAccountCounter(obj,req.params.orgid);
                return account_helper.reMyAccounts(req.params.orgid)
            })
            .then(function(Accupdated){
                //if(req.body.lawyer_hour.is_billable == 1){
                //    var object={lawyer_hour_expense :req.body.lawyer_hour.value};
                //    return account_helper.updateAccountCounter(object,req.params.orgid);
                //}
                //else
                //    return null;
                return null;
            })
            .then(function(billableUpdated){
                return res.status(201).json({status: 'success', lawyer_hour: lawyerhourCreatedObject});
            })
            .catch(function(error){
                return res.status(400).json({status: 'error', error: error.message});
            });
    },
    //:sampleid
    updateSample : function(req, res, next){
        if(!req.params.sampleid){
            return res.status(400).json({status: 'error', error: 'Params Missing'});
        }
        if(!req.body.sample){
            return res.status(400).json({status: 'error', error: 'Params Missing'});
        }
        if(req.body.sample.id != req.params.sampleid){
            return res.status(400).json({status: 'error', error: 'Malformed Request'});
        }
        var oldL;
        return sample_dao.getSample('one', req.body.sample.id)
            .then(function(oldFind){
                oldL = oldFind;
                return sample_dao.updateSample(req.body.sample)
            })
            .then(function(resultFind){
                return res.status(201).json({status: 'success', sample: resultFind});
            })
            .catch(function(error){
                return res.status(400).json({status: 'error', error: error.message});
            });
    },
    //:sampleid
    deleteSample : function(req, res, next){
        if(!req.params.sampleid){
            return res.status(400).json({status: 'error', error: 'Params Missing'});
        }
        sample_dao.deleteSample(req.params.sampleid)
            .then(function(resultFind){
                return res.status(200).json({status: 'success', sample: resultFind});
            })
            .catch(function(error){
                return res.status(400).json({status: 'error', error: error.message});
            });
    },

};