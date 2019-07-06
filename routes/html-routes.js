// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/signup", function(req, res) {
    // If the user already is already logged in?  an account send them to the members page, else just render the singup page
    
    
    
  //  if (req.user) {
      res.redirect("/inputdata");
  //  }
  // res.sendFile(path.join(__dirname, "../public/signup.html"));   
      //req followed up with a response...go to this html page when you go to the route

  });

  app.get("/login", function(req, res) {
    // If the user already has an account(logged in) send them to the members page
    if (req.user) {
      res.redirect("/inputdata");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });


  // If a user who is not logged in tries to access this route they will be redirected to the signup page

// is Authenticated is new. if user is not authenticated then you cannot access this route

  app.get("/members",  function(req, res) {
  //  res.sendFile(path.join(__dirname, "../public/members.html"));
  res.redirect("/map");
  });

};
