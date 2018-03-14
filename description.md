#PLURview - EDM Colorbar

_Synopsis:_ Electronic Dance Music has exploded from a relatively obscure genre into a full-on category of music, with little in the way of useful ways to sort through acts based on vibes. EDM practically has more subgenres than artists, and it takes a full-on API call to Spotify to even get a list of how an artist identifies:

Step 1: Find the artist's unique Spotify ID (Excision: `5FKchcZpQOkqFvXBj1aCvb`, Flume: `6nxWCVXbOlEVRexSbLsTer`, Dillon Francis: `5R3Hr2cnCCjt220Jmt2xLf`)
Step 2: Sign up for a Spotify API key
Step 3: Request data from the artist's endpoint

_Example Genre Returns:_

Excision: `{"genres" : [ "bass trap", "brostep", "edm", "electro house", "electronic trap", "filthstep", "moombahton" ]}`,
Flume: `{"genres" : [ "aussietronica", "australian alternative rock", "australian dance", "downtempo", "pop" ]}`,
Dillon Francis:  `{"genres" : [ "big room", "brostep", "edm", "electro house", "electronic trap", "house", "moombahton", "pop", "progressive electro house", "tropical house" ]}`

Excision, Flume, and Dillon Francis are very different from one another. "Pop" (Flume, Dillon Francis) is about as useful a genre as "EDM". "Moombahton" (Excision, Dillon Francis) takes research to describe its characteristics, and barely even applies to Excision. And what the hell is "filthstep"???

_Here's the Problem_

Hardcore EDM enthusiasts get to enjoy music from artists at all points on the spectrum during festivals in the summertime, with little risk of going home feeling like, "Damn, this sucked." The rest of the year it's basically trial by fire- show up and maybe the artist is your vibe, maybe you'll stand around for 4 hours hating your life.

_Here's the Idea_

Rave culture has a huge visual element to it. Colors and visuals are an integral part of the EDM experience. Hot pink and helium vocals go hand-in-hand at Slushii, whereas Snails accents his "vomit-step" vibe with green and black. The colors and sounds become connected on a gut level.

PLURview will analyze song features through Spotify's free API to generate artist gradients using the HSB color spectrum:

*Hue:* Targets the average/mode key of the artist's most popular tracks and pairs it with a color/colors based on charts from scientific studies of synesthesia (the experience of one sense as another- in this case the experience of sound as color)
*Saturation:* Targets features related to danceability. Higher energy music pairs with more vibrant colors, whereas more chill music is more subdued.
*Brightness:* Relates to tempo. Faster music is brighter.

(Chromesthesia Charts: http://nautil.us/issue/26/color/what-color-is-this-song, https://upload.wikimedia.org/wikipedia/commons/7/77/Scriabin_keyboard.svg)

_Example Track Feature Return:_

Song: "Neck Brace" by Excision (`4gRYNJ0vNPM0EYEVzqGeOf`)

`{
  "danceability" : 0.535,
  "energy" : 0.938,
  "key" : 1,
  "loudness" : -2.289,
  "mode" : 1,
  "speechiness" : 0.0497,
  "acousticness" : 0.0000191,
  "instrumentalness" : 0.0137,
  "liveness" : 0.139,
  "valence" : 0.0466,
  "tempo" : 140.030,
  "type" : "audio_features",
  "id" : "4gRYNJ0vNPM0EYEVzqGeOf",
  "uri" : "spotify:track:4gRYNJ0vNPM0EYEVzqGeOf",
  "track_href" : "https://api.spotify.com/v1/tracks/4gRYNJ0vNPM0EYEVzqGeOf",
  "analysis_url" : "https://api.spotify.com/v1/audio-analysis/4gRYNJ0vNPM0EYEVzqGeOf",
  "duration_ms" : 260571,
  "time_signature" : 4
}`

*Energy (Float):* Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.

*Key (Integer):* The key the track is in. Integers map to pitches using standard Pitch Class notation. E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on.

*Mode (Integer):* Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0.

*Valence (Float):* A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).

*Danceability (Float):* Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.

*Tempo (Float):* The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.

_Scaling Up_

With a few entry points of artists in various parts of the EDM spectrum, Spotify makes it easy to search artists recursively based on calls to the Related Artists endpoint (`https://api.spotify.com/v1/artists/{id}/related-artists`). This will be useful information to cache per artist and display alongside the colorbar.

