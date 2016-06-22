const clientModel = require('sharemyscreen-common').clientModel;

function registerRoute (router) {
  router.get('/clients', getClients);

  router.post('/client', postClient);
}

function getClients (req, res, next) {
  clientModel.getAll(function (err, fClients) {
    if (err) {
      next(err);
    } else {
      res.status(200).json(fClients);
    }
  });
}

function postClient (req, res, next) {
  if (req.body.name == null) {
    next();
  } else {
    clientModel.createNew(req.body.name, function (err, cClient) {
      if (err) {
        next(err);
      } else {
        res.status(201).json(cClient);
      }
    });
  }
}

module.exports.registerRoute = registerRoute;
