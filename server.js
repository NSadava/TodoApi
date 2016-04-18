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


/*
	GET /todos?compelted=false
*/
app.get("/todos",function(req, res){
	
	var queryParams = req.query;

	var arrFilteredData = arrData;

	if(queryParams.hasOwnProperty("completed") && queryParams.completed === "true"){
		arrFilteredData = _.where(arrFilteredData, {completed : true});
	} else if(queryParams.hasOwnProperty("completed") && queryParams.completed === "false"){
		arrFilteredData = _.where(arrFilteredData, {completed : false});
	} 

	if(queryParams.hasOwnProperty("q") && queryParams.q.length > 0){
		arrFilteredData = _.filter(arrFilteredData, function(obj){
			return obj.description.indexOf(queryParams.q) > -1;
		})
	}

	res.json(arrFilteredData);
});

app.get("/todos/:id",function(req, res){
		
	var todoId = parseInt(req.params.id);
	var matchedObj = _.findWhere(arrData,{id : todoId});

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
	
	var body = _.pick(req.body,"description","completed");

	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length == 0){
		return res.status(400).send();
	}

	

	body.description = body.description.trim();

	body.id = nextId;
	arrData.push(body);
	nextId++;

	res.json(body);
});

/*
	DELETE
*/

app.delete("/todos/:id", function(req, res){
	var todoId = parseInt(req.params.id);
	var matchedObj = _.findWhere(arrData,{id : todoId});

	if(matchedObj){
		arrData = _.without(arrData, matchedObj);
		res.send("Record Deleted successfully..!!");
	} else {
		res.status(404).send("ERROR : Record not found..!!");
	}

});

/*
	UPDATE
*/

app.put("/todos/:id", function(req, res){
	var todoId = parseInt(req.params.id);
	var matchedObj = _.findWhere(arrData,{id : todoId});
	var body = _.pick(req.body,"description","completed");

	var newObj = {};

	if(matchedObj){
		if(body.hasOwnProperty("completed") && _.isBoolean(body.completed)){
			newObj.completed = body.completed;
		} else if(body.hasOwnProperty("completed")){
			return res.status(400).send("Invalid compelted value..!!");
		}

		if(body.hasOwnProperty("description") && _.isBoolean(body.description)){
			newObj.description = body.description;
		} else if(body.hasOwnProperty("description")){
			return res.status(400).send("Invalid description value..!!");
		}

		_.extend(matchedObj, newObj);

		res.json(matchedObj);

	} else {
		res.status(404).send("ERROR : Record not found..!!");
	}
});

app.listen(PORT);

console.log("Server started on port == " + PORT);