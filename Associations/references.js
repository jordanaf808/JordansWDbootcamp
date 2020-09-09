
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo_2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

//We created 2 independant models and then associated them together 
//by putting the 'postSchema' into the 'userSchema'
//Now each user can have an array of posts

//Node.js needs to know which directory you are in to find 'post'
// './' tells Node to look in the current directory.
const Post = require("./models/post");

const User = require("./models/user");

Post.create({
	title: "How to cook rice part 3",
	content: "blah blah blah"
}, (err, post)=>{
		User.findOne({email: "bob@gmail.com"}, (err, foundUser)=>{
			if(err){
				console.log(err);
			} else {
				foundUser.posts.push(post);
				foundUser.save((err, data)=>{
					if(err){
						console.log(err);
					} else {
						console.log(data);
						}
					});
				}
		});
});

