
// const { response } = require('express');
require('dotenv').config();
const express    	 		= require("express"),
	  	app        	 		= express(),
	  	axios      	 		= require("axios").default,
	  	bodyParser 	 		= require("body-parser"),
      methodOverride 	= require("method-override"),
      middleware      = require("../middleware"),
      port       	 		= process.env.PORT || 3000,
      router          = express.Router();
      
const Campground      = require("../models/campground");
const Comment         = require("../models/comment");

// axios has built in body parser.
// app.use(bodyParser.urlencoded({extended: true}));

axios.defaults.baseURL = 'https://ridb.recreation.gov/api/v1/';
axios.defaults.headers = {
  'Content-Type': 'application/json',
  'apikey': process.env.API,
}
// const url = "https://ridb.recreation.gov/api/v1/activities/"
// const url = '/recareas';

const params = {
  query: "camping",
  // state: "CA",
  limit: 50,
  // full: false,
  sort: "Date"
}

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('/facilities', {params});
    console.log(response.status)
    const recData = await response.data.RECDATA;
    const maps = recData.filter(item => (item.GEOJSON.COORDINATES));
    const mapData = await maps.map(item => (
      {properties: {title: item.FacilityName}, geometry: item.GEOJSON, id: item.FacilityID}
    ));
    console.log(mapData);
    res.render("campsites/index", {recData, mapData});
  } catch (e) {
    console.log("oh no.", e)
  }
});

// =====|   Search Route  |===== \\

router.get('/search', async (req, res) => {
  try {
    console.log('QUERY: '+req.query)
    console.log('PARAMS: '+req.params)
    const search = req.query.search
    const state = req.query.state
    const activity = req.query.activities
    const limit = req.query.limit
    const searchParams = {query: search, activity, state, limit, sort: "Date", query: search}
    const response = await axios.get('/facilities', {params: searchParams});
    console.log(response.data.METADATA)
    const recData = await response.data.RECDATA;
    // console.log(recData)
    res.render("index", {recData});
  } catch (e) {
    console.log("oh no.", e)
  }
});

//SHOW - show more info about campground.
router.get("/show/:id", async (req, res) => {
    // ':id' can be accessed through req.param. use destructuring.
    try {
    const showParams = { full: true, }
    const { id } = req.params;
    console.log(id);
    const url = `/facilities/${id}`;
    const mediaURL = `/facilities/${id}/media`;
    const response = await axios.get(url, {showParams});
    const medias = await axios.get(mediaURL);
    const recData = response.data;
    mediaData = medias.data.RECDATA;
    data = {recData, mediaData}
    console.log(response.data.METADATA)
    // spread object into ejs template, so i have direct access to object.
    res.render("campsites/show", {data});
  } catch (e) {
    console.log("oh no.", e)
  }
  });

// 404 route

router.use((req, res) => {
  // place after routes. if user doesn't select 
  // above routes this 404 route will run. 
  // console.log("request 404!!!")
  res.send("Go Back Home Lassie!")
})

module.exports = router
