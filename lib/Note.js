var STEP = 100;
var TIMESTEP = .5;

function Note(button, time, duration) {
  this.button = button;
  this.time = time;
  this.hit = false;
  switch (button) {
    case 1:
      this.color = "blue";
      break;
    case 2:
      this.color = "green";
      break;
    case 3:
      this.color = "yellow";
      break;
    case 4:
      this.color = "red";
      break;
  }
  if(duration)
    this.duration = duration;
  else
    this.duration = 0;
}

Note.prototype.hitNote = function(hitTime){
  this.hit = true;
  this.hitTime = hitTime;
}

Note.prototype.draw = function (ctx, time) {

  var noteSize = 40;

  if(this.hit){
    if(!this.hitTime || time-this.hitTime > 120){
      return;
    }
    else {
      var progress = (time-this.hitTime)/120;
      ctx.globalAlpha = 1-progress;
      noteSize = 40 + progress*100;
    }
  }

  ctx.fillStyle = this.color;

  var xpos = STEP*this.button;
  var ypos = (this.time-time)*TIMESTEP;

  ctx.beginPath();

  if(this.button === 1){
    var x = xpos-.5*noteSize;
    var y = ypos;
    ctx.moveTo(x,y);
    x = xpos;
    y = ypos-.5*noteSize;
    ctx.lineTo(x,y);
    y = ypos-.2*noteSize;
    ctx.lineTo(x,y);
    x = xpos+.5*noteSize;
    ctx.lineTo(x,y);
    y = ypos+.2*noteSize;
    ctx.lineTo(x,y);
    x = xpos;
    ctx.lineTo(x,y);
    y = ypos+.5*noteSize;
    ctx.lineTo(x,y);
    y = ypos;
    x = xpos-.5*noteSize;
    ctx.lineTo(x,y);
  }

  if(this.button === 2){
    var x = xpos;
    var y = ypos-.5*noteSize;
    ctx.moveTo(x,y);
    x = xpos-.5*noteSize;
    y = ypos;
    ctx.lineTo(x,y);
    x = xpos-.2*noteSize;
    ctx.lineTo(x,y);
    y = ypos+.5*noteSize;
    ctx.lineTo(x,y);
    x = xpos+.2*noteSize;
    ctx.lineTo(x,y);
    y = ypos;
    ctx.lineTo(x,y);
    x = xpos+.5*noteSize;
    ctx.lineTo(x,y);
    x = xpos;
    y = ypos-.5*noteSize;
    ctx.lineTo(x,y);
  }

  if(this.button === 3){
    var x = xpos;
    var y = ypos+.5*noteSize;
    ctx.moveTo(x,y);
    x = xpos+.5*noteSize;
    y = ypos;
    ctx.lineTo(x,y);
    x = xpos+.2*noteSize;
    ctx.lineTo(x,y);
    y = ypos-.5*noteSize;
    ctx.lineTo(x,y);
    x = xpos-.2*noteSize;
    ctx.lineTo(x,y);
    y = ypos;
    ctx.lineTo(x,y);
    x = xpos-.5*noteSize;
    ctx.lineTo(x,y);
    x = xpos;
    y = ypos+.5*noteSize;
    ctx.lineTo(x,y);
  }

  if(this.button === 4){
    var x = xpos+.5*noteSize;
    var y = ypos;
    ctx.moveTo(x,y);
    x = xpos;
    y = ypos+.5*noteSize;
    ctx.lineTo(x,y);
    y = ypos+.2*noteSize;
    ctx.lineTo(x,y);
    x = xpos-.5*noteSize;
    ctx.lineTo(x,y);
    y = ypos-.2*noteSize;
    ctx.lineTo(x,y);
    x = xpos;
    ctx.lineTo(x,y);
    y = ypos-.5*noteSize;
    ctx.lineTo(x,y);
    y = ypos;
    x = xpos+.5*noteSize;
    ctx.lineTo(x,y);
  }

  ctx.closePath();

  ctx.fill();
  ctx.globalAlpha = 1;
};

Note.prototype.isVisible = function(time){
    return (this.time-time)*TIMESTEP < 500 && (this.time-time)*TIMESTEP > -100;
}

module.exports = Note;
