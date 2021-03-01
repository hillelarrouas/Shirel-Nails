// Date top

getDateTime()

function getDateTime() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
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
    let time = `${hour}:${minute}:${second}`
    let date = `${year}/${month}/${day}`
    document.querySelector('.date').innerHTML = date
    document.querySelector('.time').innerHTML = time
}

setInterval(function () {
    getDateTime()
}, 1000);







// card 1


let dilay1 = 1079
let forr1 = 0
let e1 = 360
let upgradeTime1 = 1079;


function time1() {
    document.querySelector('.imgOff1').style.display = 'none'
    document.querySelector('.imgeset1').style.display = 'block'
    document.querySelector('.stop1').style.display = 'block'

    let seconds = upgradeTime1;

    function timer() {
        if (seconds <= 30) {
            document.querySelector('.cardtime1').style.background = 'rgb(255, 177, 177)'
        } else {
            document.querySelector('.cardtime1').style.background = 'rgb(226, 226, 202)'
        }
        let days = Math.floor(seconds / 24 / 60 / 60);
        let hoursLeft = Math.floor((seconds) - (days * 86400));
        let hours = Math.floor(hoursLeft / 3600);
        let minutesLeft = Math.floor((hoursLeft) - (hours * 3600));
        let minutes = Math.floor(minutesLeft / 60);
        let remainingSeconds = seconds % 60;

        function pad(n) {
            return (n < 10 ? "0" + n : n);
        }
        document.getElementById('minutes1').innerHTML = pad(minutes) + ":" + pad(remainingSeconds);
        if (seconds == 0) {
            clearInterval(countdownTimer);
            forr1++
            document.getElementById('for1').style.display = 'block'
            document.getElementById('for1').innerHTML = `<b>${forr1}</b> סיבוב `
            document.getElementById('minutes1').innerHTML = "18:00";
            document.querySelector('.cardtime1').style.background = 'rgb(226, 226, 202)'
            document.querySelector('.imgOff1').style.display = 'block'
            document.querySelector('.imgeset1').style.display = 'none'
            document.querySelector('.stop1').style.display = 'none'

        } else {
            seconds--;
            dilay1 = seconds
        }
    }
    let countdownTimer = setInterval(timer, 1000);

    $(".imgeset1").click(function () {
        document.getElementById('minutes1').innerHTML = "18:00";
        document.querySelector('.cardtime1').style.background = 'rgb(226, 226, 202)'
        clearInterval(countdownTimer);
        time1()
        upgradeTime1 = 1079;
        dilay1 = 1079
        e1 = e1 + 360
        document.querySelector('.imgeset1').style.transform = `rotate(${e1}deg)`
    });

    $(".stop1").click(function () {
        document.querySelector('.imgOff1').style.display = 'block'
        document.querySelector('.stop1').style.display = 'none'

        upgradeTime1 = dilay1
        clearInterval(countdownTimer);
    });

}




// card 2


let dilay2 = 1079
let forr2 = 0
let e2 = 360
let upgradeTime2 = 1079;

function time2() {
    document.querySelector('.imgOff2').style.display = 'none'
    document.querySelector('.imgeset2').style.display = 'block'
    document.querySelector('.stop2').style.display = 'block'
    let seconds = upgradeTime2;

    function timer() {
        if (seconds <= 30) {
            document.querySelector('.cardtime2').style.background = 'rgb(255, 177, 177)'
        } else {
            document.querySelector('.cardtime2').style.background = 'rgb(226, 226, 202)'
        }

        let days = Math.floor(seconds / 24 / 60 / 60);
        let hoursLeft = Math.floor((seconds) - (days * 86400));
        let hours = Math.floor(hoursLeft / 3600);
        let minutesLeft = Math.floor((hoursLeft) - (hours * 3600));
        let minutes = Math.floor(minutesLeft / 60);
        let remainingSeconds = seconds % 60;

        function pad(n) {
            return (n < 10 ? "0" + n : n);
        }
        document.getElementById('minutes2').innerHTML = pad(minutes) + ":" + pad(remainingSeconds);
        if (seconds == 0) {
            clearInterval(countdownTimer);
            forr2++
            document.getElementById('for2').style.display = 'block'
            document.getElementById('for2').innerHTML = `<b>${forr2}</b> סיבוב `
            document.getElementById('minutes2').innerHTML = "18:00";
            document.querySelector('.cardtime2').style.background = 'rgb(226, 226, 202)'
            document.querySelector('.imgOff2').style.display = 'block'
            document.querySelector('.imgeset2').style.display = 'none'
            document.querySelector('.stop2').style.display = 'none'

        } else {
            seconds--;
            dilay2 = seconds
        }
    }
    let countdownTimer = setInterval(timer, 1000);



    $(".imgeset2").click(function () {
        document.getElementById('minutes2').innerHTML = "18:00";
        document.querySelector('.cardtime2').style.background = 'rgb(226, 226, 202)'
         clearInterval(countdownTimer);
        time2()
        upgradeTime2 = 1079;
        dilay2 = 1079
        e2 = e2 + 360
        document.querySelector('.imgeset2').style.transform = `rotate(${e2}deg)`
    });

    $(".stop2").click(function () {
        document.querySelector('.imgOff2').style.display = 'block'
        document.querySelector('.stop2').style.display = 'none'
        upgradeTime2 = dilay2
        clearInterval(countdownTimer);
    });

}


