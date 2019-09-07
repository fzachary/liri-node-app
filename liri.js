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
// Adjusting the user input
var input = process.argv.slice(3).join(" ");

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
        for ( var i = 0; i < 5; i++ ) {
            var venuePlace = data.data[i].venue.city + ", " + data.data[i].venue.region + ", " + data. data[i].venue.country;
            var eventDate = data.data[i].datetime;
            // Split the datetime data into an array
            var splitDate = eventDate.split("T");
            // Format the date using Moment
            var formDate = moment(splitDate[0], "YYYY-MM-DD").format("MM-DD-YYYY");
            console.log("------------");
            console.log("Venue: " + data.data[i].venue.name);
            console.log("Location: " + venuePlace);
            console.log("Date: " + formDate);
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
                for ( var i = 0; i < 5; i++ ) {
                    console.log("------------");
                    console.log("Artist(s): " + data.tracks.items[i].artists[0].name);
                    console.log("Song: " + data.tracks.items[i].name);
                    console.log("Album: " + data.tracks.items[i].album.name);
                    if(data.tracks.items[i].preview_url == null) {
                        console.log("Unfortunately, there is no preview URL for this track.");
                    } else {
                        console.log("Preview URL: " + data.tracks.items[i].preview_url);
                    }
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
                console.log("------------");
                console.log("Title: " + title);
                console.log("Year Of Production: " + year);
                console.log("IMDB Rating: " + imdb);
                console.log("Unfortunately, this film has not been rated by Rotten Tomatoes.");
                console.log("Filming Location: " + country);
                console.log("Language: " + language);
                console.log("Plot: " + plot);
                console.log("Featured Actors: " + actors);
            } else if (data.data.Ratings[1].Source === "Rotten Tomatoes") {
                var rt = data.data.Ratings[1].Value;
                console.log("------------");
                console.log("Title: " + title);
                console.log("Year Of Production: " + year);
                console.log("IMDB Rating: " + imdb);
                console.log("Rotten Tomatoes Rating: " + rt);
                console.log("Filming Location: " + country);
                console.log("Language: " + language);
                console.log("Plot: " + plot);
                console.log("Featured Actors: " + actors);
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