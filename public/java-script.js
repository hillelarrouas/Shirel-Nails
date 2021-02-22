$(document).ready(function () {
    $(".plus").click(function () {
        $(".cardTes").hide();
        $(".cardplus").show();
        $("#Revenue").focus();
        $("#data").attr("placeholder", detedete())

    });
});
function detedete() {
    if (new Date().getMonth() < 10) {
        return `התאריך היום -  ${new Date().getFullYear()} /0${new Date().getMonth() + 1}/ ${new Date().getDate()}`
    }
    else {
        return `התאריך היום -  ${new Date().getFullYear()} /${new Date().getMonth() + 1}/ ${new Date().getDate()}`
    }
}

$(document).ready(function () {
    $(".return").click(function () {
        $(".cardTes").show();
        $(".cardplus").hide();
    });
});

function buttoneroor() {
    $(".erroorr").animate({
        height: '0px',
        width: '0px'
    });
    setTimeout(function () {
        window.location.reload()
        // getcategoryinit()
    }, 250);
}

$(document).ready(function () {
    $(".cardeditingreturn").click(function () {
        $("#meseggecardediting").html("");
        $("#Revenueediting").val("");
        $("#Fromensbroughtediting").val('');
        $("#Remarksediting").val('');
        $(".cardediting").hide();
        $(".cardTes").show();
    });
});
$(document).ready(function () {
    $(".menudisplayblock").click(function () {
        $(".menu").slideToggle(100);
        $(".scrin").slideToggle(0);
    });
});

$(document).ready(function () {
    $(".Search").click(function () {
        $(".cardSearch").slideToggle(250);
        $("#inputSearch").focus()
        $("#inputSearch").val('')
        setTimeout(function () {
            getcategoryinit()
        }, 300);
    });
});

$(document).ready(function () {
    $(".scrin").click(function () {
        $(".scrin").slideToggle(0);
        $(".menu").slideToggle(100);
    });
});

$(document).ready(function () {
    $(".returnuser").click(function () {
        $(".cardTes").show();
        $(".sing_in").hide();
    });
});

$(document).ready(function () {
    $('#data').bind('keyup', function (e) {
        let key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key !== 8 && key !== 46 && key !== 0) {
            let TempDate = $(this).val().replace(/\//g, "")
            if ($.isNumeric(TempDate)) {
                if (TempDate.length >= 4) {
                    TempDate = TempDate.substr(0, 2) + "/" + TempDate.substr(2, 2) + "/" + TempDate.substr(4)
                } else if (TempDate.length >= 2) {
                    TempDate = TempDate.substr(0, 2) + "/" + TempDate.substr(2)
                }
                $(this).val(TempDate)
            }
        }
    });
});
$(document).ready(function () {
    $('#dataediting').bind('keyup', function (e) {
        let key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key !== 8 && key !== 46 && key !== 0) {
            let TempDate = $(this).val().replace(/\//g, "")
            if ($.isNumeric(TempDate)) {
                if (TempDate.length >= 4) {
                    TempDate = TempDate.substr(0, 2) + "/" + TempDate.substr(2, 2) + "/" + TempDate.substr(4)
                } else if (TempDate.length >= 2) {
                    TempDate = TempDate.substr(0, 2) + "/" + TempDate.substr(2)
                }
                $(this).val(TempDate)
            }
        }
    });
});

setInterval(function () {
    const _id = aryyuser[0]._id
    const LastSeen = new Date().toString();

    fetch('/LastSeen', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            _id, LastSeen,pag
        })
    }).then(res => res.json())
        .then(deta => {
            console.log(deta)
            if (deta.versionUpdate){
                eroorfirsa()
            }
        })
}, 10000);


function init() {
    getcategoryinit()
    usermenu()
}

