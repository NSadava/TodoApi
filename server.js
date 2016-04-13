var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

var arrData = [{
	id: 1,
	description: "Testing Api",
	completed: false,
},{
	id: 2,
	description: "Testing Api in postman",
	completed: false,
}];

app.get("/", function(req,res){
	res.send("Welcome to todo api");
});


app.get("/todos",function(req, res){
	res.json(arrData);
});

app.get("/todos/:id",function(req, res){
	var matchedObj;	
	var todoId = req.params.id;

	arrData.forEach(function(obj){
		if(obj.id == todoId){
			matchedObj = obj;
		}
	});

	if(matchedObj){
		res.json(matchedObj);
	} else {
		res.status(404).send("Record not found");
	}

});



app.listen(PORT);

console.log("Server started on port == " + PORT);