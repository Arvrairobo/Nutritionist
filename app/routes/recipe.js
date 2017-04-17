var RecipeModel = require('../models/recipe');

var Recipe = function (router) {
	router.route('/recipe')
		.post(function(req, res) {
			var recipe = new RecipeModel();
			recipe.name = req.body.name;
			
			recipe.save(function(err) {
				if (err) res.send(err);
				
				res.json({ message: 'Recipe created!' });
			});
		})
		.get(function(req, res) {
			RecipeModel.find(function(err, recipes) {
				if (err) res.send(err);

				res.json(recipes);
			});
		});
		
	router.route('/recipe/:recipe_id')
		.get(function(req, res) {
			RecipeModel.findById(req.params.recipe_id, function(err, recipe) {
				if (err) res.send(err);
				
				res.json(recipe);
			});
		})
		.put(function(req, res) {
			RecipeModel.findById(req.params.recipe_id, function(err, recipe) {
				if (err) res.send(err);
				
				recipe.name = req.body.name || recipe.name;
				recipe.url = req.body.url || recipe.url;
				recipe.time = req.body.time || recipe.time;
				recipe.servings = req.body.servings || recipe.servings;
				recipe.difficultyRating = req.body.difficultyRating || recipe.difficultyRating;
				recipe.ingreedientSections = req.body.ingreedientSections || recipe.ingreedientSections;
				recipe.ingredients = req.body.ingredients || recipe.ingredients;
				recipe.directions = req.body.directions || recipe.directions;
				recipe.notes = req.body.notes || recipe.notes;
			
				recipe.save(function(err) {
					if (err) res.send(err);
					
					res.json({ message: 'Recipe updated!' });
				});
			});
		})
		.delete(function(req, res) {
			RecipeModel.remove({
				_id: req.params.recipe_id
			}, function(err, recipe) {
				if (err) res.send(err);

				res.json({ message: 'Successfully deleted' });
			});
		});
}

module.exports = Recipe;