let allData
let aryyuser = []
function usermenu() {
    aryyuser = []
    fetch('/get-userid')
        .then(res =>
            res.json()
        )
        .then(deta => {
            if (deta.validated == false) {
                testlogin()
            }
            else {
                document.body.style.display = 'block'
                aryyuser.push(deta.deta[0])
                $(".cardlogin").html(
                    `<div class="textcardlogin">${deta.deta[0].name}<div class="img" onclick='editUsercardlogin()'><img class='pen' src="/img/pen.png"></div></div>`
                );
            }
        })
}

function editUsercardlogin() {
    $(".menu").slideToggle(100);
    $(".scrin").slideToggle(0);
    $(".sing_in").show();
    $(".cardediting").hide();
    $(".cardplus").hide();
    $(".cardTes").hide();
    $(".meseggesing_in").html('')
    $("#namesing_in").val(aryyuser[0].name);
    $("#telsing_in").val(aryyuser[0].phone);
    $("#emailsing_in").val(aryyuser[0].email);
    $("#paswordsing_in").val(aryyuser[0].password);
}


$(document).ready(function () {
    $("#clickbuttosing_in").click(function () {
        const namesing_in = $("#namesing_in").val();
        const telsing_in = $("#telsing_in").val();
        const emailsing_in = $("#emailsing_in").val();
        const paswordsing_in = $("#paswordsing_in").val();
        const _id = aryyuser[0]._id
        $(".meseggesing_in").html('')

        if (namesing_in.length == 0) {
            $(".meseggesing_in").html('הזן שם פרטי')
        } else if (telsing_in.length == 0) {
            $(".meseggesing_in").html('הזן מספר טלפון')
        } else if (emailsing_in.length == 0) {
            $(".meseggesing_in").html('הזן כתובת אימייל')
        } else if (paswordsing_in.length == 0) {
            $(".meseggesing_in").html('הזן סיסמה')
        } else {
            fetch('/UserUpdate', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    namesing_in, telsing_in, emailsing_in, paswordsing_in, _id
                })
            }).then(res => res.json())
                .then(deta => {
                    if (deta.validated == false) {
                        location.href = '/login.html'
                    }
                    if (deta.ok == true) {
                        usermenu()
                        $(".meseggesing_in").html('עדכון בוצע בהצלחה')
                        setTimeout(function () {
                            $(".cardTes").show();
                            $(".sing_in").hide();
                        }, 1500);
                    } else {
                        $(".meseggesing_in").html('משתמש קיים')
                    }
                })
        }
    });
});



const pag = 2

function getcategoryinit() {
    fetch('/get-categoryinit', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pag
        })
    }).then(res => res.json())
        .then(deta => {
            if (deta.versionUpdate) {
                eroorfirsa()
            }
            else {
                dom(deta.deta)
                allData = deta.deta
            }
        })
}

$(document).ready(function () {
    $("#clickbuttonplus").click(function () {
        let Revenue = $("#Revenue").val();
        let Fromensbrought = $("#Fromensbrought").val();
        const Remarks = $("#Remarks").val();
        const Dailydate = $("#data").val();
        const time = `${new Date().toLocaleTimeString()} - ${new Date().getDate()} /0${new Date().getMonth() + 1}/ ${new Date().getFullYear()}`


        if (Revenue.length == 0 && Fromensbrought.length == 0) {
            $(".meseggecardplus").html('הוסף הכנסה / הוצאה');
        } else {

            fetch('/button-plus', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Revenue, Fromensbrought, Remarks, Dailydate, time
                })
            }).then(res => res.json())
                .then(deta => {
                    getcategoryinit()
                    $(".meseggecardplus").html('');
                    $("#Revenue").val('');
                    $("#Fromensbrought").val('');
                    $("#Remarks").val('');
                    $("#data").val('');
                    $(".cardTes").show();
                    $(".cardplus").hide();
                })
        }
    });
});

