var mongoose = require('mongoose');

var schema = mongoose.Schema({
	companyName: {type: String, require: true, index: true},
	address: {type: String, require:true},
	title: {type: String, require: true, index: true, Unique: true},
	yourReview: {type: String, require: true, unique: true},
	stars: {type:Number, default: 0},
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true }
});

module.exports = mongoose.model('review', schema);