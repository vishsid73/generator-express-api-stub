/**
 * The Index of Routes
 */

var hello_rctrl = require('./route_controllers/hello.rc');


module.exports = function (app) {

  app.get('/', hello_rctrl.hello);
  app.get('/logs', hello_rctrl.getLogs);

}
