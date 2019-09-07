# LIRI Bot

## Overview

LIRI is a command line Node.js application that takes in parameters and returns data. It is similar to Apple's SIRI, however, SIRI uses speech interpretation and recognition, while LIRI uses language interpretation and recognition.

### Expected Outcomes

LIRI was designed to produce search results based on the following commands:

1. "concert-this"
2. "spotify-this-song"
3. "movie-this"
4. "do-what-it-says"

Each command produces different search results:

1. node liri.js concert-this (artist/band name) will return a concert/list of concerts showing the name(s) of the venue(s), the location(s) of the venue(s), and the date(s) of the concert(s).
2. node liri.js spotify-this-song (song/track name) will return a track/list of tracks available on Spotify showing the name(s) of the artist(s), the title(s) of the song(s), Spotify preview URL(s), and the title(s) of the album(s) containing the track(s).
3. node liri.js movie-this (movie name) will return data about the searched movie, including the title of the movie, the year of production, the movie's IMDB rating and Rotten Tomatoes rating, the country in which it was produced, the language of the movie's dialogue, a brief plot synopsis, and a list of featured actors/actresses in the movie.
4. node liri.js do-what-it-says will print the results of the "spotify-this-song" command using "I Want It That Way" as the search parameter.

### Code

#### concert-this

This command used the Bands In Town API. An axios.get command sent a request to the server, and the results were logged to the console. Moment.js was used to reformat the returned concert dates.

#### spotify-this-song

This command used the Spotify API. A request using the node-spotify-api package command spotify.request was sent to the Spotify server, and the results were logged to the console.

#### movie-this

This command used the OMDB API. This command also uses an axios.get request sent to the OMDB server, and the results were logged to the console.

#### do-what-it-says

This command pulled its input parameters from a local file 'random.txt', and then uses those parameters, resulting in a spotify-this-song command for "I Want It That Way."

#### Switch Statement

A switch statement was used to capture the user's command line input. This allowed LIRI to run the specific command entered by the user and access the appropriate function.

#### Local and Linked Files

LIRI required installation of several NPM packages, including axios, node-spotify-api, and moment. It also required the linkage of the local file system.