const devApp = require('../');
const config = require('config');
const logger = require('winston');
const mongoose = require('mongoose');
const supertest = require('supertest');

const url = 'http://dev.sharemyscreen.local:' + config.get('server.port');
const devSrv = supertest(url);

describe('Testing developper service', function () {
  before(function (done) {
    mongoose.connection.on('error', function (err) {
      logger.error('Unable to connect to the database ...');
      logger.error(err);
      done(err);
    });

    mongoose.connection.on('open', function () {
      logger.info('Connection success !');

      const app = devApp.getApp();
      app.listen(config.get('server.port'), function () {
        done();
      });
    });

    const connectionStr = 'mongodb://' + config.get('dbConfig.host') + ':' +
      config.get('dbConfig.port') + '/' +
      config.get('dbConfig.dbName');
    mongoose.connect(connectionStr);
  });

  it('Should work', function (done) {
    devSrv.get('/v1/client')
      .expect(200)
      .end(done);
  });
});
