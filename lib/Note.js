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

Note.prototype.hitNote = function(){
  this.hit = true;
}

Note.prototype.draw = function (ctx, time) {
  if(this.hit)
    return;
  ctx.fillStyle = this.color;

  var xpos = STEP*this.button;
  var ypos = (this.time-time)*TIMESTEP;

  ctx.beginPath();

  if(this.button === 1){
    var x = xpos-20;
    var y = ypos;
    ctx.moveTo(x,y);
    x = xpos;
    y = ypos-20;
    ctx.lineTo(x,y);
    y = ypos-8;
    ctx.lineTo(x,y);
    x = xpos+20;
    ctx.lineTo(x,y);
    y = ypos+8;
    ctx.lineTo(x,y);
    x = xpos;
    ctx.lineTo(x,y);
    y = ypos+20;
    ctx.lineTo(x,y);
    y = ypos;
    x = xpos-20;
    ctx.lineTo(x,y);
  }

  if(this.button === 2){
    var x = xpos;
    var y = ypos-20;
    ctx.moveTo(x,y);
    x = xpos-20;
    y = ypos;
    ctx.lineTo(x,y);
    x = xpos-8;
    ctx.lineTo(x,y);
    y = ypos+20;
    ctx.lineTo(x,y);
    x = xpos+8;
    ctx.lineTo(x,y);
    y = ypos;
    ctx.lineTo(x,y);
    x = xpos+20;
    ctx.lineTo(x,y);
    x = xpos;
    y = ypos-20;
    ctx.lineTo(x,y);
  }

  if(this.button === 3){
    var x = xpos;
    var y = ypos+20;
    ctx.moveTo(x,y);
    x = xpos+20;
    y = ypos;
    ctx.lineTo(x,y);
    x = xpos+8;
    ctx.lineTo(x,y);
    y = ypos-20;
    ctx.lineTo(x,y);
    x = xpos-8;
    ctx.lineTo(x,y);
    y = ypos;
    ctx.lineTo(x,y);
    x = xpos-20;
    ctx.lineTo(x,y);
    x = xpos;
    y = ypos+20;
    ctx.lineTo(x,y);
  }

  if(this.button === 4){
    var x = xpos+20;
    var y = ypos;
    ctx.moveTo(x,y);
    x = xpos;
    y = ypos+20;
    ctx.lineTo(x,y);
    y = ypos+8;
    ctx.lineTo(x,y);
    x = xpos-20;
    ctx.lineTo(x,y);
    y = ypos-8;
    ctx.lineTo(x,y);
    x = xpos;
    ctx.lineTo(x,y);
    y = ypos-20;
    ctx.lineTo(x,y);
    y = ypos;
    x = xpos+20;
    ctx.lineTo(x,y);
  }

  ctx.closePath();

  ctx.fill();
};

Note.prototype.isVisible = function(time){
    return (this.time-time)*TIMESTEP < 500 && (this.time-time)*TIMESTEP > -100;
}

module.exports = Note;
