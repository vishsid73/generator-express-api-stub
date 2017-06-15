
var _ = require("underscore");
var moment = require("moment");
var Q = require('q');
var async = require('async');

var Roles = require('../constants/roles');
var Status = require('../constants/status');

var models  = require('../models');
var express = require('express');

module.exports = {
    getSample: function(operation, id){
        var deferred = Q.defer();
        var q_array = [];

        if(operation == null){
            throw new Error("No Operation for Fetch Request Speecified");
        }

        if(operation == "all")
            return models.Sample.findAll();
        else if(operation == "one")
            return models.Sample.findOne({
                where:{
                    id: id
                }
            });

    },
    createSample: function(Sample){
        var deferred = Q.defer();
        var q_array = [];

        if(Sample == null){
            throw new Error("No Sample");
        }
        return models.Sample.create(Sample);
    },
    updateSample: function(Sample){
        var deferred = Q.defer();
        var q_array = [];

        if(Sample == null){
            throw new Error("No Sample");
        }
        var obj = Sample.dataValues ? Sample.dataValues : Sample;
        if(obj.created_at)
            delete obj.created_at;
        if(obj.updated_at)
            delete obj.updated_at;

        return models.Sample.update(obj,{
            where:{
                id: obj.id
            }
        });
    },
    deleteSample: function(Sampleid){
        var deferred = Q.defer();
        var q_array = [];

        if(Sampleid == null){
            throw new Error("No Sample");
        }

        return models.Sample.update({
            status: Status.Deleted
        },{
            where:{
                id: Sampleid
            }
        });
    },
};