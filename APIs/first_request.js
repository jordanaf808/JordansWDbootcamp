const express = require('express')
const app = express()
const port = 3000
const axios = require('axios').default;

//the OG way of doing it...
//var request = require('request');

// console.log("Sunset in Hawaii is at...");
// request('https://jsonplaceholder.typicode.com/users/5', function(error, response, body){
//     if(!error && response.statusCode == 200){
//         var parsedData = JSON.parse(body);
//         console.log(parsedData["query"]["results"]["channel"]["astronomy"]["sunset"]);
//     }
// });


app.get('/', (req, res) => res.send('Hello World!'))

axios.get('https://jsonplaceholder.typicode.com/users/5')
  .then(function (response) {
    // handle success
    console.log(response.data.email)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

axios.post('https://jsonplaceholder.typicode.com/users', {
    firstName: 'Fred',
    lastName: 'Flintstone',
	email: 'fred@flintstone.com'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

axios.get('https://jsonplaceholder.typicode.com/users/')
  .then(function (response) {
    // handle success
    console.log(response.data)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

app.listen(port, () => console.log(`Example app listening at ${port}`))

