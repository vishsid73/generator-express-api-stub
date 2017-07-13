/**
 * Created by siddharthsrivastava on 12/07/17.
 */

var _ = require("underscore");
var Q = require('q');
var async = require('async');
var moment = require('moment');
var config = require('config');
var hub = require('hub');
var exchange = config.get('rabbit.exchange');

var express = require('express');

module.exports = {
    subscribe: function(key){
        var rcon = hub.rCon;
        var channel, queue;

        return rcon.createChannel()
            .then(function(ch) {
                channel = ch;
                return channel.assertExchange(exchange, 'topic', {durable: false});
            })
            .then(function(exchangeCreated){
                return channel.assertQueue(key + '_queue')
            })
            .then(function(queueCreated){
                queue = queueCreated;
                return channel.bindQueue(queue.queue, exchange, key);
            })
            .then(function(ok) {
                return {
                    channel: channel,
                    queue: queue
                }
            })
            .catch(function(error){
                console.log(error.message);
            });
    },
    publish: function(key, message){
        var rcon = hub.rCon;
        var channel, queue;

        return rcon.createChannel()
            .then(function(ch) {
                channel = ch;
                return channel.assertExchange(exchange, 'topic', {durable: false});
            })
            .then(function(ok) {
                return channel.publish(exchange, key,  message, {persistent: true});
            })
            .catch(function(error){
                console.log(error.message);
            });
    },
};