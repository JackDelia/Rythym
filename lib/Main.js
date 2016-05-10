var Note = require("./Note.js"),
    Song = require("./Song.js");

var notes = [];
 for (var i = 0; i < 20; i++) {
   notes.push(new Note(Math.floor(Math.random()*4)+1, i*600));
 }

var song = new Song(notes);

var canvas = document.getElementById("game-canvas");
var context = canvas.getContext("2d");

song.playSong(context);
