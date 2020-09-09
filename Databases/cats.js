const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cat_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

//create a new 'schema' that defines what info each new item will have.
const catSchema = new mongoose.Schema({
  name: String,
	age: Number,
	temperament: String
});

//Have a new cat speak when added to the catSchema?
// NOTE: methods must be added to the schema before compiling it with mongoose.model()
catSchema.methods.speak = function () {
  const greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}

//create a 'model'(a database) called 'Cat' that will hold new 
//bits of information called 'documents' that follow the
//'Cat' schema.

const Cat = mongoose.model("Cat", catSchema);

//create a new 'document' for the cat called 'silence'.
//we reused the variable silence to insert a new cat "Mrs. Norris"
// const silence = new Cat ({ 
// 	name: 'Mrs. Norris', 
// 	age: 7, 
// 	temperament: "Evil" 
// });
//You must now save the document for 'Silence' in the MongoDb
// 
// silence.save(function (err, silence) {
//     if (err) return console.error(err);
// 	//call the speak function we created.
//     silence.speak();
//   });
//This creates a new document and saves it to a database in one thingy
Cat.create({ 
	name: 'Snow White',
	age: 15,
	temperament: "agreeable"
	},
	(err, cat) => {
    if (err) return handleError(err);
});

//
//Retrieve all cats in the Cat database
Cat.find(function (err, Cats) {
  if (err) return console.error(err);
  console.log(Cats);
})
// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));
