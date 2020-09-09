
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo_2", {
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

const userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post"
		}
	]
});

const User = mongoose.model("User", userSchema);

// User.create({
// 	email: "bob@gmail.com",
// 	name: "Bob Belcher"
// });

// Post.create({
// 	title: "How to cook rice part 3",
// 	content: "blah blah blah"
// }, (err, post)=>{
// 		User.findOne({email: "bob@gmail.com"}, (err, foundUser)=>{
// 			if(err){
// 				console.log(err);
// 			} else {
// 				foundUser.posts.push(post);
// 				foundUser.save((err, data)=>{
// 					if(err){
// 						console.log(err);
// 					} else {
// 						console.log(data);
// 						}
// 					});
// 				}
// 		});
// });

//Find user 
//find all posts for that user. 

User.findOne({email: "bob@gmail.com"}).populate("posts").exec((err, user)=>{
	if(err){
		console.log(err);
	} else {
		console.log(user);
	}
});