var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

var _ = require("underscore");

var nextId = 1;

var bodyParser = require('body-parser')

app.use(bodyParser.json());


var arrData = [];

app.get("/", function(req,res){
	res.send("Welcome to todo api");
});


app.get("/todos",function(req, res){
	res.json(arrData);
});

app.get("/todos/:id",function(req, res){
		
	var todoId = req.params.id;


	var matchedObj = _.findWhere(arrData,{id : todoId});
	// arrData.forEach(function(obj){
	// 	if(obj.id == todoId){
	// 		matchedObj = obj;
	// 	}
	// });

	if(matchedObj){
		res.json(matchedObj);
	} else {
		res.status(404).send("Record not found");
	}

});

/*
	POST METHODS
*/

app.post("/todos",function(req, res){
	var body = req.body;
	body.id = nextId;
	arrData.push(body);
	nextId++;

	res.json(body);
});


app.listen(PORT);

console.log("Server started on port == " + PORT);