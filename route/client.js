const clientModel = require('sharemyscreen-common').clientModel;
const httpCommon = require('sharemyscreen-http-common');

function registerRoute (router) {
  router.get('/clients', getClients);

  router.post('/client', postClient);
}

function getClients (req, res, next) {
  clientModel.getAll(function (err, fClients) {
    if (err) {
      next(err);
    } else {
      fClients.forEach(function (client, i) {
        fClients[i] = client.safePrint();
      });
      httpCommon.utils.sendReply(res, 200, fClients);
    }
  });
}

function postClient (req, res, next) {
  if (req.body.name == null) {
    httpCommon.utils.sendReply(res, httpCommon.error.invalidRequestError());
  } else {
    clientModel.getByName(req.body.name, function (err, fClient) {
      if (err) {
        next(err);
      } else if (fClient != null) {
        httpCommon.utils.sendReply(res, httpCommon.error.clientExist());
      } else {
        clientModel.createNew(req.body.name, function (err, cClient) {
          if (err) {
            next(err);
          } else {
            httpCommon.utils.sendReply(res, 201, cClient.safePrint());
          }
        });
      }
    });
  }
}

module.exports.registerRoute = registerRoute;
