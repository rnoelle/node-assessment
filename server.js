var express = require('express');
var bodyParser = require('body-parser');
var users = require('./users.json');
var mainCtrl = require('./controller')

var app = module.exports = express();
var port = 3000;

app.use(bodyParser.json());

app.get('/api/users', mainCtrl.getUsers);
app.get('/api/users/:id', function (req, res, next) {
  if (Number(req.params.id)) {
    mainCtrl.getUserById(req, res, next);
  } else {
    console.log('went');
    mainCtrl.getUsersByClass(req, res, next);
  }
});

app.post('/api/users/:id', mainCtrl.createUserByClass);
app.post('/api/users', mainCtrl.createUser);
app.post('/api/users/language/:id', mainCtrl.updateLanguage);
app.post('/api/users/forums/:id', mainCtrl.addToFavorites);

app.put('/api/users/:id', mainCtrl.updateUserById);

app.delete('/api/users/forums/:id', mainCtrl.removeFromFavorites);
app.delete('/api/users/:id', mainCtrl.deleteUser);

app.listen(port, function () {
  console.log('listening on', port);
});
