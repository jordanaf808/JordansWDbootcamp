const express = require('express');
const path = require('path')
//call external functions >>>
const logger = require('./middleware/logger');
const members = require('./Members');

const app = express();

//save this to an external file for cleaner code
// const logger = (req, res, next) => {
// 	console.log(
// 		`${req.protocol}://${req.get('host')}${
// 		req.originalUrl
// 		}: ${moment().format()}`
// 	);
// 	next();
// };

//init middleware
app.use(logger);

//you don't need curly braces with arrow function
// app.get('/api/members', (req, res) => {
// 	res.json(members);
// });
app.get('/api/members', (req, res) => res.json(members));

//Get A Single Members
//colon(:) is a url parameter. use request to grab whats in there
app.get('/api/members/:id', (req, res) => {
	//Check if theres no member with that id
	const found = members.some(member => member.id === parseInt(req.params.id));
	if(found){
	// .some() looks in an array to find if the function "member"
	//is truthy or not. "member" looks in the "members" array to see if 
	//"member.id === req.params.id" is truthy.
	//	If truthy, then find that member('s) and put it in the response.
	res.json(members.filter(member => member.id === parseInt(req.params.id)));
	} else {
		res.status(400).json({ msg: `Member Not Found with id:${req.params.id}`})
	}
});

//set a static folder
//app.use when you want to use 'middleware'
app.use(express.static(path.join(__dirname, 'public')));
const PORT = 3000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));