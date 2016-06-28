const path = require('path');
const express = require('express');
const logger = require('winston');
const bodyParser = require('body-parser');
const httpHelper = require('sharemyscreen-http-helper');

const client = require('./route/client');

var devApp = null;
var devRouter = null;

function getApp () {
  logger.info('Initializing dev app ...');
  devApp = express();
  devApp.use(bodyParser.json());

  devRouter = express.Router();

  devApp.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
  });

  // Register all routes
  client.registerRoute(devRouter);

  devApp.use('/v1', devRouter);
  devApp.use('/doc', express.static(path.join(__dirname, '/doc'), {dotfiles: 'allow'}));

  // Error handler
  devApp.use(function (err, req, res, next) {
    logger.error(err);
    httpHelper.sendReply(res, httpHelper.error.internalServerError(err));
  });

  logger.info('Dev app initialized');

  return devApp;
}

module.exports.getApp = getApp;
