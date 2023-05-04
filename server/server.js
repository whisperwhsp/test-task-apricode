const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/login', (req, res, next) => {
  const reguestLoginData = req.body;
  const user = router.db.getState().login;
  if (reguestLoginData.login === user.login && reguestLoginData.password === user.password) {
    res.jsonp({
      success: true
    })
  } else {
    res.status(401).json('Неправильно введен логин или пароль');
  }
});

server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running')
});