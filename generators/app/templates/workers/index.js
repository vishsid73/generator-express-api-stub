/**
 * Created by siddharthsrivastava on 12/07/17.
 */
var config    = require('config');
var hub = require('hub');
var emitter = hub.emitter;
var event = 'server_started';

var response_listener = require('./response.listener');
var log_listener = require('./log.listener');


console.log('event listeners initiated');
emitter.addListener(event, response_listener.send_response_listener);
emitter.addListener(event, log_listener.fetch_log_listener);
