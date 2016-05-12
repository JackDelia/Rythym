var Note = require("./Note.js"),
    Song = require("./Song.js"),
    Menu = require("./Menu.js"),
    Songsheets = require("./Songsheets.js");

var notes = [];
 for (var i = 0; i < 1000; i++) {
   notes.push(new Note(Math.floor(Math.random()*4)+1, i*250));
 }

var song1 = new Song(Songsheets.reptileNotes, "./videos/Reptilia.mp4", "Reptilia");
var song2 = new Song(Songsheets.heyNotes, "./videos/HEYEAYEAYEA!.mp4", "HEYEAYEAYEA!");
var song3 = new Song(Songsheets.groovinNotes, "./videos/groovin_magic.mp4", "Groovin Magic");
var song4 = new Song(Songsheets.takenNotes, "./videos/TakeOnMe.mp4", "Take On Me");
var song5 = new Song(Songsheets.germanNotes, "./videos/Luftballons.mp4", "99 Luftbaloons");


var canvas = document.getElementById("game-canvas");
var context = canvas.getContext("2d");
context.font = "30px Verdana";
var menu = new Menu(context, [song1,song2, song3, song4, song5]);


menu.display();
