// Read and set any environment variables with the dotenv package
require("dotenv").config();

// This code required to import keys file and store it in a variable
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);