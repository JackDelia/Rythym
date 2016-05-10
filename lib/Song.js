var Note = require('./Note.js');
var key = require("keymaster");

function Song(notes, video, title) {
  this.notes = notes;
  this.video = document.getElementById("groovin");
  this.songPath = video;
  this.title = title;
  this.songTime = 0;
  this.score = 0;
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

Song.prototype.playSong = function (ctx, callback) {
  this.score = 0;
  this.rebind();
  ctx.fillText("SCORE:", 510, 50);
  this.video.src = this.songPath;
  this.video.addEventListener("ended", function(){
    clearInterval(this.songLoop);
    callback();
  }.bind(this));
  this.songtime = 0;
  var songStart = Date.now();

  this.video.play();
  this.songLoop = setInterval(function(){
    ctx.clearRect(650,0,200,200);
    ctx.drawImage(this.video,0,0,500,500);
    ctx.fillText(this.score, 650, 50);
    this.drawUI(ctx);
    this.notes.forEach(function(note){
      if(note.isVisible(this.songTime))
        note.draw(ctx, this.songTime);
    }.bind(this))
    this.songTime = Date.now()-songStart;
  }.bind(this), 0)
};

Song.prototype.rebind = function () {
  key.unbind('left');
  key.unbind('up');
  key.unbind('down');
  key.unbind('right');

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

  this.notes.forEach(function(note){
    note.hit = false;
  });
};

module.exports = Song;
