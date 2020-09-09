var express = require("express");
var app = express();

// "/" => "Hi there Jordan Foster!"
app.get("/", function(req, res){
	res.send("Welcome to the Express App Routing Exercise!");
});

app.get("/speak/:animal", function(req, res){
	var sounds = {
		pig: "Oink!",
		cow: "Mooo!",
		dog: "Woof!",
		cat: "I hate humans",
		goldfish: "..."
	};
	var animal = req.params.animal.toLowerCase();
	var sound = sounds[animal];
	res.send("The " + animal + " goes '" + sound + "'");
});

app.get("/repeat/:message/:times", function(req, res){
	var message = req.params.message;
	var times = Number(req.params.times);
	var result = "";
	
	for(var i = 0; i < times; i++){
		result += message + " ";
	}	
	res.send(result);
});


app.get("*", function(req, res){
	res.send("Sorry Page Not Found, What Are You Doing?");
});

app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});