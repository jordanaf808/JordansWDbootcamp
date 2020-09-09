
const express = require("express"),
 	  Campground = require("../models/campground"),
 	  Comment = require("../models/comment");
const router = express.Router({mergeParams: true});
 

// =======================
// COMMENTS ROUTES
// =======================
// NEW comment
router.get("/new", isLoggedIn, (req, res)=>{
	//find campgound by id
	Campground.findById(req.params.id, (err, campground)=>{
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	})
});
// CREATE comments
router.post("/", (req,res)=>{
	//lookup campground using id
	Campground.findById(req.params.id, (err, campground)=>{
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, (err, comment)=>{
				if(err){
					console.log(err);
				} else {
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					console.log(comment);
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
});

//Middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;