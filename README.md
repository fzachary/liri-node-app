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

