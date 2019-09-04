// Read and set any environment variables with the dotenv package
require('dotenv').config();

// Variable required to import keys file and store it in a variable
var keys = require("./keys.js");

// Variable required to import node-spotify-api package and store it in a variable
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

// Variables required for storing user-generated input
var action = process.argv[2];
var input = process.argv[3];

switch(action) {
    case "concert-this":
        concertThis(input);
        break;
    case "spotify-this-song":
        spotifyThis(input);
        break;
    case "movie-this":
        movieThis(input);
        break;
    case "do-what-it-says":
        doThis(input);
        break;
};


function spotifyThis(input) {
    if ( input === undefined ) {
        input = "The Sign";
        } else {
            spotify.search({ type: 'track', query: input })
            .then(function(data) {
                for (var i = 0; i < 1; i++ ) {
                    var spotifyResults = "------------" + "\nArtist(s): " + data.tracks.items[i].artists[0].name + "\nSong: " + data.tracks.items[i].name + "\nAlbum: " + data.tracks.items[i].album.name + "\nPreview: " + data.tracks.items[i].preview_url;

                    console.log(spotifyResults);
                }
            })
            .catch(function(err) {
                console.log(err);
            });
        }
};