const express 			= require("express"),
	  app 		 		= express(),
	  bodyParser		= require("body-parser"),
	  methodOverride 	= require("method-override"),
	  expressSanitizer  = require("express-sanitizer"),
	  mongoose 	 		= require("mongoose"),
	  axios 	 		= require("axios"),
	  port		 		= 3000;

//App Config
mongoose.connect("mongodb://localhost:27017/restful_blog_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

//Mongoose/Model configuration
const blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

const Blog = mongoose.model("Blog", blogSchema);

//RESTful Routes

//INDEX Route
app.get("/", (req, res) => {
	res.redirect("/blogs");
})


app.get("/blogs", (req, res) => {
	Blog.find({}, (err, blogs) => {
		if(err){
			console.log("error");
		} else {
			res.render("index", {blogs: blogs});
		}
	});
});

// NEW Route
app.get("/blogs/new", (req, res) => {
	res.render("new");
});

app.post("/blogs", (req, res) => {
	//create blogs
	req.body.blog.body = req.sanitize(req.body.blog.body)
	console.log(req.body);
	Blog.create(req.body.blog, (err, newBlog) =>{
		if(err){
			res.render("new");
		} else {
			//then redirect to index
			res.redirect("/blogs");
		}
		});		
});

//SHOW Route
app.get("/blogs/:id", (req, res) =>{
	Blog.findById(req.params.id, (err, foundBlog) =>{
		if(err){
			res.redirect("/blogs");
		} else {
			res.render("show", {blog: foundBlog});
		}
	})
});

app.get("/blogs/:id/edit", (req, res) =>{
	Blog.findById(req.params.id, (err, foundBlog) =>{
		if(err){
			res.redirect("/blogs");
		} else {
			res.render("edit", {blog: foundBlog});
		}
	})
});

//UPDATE Route
app.put("/blogs/:id", (req,res) =>{
	req.body.blog.body = req.sanitize(req.body.blog.body)
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog)=>{
			if(err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs/" + req.params.id);
		}
	});	
});

//DELETE Route
app.delete("/blogs/:id", (req, res)=>{
	//destroy blog
	Blog.findByIdAndRemove(req.params.id, (err)=>{
		if(err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs");
		}
	});
});

app.listen(port, () => console.log(`RESTful_Blog listening at ${port}`))
