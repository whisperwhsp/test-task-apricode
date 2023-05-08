const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, '../build')
});

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(jsonServer.rewriter({
  "/api/todo-list/all": "/api/todo-list",
  "/api/todo-list/done": "/api/todo-list?completed_like=true",
  "/api/todo-list/undone": "/api/todo-list?completed_like=false"
}))

server.post('/api/login', (req, res, next) => {
  console.log('asdasdsadasdasdasdasdsa')
  const requestLoginData = req.body;
  const user = router.db.getState().login;
  if (requestLoginData.login === user.login && requestLoginData.password === user.password) {
    res.jsonp({
      success: true
    })
  } else {
    res.status(401).json('Incorrectly entered login or password');
  }
});
server.get('/api/todo-list', (req, res, next) => {
  req.query.removed_like = false;
  console.log(req.query);
  next();
  // res.status(200).json()
})
server.post('/api/todo-list', (req, res, next) => {
  if (!req.body) {
    next();
  }
  if (!req.body.removed) {
    req.body.removed = false
    next();
  } else {
    next();
  }
})

server.put('/api/todo-list', (req, res, next) => {
  next();
})

server.use('/api', router);
server.listen(3001, () => {
  console.log('JSON Server is running')
});