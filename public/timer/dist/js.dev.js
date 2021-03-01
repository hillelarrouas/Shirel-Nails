"use strict";

// Date top
getDateTime();

function getDateTime() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();

  if (month.toString().length == 1) {
    month = '0' + month;
  }

  if (day.toString().length == 1) {
    day = '0' + day;
  }

  if (hour.toString().length == 1) {
    hour = '0' + hour;
  }

  if (minute.toString().length == 1) {
    minute = '0' + minute;
  }

  if (second.toString().length == 1) {
    second = '0' + second;
  }

  var time = "".concat(hour, ":").concat(minute, ":").concat(second);
  var date = "".concat(year, "/").concat(month, "/").concat(day);
  document.querySelector('.date').innerHTML = date;
  document.querySelector('.hour').innerHTML = time;
}

setInterval(function () {
  getDateTime();
}, 1000); // card 1

var dilay1 = 1079;
var forr1 = 0;
var e1 = 360;
var upgradeTime1 = 1079;

function time1() {
  document.querySelector('.imgOff1').style.display = 'none';
  document.querySelector('.imgeset1').style.display = 'block';
  document.querySelector('.stop1').style.display = 'block';
  var seconds = upgradeTime1;

  function timer() {
    if (seconds <= 30) {
      document.querySelector('.cardtime1').style.background = 'rgb(255, 177, 177)';
    } else {
      document.querySelector('.cardtime1').style.background = 'rgb(226, 226, 202)';
    }

    var days = Math.floor(seconds / 24 / 60 / 60);
    var hoursLeft = Math.floor(seconds - days * 86400);
    var hours = Math.floor(hoursLeft / 3600);
    var minutesLeft = Math.floor(hoursLeft - hours * 3600);
    var minutes = Math.floor(minutesLeft / 60);
    var remainingSeconds = seconds % 60;

    function pad(n) {
      return n < 10 ? "0" + n : n;
    }

    document.getElementById('minutes1').innerHTML = pad(minutes) + ":" + pad(remainingSeconds);

    if (seconds == 0) {
      clearInterval(countdownTimer);
      forr1++;
      document.getElementById('for1').style.display = 'block';
      document.getElementById('for1').innerHTML = "<b>".concat(forr1, "</b> \u05E1\u05D9\u05D1\u05D5\u05D1 ");
      document.getElementById('minutes1').innerHTML = "18:00";
      document.querySelector('.cardtime1').style.background = 'rgb(226, 226, 202)';
      document.querySelector('.imgOff1').style.display = 'block';
      document.querySelector('.imgeset1').style.display = 'none';
      document.querySelector('.stop1').style.display = 'none';
    } else {
      seconds--;
      dilay1 = seconds;
    }
  }

  var countdownTimer = setInterval(timer, 1000);
  $(".imgeset1").click(function () {
    document.getElementById('minutes1').innerHTML = "18:00";
    document.querySelector('.cardtime1').style.background = 'rgb(226, 226, 202)';
    clearInterval(countdownTimer);
    time1();
    upgradeTime1 = 1079;
    dilay1 = 1079;
    e1 = e1 + 360;
    document.querySelector('.imgeset1').style.transform = "rotate(".concat(e1, "deg)");
  });
  $(".stop1").click(function () {
    document.querySelector('.imgOff1').style.display = 'block';
    document.querySelector('.stop1').style.display = 'none';
    upgradeTime1 = dilay1;
    clearInterval(countdownTimer);
  });
} // card 2


var dilay2 = 1079;
var forr2 = 0;
var e2 = 360;
var upgradeTime2 = 1079;

function time2() {
  document.querySelector('.imgOff2').style.display = 'none';
  document.querySelector('.imgeset2').style.display = 'block';
  document.querySelector('.stop2').style.display = 'block';
  var seconds = upgradeTime2;

  function timer() {
    if (seconds <= 30) {
      document.querySelector('.cardtime2').style.background = 'rgb(255, 177, 177)';
    } else {
      document.querySelector('.cardtime2').style.background = 'rgb(226, 226, 202)';
    }

    var days = Math.floor(seconds / 24 / 60 / 60);
    var hoursLeft = Math.floor(seconds - days * 86400);
    var hours = Math.floor(hoursLeft / 3600);
    var minutesLeft = Math.floor(hoursLeft - hours * 3600);
    var minutes = Math.floor(minutesLeft / 60);
    var remainingSeconds = seconds % 60;

    function pad(n) {
      return n < 10 ? "0" + n : n;
    }

    document.getElementById('minutes2').innerHTML = pad(minutes) + ":" + pad(remainingSeconds);

    if (seconds == 0) {
      clearInterval(countdownTimer);
      forr2++;
      document.getElementById('for2').style.display = 'block';
      document.getElementById('for2').innerHTML = "<b>".concat(forr2, "</b> \u05E1\u05D9\u05D1\u05D5\u05D1 ");
      document.getElementById('minutes2').innerHTML = "18:00";
      document.querySelector('.cardtime2').style.background = 'rgb(226, 226, 202)';
      document.querySelector('.imgOff2').style.display = 'block';
      document.querySelector('.imgeset2').style.display = 'none';
      document.querySelector('.stop2').style.display = 'none';
    } else {
      seconds--;
      dilay2 = seconds;
    }
  }

  var countdownTimer = setInterval(timer, 1000);
  $(".imgeset2").click(function () {
    document.getElementById('minutes2').innerHTML = "18:00";
    document.querySelector('.cardtime2').style.background = 'rgb(226, 226, 202)';
    clearInterval(countdownTimer);
    time2();
    upgradeTime2 = 1079;
    dilay2 = 1079;
    e2 = e2 + 360;
    document.querySelector('.imgeset2').style.transform = "rotate(".concat(e2, "deg)");
  });
  $(".stop2").click(function () {
    document.querySelector('.imgOff2').style.display = 'block';
    document.querySelector('.stop2').style.display = 'none';
    upgradeTime2 = dilay2;
    clearInterval(countdownTimer);
  });
}