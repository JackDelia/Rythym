var Note = require("./Note.js"),
    Song = require("./Song.js");

var notes = [];
 for (var i = 0; i < 500; i++) {
   notes.push(new Note(Math.floor(Math.random()*4)+1, i*200));
 }

var groove = document.getElementById("groovin");

var song = new Song(notes, groove);

var canvas = document.getElementById("game-canvas");
var context = canvas.getContext("2d");
context.font = "30px Arial";
context.fillText("SCORE:", 500, 50);

song.playSong(context);
