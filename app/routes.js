var mongoose = require('mongoose');
var cloudinary = require('cloudinary');
var User = require("./models/user.js");

module.exports = function(app, passport) {

  // HOME PAGE
  app.get('/', isLoggedInHOMEPAGE, function(req, res) {
    req.session.lastAccess = new Date().getTime();

    res.render('index.ejs', {
      username: req.user.user.username,
      infos: req.user.infos
    });
  });

  // LOGIN
  app.get('/login', isNotLoggedIn, function(req, res) {
    res.render('login.ejs', {
      message: req.flash('loginMessage')
    });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));

  // SIGNUP
  app.get('/signup', isNotLoggedIn, function(req, res) {
    res.render('signup.ejs', {
      message: req.flash('signupMessage')
    });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  // LOGOUT
  app.get('/logout', isLoggedIn, function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // SAVE
  app.post('/save', isLoggedIn, function(req, res) {
    save(req, res);
  });

  // UPLOAD
  app.post('/upload', isLoggedIn, function(req, res) {
    upload(req, res);
  });
};

function isLoggedInHOMEPAGE(req, res, next) {
  if (req.isAuthenticated())
    return next();

  return res.redirect('/login');
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}

function isNotLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/');
  }

  return next();
}

function save(req, res) {
  User.findOne({
    'user.username': req.user.user.username
  }, function(err, userDoc) {
    if (userDoc) {
      for (var prop in req.body) {
          userDoc.infos[prop] = req.body[prop];
      }

      userDoc.save();
    }
  });
}

function upload(req, res) {
  cloudinary.v2.uploader.upload(req.body.uri, {
      public_id: req.user.user.username + "/" + req.body.id
    },
    function(error, result) {
      if (!error) {
        return res.send({
          imgUrl: result.secure_url
        });
      }
    });
}
