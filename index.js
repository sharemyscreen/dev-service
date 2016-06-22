const express = require('express');
const logger = require('winston');
const bodyParser = require('body-parser');
const httpCommon = require('sharemyscreen-http-common');

const client = require('./route/client');

var devApp = null;
var devRouter = null;

function getApp () {
  logger.info('Initializing dev app ...');
  devApp = express();
  devApp.use(bodyParser.json());

  devRouter = express.Router();

  // Register all routes
  client.registerRoute(devRouter);

  devApp.use('/v1', devRouter);
  devApp.use('/doc', express.static(__dirname + '/doc', {dotfiles: "allow"}));

  // Error handler
  devApp.use(function (err, req, res, next) {
    logger.error(err);
    httpCommon.utils.sendReply(res, httpCommon.error.internalServerError(err));
  });
  return devApp;
}

module.exports.getApp = getApp;