$(document).ready(function () {
    $("#clickbuttonediting").click(function () {
        let Revenueediting = $("#Revenueediting").val();
        let Fromensbroughtediting = $("#Fromensbroughtediting").val();
        const Remarksediting = $("#Remarksediting").val();
        const Dailydate = $("#dataediting").val();
        const time = `${new Date().toLocaleTimeString()} - ${new Date().getDate()} /0${new Date().getMonth() + 1}/ ${new Date().getFullYear()}`

        if (Revenueediting.length == 0 && Fromensbroughtediting.length == 0) {
            $(".meseggecardediting").html('הוסף הכנסה / הוצאה');
        } else {
            fetch('/clickbuttonediting', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Revenueediting, Fromensbroughtediting, Remarksediting, id, Dailydate, time
                })
            }).then(res => res.json())
                .then(deta => {
                    getcategoryinit()
                    $(".meseggecardediting").html('');
                    $("#Revenueediting").val('');
                    $("#Fromensbroughtediting").val('');
                    $("#dataediting").val('');
                    $("#Remarksediting").val('');
                    $(".cardediting").hide();
                    $(".cardTes").show();
                })
        }
    });
});


function myFunc(total, num) {
    return total + num;
}


let id
function edetelist(_id) {
    id = _id
    fetch('/edete-list', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            _id
        })
    }).then(res => res.json())
        .then(deta => {
            if (deta.deta == null) {
                $(document).ready(function () {
                    $(".erroorr").animate({
                        height: '100vh',
                        width: '100%'
                    });
                    $(".erroorr").html(
                        `<div class="carerror">
                    <img src="/img/error.png" alt="">
                    <div class="texteror"><b>שגיאת נתונים</b></br> <div style="padding: 10px 0;">שגיאה בקריאת נתונים לחץ כדי לרענן את הטבלה</div></div>
                    <button onclick='buttoneroor()'>רענן</button></div>`
                    )
                })
            } else {
                $(".cardTes").hide();
                $(".cardediting").show();
                $("#Revenueediting").val(deta.deta.Revenue);
                $("#Fromensbroughtediting").val(deta.deta.Fromensbrought);
                $("#Remarksediting").val(deta.deta.Remarks);
                $("#dataediting").val(deta.deta.Dailydate);
                $("#dataediting").attr("placeholder", detedete())
            }
        })

}





$(document).ready(function () {
    $("#deletelistditing").click(function () {

        fetch('/deletelistditing', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id
            })
        }).then(res => res.json())
            .then(deta => {
                getcategoryinit()
                $(".meseggecardediting").html('');
                $("#Revenueediting").val('');
                $("#Fromensbroughtediting").val('');
                $("#Remarksediting").val('');
                $(".cardediting").hide();
                $(".cardTes").show();
            });
    });
});


$(document).ready(function () {
    $(".SelectionMenu").click(function () {
        fetch('/Output')
            .then(res =>
                res.json()
            )
            .then(data => {
                testlogin()
            })
    });
});


function testlogin() {
    location.href = '/login.html'
}


$(document).ready(function () {
    $("#inputSearch").on('input', function () {

        const valSearch = $("#inputSearch").val();
        let resultSearchTerm = [];

        let regSearchTerm = new RegExp(valSearch, 'g');

        allData.forEach(element => {
            if (regSearchTerm.test(element.Dailydate) || regSearchTerm.test(element.Revenue) || regSearchTerm.test(element.Fromensbrought) || regSearchTerm.test(element.Remarks)) {
                resultSearchTerm.push(element)
            }
        })
        dom(resultSearchTerm)
    });
});


function numberf(x) {
    let n = x.toString();
    let g = n.split('.')
    let d;
    if (g[1] && g[1][1]) {
        d = g[0] + '.' + g[1][0] + g[1][1] + " ₪ "
    } else if (g[1]) {
        d = g[0] + '.' + g[1][0] + " ₪ "
    } else {
        d = g[0] + " ₪ "
    }
    return d
}


