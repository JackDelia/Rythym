var Note = require('./Note.js');
var key = require("keymaster");


function createArrayCode(notesArray){
  var codeString = "var notes = [";
  notesArray.forEach(function(note){
    codeString += "new Note(" + note.button + ", " + note.time + "),\n";
  });

  codeString = codeString.substring(0, codeString.length-2);
  codeString += "];"
  return codeString;
}

function Song(notes, video, title) {
  this.notes = notes;
  this.video = document.getElementById("groovin");
  this.songPath = video;
  this.title = title;
  this.songTime = 0;
  this.score = 0;
  this.combo = 0;
}


Song.prototype.easify = function () {
  var easyNotes = [];
  this.notes.forEach(function(note, idx){
    if( idx === 0 || note.time-easyNotes[easyNotes.length-1].time > 500)
      easyNotes.push(note);
  }.bind(this));

  return new Song(easyNotes, this.songPath, this.title);

};

Song.prototype.drawUI = function(ctx){

  ctx.strokeStyle = "red";
  ctx.lineWidth = 9;
  ctx.fillStyle = "white";

  ctx.beginPath();
  var x = 100-20;
  var y = 50;
  ctx.moveTo(x,y);
  x = 100;
  y = 50-20;
  ctx.lineTo(x,y);
  y = 50-8;
  ctx.lineTo(x,y);
  x = 100+20;
  ctx.lineTo(x,y);
  y = 50+8;
  ctx.lineTo(x,y);
  x = 100;
  ctx.lineTo(x,y);
  y = 50+20;
  ctx.lineTo(x,y);
  y = 50;
  x = 100-20;
  ctx.lineTo(x,y);
  ctx.closePath();
  if(key.isPressed("left"))
    ctx.stroke();
  ctx.fill();

  ctx.beginPath();
  x = 200;
  y = 50-20;
  ctx.moveTo(x,y);
  x = 200-20;
  y = 50;
  ctx.lineTo(x,y);
  x = 200-8;
  ctx.lineTo(x,y);
  y = 50+20;
  ctx.lineTo(x,y);
  x = 200+8;
  ctx.lineTo(x,y);
  y = 50;
  ctx.lineTo(x,y);
  x = 200+20;
  ctx.lineTo(x,y);
  x = 200;
  y = 50-20;
  ctx.lineTo(x,y);
  ctx.closePath();
  if(key.isPressed("up"))
    ctx.stroke();
  ctx.fill();

  ctx.beginPath();
  x = 300;
  y = 50+20;
  ctx.moveTo(x,y);
  x = 300+20;
  y = 50;
  ctx.lineTo(x,y);
  x = 300+8;
  ctx.lineTo(x,y);
  y = 50-20;
  ctx.lineTo(x,y);
  x = 300-8;
  ctx.lineTo(x,y);
  y = 50;
  ctx.lineTo(x,y);
  x = 300-20;
  ctx.lineTo(x,y);
  x = 300;
  y = 50+20;
  ctx.lineTo(x,y);
  ctx.closePath();
  if(key.isPressed("down"))
    ctx.stroke();
  ctx.fill();


  ctx.beginPath();
  x = 400+20;
  var y = 50;
  ctx.moveTo(x,y);
  x = 400;
  y = 50+20;
  ctx.lineTo(x,y);
  y = 50+8;
  ctx.lineTo(x,y);
  x = 400-20;
  ctx.lineTo(x,y);
  y = 50-8;
  ctx.lineTo(x,y);
  x = 400;
  ctx.lineTo(x,y);
  y = 50-20;
  ctx.lineTo(x,y);
  y = 50;
  x = 400+20;
  ctx.lineTo(x,y);
  ctx.closePath();
  if(key.isPressed("right"))
    ctx.stroke();
  ctx.fill();
}

Song.prototype.hitNote = function (button) {
  var noteHit = this.notes.filter(function(note){
    return note.time-this.songTime < 300 &&  note.time-this.songTime > -100 &&
      note.button === button && !(note.hit);
  }.bind(this))[0];

  if(noteHit){
    noteHit.hitNote(this.songTime);
    this.score+=5*this.multiplier;
    this.combo++;
    if(this.combo === 10)
      this.multiplier = 2;
    if(this.combo === 20)
      this.multiplier = 3;
    if(this.combo === 30)
      this.multiplier = 4;
    if(this.combo === 40)
      this.multiplier = 5;
    if(this.combo === 50)
      this.multiplier = 6;

  } else {
    this.combo = 0;
    this.multiplier = 1;
    this.score -= 2;
  }

};

Song.prototype.playSong = function (ctx, callback) {
  this.multiplier = 1;
  this.score = 0;
  this.combo = 0;
  this.rebind();
  ctx.fillText("SCORE:", 510, 50);
  this.video.src = this.songPath;

  function songEnd() {
    clearInterval(this.songLoop);
    this.notes.forEach(function(note){
      note.hit = false;
    });
    this.video.removeEventListener("ended", ender);
    callback();
  }

  var ender = songEnd.bind(this);

  this.video.addEventListener("ended", ender);


  this.video.load();
  this.video.oncanplay = function(){

    var songStart = Date.now();
    this.songtime = 0;
    this.video.play();
    this.songLoop = setInterval(function(){
      ctx.fillStyle = "black";
      ctx.fillRect(500,0,2000,5000);
      ctx.drawImage(this.video,0,0,500,500);
      ctx.fillStyle = "white";
      ctx.fillText("SCORE: " + this.score, 550, 50);

      if(this.multiplier === 2)
        ctx.fillStyle = "red";
      if(this.multiplier === 3)
        ctx.fillStyle = "orange";
      if(this.multiplier === 4)
        ctx.fillStyle = "yellow";
      if(this.multiplier === 5)
        ctx.fillStyle = "blue";
      if(this.multiplier === 6)
        ctx.fillStyle = "purple";

      ctx.fillText("COMBO: " + this.combo, 550, 100);
      ctx.fillText("X" + this.multiplier, 600, 150);
      this.drawUI(ctx);
      this.notes.forEach(function(note){
        if(note.isVisible(this.songTime))
          note.draw(ctx, this.songTime);
        if(note.time-this.songTime < -100 && !(note.hit) &&
         !(this.songTime > this.notes[this.notes.length-1].time)){
          note.hit = true;
          this.combo = 0;
          this.multiplier = 1;
        }
      }.bind(this))
      this.songTime = Date.now()-songStart;
    }.bind(this), 0);
  }.bind(this);
};

Song.prototype.record = function (ctx) {
  var recordedNotes = [];
  this.rebindRecord(recordedNotes);
  this.video.src = this.songPath;
  this.video.addEventListener("ended", function(){
    clearInterval(this.songLoop);
    console.log(createArrayCode(recordedNotes));
  }.bind(this));
  this.songtime = 0;
  var songStart = Date.now();

  this.video.play();
  this.songLoop = setInterval(function(){
    ctx.drawImage(this.video,0,0,500,500);
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
};


Song.prototype.rebindRecord = function (arr) {
  key.unbind('left');
  key.unbind('up');
  key.unbind('down');
  key.unbind('right');

  key('left', function(){
    arr.push(new Note(1, this.songTime));
  }.bind(this));

  key('up', function(){
    arr.push(new Note(2, this.songTime));
  }.bind(this));

  key('down', function(){
    arr.push(new Note(3, this.songTime));
  }.bind(this));

  key('right', function(){
    arr.push(new Note(4, this.songTime));
  }.bind(this));
};


module.exports = Song;