Spotify API has endpoints for both Top Tracks (`https://api.spotify.com/v1/artists/{id}/top-tracks`) and also aggregated Audio Features for Several Tracks (`https://api.spotify.com/v1/audio-features`). With only a few automated calls to the Spotify API it will be easy to analyze artists en masse with little risk of rate limiting.

_Gradient Background Viz_

Cached color values for artists lend themselves easily to CSS gradients. The basic code is easy to generate:

```CSS
background: linear-gradient(270deg, #2d6624, #662d24);
background-size: 400% 400%;

-webkit-animation: AnimationName 20s ease infinite;
-moz-animation: AnimationName 20s ease infinite;
animation: AnimationName 20s ease infinite;

@-webkit-keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
@-moz-keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
@keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
```

_Background Motif_

A pixellated dripping rainbow

```CSS
.pixelart-to-css {
  box-shadow:  20px 20px 0 #9c27b0, 40px 20px 0 #9c27b0, 60px 20px 0 #673ab7, 80px 20px 0 #673ab7, 100px 20px 0 #3f51b5, 120px 20px 0 #3f51b5, 140px 20px 0 #2196f3, 160px 20px 0 #2196f3, 180px 20px 0 #009688, 200px 20px 0 #009688, 220px 20px 0 #4caf50, 240px 20px 0 #4caf50, 260px 20px 0 #ffeb3b, 280px 20px 0 #ffeb3b, 300px 20px 0 #ff9800, 320px 20px 0 #ff9800, 340px 20px 0 #ff5722, 360px 20px 0 #ff5722, 380px 20px 0 #ff0000, 400px 20px 0 #ff0000, 20px 40px 0 #9c27b0, 40px 40px 0 #9c27b0, 60px 40px 0 #673ab7, 80px 40px 0 #673ab7, 100px 40px 0 #3f51b5, 120px 40px 0 #3f51b5, 140px 40px 0 #2196f3, 160px 40px 0 #2196f3, 180px 40px 0 #009688, 200px 40px 0 #009688, 220px 40px 0 #4caf50, 240px 40px 0 #4caf50, 260px 40px 0 #ffeb3b, 280px 40px 0 #ffeb3b, 300px 40px 0 #ff9800, 320px 40px 0 #ff9800, 340px 40px 0 #ff5722, 360px 40px 0 #ff5722, 380px 40px 0 #ff0000, 400px 40px 0 #ff0000, 20px 60px 0 #9c27b0, 40px 60px 0 #9c27b0, 60px 60px 0 #673ab7, 80px 60px 0 #673ab7, 100px 60px 0 #3f51b5, 120px 60px 0 #3f51b5, 140px 60px 0 #2196f3, 160px 60px 0 #2196f3, 180px 60px 0 #009688, 200px 60px 0 #009688, 220px 60px 0 #4caf50, 240px 60px 0 #4caf50, 260px 60px 0 #ffeb3b, 280px 60px 0 #ffeb3b, 300px 60px 0 #ff9800, 320px 60px 0 #ff9800, 340px 60px 0 #ff5722, 360px 60px 0 #ff5722, 380px 60px 0 #ff0000, 400px 60px 0 #ff0000, 20px 80px 0 #9c27b0, 40px 80px 0 #9c27b0, 60px 80px 0 #673ab7, 80px 80px 0 #673ab7, 100px 80px 0 #3f51b5, 120px 80px 0 #3f51b5, 140px 80px 0 #2196f3, 160px 80px 0 #2196f3, 180px 80px 0 #009688, 200px 80px 0 #009688, 220px 80px 0 #4caf50, 240px 80px 0 #4caf50, 260px 80px 0 #ffeb3b, 280px 80px 0 #ffeb3b, 300px 80px 0 #ff9800, 320px 80px 0 #ff9800, 340px 80px 0 #ff5722, 360px 80px 0 #ff5722, 380px 80px 0 #ff0000, 400px 80px 0 #ff0000, 20px 100px 0 #9c27b0, 40px 100px 0 #9c27b0, 60px 100px 0 #673ab7, 80px 100px 0 #673ab7, 100px 100px 0 #3f51b5, 120px 100px 0 #3f51b5, 140px 100px 0 #2196f3, 160px 100px 0 #2196f3, 180px 100px 0 #009688, 200px 100px 0 #009688, 220px 100px 0 #4caf50, 240px 100px 0 #4caf50, 260px 100px 0 #ffeb3b, 280px 100px 0 #ffeb3b, 300px 100px 0 #ff9800, 320px 100px 0 #ff9800, 340px 100px 0 #ff5722, 360px 100px 0 #ff5722, 380px 100px 0 #ff0000, 400px 100px 0 #ff0000, 20px 120px 0 #9c27b0, 40px 120px 0 #9c27b0, 60px 120px 0 #673ab7, 80px 120px 0 #673ab7, 100px 120px 0 #3f51b5, 140px 120px 0 #2196f3, 160px 120px 0 #2196f3, 180px 120px 0 #009688, 200px 120px 0 #009688, 220px 120px 0 #4caf50, 240px 120px 0 #4caf50, 280px 120px 0 #ffeb3b, 300px 120px 0 #ff9800, 320px 120px 0 #ff9800, 340px 120px 0 #ff5722, 360px 120px 0 #ff5722, 380px 120px 0 #ff0000, 400px 120px 0 #ff0000, 20px 140px 0 #9c27b0, 40px 140px 0 #9c27b0, 60px 140px 0 #673ab7, 80px 140px 0 #673ab7, 100px 140px 0 #3f51b5, 140px 140px 0 #2196f3, 160px 140px 0 #2196f3, 180px 140px 0 #009688, 200px 140px 0 #009688, 220px 140px 0 #4caf50, 240px 140px 0 #4caf50, 280px 140px 0 #ffeb3b, 300px 140px 0 #ff9800, 320px 140px 0 #ff9800, 340px 140px 0 #ff5722, 360px 140px 0 #ff5722, 380px 140px 0 #ff0000, 400px 140px 0 #ff0000, 20px 160px 0 #9c27b0, 40px 160px 0 #9c27b0, 60px 160px 0 #673ab7, 80px 160px 0 #673ab7, 100px 160px 0 #3f51b5, 140px 160px 0 #2196f3, 160px 160px 0 #2196f3, 180px 160px 0 #009688, 200px 160px 0 #009688, 220px 160px 0 #4caf50, 240px 160px 0 #4caf50, 300px 160px 0 #ff9800, 320px 160px 0 #ff9800, 340px 160px 0 #ff5722, 360px 160px 0 #ff5722, 380px 160px 0 #ff0000, 400px 160px 0 #ff0000, 20px 180px 0 #9c27b0, 40px 180px 0 #9c27b0, 60px 180px 0 #673ab7, 80px 180px 0 #673ab7, 100px 180px 0 #3f51b5, 160px 180px 0 #2196f3, 180px 180px 0 #009688, 200px 180px 0 #009688, 240px 180px 0 #4caf50, 300px 180px 0 #ff9800, 320px 180px 0 #ff9800, 340px 180px 0 #ff5722, 360px 180px 0 #ff5722, 380px 180px 0 #ff0000, 400px 180px 0 #ff0000, 20px 200px 0 #9c27b0, 40px 200px 0 #9c27b0, 60px 200px 0 #673ab7, 80px 200px 0 #673ab7, 100px 200px 0 #3f51b5, 160px 200px 0 #2196f3, 180px 200px 0 #009688, 200px 200px 0 #009688, 300px 200px 0 #ff9800, 360px 200px 0 #ff5722, 380px 200px 0 #ff0000, 400px 200px 0 #ff0000, 20px 220px 0 #9c27b0, 40px 220px 0 #9c27b0, 60px 220px 0 #673ab7, 100px 220px 0 #3f51b5, 160px 220px 0 #2196f3, 180px 220px 0 #009688, 360px 220px 0 #ff5722, 380px 220px 0 #ff0000, 40px 240px 0 #9c27b0, 60px 240px 0 #673ab7, 100px 240px 0 #3f51b5, 160px 240px 0 #2196f3, 180px 240px 0 #009688, 360px 240px 0 #ff5722, 380px 240px 0 #ff0000, 40px 260px 0 #9c27b0, 60px 260px 0 #673ab7, 160px 260px 0 #2196f3, 180px 260px 0 #009688, 380px 260px 0 #ff0000, 40px 280px 0 #9c27b0, 160px 280px 0 #2196f3, 180px 280px 0 #009688, 380px 280px 0 #ff0000, 40px 300px 0 #9c27b0, 160px 300px 0 #2196f3, 380px 300px 0 #ff0000, 160px 320px 0 #2196f3, 380px 320px 0 #ff0000, 160px 340px 0 #2196f3, 160px 360px 0 #2196f3;
  height: 20px;
  width: 20px;
}
```

