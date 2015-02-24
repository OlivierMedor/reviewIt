var mongoose = require('mongoose');

var schema = mongoose.Schema({
	companyName: {type: String, require: true},
	address: {type: String, require:true},
	title: {type: String, require: true, index: true},
	yourReview: {type: String, require: true},
	stars: Number,
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true }
});

module.exports = mongoose.model('review', schema);