function dom(deta) {
    let htmll = ''
    let total = []
    let totalRevenue = []
    let totalFromensbrought = []

    deta.forEach(element => {
        total.push(element.total)
        totalRevenue.push(element.Revenue)
        totalFromensbrought.push(element.Fromensbrought)
    });
    let a = ""
    let b = ""

    if (total.length > 0) {
        if (total.reduce(myFunc) < 0) {
            htmll = `הינך ביתרה של ${numberf(Math.abs(total.reduce(myFunc)))}`
        } else {
            htmll = `הינך בחוב של ${numberf(total.reduce(myFunc))}`
        }
        if (totalRevenue.reduce(myFunc) == null) {
            a = ''
        } else {
            a = numberf(totalRevenue.reduce(myFunc))
        }
        if (totalFromensbrought.reduce(myFunc) == null) {
            b = ''
        }
        else {
            b = numberf(totalFromensbrought.reduce(myFunc))
        }
    }

    $(".list").html("")
    let myTable = ""

    if (deta[0] == undefined) {
        if ($(".cardSearch").css("display") == "none") {
            $(".list").html("<h1>עדיין לא הוספת מידע</h1>")
            $(".Search").css("display", "none")

        }
        else {
            $(".list").html("<h1>לא נמצאו תוצאות חיפוש</h1>")
        }
    }
    else {
        $(".Search").css("display", "block")
        $(".list").html(
            `<table>
                <tr>
                <th class="nonepone">תאריך</th>
                    <th>הכנסות</th>
                    <th>תרומות</th>
                    <th>סה"כ</th>
                    <th>הערות</th>
                </tr>
                </table>`)

        for (i = 0; i < deta.length; i++) {
            if (deta[i].Revenue == null) {
                myTable += `
            <tr onclick='edetelist("${deta[i]._id}")'>
            <td style="text-align: center;  padding: 12px 0px 9px 0px;" class="nonepone">${deta[i].Dailydate}</td>
            <td></td>
            <td>${numberf(deta[i].Fromensbrought)}</td>
            <td>${numberf(deta[i].total)}</td>
            <td>${deta[i].Remarks}</td>
           </tr>`

            }
            else if (deta[i].Fromensbrought == null) {
                myTable += `
                    <tr onclick='edetelist("${deta[i]._id}")'>
                    <td style="text-align: center;  padding: 12px 0px 9px 0px;" class="nonepone">${deta[i].Dailydate}</td>
                    <td>${numberf(deta[i].Revenue)}</td>
                    <td></td>
                    <td>${numberf(deta[i].total)}</td>
                    <td>${deta[i].Remarks}</td>
                    </tr>`
            }
            else {
                myTable += `
                <tr onclick='edetelist("${deta[i]._id}")'>
                <td style="text-align: center;  padding: 12px 0px 9px 0px;" class="nonepone">${deta[i].Dailydate}</td>
                <td>${numberf(deta[i].Revenue)}</td>
                <td>${numberf(deta[i].Fromensbrought)}</td>
                <td>${numberf(deta[i].total)}</td>
                <td>${deta[i].Remarks}</td>
                </tr>`
            }
        }

        if ($(".cardSearch").css("display") == "none") {
            myTable += `<tr style='background-color: var(--backgroundbutton)' class="displaynoneserch">
                <td colspan="4 "class="colspanblock" style="cursor: default; text-align: center;"><b>סיכום</b></td>
                             <td colspan="5" class="colspan" style="cursor: default; text-align: center;"><b>סיכום</b></td>
                        </tr>
                        <tr class="displaynoneserch">
        <td class="nonepone"  style='cursor: default'></td>
                    <td  style='cursor: default'>${a}</td>
                    <td  style='cursor: default'>${b}</td>
                    <td colspan="2"  style='cursor: default'>${htmll}</td>
                </tr> `

        }
        myTable += $("table").append(myTable)
    }
}




function eroorfirsa() {
    $(".erroorr").html(
        `<div class="carerror">
        <img src="/img/Refresh.png" alt="">
        <div class="texteror"><b>עדכון</b></br> <div style="padding: 10px 0;">גירסה חדשה זמינה לחץ כאן כדי לעדכן</div></div>
        <button onclick='buttoneroor()'>עדכן גירסה</button>
    </div>`
    )
    $(".erroorr").animate({
        height: '100vh',
        width: '100%'
    });
}