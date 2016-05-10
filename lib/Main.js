var Note = require("./Note.js"),
    Song = require("./Song.js"),
    Menu = require("./Menu.js");

var notes = [];
 for (var i = 0; i < 1000; i++) {
   notes.push(new Note(Math.floor(Math.random()*4)+1, i*250));
 }

var song1 = new Song(notes, "./videos/Reptilia.mp4", "Reptilia");
var song2 = new Song(notes, "./videos/HEYEAYEAYEA!.mp4", "HEYEAYEAYEA!");
var song3 = new Song(notes, "./videos/groovin_magic.mp4", "Groovin Magic");


var canvas = document.getElementById("game-canvas");
var context = canvas.getContext("2d");
context.font = "30px Verdana";
var menu = new Menu(context, [song1,song2, song3]);


menu.display();
