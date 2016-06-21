const express = require('express');
const logger = require('winston');

const client = require('./route/client');

var devApp = null;
var devRouter = null;

function getApp () {
  logger.info('Initializing dev app ...');
  devApp = express();
  devRouter = express.Router();

  // Register all routes
  client.registerRoute(devRouter);

  devApp.use('/v1', devRouter);
  return devApp;
}

module.exports.getApp = getApp;
