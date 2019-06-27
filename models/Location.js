var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var LocationSchema = new Schema({
  // `title` is required and of type String
  name: {
    type: String,
    required: true
  },
  // `link` is required and of type String
  address: {
    type: String,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  message: {
    type: String
  },
  feature: {
    type: String,
    required: true
  }
  
  
});

// This creates our model from the above schema, using mongoose's model method
var Location = mongoose.model("Location", LocationSchema);

// Export the Article model
module.exports = Location;
