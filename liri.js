// Read and set any environment variables with the dotenv package
require('dotenv').config();

// Importing Spotify API keys from file and storing in variable
var keys = require('./keys.js');

// Importing Moment.js
var moment = require('moment');
moment().format();

// Importing Axios and storing in variable
var axios = require('axios');

// Importing Node Spotify API package and storing in variable
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// Importing File System
var fs = require('fs');

// Variables required for storing user-generated input
var action = process.argv[2];
var input = process.argv[3];

// Switch statement for app function control
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
        doThis();
        break;
};

// Function using Bands In Town API
function concertThis() {
    // Take the provided input parameter and search the Bands In Town API
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp")
    .then(function(data) {
        // Iterate over the length of the returned array, and publish the results
        for ( var i = 0; i < data.data.length; i++ ) {
            var venueName = data.data[i].venue.name;
            var venuePlace = data.data[i].venue.city + ", " + data.data[i].venue.region + ", " + data. data[i].venue.country;
            var eventDate = data.data[i].datetime;
            // Split the datetime data into an array
            var splitDate = eventDate.split("T");
            // Format the date using Moment
            var formDate = moment(splitDate[0], "YYYY-MM-DD").format("MM-DD-YYYY");
            var concertResults = "------------" + "\nVenue: " + venueName + "\nLocation: " + venuePlace + "\nDate: " + formDate;
        console.log(concertResults);
        }
    })
    // If there is an error, log it to the console
    .catch(function(err) {
        console.log(err);
    });
};

// Function using Spotify API & data
function spotifyThis(input) {
    // If no proper input parameter is provided, the default search will be "The Sign"
    if ( input === undefined ) {
        input = "The Sign";
        } else {
            // Take the provided input parameter and search the Spotify API
            spotify.search({ type: 'track', query: input })
            .then(function(data) {
                // Iterate over the length of the returned array, and publish the results
                for ( var i = 0; i < data.tracks.items.length; i++ ) {
                    var spotifyResults = "------------" + "\nArtist(s): " + data.tracks.items[i].artists[0].name + "\nSong: " + data.tracks.items[i].name + "\nAlbum: " + data.tracks.items[i].album.name + "\nPreview: " + data.tracks.items[i].preview_url;
                    console.log(spotifyResults);
                }
            })
            // If there is an error, log it to the console
            .catch(function(err) {
                console.log(err);
            });
        }
};

// Function for OMDB API
function movieThis(input) {
    // If no proper input parameter is provided, the default search will be "Mr. Nobody"
    if (input === undefined ) {
        input = "Mr. Nobody";
    // Take the provided input parameter and search the OMDB API
    } else {
        axios.get("https://www.omdbapi.com/?t=" + input + "&apikey=trilogy")
        .then(function(data) {
            // Create variables for each data key
            var title = data.data.Title;
            var year = data.data.Year;
            var imdb = data.data.imdbRating;
            var country = data.data.Country;
            var language = data.data.Language;
            var plot = data.data.Plot;
            var actors = data.data.Actors;
            // Conditional for the case in which Rotten Tomatoes data does not exist
            if(data.data.Ratings.length <= 1) {
                var movieInfo = "------------" + "\nTitle: " + title + "\nYear of Production: " + year + "\nIMDB Rating: " + imdb + "\nUnfortunately, this film has not been rated by Rotten Tomatoes" + "\nProduced in: " + country + "\nLanguage: " + language + "\nMovie Plot: " + plot + "\nFeatured Actors: " + actors;
                // Output
                console.log(movieInfo);
            } else if (data.data.Ratings[1].Source === "Rotten Tomatoes") {
                var rt = data.data.Ratings[1].Value;
                var movieInfo = "------------" + "\nTitle: " + title + "\nYear of Production: " + year + "\nIMDB Rating: " + imdb + "\nRotten Tomatoes Rating: " + rt + "\nProduced in: " + country + "\nLanguage: " + language + "\nMovie Plot: " + plot + "\nFeatured Actors: " + actors;
                // Output
                console.log(movieInfo);
            }
        })
        // If there is an error, log it to the console
        .catch(function(err) {
            if(err) {
                console.log(err);
            }
        });
    }
};

// Function for using FS node package
function doThis() {
    // Read the random text file
    fs.readFile("random.txt", "utf8", function(err, data) {
        if(err) {
            console.log(err);
        } else {
            // Split the text into an array
            var dataArr = data.split(',');
            // Assign variables to the split parameters
            var action = dataArr[0];
            var input = dataArr[1];
            // Setup a conditional for the function
            if(action === "concert-this") {
                concertThis(input);
            } else if (action === "spotify-this-song") {
                spotifyThis(input);
            } else if (action === "movie-this") {
                movieThis(input);
            } else {
                console.log('Invalid action. Please use "concert-this", "spotify-this-song", or "movie-this"');
            }
        }
    });
};