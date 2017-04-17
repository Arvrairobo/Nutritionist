var FoodModel = require('../models/food');

var Food = function (router) {
	router.route('/food')
		.post(function(req, res) {
			FoodModel.findOne({ 'name.last': 'Ghost' }, function(err, food) {
				if (err) res.send(err);
				else if (food) res.send({status: 500, message: "Food with that foodId exists."});

				var food = new FoodModel();

				food.name = req.body.name;
				food.foodId = req.body.foodId || req.body.name.replace(' ', '_');
				food.cost = req.body.cost;
				food.commonality = req.body.commonality;
				food.measurements = req.body.measurements;
				food.allergies = req.body.allergies;
				food.tags = req.body.tags;
				
				food.save(function(err) {
					if (err) res.send(err);
					
					res.json({ message: 'Food created!' });
				});
			});
		})
		.get(function(req, res) {
			FoodModel.find(function(err, foods) {
				if (err) res.send(err);

				res.json(foods);
			});
		});
		
	router.route('/food/:food_id')
		.get(function(req, res) {
			FoodModel.findById(req.params.food_id, function(err, food) {
				if (err) res.send(err);
				
				res.json(food);
			});
		})
		.put(function(req, res) {
			FoodModel.findById(req.params.food_id, function(err, food) {
				if (err) res.send(err);
				
				food.name = req.body.name || food.name;
				food.cost = req.body.cost || food.cost;
				food.commonality = req.body.commonality || food.commonality;
				food.measurements = req.body.measurements || food.measurements;
				food.allergies = req.body.allergies || food.allergies;
				food.tags = req.body.tags || food.tags;
			
				food.save(function(err) {
					if (err) res.send(err);
					
					res.json({ message: 'Food updated!' });
				});
			});
		})
		.delete(function(req, res) {
			FoodModel.remove({
				_id: req.params.food_id
			}, function(err, food) {
				if (err) res.send(err);

				res.json({ message: 'Successfully deleted' });
			});
		});
}

module.exports = Food;