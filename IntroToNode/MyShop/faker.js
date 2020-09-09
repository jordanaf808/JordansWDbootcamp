var faker = require('faker')
console.log("My Shop Price List:")
for(var i = 0; i < 9; i++){
	console.log(faker.commerce.product() + " - $" + faker.commerce.price());
}