/**
 * Created by siddharthsrivastava on 12/07/17.
 */
var config    = require('config');
var hub = require('hub');
var emitter = hub.emitter;
var event = 'server_started';

var log_listener = require('./log.listener');


console.log('event listeners initiated');
emitter.addListener(event, log_listener.fetch_log_listener);
