var express = require('express');
var app = express();

var PORT = process.env.PORT || 3000;

app.get("/", function(req,res){
	res.send("Welcome to todo api");
});

app.listen(PORT);

console.log("Server started on port == " + PORT);