var Song = require('./Song.js');
var key = require("keymaster");

MENUSTEP = 100;


function Menu(context, songList) {
  this.context = context;
  this.songList = songList;
  this.selected = 0;
  this.easymodo = false;

  this.rebind();
}

Menu.prototype.rebind = function () {
  key.unbind('up');
  key.unbind('down');
  key.unbind('enter');

  key("enter", this.selectDifficulty.bind(this));
  key("r", this.recordSong.bind(this));
  key("down", this.switchTrack.bind(this, 1));
  key("up", this.switchTrack.bind(this, -1));
};

Menu.prototype.switchTrack = function (increment) {
  this.selected += increment;
  if(this.selected < 0)
    this.selected = 0;
  if(this.selected >= this.songList.length)
    this.selected = this.songList.length-1;
};

Menu.prototype.display = function(){
  this.rebind();
  this.menuLoop = setInterval(function(){
    this.context.fillStyle = "yellow";
    this.context.fillRect(0,0,500,500);
    this.songList.forEach(function(song, idx){
      if(this.selected === idx)
        this.context.fillStyle = "blue";
      else
        this.context.fillStyle = "black";

      this.context.fillText(song.title, 50, 50+idx*MENUSTEP);
    }.bind(this));
  }.bind(this), 10);

};

Menu.prototype.selectDifficulty = function () {
  clearInterval(this.menuLoop);

  key.unbind('up');
  key.unbind('down');
  key.unbind('enter');

  function switchDiff() {
    this.easymodo = !(this.easymodo);
  }

  setTimeout(function(){
  key("enter", this.selectSong.bind(this));
  }.bind(this),10);
  key("down", switchDiff.bind(this));
  key("up", switchDiff.bind(this));
  key("esc", function(){
    clearInterval(this.menuLoop);
    this.display();
  }.bind(this));

  this.menuLoop = setInterval(function(){
    this.context.fillStyle = "yellow";
    this.context.fillRect(0,0,500,500);
    if(this.easymodo)
      this.context.fillStyle = "blue";
    else
      this.context.fillStyle = "black";

    this.context.fillText("Easy", 50, 50);

    if(!this.easymodo)
      this.context.fillStyle = "blue";
    else
      this.context.fillStyle = "black";

    this.context.fillText("Hard", 50, 150);
  }.bind(this), 13);
};

Menu.prototype.selectSong = function () {
  key.unbind("enter");
  clearInterval(this.menuLoop);
  if(this.easymodo){
    var easymodo = this.songList[this.selected].easify();
    easymodo.playSong(this.context, this.display.bind(this));
  } else {
    this.songList[this.selected].playSong(this.context, this.display.bind(this));
  }
};

Menu.prototype.recordSong = function () {
  clearInterval(this.menuLoop);
  this.songList[this.selected].record(this.context);
};

module.exports = Menu;
