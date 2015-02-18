var mongoose = require('mongoose');

var schema = mongoose.Schema({
	companyName: {type: String, require: true},
	title: {type: String, require: true},
	yourReview: {type: String, require: true},
	stars: {type: Number, enum:[1, 2, 3, 4, 5]},
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true }
});

module.exports = mongoose.model('review', schema);