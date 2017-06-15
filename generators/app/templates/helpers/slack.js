/**
 * Created by siddharthsrivastava on 11/10/16.
 */

var _ = require("underscore");
var Q = require('q');
var async = require('async');
var moment = require('moment');
var request = require('request');

var Status = require('../constants/status');

var models  = require('../models');
var express = require('express');

var config    = require('config');  // we use node-config to handle environments
var slackConf = config.get('Lexstart.slack');

module.exports = {
    toSlackJson: function(data){
        var text;
        _.each(data, function(value, key, list){
            var type = Object.prototype.toString.call(data[key]).slice(8, -1);
            if(type === 'Object'){
                //text ? text += "*"+key+":* \n" : text = "*"+key+":* \n";
                _.each(data[key], function(valueInner, keyInner, listInner){
                    text ? text += "*"+keyInner+":* " + valueInner + " \n" : text = "*"+keyInner+":* " + valueInner + " \n";
                });
            }
            else if(key.indexOf('_id') !== -1){
                return;
            }
            else{
                text ? text += "*"+key+":* " + value + " \n" : text = "*"+key+":* " + value + " \n";
            }

        });
        return text;
    },
    sendToSlack: function(heading, data, username, channel){
        var text = module.exports.toSlackJson(data);
        var slackText = {
            "text": heading + ": ",
            "attachments": [
                {
                    "text": text,
                    "mrkdwn_in": ["text", "pretext"]
                }
            ]
        };
        request.post({url: slackConf.url, json: slackText}, function(err,response,body){
            if (!err && response.statusCode == 200) {
                //console.log(JSON.parse(body));
            }
        });
        return null;
    },
};