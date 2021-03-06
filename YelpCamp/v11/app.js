require('dotenv').config();

const express    	 =  require("express"),
	  app        	 = express(),
	  axios      	 = require("axios").default,
	  bodyParser 	 = require("body-parser"),
	  mongoose   	 = require("mongoose"),
	  passport	 	 = require("passport"),
	  LocalStrategy  = require("passport-local"),
	  methodOverride = require("method-override"),
	  flash			 = require("connect-flash"),
	  numeral		 = require("numeral"),
	  Campground 	 = require("./models/campground"),
	  Comment	 	 = require("./models/comment"),
	  User		 	 = require("./models/user"),
	  seedDB	 	 = require("./seeds"),
	  port       	 = 3000;

//Require Routes.
const commentsRoutes 	= require("./routes/comments"),
	  campgroundRoutes 	= require("./routes/campgrounds"),
	  indexRoutes 		= require("./routes/index");

mongoose.connect("mongodb://localhost:27017/yelp_camp_v11", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
console.log(__dirname);
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

//seed the DB
seedDB(); 

//PASSPORT configuration
app.use(require("express-session")({
	secret: "123456",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Adds the 'currentUser' info to the 'req'uest in the '.user' object.
// every 'app.'... request will append this, like a middleware.
app.use((req, res, next)=>{
	res.locals.currentUser 	= req.user;
	res.locals.error 		= req.flash("error");
	res.locals.success 		= req.flash("success");
	next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(port, () => console.log(`YelpCamp listening at ${port}`))
