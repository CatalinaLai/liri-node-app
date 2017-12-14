var keys = require("./keys.js");
var fs = require('fs');
var request = require('request');
var Twitter = require('twitter');
var client = new Twitter(keys.twitterKeys);
var Spotify = require('node-spotify-api');
var command = process.argv[2];

var spotify = new Spotify({
	id: '174a93f820374b6880300df8460bfd98',
	secret: 'da5f98fca53443538d95d0f6295f7b9a'
});

//Tweeter
if(command === "my-tweets"){
	var params = {
		screen_name: "newStartOldSelf",
		count: 20
	};

	client.get('statuses/user_timeline', params, function(error, tweets, response){
		if(!error){
			console.log("Tweet, tweet, tweet...")
			console.log("-----------------------------");
			for (var i = 0; i < tweets.length; i++) {
				console.log("Liri tweet: " + tweets[i].text + '\n' + "Created at: " + tweets[i].created_at);
				console.log("-----------------------------")
			}
		}
	});
}

//Spotify
if(command === "spotify-this-song"){
	var spotifySong = process.argv[3];

	if(!spotifySong){
		spotifySong = "the sign ace of base";
	}
	songName = spotifySong;
	spotify.search({ type:'track', query: songName, limit: 1 }, function(err, data){
		if(!err){
			var data = data.tracks.items;
			for(var i = 0; i < data.length; i++){
				for(var j = 0; j < data[i].artists.length; j++){
							console.log("Artist name: " + data[i].artists[j].name); //artist name
						}
						console.log("Song name: " + data[i].name); //song name
						console.log("Album name: " + data[i].album.name); //album name
						console.log("URL Link: " + data[i].preview_url); //preview link to song
					}
				} else{
					console.log("Error: " + err);
					return;
				}

		});
	}

//OMDB
if(command === "movie-this"){ 
    console.log("Be patient while I get that movie...\n");
    var movieName = process.argv[3];
    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json&tomatoes=true&apikey=21483de2",function (error, response, body){
        
        if(process.argv[3]){
        	console.log(body);  
       
        }else{
            request("http://www.omdbapi.com/?t=mr+nobody+&y=&plot=short&r=json&tomatoes=true&apikey=21483de2",function(error, response,body){
                console.log(body);
            
            })	
        }
    });
}

//Read text file
if(command === "do-what-it-says"){
	fs.readFile("random.txt", "utf8", function(error, data){
		console.log(data);
	});
}