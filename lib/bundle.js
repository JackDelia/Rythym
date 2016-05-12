/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Note = __webpack_require__(1),
	    Song = __webpack_require__(2),
	    Menu = __webpack_require__(4),
	    Songsheets = __webpack_require__(5);
	
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


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Note = __webpack_require__(1);
	var key = __webpack_require__(3);
	
	
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	//     keymaster.js
	//     (c) 2011-2013 Thomas Fuchs
	//     keymaster.js may be freely distributed under the MIT license.
	
	;(function(global){
	  var k,
	    _handlers = {},
	    _mods = { 16: false, 18: false, 17: false, 91: false },
	    _scope = 'all',
	    // modifier keys
	    _MODIFIERS = {
	      '⇧': 16, shift: 16,
	      '⌥': 18, alt: 18, option: 18,
	      '⌃': 17, ctrl: 17, control: 17,
	      '⌘': 91, command: 91
	    },
	    // special keys
	    _MAP = {
	      backspace: 8, tab: 9, clear: 12,
	      enter: 13, 'return': 13,
	      esc: 27, escape: 27, space: 32,
	      left: 37, up: 38,
	      right: 39, down: 40,
	      del: 46, 'delete': 46,
	      home: 36, end: 35,
	      pageup: 33, pagedown: 34,
	      ',': 188, '.': 190, '/': 191,
	      '`': 192, '-': 189, '=': 187,
	      ';': 186, '\'': 222,
	      '[': 219, ']': 221, '\\': 220
	    },
	    code = function(x){
	      return _MAP[x] || x.toUpperCase().charCodeAt(0);
	    },
	    _downKeys = [];
	
	  for(k=1;k<20;k++) _MAP['f'+k] = 111+k;
	
	  // IE doesn't support Array#indexOf, so have a simple replacement
	  function index(array, item){
	    var i = array.length;
	    while(i--) if(array[i]===item) return i;
	    return -1;
	  }
	
	  // for comparing mods before unassignment
	  function compareArray(a1, a2) {
	    if (a1.length != a2.length) return false;
	    for (var i = 0; i < a1.length; i++) {
	        if (a1[i] !== a2[i]) return false;
	    }
	    return true;
	  }
	
	  var modifierMap = {
	      16:'shiftKey',
	      18:'altKey',
	      17:'ctrlKey',
	      91:'metaKey'
	  };
	  function updateModifierKey(event) {
	      for(k in _mods) _mods[k] = event[modifierMap[k]];
	  };
	
	  // handle keydown event
	  function dispatch(event) {
	    var key, handler, k, i, modifiersMatch, scope;
	    key = event.keyCode;
	
	    if (index(_downKeys, key) == -1) {
	        _downKeys.push(key);
	    }
	
	    // if a modifier key, set the key.<modifierkeyname> property to true and return
	    if(key == 93 || key == 224) key = 91; // right command on webkit, command on Gecko
	    if(key in _mods) {
	      _mods[key] = true;
	      // 'assignKey' from inside this closure is exported to window.key
	      for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = true;
	      return;
	    }
	    updateModifierKey(event);
	
	    // see if we need to ignore the keypress (filter() can can be overridden)
	    // by default ignore key presses if a select, textarea, or input is focused
	    if(!assignKey.filter.call(this, event)) return;
	
	    // abort if no potentially matching shortcuts found
	    if (!(key in _handlers)) return;
	
	    scope = getScope();
	
	    // for each potential shortcut
	    for (i = 0; i < _handlers[key].length; i++) {
	      handler = _handlers[key][i];
	
	      // see if it's in the current scope
	      if(handler.scope == scope || handler.scope == 'all'){
	        // check if modifiers match if any
	        modifiersMatch = handler.mods.length > 0;
	        for(k in _mods)
	          if((!_mods[k] && index(handler.mods, +k) > -1) ||
	            (_mods[k] && index(handler.mods, +k) == -1)) modifiersMatch = false;
	        // call the handler and stop the event if neccessary
	        if((handler.mods.length == 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91]) || modifiersMatch){
	          if(handler.method(event, handler)===false){
	            if(event.preventDefault) event.preventDefault();
	              else event.returnValue = false;
	            if(event.stopPropagation) event.stopPropagation();
	            if(event.cancelBubble) event.cancelBubble = true;
	          }
	        }
	      }
	    }
	  };
	
	  // unset modifier keys on keyup
	  function clearModifier(event){
	    var key = event.keyCode, k,
	        i = index(_downKeys, key);
	
	    // remove key from _downKeys
	    if (i >= 0) {
	        _downKeys.splice(i, 1);
	    }
	
	    if(key == 93 || key == 224) key = 91;
	    if(key in _mods) {
	      _mods[key] = false;
	      for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = false;
	    }
	  };
	
	  function resetModifiers() {
	    for(k in _mods) _mods[k] = false;
	    for(k in _MODIFIERS) assignKey[k] = false;
	  };
	
	  // parse and assign shortcut
	  function assignKey(key, scope, method){
	    var keys, mods;
	    keys = getKeys(key);
	    if (method === undefined) {
	      method = scope;
	      scope = 'all';
	    }
	
	    // for each shortcut
	    for (var i = 0; i < keys.length; i++) {
	      // set modifier keys if any
	      mods = [];
	      key = keys[i].split('+');
	      if (key.length > 1){
	        mods = getMods(key);
	        key = [key[key.length-1]];
	      }
	      // convert to keycode and...
	      key = key[0]
	      key = code(key);
	      // ...store handler
	      if (!(key in _handlers)) _handlers[key] = [];
	      _handlers[key].push({ shortcut: keys[i], scope: scope, method: method, key: keys[i], mods: mods });
	    }
	  };
	
	  // unbind all handlers for given key in current scope
	  function unbindKey(key, scope) {
	    var multipleKeys, keys,
	      mods = [],
	      i, j, obj;
	
	    multipleKeys = getKeys(key);
	
	    for (j = 0; j < multipleKeys.length; j++) {
	      keys = multipleKeys[j].split('+');
	
	      if (keys.length > 1) {
	        mods = getMods(keys);
	        key = keys[keys.length - 1];
	      }
	
	      key = code(key);
	
	      if (scope === undefined) {
	        scope = getScope();
	      }
	      if (!_handlers[key]) {
	        return;
	      }
	      for (i = 0; i < _handlers[key].length; i++) {
	        obj = _handlers[key][i];
	        // only clear handlers if correct scope and mods match
	        if (obj.scope === scope && compareArray(obj.mods, mods)) {
	          _handlers[key][i] = {};
	        }
	      }
	    }
	  };
	
	  // Returns true if the key with code 'keyCode' is currently down
	  // Converts strings into key codes.
	  function isPressed(keyCode) {
	      if (typeof(keyCode)=='string') {
	        keyCode = code(keyCode);
	      }
	      return index(_downKeys, keyCode) != -1;
	  }
	
	  function getPressedKeyCodes() {
	      return _downKeys.slice(0);
	  }
	
	  function filter(event){
	    var tagName = (event.target || event.srcElement).tagName;
	    // ignore keypressed in any elements that support keyboard data input
	    return !(tagName == 'INPUT' || tagName == 'SELECT' || tagName == 'TEXTAREA');
	  }
	
	  // initialize key.<modifier> to false
	  for(k in _MODIFIERS) assignKey[k] = false;
	
	  // set current scope (default 'all')
	  function setScope(scope){ _scope = scope || 'all' };
	  function getScope(){ return _scope || 'all' };
	
	  // delete all handlers for a given scope
	  function deleteScope(scope){
	    var key, handlers, i;
	
	    for (key in _handlers) {
	      handlers = _handlers[key];
	      for (i = 0; i < handlers.length; ) {
	        if (handlers[i].scope === scope) handlers.splice(i, 1);
	        else i++;
	      }
	    }
	  };
	
	  // abstract key logic for assign and unassign
	  function getKeys(key) {
	    var keys;
	    key = key.replace(/\s/g, '');
	    keys = key.split(',');
	    if ((keys[keys.length - 1]) == '') {
	      keys[keys.length - 2] += ',';
	    }
	    return keys;
	  }
	
	  // abstract mods logic for assign and unassign
	  function getMods(key) {
	    var mods = key.slice(0, key.length - 1);
	    for (var mi = 0; mi < mods.length; mi++)
	    mods[mi] = _MODIFIERS[mods[mi]];
	    return mods;
	  }
	
	  // cross-browser events
	  function addEvent(object, event, method) {
	    if (object.addEventListener)
	      object.addEventListener(event, method, false);
	    else if(object.attachEvent)
	      object.attachEvent('on'+event, function(){ method(window.event) });
	  };
	
	  // set the handlers globally on document
	  addEvent(document, 'keydown', function(event) { dispatch(event) }); // Passing _scope to a callback to ensure it remains the same by execution. Fixes #48
	  addEvent(document, 'keyup', clearModifier);
	
	  // reset modifiers to false whenever the window is (re)focused.
	  addEvent(window, 'focus', resetModifiers);
	
	  // store previously defined key
	  var previousKey = global.key;
	
	  // restore previously defined key and return reference to our key object
	  function noConflict() {
	    var k = global.key;
	    global.key = previousKey;
	    return k;
	  }
	
	  // set window.key and window.key.set/get/deleteScope, and the default filter
	  global.key = assignKey;
	  global.key.setScope = setScope;
	  global.key.getScope = getScope;
	  global.key.deleteScope = deleteScope;
	  global.key.filter = filter;
	  global.key.isPressed = isPressed;
	  global.key.getPressedKeyCodes = getPressedKeyCodes;
	  global.key.noConflict = noConflict;
	  global.key.unbind = unbindKey;
	
	  if(true) module.exports = assignKey;
	
	})(this);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Song = __webpack_require__(2);
	var key = __webpack_require__(3);
	
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
	      var xpos = 50;
	      if(this.selected === idx){
	        this.context.fillStyle = "blue";
	        xpos += 50;
	      }
	      else
	        this.context.fillStyle = "black";
	
	      this.context.fillText(song.title, xpos, 50+idx*MENUSTEP);
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
	    this.context.fillStyle = "black"
	    this.context.fillText("Select Difficulty", 150, 50);
	
	    if(this.easymodo)
	      this.context.fillStyle = "blue";
	    else
	      this.context.fillStyle = "black";
	
	    this.context.fillText("Easy", 50, 150);
	
	    if(!this.easymodo)
	      this.context.fillStyle = "blue";
	    else
	      this.context.fillStyle = "black";
	
	    this.context.fillText("Hard", 50, 250);
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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Note = __webpack_require__(1);
	
	module.exports = {
	  reptileNotes: [new Note(2, 1695),
	new Note(2, 1965),
	new Note(1, 2224),
	new Note(2, 2909),
	new Note(1, 3060),
	new Note(2, 3418),
	new Note(4, 3790),
	new Note(2, 4411),
	new Note(2, 4972),
	new Note(1, 5306),
	new Note(2, 5985),
	new Note(1, 6148),
	new Note(2, 6494),
	new Note(4, 6827),
	new Note(2, 7390),
	new Note(4, 7559),
	new Note(2, 7922),
	new Note(1, 8286),
	new Note(2, 8934),
	new Note(1, 9081),
	new Note(2, 9505),
	new Note(4, 9849),
	new Note(2, 10411),
	new Note(4, 10582),
	new Note(2, 11001),
	new Note(1, 11407),
	new Note(2, 12044),
	new Note(1, 12209),
	new Note(2, 12561),
	new Note(4, 12861),
	new Note(2, 13503),
	new Note(4, 13644),
	new Note(2, 14114),
	new Note(2, 14254),
	new Note(2, 14608),
	new Note(1, 14790),
	new Note(4, 15156),
	new Note(2, 15603),
	new Note(2, 15777),
	new Note(2, 16142),
	new Note(1, 16323),
	new Note(1, 16776),
	new Note(1, 17156),
	new Note(1, 17384),
	new Note(1, 17678),
	new Note(2, 17779),
	new Note(4, 18196),
	new Note(1, 18640),
	new Note(1, 18818),
	new Note(1, 19222),
	new Note(2, 19381),
	new Note(4, 19694),
	new Note(2, 20124),
	new Note(2, 20349),
	new Note(2, 20718),
	new Note(1, 20898),
	new Note(4, 21266),
	new Note(2, 21668),
	new Note(2, 21860),
	new Note(2, 22215),
	new Note(1, 22407),
	new Note(4, 22752),
	new Note(1, 23173),
	new Note(1, 23324),
	new Note(1, 23745),
	new Note(2, 23943),
	new Note(4, 24255),
	new Note(1, 24700),
	new Note(1, 24883),
	new Note(1, 25220),
	new Note(2, 25398),
	new Note(4, 25766),
	new Note(2, 26224),
	new Note(2, 26404),
	new Note(2, 26795),
	new Note(1, 26967),
	new Note(4, 27360),
	new Note(2, 27752),
	new Note(2, 27934),
	new Note(2, 28315),
	new Note(1, 28511),
	new Note(4, 28846),
	new Note(1, 29376),
	new Note(1, 29496),
	new Note(1, 29838),
	new Note(2, 30028),
	new Note(4, 30345),
	new Note(1, 30782),
	new Note(1, 30962),
	new Note(1, 31339),
	new Note(2, 31494),
	new Note(4, 31867),
	new Note(2, 32287),
	new Note(2, 32448),
	new Note(2, 32865),
	new Note(1, 33063),
	new Note(4, 33469),
	new Note(2, 33818),
	new Note(2, 33983),
	new Note(2, 34353),
	new Note(1, 34529),
	new Note(4, 34876),
	new Note(1, 35398),
	new Note(1, 35565),
	new Note(1, 35901),
	new Note(2, 36117),
	new Note(4, 36471),
	new Note(1, 36872),
	new Note(1, 37033),
	new Note(1, 37416),
	new Note(2, 37665),
	new Note(4, 37977),
	new Note(2, 38347),
	new Note(2, 38523),
	new Note(2, 38870),
	new Note(1, 39059),
	new Note(4, 39430),
	new Note(2, 39870),
	new Note(2, 40050),
	new Note(2, 40450),
	new Note(1, 40615),
	new Note(4, 40957),
	new Note(1, 41459),
	new Note(1, 41607),
	new Note(1, 41965),
	new Note(2, 42129),
	new Note(4, 42460),
	new Note(1, 42902),
	new Note(1, 43103),
	new Note(1, 43503),
	new Note(2, 43672),
	new Note(4, 43983),
	new Note(2, 44377),
	new Note(2, 44549),
	new Note(2, 44984),
	new Note(1, 45165),
	new Note(4, 45558),
	new Note(2, 45948),
	new Note(2, 46109),
	new Note(2, 46525),
	new Note(1, 46700),
	new Note(4, 47068),
	new Note(1, 47466),
	new Note(1, 47633),
	new Note(1, 48059),
	new Note(2, 48222),
	new Note(4, 48541),
	new Note(1, 49001),
	new Note(1, 49163),
	new Note(1, 49544),
	new Note(2, 49704),
	new Note(4, 50042),
	new Note(2, 50515),
	new Note(2, 50669),
	new Note(2, 51068),
	new Note(1, 51269),
	new Note(4, 51600),
	new Note(2, 52022),
	new Note(2, 52200),
	new Note(2, 52539),
	new Note(1, 52676),
	new Note(4, 53104),
	new Note(1, 53566),
	new Note(1, 53715),
	new Note(1, 54159),
	new Note(2, 54310),
	new Note(4, 54660),
	new Note(1, 55094),
	new Note(1, 55261),
	new Note(1, 55645),
	new Note(2, 55825),
	new Note(4, 56198),
	new Note(2, 56571),
	new Note(2, 56742),
	new Note(2, 57152),
	new Note(1, 57304),
	new Note(4, 57730),
	new Note(2, 58094),
	new Note(2, 58280),
	new Note(2, 58661),
	new Note(1, 58837),
	new Note(4, 59219),
	new Note(1, 59683),
	new Note(1, 59833),
	new Note(1, 60196),
	new Note(2, 60345),
	new Note(4, 60741),
	new Note(2, 61143),
	new Note(2, 61305),
	new Note(2, 61740),
	new Note(2, 61949),
	new Note(4, 62209),
	new Note(1, 62742),
	new Note(1, 62891),
	new Note(2, 63281),
	new Note(2, 63432),
	new Note(2, 63595),
	new Note(2, 63772),
	new Note(2, 63899),
	new Note(2, 64114),
	new Note(2, 64301),
	new Note(2, 64464),
	new Note(2, 64636),
	new Note(2, 64876),
	new Note(2, 65055),
	new Note(2, 65176),
	new Note(2, 65356),
	new Note(3, 65685),
	new Note(3, 65895),
	new Note(3, 66075),
	new Note(3, 66267),
	new Note(3, 66463),
	new Note(3, 66647),
	new Note(3, 66820),
	new Note(3, 66998),
	new Note(3, 67178),
	new Note(3, 67353),
	new Note(3, 67527),
	new Note(3, 67692),
	new Note(3, 67868),
	new Note(3, 68044),
	new Note(3, 68228),
	new Note(3, 68409),
	new Note(3, 68526),
	new Note(1, 68769),
	new Note(1, 68955),
	new Note(1, 69148),
	new Note(1, 69344),
	new Note(1, 69533),
	new Note(1, 69727),
	new Note(1, 69951),
	new Note(1, 70134),
	new Note(1, 70298),
	new Note(1, 70453),
	new Note(1, 70637),
	new Note(1, 70816),
	new Note(1, 70999),
	new Note(1, 71154),
	new Note(1, 71300),
	new Note(1, 71464),
	new Note(4, 71941),
	new Note(4, 72121),
	new Note(4, 72306),
	new Note(4, 72470),
	new Note(4, 72643),
	new Note(4, 72818),
	new Note(4, 72993),
	new Note(4, 73167),
	new Note(4, 73331),
	new Note(4, 73506),
	new Note(4, 73685),
	new Note(4, 73851),
	new Note(4, 74017),
	new Note(4, 74190),
	new Note(4, 74368),
	new Note(4, 74532),
	new Note(4, 74687),
	new Note(2, 74894),
	new Note(2, 75072),
	new Note(2, 75235),
	new Note(1, 75477),
	new Note(1, 75653),
	new Note(1, 75832),
	new Note(4, 76140),
	new Note(4, 76365),
	new Note(4, 76517),
	new Note(3, 76937),
	new Note(3, 77127),
	new Note(3, 77339),
	new Note(1, 77683),
	new Note(1, 77898),
	new Note(1, 78076),
	new Note(2, 78426),
	new Note(2, 78623),
	new Note(2, 78769),
	new Note(4, 79203),
	new Note(4, 79410),
	new Note(4, 79619),
	new Note(1, 79992),
	new Note(1, 80156),
	new Note(1, 80329),
	new Note(3, 80896),
	new Note(3, 81081),
	new Note(3, 81294),
	new Note(1, 81614),
	new Note(1, 81766),
	new Note(2, 82337),
	new Note(2, 82493),
	new Note(2, 82686),
	new Note(4, 83023),
	new Note(4, 83197),
	new Note(4, 83459),
	new Note(1, 83835),
	new Note(1, 84002),
	new Note(1, 84191),
	new Note(2, 84528),
	new Note(2, 84689),
	new Note(2, 84864),
	new Note(3, 85278),
	new Note(3, 85463),
	new Note(3, 85622),
	new Note(1, 86086),
	new Note(1, 86247),
	new Note(1, 86425),
	new Note(2, 87052),
	new Note(2, 87250),
	new Note(1, 87474),
	new Note(3, 87703),
	new Note(3, 87874),
	new Note(3, 88051),
	new Note(1, 88314),
	new Note(1, 88506),
	new Note(1, 88676),
	new Note(4, 88982),
	new Note(4, 89156),
	new Note(4, 89309),
	new Note(2, 89869),
	new Note(1, 90122),
	new Note(3, 90352),
	new Note(2, 90855),
	new Note(2, 91201),
	new Note(2, 91551),
	new Note(1, 91930),
	new Note(4, 92330),
	new Note(2, 92733),
	new Note(2, 93111),
	new Note(1, 93501),
	new Note(3, 93879),
	new Note(4, 94275),
	new Note(4, 94636),
	new Note(4, 94992),
	new Note(2, 95391),
	new Note(1, 95785),
	new Note(2, 96182),
	new Note(4, 96488),
	new Note(1, 96888),
	new Note(2, 97229),
	new Note(4, 97625),
	new Note(2, 97984),
	new Note(1, 98353),
	new Note(2, 98758),
	new Note(4, 99112),
	new Note(2, 99553),
	new Note(2, 99896),
	new Note(2, 100314),
	new Note(1, 100701),
	new Note(2, 101080),
	new Note(4, 101464),
	new Note(1, 101860),
	new Note(2, 102197),
	new Note(3, 102626),
	new Note(2, 103050),
	new Note(1, 103351),
	new Note(4, 103744),
	new Note(2, 104141),
	new Note(2, 104518),
	new Note(1, 104893),
	new Note(2, 105274),
	new Note(4, 105652),
	new Note(2, 106037),
	new Note(1, 106474),
	new Note(2, 106813),
	new Note(4, 107199),
	new Note(1, 107543),
	new Note(2, 107904),
	new Note(3, 108258),
	new Note(2, 108626),
	new Note(1, 109026),
	new Note(4, 109430),
	new Note(2, 109767),
	new Note(1, 110128),
	new Note(2, 110524),
	new Note(4, 110734),
	new Note(1, 111036),
	new Note(2, 111250),
	new Note(1, 111669),
	new Note(2, 111931),
	new Note(4, 112147),
	new Note(1, 112438),
	new Note(2, 112686),
	new Note(4, 112943),
	new Note(1, 113215),
	new Note(2, 113474),
	new Note(1, 113747),
	new Note(1, 114342),
	new Note(4, 114650),
	new Note(1, 114955),
	new Note(4, 115227),
	new Note(1, 115446),
	new Note(4, 115730),
	new Note(1, 115908),
	new Note(4, 116158),
	new Note(1, 116428),
	new Note(2, 116664),
	new Note(1, 116899),
	new Note(2, 117232),
	new Note(1, 117493),
	new Note(4, 117837),
	new Note(1, 118015),
	new Note(4, 118255),
	new Note(1, 118492),
	new Note(4, 118754),
	new Note(1, 118998),
	new Note(4, 119271),
	new Note(1, 119436),
	new Note(2, 119669),
	new Note(4, 119884),
	new Note(2, 120162),
	new Note(4, 120420),
	new Note(1, 120686),
	new Note(4, 120828),
	new Note(1, 121082),
	new Note(4, 121269),
	new Note(1, 121514),
	new Note(4, 121712),
	new Note(1, 121971),
	new Note(2, 122154),
	new Note(1, 122470),
	new Note(2, 122651),
	new Note(1, 123374),
	new Note(4, 123695),
	new Note(1, 123803),
	new Note(4, 123936),
	new Note(1, 124006),
	new Note(1, 124180),
	new Note(2, 124313),
	new Note(2, 124510),
	new Note(1, 124898),
	new Note(4, 125219),
	new Note(1, 125341),
	new Note(4, 125463),
	new Note(1, 125545),
	new Note(1, 125660),
	new Note(2, 125781),
	new Note(1, 126043),
	new Note(4, 126403),
	new Note(4, 126688),
	new Note(2, 126894),
	new Note(2, 127220),
	new Note(1, 127281),
	new Note(2, 127374),
	new Note(1, 127490),
	new Note(4, 127834),
	new Note(4, 128291),
	new Note(2, 128494),
	new Note(2, 128674),
	new Note(1, 128771),
	new Note(2, 128892),
	new Note(2, 129189),
	new Note(4, 129491),
	new Note(2, 129872),
	new Note(1, 130074),
	new Note(3, 130416),
	new Note(4, 130640),
	new Note(1, 130897),
	new Note(4, 131159),
	new Note(1, 131353),
	new Note(4, 131676),
	new Note(1, 131886),
	new Note(4, 132143),
	new Note(1, 132363),
	new Note(2, 132622),
	new Note(1, 132840),
	new Note(2, 133092),
	new Note(1, 133287),
	new Note(2, 133470),
	new Note(4, 133670),
	new Note(2, 133868),
	new Note(2, 134101),
	new Note(4, 134169),
	new Note(4, 134669),
	new Note(4, 134696),
	new Note(2, 136486),
	new Note(2, 136716),
	new Note(2, 136902),
	new Note(1, 137243),
	new Note(4, 137529),
	new Note(2, 138362),
	new Note(2, 138723),
	new Note(2, 139023),
	new Note(1, 139333),
	new Note(4, 139736),
	new Note(2, 140387),
	new Note(2, 140886),
	new Note(2, 140913),
	new Note(2, 140952),
	new Note(2, 140981),
	new Note(1, 141676),
	new Note(4, 142133),
	new Note(2, 142806),
	new Note(1, 143141),
	new Note(1, 143733),
	new Note(1, 144373),
	new Note(4, 144721),
	new Note(4, 145304),
	new Note(2, 145906),
	new Note(2, 146257),
	new Note(2, 146834),
	new Note(2, 147895),
	new Note(2, 148054),
	new Note(2, 148257),
	new Note(2, 148497),
	new Note(2, 148721),
	new Note(2, 148943),
	new Note(2, 149123),
	new Note(2, 149346),
	new Note(2, 149544),
	new Note(2, 149748),
	new Note(2, 149938),
	new Note(2, 150145),
	new Note(2, 150341),
	new Note(2, 150521),
	new Note(2, 150666),
	new Note(1, 150902),
	new Note(1, 151103),
	new Note(1, 151302),
	new Note(1, 151494),
	new Note(1, 151687),
	new Note(1, 151869),
	new Note(1, 152026),
	new Note(1, 152196),
	new Note(1, 152357),
	new Note(1, 152537),
	new Note(1, 152709),
	new Note(1, 152863),
	new Note(1, 153035),
	new Note(1, 153191),
	new Note(1, 153372),
	new Note(1, 153530),
	new Note(1, 153711),
	new Note(4, 153921),
	new Note(4, 154121),
	new Note(4, 154288),
	new Note(4, 154442),
	new Note(4, 154613),
	new Note(4, 154803),
	new Note(4, 154978),
	new Note(4, 155157),
	new Note(4, 155316),
	new Note(2, 155472),
	new Note(2, 155693),
	new Note(2, 155926),
	new Note(2, 156108),
	new Note(2, 156300),
	new Note(2, 156442),
	new Note(1, 156681),
	new Note(1, 156890),
	new Note(1, 157073),
	new Note(1, 157246),
	new Note(1, 157411),
	new Note(1, 157572),
	new Note(1, 157734),
	new Note(1, 157889),
	new Note(4, 158145),
	new Note(4, 158328),
	new Note(4, 158496),
	new Note(4, 158654),
	new Note(4, 158832),
	new Note(4, 158996),
	new Note(4, 159173),
	new Note(4, 159331),
	new Note(2, 159792),
	new Note(2, 160265),
	new Note(2, 160477),
	new Note(2, 160680),
	new Note(2, 160882),
	new Note(2, 161088),
	new Note(2, 161301),
	new Note(2, 161505),
	new Note(2, 161700),
	new Note(2, 161864),
	new Note(2, 162030),
	new Note(2, 162204),
	new Note(2, 162355),
	new Note(2, 162529),
	new Note(2, 162687),
	new Note(1, 162889),
	new Note(1, 163048),
	new Note(1, 163246),
	new Note(1, 163410),
	new Note(1, 163571),
	new Note(1, 163729),
	new Note(1, 163881),
	new Note(1, 164034),
	new Note(1, 164194),
	new Note(1, 164357),
	new Note(1, 164536),
	new Note(1, 164718),
	new Note(1, 164893),
	new Note(1, 165075),
	new Note(1, 165263),
	new Note(1, 165432),
	new Note(1, 165593),
	new Note(1, 165758),
	new Note(4, 166021),
	new Note(4, 166215),
	new Note(4, 166394),
	new Note(4, 166578),
	new Note(4, 166763),
	new Note(4, 166949),
	new Note(4, 167139),
	new Note(4, 167318),
	new Note(4, 167477),
	new Note(4, 167674),
	new Note(4, 167863),
	new Note(4, 168028),
	new Note(4, 168215),
	new Note(4, 168387),
	new Note(4, 168569),
	new Note(4, 168745),
	new Note(4, 168888),
	new Note(2, 169134),
	new Note(2, 169301),
	new Note(2, 169459),
	new Note(2, 169786),
	new Note(2, 169954),
	new Note(2, 170147),
	new Note(2, 170314),
	new Note(2, 170493),
	new Note(2, 170676),
	new Note(2, 170853),
	new Note(2, 171032),
	new Note(2, 171198),
	new Note(2, 171364),
	new Note(2, 171541),
	new Note(2, 171714),
	new Note(2, 171876),
	new Note(1, 172115),
	new Note(1, 172296),
	new Note(1, 172461),
	new Note(2, 172665),
	new Note(2, 172840),
	new Note(2, 172990),
	new Note(2, 173127),
	new Note(4, 173423),
	new Note(4, 173604),
	new Note(4, 173766),
	new Note(4, 173905),
	new Note(1, 174201),
	new Note(1, 174365),
	new Note(1, 174503),
	new Note(2, 174912),
	new Note(2, 175091),
	new Note(2, 175286),
	new Note(2, 175407),
	new Note(4, 175702),
	new Note(4, 175887),
	new Note(4, 176026),
	new Note(3, 176429),
	new Note(3, 176595),
	new Note(3, 176774),
	new Note(1, 177251),
	new Note(1, 177420),
	new Note(1, 177537),
	new Note(2, 178158),
	new Note(2, 178338),
	new Note(1, 178723),
	new Note(1, 178901),
	new Note(1, 179033),
	new Note(4, 179478),
	new Note(4, 179660),
	new Note(4, 179804),
	new Note(3, 180239),
	new Note(3, 180382),
	new Note(3, 180528),
	new Note(2, 181044),
	new Note(2, 181208),
	new Note(2, 181344),
	new Note(1, 181773),
	new Note(1, 181934),
	new Note(1, 182089),
	new Note(4, 182519),
	new Note(4, 182692),
	new Note(4, 182845),
	new Note(2, 183253),
	new Note(2, 183417),
	new Note(2, 183554),
	new Note(1, 184228),
	new Note(2, 184561),
	new Note(4, 184956),
	new Note(3, 185405),
	new Note(2, 185814),
	new Note(2, 186190),
	new Note(1, 186576),
	new Note(1, 186956),
	new Note(2, 187309),
	new Note(2, 187685),
	new Note(4, 188041),
	new Note(4, 188439),
	new Note(3, 188798),
	new Note(3, 189176),
	new Note(1, 189552),
	new Note(1, 189896),
	new Note(4, 190297),
	new Note(4, 190693),
	new Note(2, 191104),
	new Note(2, 191485),
	new Note(1, 191866),
	new Note(1, 192285),
	new Note(4, 192651),
	new Note(4, 193055),
	new Note(2, 193394),
	new Note(2, 193770),
	new Note(1, 194148),
	new Note(1, 194518),
	new Note(3, 194906),
	new Note(3, 195271),
	new Note(4, 195616),
	new Note(4, 196010),
	new Note(2, 196413),
	new Note(2, 196805),
	new Note(1, 197204),
	new Note(1, 197629),
	new Note(4, 198060),
	new Note(4, 198282),
	new Note(1, 198667),
	new Note(1, 199052),
	new Note(2, 199404),
	new Note(2, 199811),
	new Note(4, 200155),
	new Note(4, 200574),
	new Note(1, 200955),
	new Note(1, 201361),
	new Note(4, 201721),
	new Note(4, 202076),
	new Note(3, 202458),
	new Note(3, 202859),
	new Note(2, 203253),
	new Note(2, 203649),
	new Note(1, 204029),
	new Note(1, 204387),
	new Note(4, 204752),
	new Note(4, 205105),
	new Note(2, 205455),
	new Note(2, 205853),
	new Note(3, 206263),
	new Note(3, 206638),
	new Note(1, 207000),
	new Note(1, 207418),
	new Note(4, 207801),
	new Note(4, 208236),
	new Note(2, 208521)],
	
	  groovinNotes: [new Note(2, 746),
	 new Note(2, 933),
	 new Note(2, 1279),
	 new Note(2, 1959),
	 new Note(2, 2373),
	 new Note(2, 2597),
	 new Note(2, 3078),
	 new Note(2, 3534),
	 new Note(1, 3768),
	 new Note(3, 3906),
	 new Note(4, 4085),
	 new Note(4, 4568),
	 new Note(4, 5050),
	 new Note(1, 5516),
	 new Note(2, 5742),
	 new Note(2, 6169),
	 new Note(2, 6326),
	 new Note(2, 6825),
	 new Note(1, 7227),
	 new Note(2, 7413),
	 new Note(2, 7554),
	 new Note(2, 7969),
	 new Note(2, 8151),
	 new Note(4, 8379),
	 new Note(2, 8875),
	 new Note(2, 9058),
	 new Note(1, 9342),
	 new Note(2, 9920),
	 new Note(2, 10119),
	 new Note(2, 10310),
	 new Note(2, 10560),
	 new Note(2, 10791),
	 new Note(3, 11029),
	 new Note(2, 11241),
	 new Note(3, 11686),
	 new Note(3, 11848),
	 new Note(1, 12085),
	 new Note(2, 12313),
	 new Note(2, 12543),
	 new Note(2, 12728),
	 new Note(4, 12967),
	 new Note(3, 13149),
	 new Note(3, 13551),
	 new Note(3, 13789),
	 new Note(3, 14213),
	 new Note(3, 14400),
	 new Note(2, 14638),
	 new Note(1, 14857),
	 new Note(2, 15224),
	 new Note(4, 15485),
	 new Note(3, 15694),
	 new Note(2, 15897),
	 new Note(2, 16275),
	 new Note(2, 16701),
	 new Note(2, 17360),
	 new Note(2, 17843),
	 new Note(2, 18045),
	 new Note(2, 18373),
	 new Note(2, 18582),
	 new Note(1, 18979),
	 new Note(2, 19267),
	 new Note(2, 19768),
	 new Note(2, 20239),
	 new Note(4, 20450),
	 new Note(2, 20937),
	 new Note(2, 21134),
	 new Note(2, 21599),
	 new Note(1, 22009),
	 new Note(2, 22229),
	 new Note(2, 22726),
	 new Note(2, 22938),
	 new Note(4, 23365),
	 new Note(2, 23884),
	 new Note(2, 24104),
	 new Note(2, 24567),
	 new Note(2, 24731),
	 new Note(1, 25253),
	 new Note(2, 25702),
	 new Note(2, 25910),
	 new Note(2, 26450),
	 new Note(2, 26638),
	 new Note(2, 27136),
	 new Note(4, 27585),
	 new Note(2, 27795),
	 new Note(2, 28281),
	 new Note(2, 28497),
	 new Note(2, 28940),
	 new Note(1, 29461),
	 new Note(2, 29688),
	 new Note(2, 30146),
	 new Note(2, 30345),
	 new Note(1, 30832),
	 new Note(2, 31313),
	 new Note(2, 31498),
	 new Note(2, 31888),
	 new Note(3, 32033),
	 new Note(3, 32172),
	 new Note(3, 32317),
	 new Note(3, 32451),
	 new Note(3, 32577),
	 new Note(3, 32681),
	 new Note(3, 32816),
	 new Note(2, 33197),
	 new Note(2, 33639),
	 new Note(1, 34018),
	 new Note(2, 34242),
	 new Note(2, 34476),
	 new Note(2, 34680),
	 new Note(2, 34861),
	 new Note(2, 35029),
	 new Note(3, 35223),
	 new Note(2, 35681),
	 new Note(2, 35882),
	 new Note(3, 36083),
	 new Note(2, 36666),
	 new Note(2, 36828),
	 new Note(1, 37030),
	 new Note(2, 37274),
	 new Note(3, 37274),
	 new Note(3, 37487),
	 new Note(2, 37771),
	 new Note(2, 37990),
	 new Note(4, 38195),
	 new Note(2, 38393),
	 new Note(1, 38653),
	 new Note(2, 38852),
	 new Note(2, 39183),
	 new Note(2, 39367),
	 new Note(3, 39623),
	 new Note(2, 39827),
	 new Note(1, 40055),
	 new Note(2, 40288),
	 new Note(2, 40463),
	 new Note(4, 40538),
	 new Note(3, 40669),
	 new Note(2, 40846),
	 new Note(2, 41000),
	 new Note(3, 41280),
	 new Note(2, 41483),
	 new Note(3, 41901),
	 new Note(2, 42128),
	 new Note(3, 42333),
	 new Note(2, 42615),
	 new Note(3, 42808),
	 new Note(2, 43052),
	 new Note(3, 43278),
	 new Note(2, 43490),
	 new Note(2, 43971),
	 new Note(2, 44181),
	 new Note(2, 44635),
	 new Note(2, 44860),
	 new Note(2, 45345),
	 new Note(2, 45763),
	 new Note(1, 46199),
	 new Note(4, 46703),
	 new Note(1, 46986),
	 new Note(3, 47212),
	 new Note(3, 47413),
	 new Note(1, 47830),
	 new Note(4, 48105),
	 new Note(3, 48338),
	 new Note(3, 48751),
	 new Note(2, 49254),
	 new Note(2, 49507),
	 new Note(1, 49872),
	 new Note(4, 50065),
	 new Note(1, 50434),
	 new Note(1, 50620),
	 new Note(1, 50855),
	 new Note(4, 51135),
	 new Note(1, 51555),
	 new Note(2, 51990),
	 new Note(2, 52143),
	 new Note(3, 52361),
	 new Note(1, 52580),
	 new Note(4, 52782),
	 new Note(2, 53154),
	 new Note(3, 53424),
	 new Note(2, 53649),
	 new Note(2, 54157),
	 new Note(1, 54367),
	 new Note(4, 54618),
	 new Note(1, 54846),
	 new Note(2, 55770),
	 new Note(2, 56254),
	 new Note(1, 56674),
	 new Note(4, 57056),
	 new Note(2, 57277),
	 new Note(2, 57703),
	 new Note(2, 57877),
	 new Note(1, 57983),
	 new Note(4, 58249),
	 new Note(2, 58723),
	 new Note(1, 58946),
	 new Note(2, 59209),
	 new Note(4, 59503),
	 new Note(4, 59689),
	 new Note(1, 59747),
	 new Note(1, 59925),
	 new Note(2, 60124),
	 new Note(4, 60383),
	 new Note(2, 60589),
	 new Note(2, 61051),
	 new Note(1, 61512),
	 new Note(4, 61788),
	 new Note(1, 62016),
	 new Note(4, 62253),
	 new Note(3, 62436),
	 new Note(2, 62674),
	 new Note(1, 62875),
	 new Note(2, 63196),
	 new Note(2, 63658),
	 new Note(2, 64095),
	 new Note(2, 64546),
	 new Note(1, 64721),
	 new Note(4, 65263),
	 new Note(2, 65564),
	 new Note(2, 66029),
	 new Note(2, 66570),
	 new Note(1, 66970),
	 new Note(3, 67197),
	 new Note(4, 67473),
	 new Note(2, 67905),
	 new Note(1, 68152),
	 new Note(4, 68626),
	 new Note(4, 68995),
	 new Note(4, 69170),
	 new Note(4, 69400),
	 new Note(2, 69639),
	 new Note(2, 69857),
	 new Note(2, 70001),
	 new Note(1, 70224),
	 new Note(3, 70601),
	 new Note(3, 70804),
	 new Note(4, 70999),
	 new Note(4, 71170),
	 new Note(4, 71343),
	 new Note(2, 71550),
	 new Note(2, 71768),
	 new Note(2, 71966),
	 new Note(1, 72147),
	 new Note(4, 72524),
	 new Note(2, 72887),
	 new Note(2, 73109),
	 new Note(2, 73278),
	 new Note(2, 73509),
	 new Note(1, 73751),
	 new Note(2, 73982),
	 new Note(2, 74563),
	 new Note(2, 74717),
	 new Note(3, 74903),
	 new Note(2, 75386),
	 new Note(2, 75764),
	 new Note(1, 76429),
	 new Note(4, 76905),
	 new Note(2, 77141),
	 new Note(2, 77363),
	 new Note(2, 77628),
	 new Note(2, 77853),
	 new Note(2, 78185),
	 new Note(2, 78397),
	 new Note(2, 78817),
	 new Note(2, 79551),
	 new Note(2, 79977),
	 new Note(2, 80151),
	 new Note(1, 80313),
	 new Note(4, 80662),
	 new Note(1, 80890),
	 new Note(4, 81304),
	 new Note(1, 81847),
	 new Note(3, 82034),
	 new Note(3, 82531),
	 new Note(3, 82762),
	 new Note(2, 83243),
	 new Note(1, 83728),
	 new Note(4, 83966),
	 new Note(2, 84404),
	 new Note(2, 84589),
	 new Note(3, 85047),
	 new Note(1, 85531),
	 new Note(3, 85715),
	 new Note(3, 86182),
	 new Note(2, 86666),
	 new Note(2, 86885),
	 new Note(2, 87386),
	 new Note(2, 87577),
	 new Note(1, 87943),
	 new Note(4, 88143),
	 new Note(3, 88298),
	 new Note(2, 88672),
	 new Note(1, 89142),
	 new Note(3, 89300),
	 new Note(4, 89484),
	 new Note(3, 89865),
	 new Note(1, 90026),
	 new Note(2, 90262),
	 new Note(3, 90262),
	 new Note(2, 90460),
	 new Note(3, 90460),
	 new Note(3, 90666),
	 new Note(2, 91297),
	 new Note(1, 91529)],
	
	 heyNotes: [new Note(2, 448),
	 new Note(2, 607),
	 new Note(2, 749),
	 new Note(2, 860),
	 new Note(2, 990),
	 new Note(2, 1128),
	 new Note(2, 1258),
	 new Note(2, 1406),
	 new Note(2, 1551),
	 new Note(2, 1695),
	 new Note(2, 1839),
	 new Note(2, 1972),
	 new Note(2, 2109),
	 new Note(2, 2256),
	 new Note(2, 2388),
	 new Note(2, 2532),
	 new Note(2, 2677),
	 new Note(2, 2825),
	 new Note(2, 2968),
	 new Note(1, 3138),
	 new Note(1, 3298),
	 new Note(2, 3332),
	 new Note(2, 3460),
	 new Note(2, 3606),
	 new Note(2, 4019),
	 new Note(2, 4450),
	 new Note(2, 4927),
	 new Note(2, 5163),
	 new Note(2, 5325),
	 new Note(2, 5498),
	 new Note(1, 5702),
	 new Note(1, 5900),
	 new Note(2, 5900),
	 new Note(2, 6285),
	 new Note(2, 6496),
	 new Note(2, 6640),
	 new Note(2, 7049),
	 new Note(2, 7202),
	 new Note(4, 7314),
	 new Note(2, 7592),
	 new Note(2, 7747),
	 new Note(1, 8148),
	 new Note(4, 8491),
	 new Note(2, 8914),
	 new Note(1, 9431),
	 new Note(2, 9820),
	 new Note(2, 10060),
	 new Note(2, 10237),
	 new Note(2, 10421),
	 new Note(2, 10644),
	 new Note(2, 10848),
	 new Note(2, 11034),
	 new Note(2, 11251),
	 new Note(2, 11457),
	 new Note(2, 11628),
	 new Note(1, 11816),
	 new Note(3, 11991),
	 new Note(3, 12175),
	 new Note(3, 12328),
	 new Note(3, 12495),
	 new Note(3, 12650),
	 new Note(1, 13004),
	 new Note(2, 13143),
	 new Note(2, 13314),
	 new Note(2, 13507),
	 new Note(4, 13855),
	 new Note(4, 14013),
	 new Note(1, 14229),
	 new Note(2, 14392),
	 new Note(2, 14515),
	 new Note(2, 14659),
	 new Note(2, 14794),
	 new Note(2, 14921),
	 new Note(2, 15040),
	 new Note(2, 15176),
	 new Note(2, 15287),
	 new Note(2, 15438),
	 new Note(2, 15559),
	 new Note(2, 15664),
	 new Note(2, 15785),
	 new Note(2, 15929),
	 new Note(2, 16042),
	 new Note(2, 16164),
	 new Note(2, 16285),
	 new Note(2, 16413),
	 new Note(2, 16545),
	 new Note(2, 16683),
	 new Note(2, 16811),
	 new Note(1, 16946),
	 new Note(1, 17084),
	 new Note(2, 17284),
	 new Note(2, 17705),
	 new Note(2, 17850),
	 new Note(1, 18012),
	 new Note(4, 18174),
	 new Note(2, 18339),
	 new Note(2, 18522),
	 new Note(2, 18653),
	 new Note(1, 18806),
	 new Note(4, 18995),
	 new Note(4, 19136),
	 new Note(4, 19306),
	 new Note(2, 19425),
	 new Note(2, 19592),
	 new Note(1, 19756),
	 new Note(3, 20031),
	 new Note(3, 20157),
	 new Note(3, 20290),
	 new Note(2, 20456),
	 new Note(2, 20657),
	 new Note(2, 20796),
	 new Note(2, 20940),
	 new Note(1, 21098),
	 new Note(4, 21256),
	 new Note(4, 21430),
	 new Note(2, 21446),
	 new Note(2, 21632),
	 new Note(2, 21886),
	 new Note(2, 22080),
	 new Note(2, 22265),
	 new Note(1, 22353),
	 new Note(2, 22700),
	 new Note(2, 23162),
	 new Note(4, 23603),
	 new Note(4, 23764),
	 new Note(2, 23937),
	 new Note(2, 24124),
	 new Note(2, 24307),
	 new Note(2, 24491),
	 new Note(1, 24694),
	 new Note(2, 24859),
	 new Note(2, 25009),
	 new Note(2, 25152),
	 new Note(2, 25293),
	 new Note(2, 25482),
	 new Note(1, 25667),
	 new Note(2, 26191),
	 new Note(2, 26357),
	 new Note(3, 26793),
	 new Note(1, 26995),
	 new Note(2, 27484),
	 new Note(2, 27863),
	 new Note(2, 28021),
	 new Note(2, 28241),
	 new Note(2, 28446),
	 new Note(2, 28656),
	 new Note(2, 28812),
	 new Note(2, 28946),
	 new Note(2, 29079),
	 new Note(2, 29222),
	 new Note(2, 29381),
	 new Note(2, 29664),
	 new Note(2, 29784),
	 new Note(1, 29972),
	 new Note(2, 30003),
	 new Note(2, 30464),
	 new Note(2, 31086),
	 new Note(1, 31471),
	 new Note(2, 31695),
	 new Note(2, 31910),
	 new Note(2, 32734),
	 new Note(2, 33397),
	 new Note(4, 33819),
	 new Note(2, 34502),
	 new Note(1, 35305),
	 new Note(4, 36070),
	 new Note(2, 37269),
	 new Note(2, 37434),
	 new Note(1, 37667),
	 new Note(2, 38271),
	 new Note(2, 38413),
	 new Note(2, 38672),
	 new Note(2, 38802),
	 new Note(2, 39193),
	 new Note(2, 39534),
	 new Note(1, 39901),
	 new Note(1, 40023),
	 new Note(1, 40224),
	 new Note(1, 40361),
	 new Note(2, 40483),
	 new Note(2, 40743),
	 new Note(2, 40868),
	 new Note(2, 41107),
	 new Note(2, 41200),
	 new Note(4, 41374),
	 new Note(4, 41525),
	 new Note(4, 41649),
	 new Note(4, 41783),
	 new Note(4, 41949),
	 new Note(4, 42094),
	 new Note(1, 42202),
	 new Note(1, 42364),
	 new Note(1, 42527),
	 new Note(1, 42833),
	 new Note(1, 42945),
	 new Note(2, 43109),
	 new Note(2, 43250),
	 new Note(2, 43446),
	 new Note(2, 43778),
	 new Note(2, 44176),
	 new Note(2, 44549),
	 new Note(2, 44715),
	 new Note(1, 45056),
	 new Note(2, 45416),
	 new Note(2, 45687),
	 new Note(4, 46471),
	 new Note(1, 47144),
	 new Note(2, 47563),
	 new Note(2, 48249),
	 new Note(1, 49054),
	 new Note(4, 49869),
	 new Note(2, 51080),
	 new Note(2, 51233),
	 new Note(1, 51457),
	 new Note(2, 51846),
	 new Note(2, 51984),
	 new Note(2, 52103),
	 new Note(2, 52262),
	 new Note(2, 52420),
	 new Note(1, 52757),
	 new Note(1, 52901),
	 new Note(1, 53146),
	 new Note(1, 53260),
	 new Note(4, 53388),
	 new Note(4, 53648),
	 new Note(4, 53789),
	 new Note(4, 54053),
	 new Note(4, 54174),
	 new Note(2, 54325),
	 new Note(2, 54512),
	 new Note(2, 54633),
	 new Note(2, 54774),
	 new Note(2, 54908),
	 new Note(1, 55049),
	 new Note(1, 55308),
	 new Note(1, 55452),
	 new Note(1, 55593),
	 new Note(4, 55880),
	 new Note(2, 56154),
	 new Note(2, 56477),
	 new Note(2, 56654),
	 new Note(2, 56820),
	 new Note(1, 57079),
	 new Note(2, 57281),
	 new Note(2, 57495),
	 new Note(2, 57680),
	 new Note(2, 58084),
	 new Note(1, 58288),
	 new Note(2, 58459),
	 new Note(2, 58721),
	 new Note(4, 59060),
	 new Note(1, 59414),
	 new Note(2, 59887),
	 new Note(4, 60289),
	 new Note(1, 60700),
	 new Note(2, 61009),
	 new Note(2, 61336),
	 new Note(2, 61472),
	 new Note(1, 61654),
	 new Note(4, 62155),
	 new Note(2, 62613),
	 new Note(1, 63008),
	 new Note(4, 63445),
	 new Note(3, 63916),
	 new Note(2, 64383),
	 new Note(1, 64786),
	 new Note(3, 65168),
	 new Note(4, 65527),
	 new Note(2, 65987),
	 new Note(1, 66415),
	 new Note(2, 66833),
	 new Note(4, 67252),
	 new Note(1, 67531),
	 new Note(2, 67696),
	 new Note(3, 67936),
	 new Note(4, 68140),
	 new Note(2, 68376),
	 new Note(1, 68655),
	 new Note(3, 69040),
	 new Note(3, 69522),
	 new Note(1, 70206),
	 new Note(2, 70581),
	 new Note(4, 70967),
	 new Note(1, 71265),
	 new Note(2, 71508),
	 new Note(2, 71744),
	 new Note(1, 72332),
	 new Note(4, 72594),
	 new Note(2, 73833),
	 new Note(2, 74072),
	 new Note(1, 74498),
	 new Note(4, 74882),
	 new Note(3, 75082),
	 new Note(2, 75309),
	 new Note(2, 75458),
	 new Note(1, 75876),
	 new Note(2, 76060),
	 new Note(2, 76221),
	 new Note(2, 76406),
	 new Note(2, 76585),
	 new Note(2, 76765),
	 new Note(2, 76963),
	 new Note(2, 77161),
	 new Note(2, 77349),
	 new Note(2, 77546),
	 new Note(2, 77749),
	 new Note(2, 77929),
	 new Note(2, 78088),
	 new Note(2, 78231),
	 new Note(2, 78382),
	 new Note(2, 78521),
	 new Note(2, 78662),
	 new Note(2, 78790),
	 new Note(2, 78947),
	 new Note(2, 79090),
	 new Note(2, 79246),
	 new Note(2, 79393),
	 new Note(2, 79535),
	 new Note(2, 79677),
	 new Note(2, 79830),
	 new Note(2, 79978),
	 new Note(2, 80114),
	 new Note(2, 80258),
	 new Note(2, 80416),
	 new Note(2, 80573),
	 new Note(2, 80719),
	 new Note(2, 80873),
	 new Note(2, 81020),
	 new Note(1, 81200),
	 new Note(4, 81443),
	 new Note(3, 81803),
	 new Note(3, 81941),
	 new Note(2, 82343),
	 new Note(1, 82726),
	 new Note(2, 82925),
	 new Note(2, 83081),
	 new Note(2, 83251),
	 new Note(2, 83408),
	 new Note(2, 83567),
	 new Note(2, 83709),
	 new Note(2, 83861),
	 new Note(2, 84027),
	 new Note(2, 84164),
	 new Note(2, 84299),
	 new Note(2, 84446),
	 new Note(2, 84590),
	 new Note(1, 84726),
	 new Note(1, 84858),
	 new Note(3, 85030),
	 new Note(3, 85326),
	 new Note(2, 85899),
	 new Note(1, 86734),
	 new Note(4, 87615),
	 new Note(2, 88298),
	 new Note(2, 88678),
	 new Note(2, 89428),
	 new Note(1, 90191),
	 new Note(4, 90993),
	 new Note(2, 92150),
	 new Note(2, 92298),
	 new Note(1, 92501),
	 new Note(2, 93038),
	 new Note(2, 93173),
	 new Note(2, 93342),
	 new Note(2, 93449),
	 new Note(1, 93584),
	 new Note(1, 93739),
	 new Note(1, 93926),
	 new Note(1, 94081),
	 new Note(1, 94224),
	 new Note(4, 94465),
	 new Note(4, 94745),
	 new Note(4, 94876),
	 new Note(4, 95020),
	 new Note(4, 95090),
	 new Note(2, 95330),
	 new Note(2, 95625),
	 new Note(2, 95765),
	 new Note(2, 95934),
	 new Note(2, 96071),
	 new Note(1, 96275),
	 new Note(1, 96554),
	 new Note(1, 96674),
	 new Note(1, 96811),
	 new Note(1, 96954),
	 new Note(4, 97134),
	 new Note(4, 97331),
	 new Note(4, 97446),
	 new Note(4, 97715),
	 new Note(4, 97839),
	 new Note(2, 97997),
	 new Note(2, 98295),
	 new Note(2, 98678),
	 new Note(2, 99094),
	 new Note(1, 99557),
	 new Note(2, 99985),
	 new Note(4, 100473),
	 new Note(1, 101305),
	 new Note(2, 102110),
	 new Note(2, 103050),
	 new Note(1, 103887),
	 new Note(4, 104752),
	 new Note(2, 105674),
	 new Note(2, 105839),
	 new Note(2, 106024),
	 new Note(1, 106266),
	 new Note(3, 106507),
	 new Note(3, 107045),
	 new Note(3, 107222),
	 new Note(3, 107401),
	 new Note(3, 107688),
	 new Note(2, 109209),
	 new Note(1, 109415),
	 new Note(4, 109690),
	 new Note(2, 109975),
	 new Note(1, 111141),
	 new Note(3, 111625),
	 new Note(2, 112507),
	 new Note(2, 113369),
	 new Note(2, 118504),
	 new Note(2, 118646),
	 new Note(2, 118786),
	 new Note(2, 119123),
	 new Note(1, 119509),
	 new Note(1, 119677),
	 new Note(1, 119813),
	 new Note(2, 119949),
	 new Note(4, 120435),
	 new Note(4, 120587),
	 new Note(4, 120833),
	 new Note(2, 121085),
	 new Note(2, 121311),
	 new Note(2, 121428),
	 new Note(2, 121669),
	 new Note(1, 121918),
	 new Note(1, 122196),
	 new Note(1, 122319),
	 new Note(2, 122720),
	 new Note(2, 122811),
	 new Note(2, 123085),
	 new Note(2, 123211),
	 new Note(4, 123439),
	 new Note(3, 123901),
	 new Note(1, 124303),
	 new Note(1, 124426),
	 new Note(1, 124546),
	 new Note(2, 124785),
	 new Note(2, 124926),
	 new Note(2, 125051),
	 new Note(2, 125170),
	 new Note(4, 125429),
	 new Note(4, 125588),
	 new Note(4, 125685),
	 new Note(4, 125811),
	 new Note(1, 126127),
	 new Note(1, 126267),
	 new Note(2, 126415),
	 new Note(2, 126575),
	 new Note(2, 126693),
	 new Note(2, 126815)],
	
	 takenNotes: [new Note(2, 2929),
	new Note(2, 3153),
	new Note(1, 3252),
	new Note(2, 3482),
	new Note(1, 3815),
	new Note(2, 4142),
	new Note(1, 4516),
	new Note(2, 4905),
	new Note(1, 5229),
	new Note(2, 5577),
	new Note(4, 5910),
	new Note(2, 6281),
	new Note(1, 6611),
	new Note(2, 6952),
	new Note(4, 7347),
	new Note(2, 7757),
	new Note(1, 8104),
	new Note(2, 8457),
	new Note(1, 11298),
	new Note(4, 11728),
	new Note(2, 12273),
	new Note(1, 14135),
	new Note(4, 14546),
	new Note(2, 14776),
	new Note(1, 15079),
	new Note(2, 15221),
	new Note(2, 16148),
	new Note(2, 16659),
	new Note(1, 16927),
	new Note(2, 17449),
	new Note(1, 17977),
	new Note(2, 18311),
	new Note(2, 18488),
	new Note(1, 18874),
	new Note(2, 19451),
	new Note(1, 19766),
	new Note(1, 20072),
	new Note(1, 20181),
	new Note(2, 20339),
	new Note(2, 20679),
	new Note(2, 21029),
	new Note(2, 21369),
	new Note(1, 21716),
	new Note(1, 21862),
	new Note(1, 21994),
	new Note(1, 22132),
	new Note(1, 22254),
	new Note(1, 22381),
	new Note(1, 22527),
	new Note(2, 22639),
	new Note(2, 22795),
	new Note(2, 22918),
	new Note(2, 23039),
	new Note(4, 23243),
	new Note(4, 23587),
	new Note(2, 23902),
	new Note(2, 24233),
	new Note(1, 24573),
	new Note(1, 24720),
	new Note(1, 24868),
	new Note(1, 25005),
	new Note(1, 25135),
	new Note(1, 25282),
	new Note(2, 25458),
	new Note(2, 25637),
	new Note(2, 25779),
	new Note(2, 25913),
	new Note(2, 26060),
	new Note(4, 26400),
	new Note(4, 26717),
	new Note(4, 27084),
	new Note(1, 27409),
	new Note(1, 27571),
	new Note(1, 27706),
	new Note(1, 27885),
	new Note(2, 28055),
	new Note(2, 28228),
	new Note(2, 28382),
	new Note(2, 28519),
	new Note(2, 28682),
	new Note(3, 28890),
	new Note(3, 29266),
	new Note(3, 29610),
	new Note(1, 29933),
	new Note(2, 30287),
	new Note(2, 30467),
	new Note(2, 30621),
	new Note(2, 30782),
	new Note(2, 30946),
	new Note(2, 31092),
	new Note(1, 31218),
	new Note(1, 31384),
	new Note(1, 31522),
	new Note(2, 31736),
	new Note(2, 32098),
	new Note(4, 32451),
	new Note(4, 32740),
	new Note(4, 33076),
	new Note(2, 33241),
	new Note(2, 33422),
	new Note(2, 33563),
	new Note(1, 33742),
	new Note(1, 33884),
	new Note(1, 34030),
	new Note(2, 34134),
	new Note(2, 34296),
	new Note(2, 34434),
	new Note(4, 34605),
	new Note(2, 34959),
	new Note(1, 35285),
	new Note(1, 35625),
	new Note(2, 35902),
	new Note(3, 36090),
	new Note(3, 36251),
	new Note(1, 36915),
	new Note(2, 37404),
	new Note(4, 37765),
	new Note(3, 37958),
	new Note(2, 39742),
	new Note(2, 39952),
	new Note(1, 40287),
	new Note(4, 40617),
	new Note(3, 41343),
	new Note(3, 41697),
	new Note(3, 41833),
	new Note(2, 42187),
	new Note(1, 42567),
	new Note(4, 43076),
	new Note(4, 43243),
	new Note(2, 43847),
	new Note(1, 44278),
	new Note(4, 44620),
	new Note(1, 44782),
	new Note(2, 45113),
	new Note(1, 45441),
	new Note(4, 45780),
	new Note(2, 46104),
	new Note(2, 46361),
	new Note(2, 46712),
	new Note(1, 47054),
	new Note(2, 47410),
	new Note(2, 47566),
	new Note(2, 47933),
	new Note(1, 48683),
	new Note(4, 48876),
	new Note(3, 49342),
	new Note(2, 49536),
	new Note(1, 49941),
	new Note(1, 50274),
	new Note(1, 50416),
	new Note(2, 50769),
	new Note(4, 51109),
	new Note(2, 51471),
	new Note(2, 51648),
	new Note(2, 51806),
	new Note(2, 51963),
	new Note(3, 52178),
	new Note(3, 52363),
	new Note(3, 52524),
	new Note(1, 53046),
	new Note(2, 53979),
	new Note(1, 55332),
	new Note(4, 56667),
	new Note(2, 58191),
	new Note(1, 58702),
	new Note(3, 59212),
	new Note(1, 59732),
	new Note(4, 60980),
	new Note(2, 62352),
	new Note(2, 63906),
	new Note(1, 64361),
	new Note(4, 64854),
	new Note(3, 65409),
	new Note(1, 66667),
	new Note(4, 68034),
	new Note(2, 69946),
	new Note(3, 70215),
	new Note(1, 70513),
	new Note(4, 70834),
	new Note(2, 71289),
	new Note(2, 71551),
	new Note(2, 71753),
	new Note(2, 71939),
	new Note(2, 72114),
	new Note(2, 72299),
	new Note(2, 72498),
	new Note(2, 72713),
	new Note(2, 72886),
	new Note(2, 73059),
	new Note(2, 73223),
	new Note(2, 73417),
	new Note(2, 73576),
	new Note(2, 73765),
	new Note(2, 73943),
	new Note(2, 74110),
	new Note(2, 74286),
	new Note(2, 74466),
	new Note(2, 74624),
	new Note(2, 74787),
	new Note(2, 74965),
	new Note(2, 75133),
	new Note(2, 75311),
	new Note(2, 75477),
	new Note(2, 75659),
	new Note(2, 75832),
	new Note(2, 75988),
	new Note(2, 76129),
	new Note(1, 76314),
	new Note(4, 76673),
	new Note(3, 77156),
	new Note(2, 77612),
	new Note(1, 77790),
	new Note(4, 78324),
	new Note(3, 78765),
	new Note(2, 78941),
	new Note(3, 79259),
	new Note(1, 79630),
	new Note(4, 79962),
	new Note(2, 80151),
	new Note(3, 80488),
	new Note(1, 80872),
	new Note(4, 81206),
	new Note(2, 81517),
	new Note(3, 81718),
	new Note(1, 82052),
	new Note(4, 82378),
	new Note(2, 82995),
	new Note(2, 83156),
	new Note(2, 83702),
	new Note(1, 84084),
	new Note(4, 84419),
	new Note(1, 84617),
	new Note(4, 84963),
	new Note(2, 85295),
	new Note(2, 85649),
	new Note(2, 85833),
	new Note(1, 85940),
	new Note(4, 86207),
	new Note(2, 86537),
	new Note(2, 86890),
	new Note(2, 87042),
	new Note(1, 87425),
	new Note(4, 87746),
	new Note(2, 88249),
	new Note(1, 88573),
	new Note(4, 88811),
	new Note(2, 88992),
	new Note(1, 89201),
	new Note(4, 89574),
	new Note(2, 89776),
	new Note(1, 90092),
	new Note(2, 90535),
	new Note(4, 90983),
	new Note(2, 91379),
	new Note(2, 91577),
	new Note(2, 91717),
	new Note(1, 92040),
	new Note(4, 92361),
	new Note(4, 92718),
	new Note(2, 92914),
	new Note(1, 93246),
	new Note(4, 93746),
	new Note(2, 95186),
	new Note(1, 96516),
	new Note(2, 98041),
	new Note(1, 98527),
	new Note(4, 99083),
	new Note(4, 99613),
	new Note(3, 100889),
	new Note(1, 102241),
	new Note(2, 103775),
	new Note(1, 104245),
	new Note(4, 104748),
	new Note(3, 105247),
	new Note(1, 106575),
	new Note(4, 107898),
	new Note(2, 109461),
	new Note(1, 109682),
	new Note(4, 109897),
	new Note(3, 110105),
	new Note(2, 110342),
	new Note(2, 110967),
	new Note(2, 111181),
	new Note(2, 111351),
	new Note(2, 111549),
	new Note(2, 111733),
	new Note(2, 111924),
	new Note(2, 112476),
	new Note(2, 112649),
	new Note(2, 112832),
	new Note(2, 113037),
	new Note(2, 113208),
	new Note(2, 113390),
	new Note(2, 113576),
	new Note(2, 113770),
	new Note(2, 113936),
	new Note(2, 114118),
	new Note(2, 114276),
	new Note(2, 114451),
	new Note(2, 114634),
	new Note(2, 114820),
	new Note(2, 115008),
	new Note(2, 115164),
	new Note(2, 115338),
	new Note(2, 115501),
	new Note(2, 115683),
	new Note(2, 115853),
	new Note(2, 116023),
	new Note(2, 116218),
	new Note(1, 116625),
	new Note(2, 116835),
	new Note(1, 117004),
	new Note(2, 117046),
	new Note(2, 118513),
	new Note(3, 118809),
	new Note(2, 119151),
	new Note(2, 119454),
	new Note(2, 119861),
	new Note(1, 120057),
	new Note(4, 120350),
	new Note(2, 120557),
	new Note(2, 121121),
	new Note(1, 121279),
	new Note(2, 121420),
	new Note(2, 121942),
	new Note(2, 122306),
	new Note(2, 122443),
	new Note(2, 122586),
	new Note(2, 122723),
	new Note(1, 122860),
	new Note(2, 122968),
	new Note(1, 123144),
	new Note(2, 123186),
	new Note(1, 123280),
	new Note(2, 123330),
	new Note(1, 123405),
	new Note(2, 123565),
	new Note(1, 123648),
	new Note(1, 123745),
	new Note(2, 123828),
	new Note(1, 123907),
	new Note(2, 123907),
	new Note(1, 124020),
	new Note(2, 124152),
	new Note(1, 124251),
	new Note(2, 124315),
	new Note(1, 124391),
	new Note(2, 124450),
	new Note(1, 124546),
	new Note(2, 124560),
	new Note(1, 124651),
	new Note(2, 124708),
	new Note(1, 124771),
	new Note(2, 124827),
	new Note(1, 124914),
	new Note(2, 125135),
	new Note(2, 125496),
	new Note(3, 125678),
	new Note(2, 126100),
	new Note(3, 126266),
	new Note(2, 126599),
	new Note(3, 126937),
	new Note(2, 127083),
	new Note(3, 127502),
	new Note(2, 127944),
	new Note(4, 128370),
	new Note(2, 128564),
	new Note(2, 130030),
	new Note(1, 130807),
	new Note(2, 130950),
	new Note(2, 132275),
	new Note(2, 133766),
	new Note(2, 133921),
	new Note(2, 134062),
	new Note(2, 134191),
	new Note(2, 134545),
	new Note(2, 134907),
	new Note(2, 135267),
	new Note(2, 135582),
	new Note(2, 135729),
	new Note(2, 135886),
	new Note(2, 136017),
	new Note(2, 136169),
	new Note(2, 136308),
	new Note(2, 136461),
	new Note(1, 136570),
	new Note(1, 136722),
	new Note(1, 136853),
	new Note(1, 137002),
	new Note(1, 137384),
	new Note(1, 137722),
	new Note(1, 138074),
	new Note(1, 138419),
	new Note(2, 138575),
	new Note(4, 138761),
	new Note(4, 138920),
	new Note(4, 139047),
	new Note(4, 139175),
	new Note(2, 139375),
	new Note(2, 139537),
	new Note(2, 139662),
	new Note(2, 139782),
	new Note(1, 139877),
	new Note(1, 140323),
	new Note(1, 140565),
	new Note(1, 140937),
	new Note(1, 141222),
	new Note(1, 141384),
	new Note(2, 141524),
	new Note(2, 141684),
	new Note(2, 141824),
	new Note(2, 141964),
	new Note(2, 142110),
	new Note(4, 142274),
	new Note(4, 142433),
	new Note(4, 142553),
	new Note(4, 142684),
	new Note(2, 143096),
	new Note(1, 143433),
	new Note(1, 143808),
	new Note(1, 144154),
	new Note(2, 144320),
	new Note(2, 144459),
	new Note(2, 144613),
	new Note(2, 144737),
	new Note(4, 144939),
	new Note(4, 145082),
	new Note(4, 145221),
	new Note(4, 145361),
	new Note(2, 145577),
	new Note(1, 145966),
	new Note(1, 146312),
	new Note(1, 146645),
	new Note(1, 147014),
	new Note(1, 147167),
	new Note(1, 147323),
	new Note(1, 147463),
	new Note(1, 147627),
	new Note(1, 147766),
	new Note(1, 147909),
	new Note(1, 148071),
	new Note(1, 148237),
	new Note(1, 148388),
	new Note(2, 148506),
	new Note(2, 148876),
	new Note(2, 149169),
	new Note(2, 149498),
	new Note(4, 149820),
	new Note(2, 149997),
	new Note(2, 150158),
	new Note(2, 150310),
	new Note(2, 150460),
	new Note(2, 150619),
	new Note(1, 150787),
	new Note(1, 150939),
	new Note(1, 151080),
	new Note(1, 151195),
	new Note(1, 151405),
	new Note(1, 151713),
	new Note(1, 152001),
	new Note(2, 152362),
	new Note(2, 152626),
	new Note(4, 152789),
	new Note(4, 152928),
	new Note(4, 153082),
	new Note(4, 153244),
	new Note(4, 153392),
	new Note(2, 153567),
	new Note(2, 153768),
	new Note(2, 153933),
	new Note(2, 154049),
	new Note(1, 154492),
	new Note(1, 154856),
	new Note(1, 155172),
	new Note(1, 155501),
	new Note(2, 155691),
	new Note(2, 155848),
	new Note(2, 156414),
	new Note(1, 156863),
	new Note(4, 157246),
	new Note(2, 157412),
	new Note(3, 157578),
	new Note(1, 158989),
	new Note(1, 159286),
	new Note(1, 159443),
	new Note(2, 159608),
	new Note(2, 159750),
	new Note(2, 159887),
	new Note(4, 160186),
	new Note(2, 160850),
	new Note(1, 161213),
	new Note(1, 161351),
	new Note(2, 161734),
	new Note(4, 162075),
	new Note(2, 162642),
	new Note(2, 162810),
	new Note(1, 163137),
	new Note(2, 163322),
	new Note(4, 164947),
	new Note(4, 165112),
	new Note(2, 165449),
	new Note(1, 165730),
	new Note(2, 166141),
	new Note(4, 166513),
	new Note(2, 166894),
	new Note(3, 167098),
	new Note(3, 167432),
	new Note(1, 168184),
	new Note(2, 168423),
	new Note(4, 168774),
	new Note(2, 168941),
	new Note(1, 169177),
	new Note(1, 170396),
	new Note(1, 170684),
	new Note(1, 170848),
	new Note(1, 171084),
	new Note(1, 171282),
	new Note(2, 171443),
	new Note(2, 171615),
	new Note(2, 171789),
	new Note(2, 171971),
	new Note(2, 172133),
	new Note(1, 172673),
	new Note(2, 173532),
	new Note(1, 174863),
	new Note(2, 177690),
	new Note(1, 178178),
	new Note(4, 178658),
	new Note(2, 179116),
	new Note(4, 180444),
	new Note(1, 181822),
	new Note(2, 183312),
	new Note(1, 183750),
	new Note(4, 184211),
	new Note(2, 184761),
	new Note(3, 186145),
	new Note(1, 187424),
	new Note(1, 188990),
	new Note(3, 189184),
	new Note(4, 189373),
	new Note(1, 189752),
	new Note(3, 189994),
	new Note(2, 190556),
	new Note(2, 190765),
	new Note(2, 190958),
	new Note(2, 191130),
	new Note(2, 191298),
	new Note(2, 191454),
	new Note(2, 191619),
	new Note(2, 191773),
	new Note(2, 191922),
	new Note(2, 192094),
	new Note(2, 192261),
	new Note(2, 192422),
	new Note(2, 192565),
	new Note(2, 192735),
	new Note(2, 192884),
	new Note(1, 193162),
	new Note(1, 193325),
	new Note(1, 193488),
	new Note(1, 193646),
	new Note(1, 193807),
	new Note(1, 193966),
	new Note(1, 194108),
	new Note(1, 194281),
	new Note(1, 194441),
	new Note(1, 194605),
	new Note(1, 194769),
	new Note(1, 194931),
	new Note(4, 195191),
	new Note(2, 195589),
	new Note(2, 195975),
	new Note(1, 197349),
	new Note(4, 198739),
	new Note(3, 200205),
	new Note(1, 200747),
	new Note(4, 201214),
	new Note(2, 201691),
	new Note(1, 202977),
	new Note(4, 204386),
	new Note(2, 206163),
	new Note(1, 206482),
	new Note(3, 206853),
	new Note(2, 207314),
	new Note(3, 207753),
	new Note(2, 208115),
	new Note(2, 208280),
	new Note(2, 208460),
	new Note(2, 208634),
	new Note(2, 208811),
	new Note(2, 208972),
	new Note(2, 209157),
	new Note(2, 209327),
	new Note(2, 209498),
	new Note(2, 209655),
	new Note(2, 209817),
	new Note(2, 209985),
	new Note(2, 210139),
	new Note(2, 210304),
	new Note(2, 210483),
	new Note(2, 210659),
	new Note(2, 210827),
	new Note(2, 211003),
	new Note(2, 211178),
	new Note(1, 211359),
	new Note(1, 211529),
	new Note(1, 211706),
	new Note(1, 211866),
	new Note(1, 212006),
	new Note(4, 212231),
	new Note(2, 212453),
	new Note(3, 212645),
	new Note(2, 212950),
	new Note(3, 213385),
	new Note(1, 214938),
	new Note(4, 215700)],
	
	germanNotes: [new Note(2, 5491),
	new Note(1, 6797),
	new Note(4, 8590),
	new Note(3, 9233),
	new Note(2, 10111),
	new Note(1, 10831),
	new Note(4, 11882),
	new Note(2, 12474),
	new Note(1, 13425),
	new Note(2, 15129),
	new Note(4, 16803),
	new Note(1, 18513),
	new Note(2, 19095),
	new Note(4, 20233),
	new Note(1, 21949),
	new Note(2, 23320),
	new Note(4, 24059),
	new Note(1, 25043),
	new Note(2, 25688),
	new Note(1, 26608),
	new Note(4, 27045),
	new Note(2, 28453),
	new Note(1, 29318),
	new Note(4, 29752),
	new Note(2, 30382),
	new Note(1, 30526),
	new Note(4, 31036),
	new Note(3, 31699),
	new Note(2, 32224),
	new Note(1, 32815),
	new Note(4, 33412),
	new Note(2, 34117),
	new Note(1, 34649),
	new Note(4, 35107),
	new Note(2, 35950),
	new Note(3, 36597),
	new Note(1, 37186),
	new Note(4, 37723),
	new Note(3, 39155),
	new Note(1, 39714),
	new Note(4, 40172),
	new Note(2, 40964),
	new Note(3, 41493),
	new Note(1, 42208),
	new Note(4, 42731),
	new Note(2, 43123),
	new Note(2, 43263),
	new Note(1, 43593),
	new Note(3, 43924),
	new Note(4, 44187),
	new Note(2, 44778),
	new Note(1, 45297),
	new Note(3, 45627),
	new Note(3, 45761),
	new Note(4, 46085),
	new Note(2, 46412),
	new Note(1, 46614),
	new Note(2, 47329),
	new Note(4, 47858),
	new Note(1, 48250),
	new Note(1, 48382),
	new Note(2, 48656),
	new Note(3, 48978),
	new Note(1, 49834),
	new Note(1, 50416),
	new Note(2, 50675),
	new Note(2, 50809),
	new Note(4, 51137),
	new Note(2, 51472),
	new Note(1, 52327),
	new Note(2, 52979),
	new Note(2, 53238),
	new Note(2, 53317),
	new Note(1, 53650),
	new Note(4, 54044),
	new Note(2, 54320),
	new Note(2, 54449),
	new Note(1, 54783),
	new Note(2, 55107),
	new Note(2, 55240),
	new Note(2, 55380),
	new Note(1, 55776),
	new Note(1, 55904),
	new Note(4, 56166),
	new Note(2, 56504),
	new Note(2, 56766),
	new Note(1, 57222),
	new Note(4, 57547),
	new Note(4, 57686),
	new Note(2, 57946),
	new Note(2, 58276),
	new Note(2, 58411),
	new Note(1, 58676),
	new Note(2, 59328),
	new Note(4, 59725),
	new Note(2, 60177),
	new Note(2, 60320),
	new Note(1, 60461),
	new Note(2, 61113),
	new Note(2, 61837),
	new Note(4, 62295),
	new Note(2, 62753),
	new Note(2, 62880),
	new Note(1, 63613),
	new Note(3, 64334),
	new Note(4, 64798),
	new Note(2, 65261),
	new Note(2, 65457),
	new Note(2, 65592),
	new Note(1, 66246),
	new Note(3, 66901),
	new Note(4, 67359),
	new Note(2, 67699),
	new Note(2, 67887),
	new Note(2, 68414),
	new Note(1, 68809),
	new Note(2, 69394),
	new Note(4, 69852),
	new Note(2, 70504),
	new Note(2, 70958),
	new Note(2, 71094),
	new Note(1, 71237),
	new Note(2, 71954),
	new Note(2, 72157),
	new Note(2, 72286),
	new Note(2, 72422),
	new Note(2, 72618),
	new Note(2, 72759),
	new Note(2, 72954),
	new Note(1, 73286),
	new Note(2, 73751),
	new Note(2, 74150),
	new Note(2, 74421),
	new Note(2, 74749),
	new Note(3, 74749),
	new Note(3, 74952),
	new Note(3, 75413),
	new Note(2, 75739),
	new Note(2, 75949),
	new Note(2, 76277),
	new Note(1, 76671),
	new Note(4, 77000),
	new Note(2, 77135),
	new Note(2, 77403),
	new Note(1, 77865),
	new Note(3, 78262),
	new Note(3, 78523),
	new Note(3, 78664),
	new Note(3, 79057),
	new Note(2, 79587),
	new Note(2, 79786),
	new Note(2, 79924),
	new Note(1, 80635),
	new Note(4, 80840),
	new Note(2, 81168),
	new Note(2, 81496),
	new Note(1, 81769),
	new Note(2, 82034),
	new Note(2, 82229),
	new Note(2, 82498),
	new Note(2, 83159),
	new Note(2, 83355),
	new Note(1, 83623),
	new Note(4, 83763),
	new Note(2, 84158),
	new Note(1, 84489),
	new Note(2, 85027),
	new Note(2, 85683),
	new Note(2, 85814),
	new Note(1, 86145),
	new Note(4, 86279),
	new Note(2, 86614),
	new Note(2, 86941),
	new Note(2, 87272),
	new Note(1, 87533),
	new Note(4, 87857),
	new Note(3, 88192),
	new Note(2, 88521),
	new Note(2, 88850),
	new Note(1, 89180),
	new Note(4, 89508),
	new Note(2, 89712),
	new Note(2, 89914),
	new Note(1, 90564),
	new Note(2, 90900),
	new Note(2, 91033),
	new Note(2, 91293),
	new Note(1, 91630),
	new Note(4, 91962),
	new Note(2, 92353),
	new Note(1, 92624),
	new Note(2, 93413),
	new Note(2, 93739),
	new Note(2, 93872),
	new Note(2, 94271),
	new Note(1, 94595),
	new Note(4, 95000),
	new Note(2, 95455),
	new Note(1, 95854),
	new Note(2, 96251),
	new Note(2, 96521),
	new Note(4, 96854),
	new Note(2, 97185),
	new Note(1, 97457),
	new Note(1, 97584),
	new Note(2, 97980),
	new Note(4, 98374),
	new Note(4, 98705),
	new Note(4, 98839),
	new Note(2, 99299),
	new Note(1, 99657),
	new Note(1, 100115),
	new Note(3, 100580),
	new Note(2, 100907),
	new Note(2, 101242),
	new Note(2, 101438),
	new Note(1, 101894),
	new Note(2, 102169),
	new Note(4, 102490),
	new Note(4, 102693),
	new Note(2, 103019),
	new Note(1, 103487),
	new Note(1, 103760),
	new Note(1, 103891),
	new Note(2, 104355),
	new Note(4, 104687),
	new Note(2, 105024),
	new Note(2, 105288),
	new Note(2, 105684),
	new Note(1, 106018),
	new Note(2, 106344),
	new Note(2, 106681),
	new Note(2, 106941),
	new Note(1, 107275),
	new Note(4, 107542),
	new Note(2, 107746),
	new Note(3, 108072),
	new Note(1, 108472),
	new Note(2, 108732),
	new Note(2, 109064),
	new Note(2, 109461),
	new Note(1, 109857),
	new Note(4, 110046),
	new Note(2, 110254),
	new Note(2, 110968),
	new Note(2, 111104),
	new Note(1, 111433),
	new Note(4, 111701),
	new Note(2, 111961),
	new Note(3, 112359),
	new Note(3, 112497),
	new Note(3, 112632),
	new Note(1, 113419),
	new Note(1, 113565),
	new Note(2, 113886),
	new Note(4, 114151),
	new Note(2, 114483),
	new Note(1, 114804),
	new Note(4, 115075),
	new Note(2, 115267),
	new Note(1, 115921),
	new Note(2, 116061),
	new Note(2, 116446),
	new Note(3, 116647),
	new Note(1, 116909),
	new Note(4, 117239),
	new Note(4, 117576),
	new Note(4, 117711),
	new Note(2, 117904),
	new Note(2, 118300),
	new Note(2, 118435),
	new Note(1, 118830),
	new Note(3, 119095),
	new Note(2, 119495),
	new Note(2, 119879),
	new Note(1, 120083),
	new Note(4, 120350),
	new Note(2, 120802),
	new Note(1, 121203),
	new Note(2, 121469),
	new Note(2, 121608),
	new Note(4, 121940),
	new Note(2, 122205),
	new Note(1, 122533),
	new Note(3, 122864),
	new Note(2, 124241),
	new Note(1, 124706),
	new Note(2, 124975),
	new Note(2, 125561),
	new Note(2, 126013),
	new Note(2, 126340),
	new Note(2, 126538),
	new Note(4, 126801),
	new Note(2, 127133),
	new Note(1, 127266),
	new Note(2, 128053),
	new Note(2, 128570),
	new Note(2, 128959),
	new Note(2, 129092),
	new Note(1, 129357),
	new Note(2, 129616),
	new Note(2, 130545),
	new Note(2, 131071),
	new Note(2, 131403),
	new Note(2, 131537),
	new Note(1, 131800),
	new Note(4, 132136),
	new Note(3, 132331),
	new Note(2, 133117),
	new Note(2, 133582),
	new Note(2, 133968),
	new Note(2, 134114),
	new Note(1, 134448),
	new Note(2, 134774),
	new Note(2, 135035),
	new Note(1, 135555),
	new Note(2, 135820),
	new Note(2, 135960),
	new Note(2, 136162),
	new Note(2, 136491),
	new Note(2, 136622),
	new Note(4, 136957),
	new Note(3, 137218),
	new Note(2, 137488),
	new Note(2, 137684),
	new Note(2, 137948),
	new Note(1, 138344),
	new Note(1, 138477),
	new Note(1, 138675),
	new Note(2, 139008),
	new Note(2, 139150),
	new Note(4, 139473),
	new Note(2, 139742),
	new Note(2, 140072),
	new Note(2, 140200),
	new Note(1, 140399),
	new Note(2, 140860),
	new Note(2, 141059),
	new Note(2, 141134),
	new Note(4, 141522),
	new Note(4, 141655),
	new Note(2, 141932),
	new Note(1, 142250),
	new Note(3, 142517),
	new Note(4, 142652),
	new Note(2, 143048),
	new Note(2, 143373),
	new Note(2, 143508),
	new Note(1, 143653),
	new Note(2, 144043),
	new Note(2, 144191),
	new Note(1, 144448),
	new Note(2, 144917),
	new Note(1, 145113),
	new Note(4, 145314),
	new Note(2, 145574),
	new Note(1, 145903),
	new Note(1, 146040),
	new Note(1, 146238),
	new Note(2, 146565),
	new Note(2, 146701),
	new Note(2, 146966),
	new Note(1, 147296),
	new Note(4, 147561),
	new Note(2, 147764),
	new Note(2, 148027),
	new Note(2, 148483),
	new Note(1, 148681),
	new Note(2, 149010),
	new Note(2, 149212),
	new Note(1, 149473),
	new Note(2, 149810),
	new Note(2, 150075),
	new Note(4, 150282),
	new Note(2, 150474),
	new Note(2, 150874),
	new Note(2, 151013),
	new Note(1, 151141),
	new Note(2, 151534),
	new Note(2, 151728),
	new Note(1, 151990),
	new Note(1, 152125),
	new Note(2, 152383),
	new Note(2, 152648),
	new Note(2, 152843),
	new Note(2, 152976),
	new Note(2, 153117),
	new Note(2, 153312),
	new Note(2, 153449),
	new Note(2, 153652),
	new Note(1, 153986),
	new Note(2, 154248),
	new Note(4, 154447),
	new Note(2, 154776),
	new Note(1, 155176),
	new Note(3, 155703),
	new Note(3, 156095),
	new Note(1, 156489),
	new Note(2, 156817),
	new Note(4, 157088),
	new Note(1, 157415),
	new Note(2, 157749),
	new Note(4, 158019),
	new Note(3, 158155),
	new Note(2, 158546),
	new Note(1, 159011),
	new Note(2, 159272),
	new Note(3, 159489),
	new Note(3, 159884),
	new Note(2, 160281),
	new Note(1, 160420),
	new Note(4, 160815),
	new Note(2, 161536),
	new Note(2, 161744),
	new Note(2, 162131),
	new Note(1, 162459),
	new Note(4, 162732),
	new Note(4, 162859),
	new Note(2, 163258),
	new Note(1, 163592),
	new Note(2, 164045),
	new Note(2, 164243),
	new Note(4, 164646),
	new Note(2, 164976),
	new Note(2, 165307),
	new Note(1, 165510),
	new Note(2, 165639),
	new Note(2, 165773),
	new Note(2, 166494),
	new Note(1, 166814),
	new Note(4, 167080),
	new Note(4, 167284),
	new Note(2, 167611),
	new Note(3, 167947),
	new Note(3, 168335),
	new Note(1, 169060),
	new Note(4, 169324),
	new Note(1, 169588),
	new Note(2, 169917),
	new Note(4, 170311),
	new Note(4, 170454),
	new Note(2, 170849),
	new Note(1, 171369),
	new Note(1, 171566),
	new Note(1, 171900),
	new Note(1, 172098),
	new Note(2, 172423),
	new Note(4, 172686),
	new Note(4, 173015),
	new Note(2, 173343),
	new Note(1, 174197),
	new Note(1, 174666),
	new Note(2, 174997),
	new Note(1, 175385),
	new Note(1, 175715),
	new Note(1, 175781),
	new Note(2, 176301),
	new Note(2, 176631),
	new Note(2, 176962),
	new Note(2, 177101),
	new Note(4, 177230),
	new Note(4, 177563),
	new Note(2, 177951),
	new Note(2, 178215),
	new Note(2, 178355),
	new Note(1, 178745),
	new Note(1, 179199),
	new Note(1, 179525),
	new Note(1, 179598),
	new Note(2, 180062),
	new Note(2, 180391),
	new Note(2, 180725),
	new Note(2, 180858),
	new Note(4, 181318),
	new Note(4, 181651),
	new Note(4, 181983),
	new Note(4, 182118),
	new Note(1, 182579),
	new Note(1, 182973),
	new Note(1, 183434),
	new Note(2, 183770),
	new Note(3, 184300),
	new Note(3, 184562),
	new Note(3, 184698),
	new Note(1, 185090),
	new Note(3, 185432),
	new Note(3, 185759),
	new Note(3, 185895),
	new Note(4, 186358),
	new Note(2, 186753),
	new Note(2, 186947),
	new Note(2, 187150),
	new Note(1, 187677),
	new Note(1, 188068),
	new Note(1, 188336),
	new Note(1, 188468),
	new Note(1, 188801),
	new Note(2, 189259),
	new Note(2, 189651),
	new Note(2, 189788),
	new Note(2, 190252),
	new Note(4, 190590),
	new Note(4, 190862),
	new Note(4, 190989),
	new Note(2, 191448),
	new Note(2, 191788),
	new Note(2, 192118),
	new Note(2, 192246),
	new Note(1, 192773),
	new Note(1, 193099),
	new Note(1, 193428),
	new Note(1, 193562),
	new Note(2, 193895),
	new Note(2, 194036),
	new Note(2, 194169),
	new Note(2, 197888),
	new Note(1, 198550),
	new Note(4, 199343),
	new Note(2, 199934),
	new Note(3, 201175),
	new Note(1, 201895),
	new Note(4, 202743),
	new Note(1, 203207),
	new Note(2, 203465),
	new Note(2, 203928),
	new Note(2, 204588),
	new Note(1, 204928),
	new Note(4, 205125),
	new Note(3, 205465),
	new Note(1, 206054),
	new Note(1, 206456),
	new Note(4, 206844),
	new Note(2, 207697),
	new Note(1, 208106),
	new Note(2, 208565),
	new Note(4, 208902),
	new Note(1, 209360),
	new Note(2, 209569),
	new Note(2, 210094),
	new Note(2, 210558),
	new Note(1, 211082),
	new Note(4, 211475),
	new Note(2, 211740),
	new Note(1, 212199),
	new Note(3, 212934),
	new Note(4, 213257),
	new Note(2, 213503),
	new Note(1, 214623),
	new Note(4, 215719),
	new Note(2, 216314),
	new Note(1, 216638),
	new Note(3, 216838),
	new Note(2, 217237),
	new Note(2, 217693),
	new Note(1, 218349),
	new Note(4, 218938),
	new Note(2, 219266),
	new Note(2, 219947),
	new Note(2, 220146),
	new Note(1, 220482),
	new Note(2, 220750),
	new Note(4, 221013),
	new Note(2, 222316),
	new Note(1, 222711),
	new Note(4, 222914),
	new Note(2, 223376),
	new Note(1, 223704),
	new Note(2, 224092),
	new Note(4, 224625),
	new Note(3, 225352)]
	}


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map