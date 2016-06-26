const clientModel = require('sharemyscreen-common').clientModel;
const httpHelper = require('sharemyscreen-http-helper');

function registerRoute (router) {
  router.get('/clients', getClients);

  router.post('/clients', postClient);
}

function getClients (req, res, next) {
  clientModel.getAll(function (err, fClients) {
    if (err) {
      next(err);
    } else {
      fClients.forEach(function (client, i) {
        fClients[i] = client.safePrint();
      });
      httpHelper.sendReply(res, 200, fClients);
    }
  });
}

function postClient (req, res, next) {
  if (req.body.name == null) {
    httpHelper.sendReply(res, httpHelper.error.invalidRequestError());
  } else {
    clientModel.getByName(req.body.name, function (err, fClient) {
      if (err) {
        next(err);
      } else if (fClient != null) {
        httpHelper.sendReply(res, httpHelper.error.clientExist());
      } else {
        clientModel.createNew(req.body.name, function (err, cClient) {
          if (err) {
            next(err);
          } else {
            httpHelper.sendReply(res, 201, cClient.safePrint());
          }
        });
      }
    });
  }
}

module.exports.registerRoute = registerRoute;
