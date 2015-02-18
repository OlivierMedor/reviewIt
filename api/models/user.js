var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var q = require('q');

var schema = mongoose.Schema({
	username: {type: String, Unique: true, index: true},
	email: {type: String, unique: true},
	password: String
})
// schema.methods.validPassword = function(pass){
// 	var deferred = q.defer();
// 	if(pass === this.password){
// 		deferred.resolve(true);
// 	}else{
// 		deferred.reject(true);
// 	}
// 	return deferred.promise;
// }

schema.pre('save', function(next){

	var user = this;
	var progress = function(){
		console.log('progress');
	}
	if(!user.isModified('password')){
		return next();
	}
	bcrypt.genSalt(12, function(err, salt){
		if(err){
			return next(err);
		}
		bcrypt.hash(user.password, salt, progress, function(err, hash){
			user.password = hash;
			return next();
		});
	});
});

schema.methods.comparePassword = function(pass){
	var deferred = q.defer();
	bcrypt.compare(pass, this.password, function(err, isMatch){
		if (err){
			deferred.reject(err);
		}
		else {
			deferred.resolve(isMatch);
		}
	})
	return deferred.promise;
};

module.exports = mongoose.model('User', schema);