(Source: https://www.gradient-animator.com/)

The more challenging aspect of this will be figuring out how to generate the CSS using persisted color values per artist. It will likely take a dive into some newer/more advanced CSS features or derivative technologies like LESS or SASS.

_First Migration_

*Artist Model*
- Name
- SpotifyId
- EDMTrain ID
- Genres (IDs)
- Followers
- Popularity
- Images
- Energy
- Key
- Mode
- Valence
- Tempo
- Danceability
- Major Hue
- Minor Hue
- Major Saturation
- Minor Saturation
- Major Brightness
- Minor Brightness
- Related Artists (IDs)


*Genre*
- Name
- Artist ID

<!-- *Track Model*

- Name
- SpotifyId
- Popularity
- Energy
- Key
- Mode
- Valence
- Tempo
- Danceability
- Major Hue
- Minor Hue
- Major Saturation
- Minor Saturation
- Major Brightness
- Minor Brightness -->

*Artist Relations (Join Table)*
- Artist ID to Artist ID

<!-- *Track Artists (Join Table)*
- Track has_many Artists -->

*Locations*
- City
- State
- EDMTrain ID

*Venues*
- EDMTrain ID
- Name
- Location Name
- Address
- State

*Location_Venues (Join Table)*
Locations and Venues are many-to-many because multiple cities can be within the same market

_EDMTrain Integration_

EDMTrain provides a list of upcoming events based on the user's choice of locations. It is a great starting point for finding shows and artists, but it has no sorting features beyond location. This pain point is the main inspiration for PLURview.

PLURview will provide users the ability to browse based either on artists generally or on upcoming local events, thanks to EDMTrain's API. This will make PLURview useful on the fly for determining if an event is of interest.

EDMTrain's Locations API accepts a City and/or State to return an example like:

```
{
   "data": [
      {
         "id": 69,
         "city": "Las Vegas",
         "state": "Nevada",
         "stateCode": "NV",
         "latitude": 36.17,
         "longitude": -115.14,
         "link": "https://edmtrain.com/las-vegas-nv"
      }
   ],
   "success": true
}
```

Using the LocationID, the Events API can then return an object like this:

```
{
   "data": [
      {
         "id": 50839,
         "link": "https://edmtrain.com/new-york?event=50839",
         "ticketLink": "https://edmtrain.com/new-york?event=50839&tickets",
         "name": null,
         "ages": "All Ages",
         "festivalInd": false,
         "date": "2017-01-14",
         "createdDate": "2016-12-08T18:39:58Z",
         "venue": {
            "id": 543,
            "name": "Westcott Theater",
            "location": "Syracuse, NY",
            "address": "524 Westcott St, Syracuse, NY 13210",
            "state": "New York",
            "latitude": 43.041,
            "longitude": -76.12
         },
         "artistList": [
            {
               "id": 660,
               "name": "ill.Gates"
            },
            {
               "id": 367,
               "name": "KJ Sawka"
            }
         ]
      }
   ],
   "success": true
}
```

The events API also works with EDMTrain Artist IDs, which are probably worth caching in the PLURview backend. Venue information is also worth caching up front in order to provide for future venue review functionality.

_User Stories_

- As a User, I want to search for an artist to find relevant, useful information
- As a User, I want to find a snapshot of which other artists I should compare with my search target
- As a User, I want to preview my search target's sets with embedded Youtube videos ("`Artist` Live 2017" custom search)
- As a User, I want to know if/when the search target is performing near me
- As a User, I want a direct link to purchase tickets to my search target's upcoming shows
- As a User, I want to browse upcoming shows near me and see the colorbar for each artist
- As a User, I want to connect my Spotify account to store my favorite artists
- As a User, I want a colorbar of my own based on my library of songs/artists

_Data Store_

MVP version of PLURview only concerns itself with showing an artist's individual color spectrum

```
artists: {
  Name: ""
  SpotifyId: ""
  SpotifyUrl: ""
  EDMTrain ID: ""
  Genres (IDs): []
  ImageUrls: []
  Major Hue: ""
  Minor Hue: ""
  Major Saturation: ""
  Minor Saturation: ""
  Major Brightness: ""
  Minor Brightness: ""
  Related Artists (IDs): []
}
```

EDMTrain integrated version of PLURview would include references to the artist's shows, as well as venues
