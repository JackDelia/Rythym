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
	    Song = __webpack_require__(2);
	
	var notes = [];
	 for (var i = 0; i < 500; i++) {
	   notes.push(new Note(Math.floor(Math.random()*4)+1, i*200));
	 }
	
	var groove = document.getElementById("groovin");
	
	var song = new Song(notes, groove);
	
	var canvas = document.getElementById("game-canvas");
	var context = canvas.getContext("2d");
	context.font = "30px Arial";
	context.fillText("SCORE:", 500, 50);
	
	song.playSong(context);


/***/ },
/* 1 */
/***/ function(module, exports) {

	var STEP = 100;
	var TIMESTEP = .5;
	
	function Note(button, time, duration) {
	  this.button = button;
	  this.time = time;
	  this.hit = false;
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
	  ctx.fillStyle = "blue";
	
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Note = __webpack_require__(1);
	var key = __webpack_require__(3);
	
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map