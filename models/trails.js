const mongoose = require('mongoose');


const trailSchema = new mongoose.Schema({
	// name: {type: String, required: true},
	// location: {type: String, required: true},
	// distance: Number,
	// level: {type: String, required: true}
	name: String,
	trailId: String
});

module.exports = mongoose.model('Trail', trailSchema);