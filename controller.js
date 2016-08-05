var app = require('./server');
var users = require('./users.json');


module.exports = {
  getUsers: function (req, res, next) {
    var response = [];
    console.log(req.query);
    if(!req.query.language && !req.query.age && !req.query.city && !req.query.state && !req.query.gender) {
      res.json(users);
      return;
    }
    if (req.query.language) {
      for (var i = 0; i < users.length; i++) {
        if (users[i].language == req.query.language) {
          response.push(users[i]);
        }
      }
    }
    if (req.query.age) {
      for (var i = 0; i < users.length; i++) {
        if (users[i].age == req.query.age) {
          response.push(users[i]);
        }
      }
    }
    if (req.query.city) {
      for (var i = 0; i < users.length; i++) {
        if (users[i].city == req.query.city) {
          response.push(users[i]);
        }
      }
    }
    if (req.query.state) {
      for (var i = 0; i < users.length; i++) {
        if (users[i].state == req.query.state) {
          response.push(users[i]);
        }
      }
    }
    if (req.query.gender) {
      for (var i = 0; i < users.length; i++) {
        if (users[i].gender == req.query.gender) {
          response.push(users[i]);
        }
      }
    } res.json(response);
  },
  getUserById: function (req, res, next) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].id == req.params.id) {
        res.json(users[i]);
        return;
      }
    } res.status(400).send('user not found');
  },
  getUserByLanguage: function (req, res, next) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].language = req.query.language) {
        res.json(users[i]);
        return;
      }
    } res.send('no user found');
  },
  getUsersByClass: function (req, res, next) {
    var response = [];
    for (var i = 0; i < users.length; i++) {
      if (users[i].type == req.params.id) {
        response.push(users[i]);
      }
    } res.json(response);
  },
  getModerators: function (req, res, next) {
    var response = [];
    for (var i = 0; i < users.length; i++) {
      if (users[i].type == 'moderator') {
        response.push(users[i]);
      }
    } res.json(response);
  },
  getAdmins: function (req, res, next) {
    var response = [];
    for (var i = 0; i < users.length; i++) {
      if (users[i].type == 'admin') {
        response.push(users[i]);
      }
    } res.json(response);
  },
  createUser: function (req, res, next) {
    req.body.id = users.length;
    users.push(req.body);
    res.status(200).json(req.body);
  },
  createUserByClass: function (req, res, next) {
    req.body.id = users.length;
    var thisUser = req.body;
    thisUser.type = req.params.id;
    console.log(thisUser);
    users.push(thisUser);
    res.status(200).json(thisUser);
  },
  updateLanguage: function (req, res, next) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].id == req.params.id) {
        users[i].language = req.body.language;
        console.log(users[i]);
        res.status(200).send('language updated');
        return;
      }
    } res.status(400).send('not found');
  },
  addToFavorites: function (req, res, next) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].id == req.params.id) {
        users[i].favorites.push(req.body.add);
        res.status(200).send('forum added');
        return;
      }
    } res.status(400).send('not found')
  },
  updateUserById: function (req, res, next) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].id == req.params.id) {
        for (var prop in req.body) {
          users[i][prop] = req.body[prop];
          console.log(users[i].id);
        } res.status(200).json(users[i]);
        return;
      }
    } res.status(400).send('not found')
  },
  removeFromFavorites: function (req, res, next) {
    console.log(req.query.favorite);
    console.log(req.params.id);

    for (var i = 0; i < users.length; i++) {
      if (users[i].id == req.params.id) {
        console.log('found');
        for (var j = 0; j < users[i].favorites.length; j++) {
          console.log(users[i].favorites);
          if (req.query.favorite == users[i].favorites[j]) {
            users[i].favorites.splice(j, 1);
            res.status(200).json(users[i]);
            return;
          }
        }
      }
    } res.send('not found');
  },
  deleteUser: function (req, res, next) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].id == req.params.id) {
        users.splice(i, 1);
        res.status(200).send('user removed');
      }
    }
  }
};
