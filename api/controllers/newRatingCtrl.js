var rating = require('./../models/newRating');

module.exports = {
	list: function(req, res) {
		rating.find({ user: req.user._id }).exec().then(function(reviews) {
			return res.json(reviews);
			
		});
	},
	create: function(req, res) {
		var newRating = new rating(req.body);
		newRating.user = req.user._id;
		newRating.save(function(err, review) {
			if (err) {
				return res.status(500).end();
			}
			return res.json(review);
		});
	},
	 erase: function(req, res) {
		rating.remove({ _id: req.params.id }).exec(function(err) {
			return res.status(200).end();
		});

	},
	show: function(req, res) {
		rating.find().exec().then(function(reviews) {
			return res.json(reviews);
		});
	},
	
};