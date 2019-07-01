const express = require("express");
const path = require("path");
require('dotenv').config()

////////////////////////////
var logger = require("morgan");
var mongoose = require("mongoose");
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
// var cheerio = require("cheerio");

// Require all models
// var db = require("./models");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/crowdsource";
mongoose.connect(
  MONGODB_URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true
  });
//////////////////////////////


const PORT = process.env.PORT || 3001;
const app = express();

//////////////////////////////
// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

var dbconnection = mongoose.connection;
// Show any Mongoose errors
dbconnection.on('error', function (err) {
  console.log('Mongoose Error: ', err);
});

// Once logged in to the db through mongoose, log a success message
dbconnection.once('open', function () {
  console.log('Mongoose connection successful.');
});


const db = require("./models");
// // const db = require("./models")(mongoose);
// const { GOOGLE_API_SERVER_KEY } = process.env;
// const apiRouter = express.Router();
// require("./routes")(apiRouter, db, axios, GOOGLE_API_SERVER_KEY);
// app.use("/api", apiRouter);


///////////////////////////////


// const apiRoutes = require("./routes/apiRoutes");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Use apiRoutes
// app.use("/api", apiRoutes);

// Send every request to the React app
// Define any API routes before this runs


app.post("/search/:query", function (req, res) {
  const query = req.params.query;
  // console.log(req.params.query)
  const access_token = process.env.access_token
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${access_token}`
  axios.get(url).then(function (response) {
    // console.log(response.data.features)
    // console.log(response.data.features[0].place_name)
    // console.log(response.data.features[0].geometry.coordinates)
    // console.log(response.data.features[0].text)
    // console.log(response.data.features[0].properties.category)
    const result = {};
    for (let i = 0; i < response.data.features.length; i++) {
      result.name = response.data.features[i].text;
      result.address = response.data.features[i].place_name;
      result.category = response.data.features[i].properties.category;
      result.longitude = response.data.features[i].geometry.coordinates[0];
      result.latitude = response.data.features[i].geometry.coordinates[1];
  
      console.log(result)
      //delete database for new search
      db.Search.deleteMany({ saved: false }, function (err) {
        console.log(err)
      });

      db.Search.create(result)
        .then(function (data) {
          // View the added result in the console
          // console.log(data);
        })
        .catch(function (err) {
          // If an error occurred, log it
          console.log(err);
        });
    }

  })
});

app.get("/api/searchs", function (req, res) {
  // Grab every document in the Articles collection
  db.Search.find({})
    .then(function (dbSearch) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbSearch);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

app.post("/api/searchs", function (req, res) {
  db.Search
    .create(req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

app.post("/api/searchs/:id", function (req, res) {
  // console.log(req.params.id)
  db.Search.findOneAndUpdate({ _id: req.params.id }, {saved: true})
    .exec(function(err, doc) {
      // Log any errors
      if (err) {
        console.log(err);
      }
      else {
        // Or send the document to the browser
        res.send(doc);
      }
    });
  });

app.delete("/api/searchs/:id", function (req, res) {
  // console.log(req.params.id)
  db.Search
  .findById({ _id: req.params.id })
  .then(dbModel => dbModel.remove())
  .then(dbModel => res.json(dbModel))
  .catch(err => res.status(422).json(err));
});


app.get("/api/locations", function (req, res) {
  // Grab every document in the Articles collection
  db.Location.find({})
    .then(function (dbLocation) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbLocation);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});


app.post("/searchlocations/:query", function (req, res) {
  const query = req.params.query;
  const body = req.body;
  // console.log(req.params.query)
  const access_token = process.env.access_token
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${access_token}`
  axios.get(url).then(function (response) {
    // console.log(response.data.features)
    // console.log(response.data.features[0])
    // console.log(response.data.features[0].place_name)
    // console.log(response.data.features[0].geometry.coordinates)
    //console.log(body)
    const result = {};
    result.address = response.data.features[0].place_name;
    result.longitude = response.data.features[0].geometry.coordinates[0];
    result.latitude = response.data.features[0].geometry.coordinates[1];
    result.name = body.name;
    result.message = body.message;
    result.feature = body.feature;
    // console.log(result)

      db.Location.create(result)
        .then(function (dbLocation) {
          // View the added result in the console
          console.log(dbLocation);
        })
        .catch(function (err) {
          // If an error occurred, log it
          console.log(err);
        });
    

  })
});

app.delete("/api/locations/:id", function (req, res) {
  // console.log(req.params.id)
  db.Location
  .findById({ _id: req.params.id })
  .then(dbModel => dbModel.remove())
  .then(dbModel => res.json(dbModel))
  .catch(err => res.status(422).json(err));
});


app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on: http://localhost:${PORT}!`);
});
