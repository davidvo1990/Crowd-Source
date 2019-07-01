import axios from "axios";

// The method retrieves search from the server
// It accepts a "query" or term to search the recipe api for
export default {
 
  getLocationsSearch:function(){
    return axios.get("/api/searchs/"); 
  },
  searchVenues:function(query){
    return axios.post("/search/"+query);
  },
  // getBooksAPI:function(query){
  //   return axios.get("https://www.googleapis.com/books/v1/volumes?q=title:"+query);
  // },
  savedVenue:function(id){
    return axios.post("/api/searchs/"+id);
  },
  deleteVenue: function(id) {
    return axios.delete("/api/searchs/" + id);
  },

  searchLocations:function(query, user){
    return axios.post("/searchlocations/"+query, user);
  },
  getLocations: function() {
    return axios.get("/api/locations/");
  },
  deleteLocation: function(id) {
    return axios.delete("/api/locations/" + id);
  },
};
