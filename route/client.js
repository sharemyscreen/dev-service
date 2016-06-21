
function registerRoute (router) {
  router.get('/client', getClients);
}

function getClients (req, res, next) {
  res.send('ok');
}

module.exports.registerRoute = registerRoute;
