var Note = require("./Note.js"),
    Song = require("./Song.js"),
    Menu = require("./Menu.js"),
    Songsheets = require("./Songsheets.js");

var notes = [];
 for (var i = 0; i < 1000; i++) {
   notes.push(new Note(Math.floor(Math.random()*4)+1, i*250));
 }

var song1 = new Song(Songsheets.reptileNotes, "http://res.cloudinary.com/duaiko5rq/video/upload/v1463019949/Reptilia_spgcck.mp4", "Reptilia", "The Strokes");
var song2 = new Song(Songsheets.heyNotes, "http://res.cloudinary.com/duaiko5rq/video/upload/v1463019941/HEYEAYEAYEA_pplhmc.mp4", "HEYEAYEAYEA!", "HEYEAYEA");
var song3 = new Song(Songsheets.groovinNotes, "http://res.cloudinary.com/duaiko5rq/video/upload/v1463019944/groovin_magic_txsjil.mp4", "Groovin Magic", "Diebuster OST");
var song4 = new Song(Songsheets.takenNotes, "http://res.cloudinary.com/duaiko5rq/video/upload/v1463019953/TakeOnMe_nikzdh.mp4", "Take On Me", "A-HA");
var song5 = new Song(Songsheets.germanNotes, "http://res.cloudinary.com/duaiko5rq/video/upload/v1463020906/Luftballoons_bffcod.mp4", "99 Luftbaloons", "Nena");


var canvas = document.getElementById("game-canvas");
var context = canvas.getContext("2d");
context.font = "30px Verdana";
var menu = new Menu(context, [song1,song2, song3, song4, song5]);


menu.display();
