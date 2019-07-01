var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var SearchSchema = new Schema({
  // `title` is required and of type String
  name: {
    type: String,
    required: true
  },
  // `link` is required and of type String
  address: {
    type: String
  },
  category: {
    type: String
  },
  longitude: {
    type: String
  },
  latitude: {
    type: String
  },
  saved: {
    type: Boolean,
    default:false
  }
});

// This creates our model from the above schema, using mongoose's model method
var Search = mongoose.model("Search", SearchSchema);

// Export the Article model
module.exports = Search;
