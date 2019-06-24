const express = require("express");
const path = require("path");


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

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/googlebooks";
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
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
  axios.get(url).then(function (response) {
    // console.log(response.data.items[0])
    const result = {};
    for (let i = 0; i < response.data.items.length; i++) {
      result.title = response.data.items[i].volumeInfo.title
      result.authors = response.data.items[i].volumeInfo.authors.join(", ")
      result.description = response.data.items[i].volumeInfo.description
      result.image = response.data.items[i].volumeInfo.imageLinks.smallThumbnail
      result.link = response.data.items[i].volumeInfo.previewLink
      // console.log(result)
      //delete database for new search
      db.Book.deleteMany({ saved: false }, function (err) {
        console.log(err)
      });
      db.Book.create(result)
        .then(function (dbArticle) {
          // View the added result in the console
          // console.log(dbArticle);
        })
        .catch(function (err) {
          // If an error occurred, log it
          console.log(err);
        });
    }

  })
});

app.get("/api/books", function (req, res) {
  // Grab every document in the Articles collection
  db.Book.find({})
    .then(function (dbBook) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbBook);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

app.post("/api/books", function (req, res) {
  db.Book
    .create(req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

app.post("/api/books/:id", function (req, res) {
  // console.log(req.params.id)
  db.Book.findOneAndUpdate({ _id: req.params.id }, {saved: true})
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

app.delete("/api/books/:id", function (req, res) {
  // console.log(req.params.id)
  db.Book
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
