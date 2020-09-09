
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/restful_blog_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

//We created 2 independant mondels and then associated them together 
//by putting the 'postSchema' into the 'userSchema'
//Now each user can have an array of posts

//POST - title, content
const postSchema = new mongoose.Schema({
	title: String,
	content: String
});

const Post = mongoose.model("Post", postSchema);

//USER - email, name
const userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema]
});

const User = mongoose.model("User", userSchema);

//Add new 'User'
// const newUser = new User({
//     email: "hermione@hogwarts.edu",
//     name: "Hermione Granger"
// });
//Add new post to user:Hermione
// newUser.posts.push({
//     title: "How to bre polyjuice potion",
//     content: "Just kidding.  Go to potions class to learn it!"
// });

// newUser.save((err, user)=>{
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// });

// const newPost = new Post({
// 	title: "Reflections on Apples",
// 	content: "They are delicious"
// });

// newPost.save((err, post)=>{
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log(post);
// 	}
// });

//Find user and push a new post in, then save post.
// this 'user' refers to the response from the database.
// User.findOne({name: "Hermione Granger"}, (err, user)=>{
// 	if(err){
// 		console.log(err);
// 	} else {
// 		user.posts.push({
// 			title: "3 things I really Hate",
// 			content: " Voldemort, Voldemort, Voldemort"
// 		});
// 		//this 'user' refers to the response from saving the .push 'user'
// 		user.save((err, user)=>{
// 			if(err){
// 				console.log(err);
// 			} else {
// 				console.log(user);
// 			}
// 		});
// 	}
// });

