var Note = require('./Note.js');
var key = require("keymaster");

function Song(notes, video) {
  this.notes = notes;
  this.video = video;
  this.songTime = 0;
  this.score = 0;
  key('left', function(){
    this.hitNote(1);
  }.bind(this));

  key('up', function(){
    this.hitNote(2);
  }.bind(this));

  key('down', function(){
    this.hitNote(3);
  }.bind(this));

  key('right', function(){
    this.hitNote(4);
  }.bind(this));
}

Song.prototype.drawUI = function(ctx){
  ctx.fillStyle = "white";
  ctx.beginPath();
  for(var i = 1; i<=4; i++){
    ctx.arc(
      i*100,
      50,
      20,
      0,
      2 * Math.PI,
      false
    );
  }
  ctx.fill();
}

Song.prototype.hitNote = function (button) {
  var noteHit = this.notes.filter(function(note){
    return note.time-this.songTime < 300 &&  note.time-this.songTime > -300 &&
      note.button === button && !(note.hit);
  }.bind(this))[0];

  if(noteHit){
    noteHit.hitNote();
    this.score+=5;
  }
};

Song.prototype.playSong = function (ctx) {
  var songLoop = setInterval(function(){
    ctx.clearRect(650,0,200,200);
    ctx.drawImage(this.video,0,0,500,500);
    ctx.fillText(this.score, 650, 50);
    this.drawUI(ctx);
    this.notes.forEach(function(note){
      if(note.isVisible(this.songTime))
        note.draw(ctx, this.songTime);
    }.bind(this))
    this.songTime += 5;
  }.bind(this), 5)
};

module.exports = Song;
