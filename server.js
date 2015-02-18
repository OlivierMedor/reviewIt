var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var port = 9001;
var app = express();
var User = require('./api/models/user');


app.use(bodyParser.json());
app.use(session({
	secret: 'topsecretCode1234'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname+'/public'));
mongoose.connect('mongodb://localhost/rateit', function(){
	console.log('connected to mongodb');
});

app.listen(port, function(){
	console.log('listening on port ' + port);
})
// passport.use();
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      user.validPassword(password).then(function(res) {
			if (res) {
				return done(null, user);
			}
		}, function(err){
			if(err){
				return done(null, false);
			}
		});
    });
  }
));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

var isAuthed = function(req, res, next){
	if(!req.isAuthenticated()) {
		return res.status(403).end();
	}
	return next();
}

app.post('/api/auth', passport.authenticate('local'), function(req, res){
	return res.status(200).end();
})
app.post('/api/register', function(req, res) {
	console.log(req.body);
	var newUser = new User(req.body);
	newUser.save(function(err, user) {
		if (err) {
			return res.status(500).end();
		}
		return res.json(user);
	});
});