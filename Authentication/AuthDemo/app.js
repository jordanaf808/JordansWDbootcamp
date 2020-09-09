const express 				= require("express"),
	  mongoose 				= require("mongoose"),
	  passport				= require("passport"),
	  bodyParser 			= require("body-parser"),
	  User					= require("./models/user"),
	  LocalStrategy 		= require("passport-local"),
	  passportLocalMongoose = require("passport-local-mongoose"),
	  app 					= express(),
	  PORT 					= 3000;

mongoose.connect("mongodb://localhost:27017/auth_demo_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

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

//=====================================
//ROUTES
//=====================================

app.get("/", (req, res)=>{
	res.render("home");
});

//middleware: 'isLoggedIn' will check if logged in, if so then continue running res.render...
app.get("/secret", isLoggedIn, (req,res)=>{
	res.render("secret");
});

//AUTH ROUTES==========================
//show sign up form.
app.get("/register",(req,res)=>{
	res.render("register");
});

//handle user sign up

app.post("/register",(req,res)=>{
	req.body.username
	req.body.password
	User.register(new User({username: req.body.username}), req.body.password,(err,user)=>{
		if(err){
			console.log(err);
			return res.render('register');
		} 
		passport.authenticate("local")(req,res, ()=>{
			res.redirect("/secret");
		});
	});
});

//LOGIN ROUTES
//render login forms
app.get("/login",(req,res)=>{
	res.render("login");
});
//login logic
//middleware - sits between the beginning and end of your route.
app.post("/login", passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/login"
}) ,(req,res)=>{
	
});

app.get("/logout",(req,res)=>{
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
	console.log("breach attempt")
}

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));