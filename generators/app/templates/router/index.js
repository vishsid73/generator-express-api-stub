/**
 * The Index of Routes
 */

module.exports = function (app) {

  // The signup route
  app.use('/api/v1', require('./routes/apiv1'));

}
