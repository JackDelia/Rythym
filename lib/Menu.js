var Song = require('./Song.js');
var key = require("keymaster");

MENUSTEP = 100;


function Menu(canvas, songList) {
  this.canvas = canvas;
  this.context = canvas.getContext("2d");
  this.songList = songList;
  this.selected = 0;
  this.selectedSong = 0;
  this.difficultyScreen = false;
  this.menuMax = 5;
  this.img = new Image;
  this.mouseMove = this.changeSelector.bind(this);
  this.mouseClick = this.selectDifficulty.bind(this);

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
  this.canvas.addEventListener("mousemove", this.mouseMove);
  this.canvas.addEventListener("click", this.mouseClick);
};

Menu.prototype.changeSelector = function(e){
  if(this.difficultyScreen){
    if (e.clientY > 300)
      this.selected = 1;
    else
      this.selected = 0;

    return;
  }
  this.selected = Math.floor(e.clientY / MENUSTEP)-1;
  if(this.selected >= this.menuMax)
    this.selected = this.menuMax-1;
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
  this.menuMax = 5;
  this.difficultyScreen = false;

  this.menuLoop = setInterval(function(){
    var selectedSong = this.songList[this.selected];

    this.context.fillStyle = "yellow";
    this.context.fillRect(0,0,500,500);
    this.context.fillStyle = "black";
    this.context.fillRect(500,0,2000,5000);

    this.context.fillStyle = "white";
    this.context.fillText("HIGHSCORE: "+ selectedSong.highScore, 510, 400);
    this.context.fillText("Skill Level: " + selectedSong.level, 510, 450)

    this.img.src = selectedSong.thumbnail;
    this.context.drawImage(this.img,500,0,350,350);

    this.songList.forEach(function(song, idx){
      var xpos = 50;
      if(this.selected === idx){
        this.context.fillStyle = "blue";
        xpos += 50;
      }
      else
        this.context.fillStyle = "black";

      this.context.fillText(song.title, xpos, 50+idx*MENUSTEP);
      this.context.font = "15px Play";
      this.context.fillText(song.band, xpos, 75+idx*MENUSTEP);
      this.context.font = "30px Play";
    }.bind(this));
  }.bind(this), 10);

};

Menu.prototype.selectDifficulty = function () {
  if(this.difficultyScreen){
    console.log("here");
    this.selectSong();
    return;
  }
  clearInterval(this.menuLoop);
  this.difficultyScreen = true;

  this.selectedSong = this.selected;
  this.selected = 0;
  this.menuMax = 2;

  key.unbind('up');
  key.unbind('down');
  key.unbind('enter');
  key.unbind('esc');


  function switchDiff(increment) {
    this.selected += increment;
    if(this.selected < 0)
      this.selected = 1;
    this.selected = this.selected % 2;
  }

  setTimeout(function(){
  key("enter", this.selectSong.bind(this));
  }.bind(this),10);
  key("down", switchDiff.bind(this, 1));
  key("up", switchDiff.bind(this, -1));
  key("esc", function(){
    clearInterval(this.menuLoop);
    this.display();
  }.bind(this));

  this.menuLoop = setInterval(function(){
    this.context.fillStyle = "yellow";
    this.context.fillRect(0,0,500,500);
    this.context.fillStyle = "black"
    this.context.fillText("Select Difficulty", 150, 50);

    if(this.selected === 0)
      this.context.fillStyle = "blue";
    else
      this.context.fillStyle = "black";

    this.context.fillText("Easy", 50, 150);

    if(this.selected === 1)
      this.context.fillStyle = "blue";
    else
      this.context.fillStyle = "black";

    this.context.fillText("Hard", 50, 250);
  }.bind(this), 13);
};

Menu.prototype.selectSong = function () {
  key.unbind("enter");
  this.canvas.removeEventListener("mousemove", this.mouseMove);
  this.canvas.removeEventListener("click", this.mouseClick);
  clearInterval(this.menuLoop);
  if(this.selected === 0){
    this.songList[this.selectedSong].easify();
    var easymodo = this.songList[this.selectedSong].easy;
    easymodo.playSong(this.context, this.display.bind(this));
  } else {
    this.songList[this.selectedSong].playSong(this.context, this.display.bind(this));
  }
};

Menu.prototype.recordSong = function () {
  clearInterval(this.menuLoop);
  this.songList[this.selectedSong].record(this.context);
};

module.exports = Menu;
