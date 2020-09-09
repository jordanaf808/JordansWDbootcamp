const express = require('express')
const app = express()
const port = 3000
const axios = require('axios').default;

app.set("view engine", "ejs");

app.get('/', (req, res) => {
		res.render("search");
	});

app.get('/results', (req, res) => {
	const query = req.query.search;
	const url = 'http://www.omdbapi.com/?s=' + query + '&apikey=thewdb'
	axios.get(url)
    .then(resp => {
		//instead of returning the data with 'send', render the data with ejs.
		//res.send(resp.data.Search.Title)
		const data = resp.data
		res.render("results", {data: data});
    })
    .catch(err => {
        // Handle Error Here
        console.error(err);
		})
});
	


app.listen(port, () => console.log(`Movie App Listening At: http://localhost:${port}`))
