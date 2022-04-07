/* Initialize and declare all variables */
var walk = new Walker();

var c, cc;
var timer, starttime, curtime, timediff, lastmousetime;

var dropdownParticipant = document.getElementById('dropdownParticipant');
var dropdownSpeed = document.getElementById('dropdownSpeed');
var dropdownTrial = document.getElementById('dropdownTrial');
var modelslider = document.getElementById('modelslider');
var playbackspeedslider = document.getElementById('playbackspeedslider');
var btnreset = document.getElementById('btnreset');
var pauseswitch = document.getElementById('pauseswitch');
var markerswitch = document.getElementById('markerswitch');

// Not using these currently 
var colorpicker = document.getElementById('colorpicker');
var dotsizeslider = document.getElementById('dotsizeslider');

var paused = false;
var lines = true;

var lastx = 0;
var lasty = 0;
var lastmousetime;

var done = false;
/* end of variable initialization */

window.onload = function () {
  reset_controls();
  init();
  setInterval(update, 1000 / 60);
}

function Timer(init, precision) {
  var start = time = new Date(init || null).valueOf(),
    precision = precision || 10;

  setInterval(function () { time += precision; }, precision);

  this.getTimer = function () { return time - start; };
  this.getDate = function () { return new Date(time); };
  this.setTimer = function (t) { time = new Date(t).valueOf(); }
}

function init() {
  c = document.getElementById('wc');
  cc = c.getContext('2d');

  timer = new Timer();
  starttime = timer.getTimer();
  lasttime = starttime;
  lastmousetime = timer.getTimer();

  init_walker();

  btnreset.addEventListener("click", function () {
    timer.setTimer(0);
    init_walker();
    reset_controls();
    if (paused) { paused = false; }
  }, false);

  pauseswitch.addEventListener("change", function () {
    if (!paused) {
      lasttime = timer.getTimer();
      paused = true;
    }
    else {
      timer.setTimer(lasttime);
      paused = false;
    }
  });

  markerswitch.addEventListener("change", function () {
    walk.walker_markers = !walk.walker_markers;
    lines = !lines;
  });

  dropdownParticipant.addEventListener("input", function () {
    change_controls();
  }, false);

  dropdownSpeed.addEventListener("input", function () {
    change_controls();
  }, false);

  dropdownTrial.addEventListener("input", function () {
    change_controls();
  }, false);

  modelslider.addEventListener("input", function () {
    change_controls();
  }, false);

  playbackspeedslider.addEventListener("input", function () {
    change_controls();
  }, false);

}

function update() {
  if (!paused) {
    cc.fillStyle = 'white';
    cc.fillRect(0, 0, c.width, c.height);

    curtime = timer.getTimer() - starttime;

    walk.drawWalker(curtime);
  }
}

function init_walker() {
  //lines = false;
  walk = new Walker();
  walk.ctx = cc;
  walk.walker_size = 10;
  walk.dotsize = 3;
  walk.offsetx = c.width / 2;
  walk.offsety = c.height / 2-30; //-30=offset for floor
  //handleResize();

  walk.init();
  walk.walker_sticks = true;

}

function reset_controls() {
  dropdownParticipant.value = "090816_1";
  dropdownSpeed.value = "norm";
  dropdownTrial.value = "17";
  modelslider.value = 1;
  playbackspeedslider.value = 1;

  markerswitch.checked = true;
  pauseswitch.checked = false;
}

function change_controls() {
  walk.walker_participant = dropdownParticipant.value;
  walk.walker_speed = dropdownSpeed.value;
  walk.walker_trial = dropdownTrial.value;
  walk.walker_model = modelslider.value;
  walk.walker_PlaybackSpeed = playbackspeedslider.value;
  walk.init();
}


function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

jQuery(document).ready(function ($) {

  $("#side-menu").metisMenu({
    activeClass: 'active'
  });

});