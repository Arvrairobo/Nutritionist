var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FoodSchema = new Schema({
	name: String,
	foodId: String,
	cost: {
		price: Number,
		unit: String
	},
	commonalityFactor: Number,
	measurements: {
		calories: {
			gram: Number,
			teaspoon: Number,
			whole: Number
		},
		protein: {
			gram: Number,
			teaspoon: Number,
			whole: Number
		},
		carbs: {
			gram: Number,
			teaspoon: Number,
			whole: Number
		},
		fat: {
			gram: Number,
			teaspoon: Number,
			whole: Number
		}
	},
	allergies: [String],
	tags: [String]
});

module.exports = mongoose.model('Food', FoodSchema);