// SETUP
// ====================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


// EXPRESS
// ====================================================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();


// MONGOOSE
// ====================================================
mongoose.connect('mongodb://localhost:27017/Nutrition');


// ROUTES
// ====================================================
router.get('/', function (req, res) {
	res.json({message: "Yay, it worked!"});
});
var recipe = require('./app/routes/recipe')(router);
var food = require('./app/routes/food')(router);



// START
// ====================================================
app.use('/api', router);

app.listen(port);
console.log("Running using port " + port);