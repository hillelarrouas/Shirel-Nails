const shgia = document.querySelector("#shgia")
const inputext = document.querySelector("#inputext")
const box = document.querySelector(".box")
const inpotd = document.querySelector("#inpotd")
const intext = document.querySelector("#intext")
const marginvov = document.querySelector(".marginvov")
const sd = document.querySelector("#sd")
const red = document.querySelector(".red")
const text_tel = document.querySelector(".text_tel")
const texttext = document.querySelector(".texttext")
const intel = document.querySelector(".intel")
let html = "";

// הגדרות ראשוניות על הינפוט של הטלפון
inputext.focus();
text_tel.className = "ohverinpot"


// הוספת - אחרי 054 אוטומטי
inputext.addEventListener("keyup", function () {
    const Mobile_Phone = inputext.value;
    var CarNumber = Mobile_Phone.replace(/-/g, '')
    if (CarNumber.length > 2) {
        if (CarNumber[1] !== '5' && CarNumber[1] !== '7') {
            CarNumber = CarNumber.substring(0, 2) + "-" + CarNumber.substr(2)
        } else if (CarNumber.length > 3) {
            CarNumber = CarNumber.substring(0, 3) + "-" + CarNumber.substr(3)
        }
        inputext.value = CarNumber
    }
})

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

// טלפון
function funcPhone(e) {
    const Mobile_Phone = inputext.value;
    if (Mobile_Phone[0] != 0) {
        inputext.value =""
     }
    else {
        if (Mobile_Phone[1] === '5' || Mobile_Phone[1] === '7') {
            inputext.maxLength = '11'
            if (Mobile_Phone.length == 11) {
                shgia.innerHTML = "מספר תקין"
            } else {
                shgia.innerHTML = "הזן מספר טלפון"
                marginvov.innerText = "צור קישור"
                marginvov.style.color = "rgb(42, 51, 41)"
                marginvov.style.border = '3px solid rgba(143, 143, 143, 0.287)'
            }
        }
        else {
            inputext.maxLength = '10'
            if (Mobile_Phone.length == 10) {
                shgia.innerHTML = "מספר תקין"
            } else {
                shgia.innerHTML = "הזן מספר טלפון"
                marginvov.innerText = "צור קישור"
                marginvov.style.color = "rgb(42, 51, 41)"
                marginvov.style.border = '3px solid rgba(143, 143, 143, 0.287)'
            }
        }
    }
}


// מעבר להתכתבות
function next() {
    const Mobile_Phone = inputext.value;
    if (Mobile_Phone.length < 1) {
        shgia.innerHTML = "נא להזין מספר טלפון נייח או נייד"
        inputext.focus()
    } else if (Mobile_Phone.length < 10 && inputext.maxLength == '10' || Mobile_Phone.length < 11 && inputext.maxLength == '11') {
        shgia.innerHTML = "מספר קצר "
    } else if (Mobile_Phone[0] != 0) {
        shgia.innerHTML = "מספר שגוי "
    }
    else {
        window.open(`https://wa.me/972${Mobile_Phone.replace('-', '')}?text=${encodeURIComponent(inpotd.value)}`)
    }
}

// העתקת טקסט ליצירת קשר
function copyy(event) {
    const Mobile_Phone = inputext.value;
    if (Mobile_Phone.length < 1) {
        shgia.innerHTML = "נא להזין מספר טלפון נייח או נייד"
        inputext.focus()
    } else if (Mobile_Phone.length < 10 && inputext.maxLength == '10' || Mobile_Phone.length < 11 && inputext.maxLength == '11') {
        shgia.innerHTML = "מספר קצר "
    } else if (Mobile_Phone[0] != 0) {
        shgia.innerHTML = "מספר שגוי "
    } else {
        intext.style.display = "inline-block"
        marginvov.innerText = "הקישור העותק ללוח"
        marginvov.style.border = '3px solid rgb(16, 163, 3)'
        marginvov.style.color = "rgb(19, 116, 10)"
        if (inpotd.value.length > 0) {
            intext.value = `https://wa.me/972${inputext.value.replace('-', '')}?text=${encodeURIComponent(inpotd.value)}`
            document.execCommand('copy')
        } else {
            intext.value = `https://wa.me/972${inputext.value.replace('-', '')}`
        }
        myFunction()
        intext.style.display = "none"
    }
}

// העתקת קישור ללוח
function myFunction() {
    let copyText = intext;
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
}


// תנאי ליצירת קישור
function nonelink(event) {
    const Mobile_Phone = inputext.value;
    if (shgia.innerText === "הזן מספר טלפון") {
        marginvov.innerText = "צור קישור"
        marginvov.style.border = '3px solid rgba(143, 143, 143, 0.287)'
    }
    else {
        if (Mobile_Phone.length == 10 && marginvov.innerText == "הקישור העותק ללוח" || Mobile_Phone.length == 11 && marginvov.innerText == "הקישור העותק ללוח") {
            marginvov.innerText = "עדכון קישור"
            marginvov.style.border = '3px solid rgb(163, 40, 3)'
            marginvov.style.color = "rgb(42, 51, 41)"
            if (Mobile_Phone.length < 10 && inputext.maxLength == '10' || Mobile_Phone.length < 11 && inputext.maxLength == '11') {
                marginvov.addEventListener("click", function () {
                    marginvov.innerText = "הקישור העותק ללוח"
                    marginvov.style.border = '3px solid rgb(16, 163, 3)'
                    marginvov.style.color = "rgb(19, 116, 10)"
                })
            }
        }
    }
}

// צריך לשפר את הקוד 
inputext.addEventListener("focus", function () {
    text_tel.className = "ohverinpot"
})

inputext.addEventListener("focusout", function () {
    if (inputext.value.length == '0') {
        text_tel.className = "texttext"
    }
})

inpotd.addEventListener("focus", function () {
    texttext.className = "ohverinpot"
})

red.addEventListener("focusout", function () {
    if (inpotd.value.length == '0') {
        texttext.className = "texttext"
    }
})

// לחיצה על אנטר כדי ללחוץ אוטומטי על כפתור
inputext.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        marginvov.click()

    }
})