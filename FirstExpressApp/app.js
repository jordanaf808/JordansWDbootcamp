var express = require("express");
var app = express();

// "/" => "Hi there Jordan Foster!"
app.get("/", function(req, res){
	res.send("Hi there Jordan!");
});

app.get("/bye", function(req, res){
	res.send("Goodbye!");
});

app.get("/dog", function(req, res){
	console.log("someone made a request")
	res.send("Meow!");
});

app.get("/r/:subredditName", function(req, res){
	console.log(req.params);
	var subreddit = req.params.subredditName;
	res.send("welcome to the " + subreddit.toUpperCase() + " subreddit.");
});

app.get("*", function(req, res){
	res.send("Everyone Is A Star!");
});

app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});