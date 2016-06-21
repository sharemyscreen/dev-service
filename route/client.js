const clientModel = require('sharemyscreen-common').Client;

function registerRoute (router) {
  router.get('/client', getClients);
}

function getClients (req, res, next) {
  clientModel.find(function (err, clients) {
    console.log(clients);
    res.status(200).json(clients);
  });
}

module.exports.registerRoute = registerRoute;
