//Javascript server
//POST http://52.26.250.151/api/addName
//	Parameter: Name
//	Body: Json
//POST http://52.26.250.151/api/deleteAll
//GET http://52.26.250.151/api/getAllNames

//required packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://Tony:DengIt@ds139847.mlab.com:39847/joma_test');
var Name = require('./app/models/name');

//letting app use bodyParser() defined above
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

//routing for API
var router = express.Router(); //instance of express router, whatever that means

//middleware (a server-side message that indicates API is in use) 
router.use(function(req, res, next) {
	console.log("Something is using the API");
	next(); //makes sure that other routes are done too
})

//test route to ensure server is running
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to the api!'})
});

// further routes here
router.route('/addName') // creating a Name here
	.post(function(req,res) {
		var name = new Name(); // creating a new Name
		name.name = req.body.parameter; //hopefully the parameter 

		name.save(function(err) { // error checking while saving a name
			if (err)
				res.send(err);

			res.json({message: 'Name created!'});
		});
	});

// registering routes in the file i.e. turning on a url to use as api-specific
app.use('/api', router);

//starting server
app.listen(port);
console.log('Magic happens on port ' + port);