// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

//the route is actually /login or /signup but we say /api first in order to to post to our database api
// post routes are routes that you cannot see

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    // res.json("map.html");         // /MEMBERS is the page after you log-in
    db.User.find({})
      .then(function (dbUser) {
        // If we were able to successfully find Articles, send them back to the client
        // res.json(dbUser);
        res.json("/home"); 
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });

  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {         // these routes will match with the login and signup 
    console.log('api-routes.js: ' + req.body.email);
    console.log('api-routes.js:  ' + req.body.password);
    console.log( req.body);
    //db.User.create(req.body) 
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function () {
        res.json("/login");
        // res.redirect(307, "/api/login");      //go to api/login route so it is then autheticated also??
        //if whatever reason 307 error route go to that route
      }).catch(function (err) {
        console.log(err);
        res.json(err);

        // res.status(422).json(err.errors[0].message);
      });
  });

  // if you got to this below route you will be logged out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");     // WHEN YOU logout go back to the main page the / route is defined in the html-routes.js
  });

  // Maybe not neccessary but good to know. Route for getting some data about our user to be used client side

  // put this in a react component??????? in order to render 
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, nothin will be at the route

      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        password: req.user.password
      });
    }
  });

};
