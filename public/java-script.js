$(document).ready(function () {
    $(".plus").click(function () {
        $(".cardTes").hide();
        $(".cardplus").show();
        $("#Revenue").focus();
    });
});
$(document).ready(function () {
    $(".return").click(function () {
        $(".cardTes").show();
        $(".cardplus").hide();
    });
});
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




function getcategoryinit() {
    fetch('/get-categoryinit')
        .then(res =>
            res.json()
        )
        .then(deta => {
            dom(deta.deta)
            allData = deta.deta
        })
}

$(document).ready(function () {
    $("#clickbuttonplus").click(function () {
        let Revenue = $("#Revenue").val();
        let Fromensbrought = $("#Fromensbrought").val();
        const Remarks = $("#Remarks").val();
        const Dailydate = $("#data").val();
        // const datavalue = $("#data").val()
        // let Dailydate = datavalue.split('-')[0] + "/ " + datavalue.split('-')[1] + " / " + datavalue.split('-')[2]
        console.log(Dailydate)

        if (Revenue.length == 0 && Fromensbrought.length == 0) {
            $(".meseggecardplus").html('הוסף הכנסה / הוצאה');
        } else {

            fetch('/button-plus', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Revenue, Fromensbrought, Remarks, Dailydate
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

        if (Revenueediting.length == 0 && Fromensbroughtediting.length == 0) {
            $(".meseggecardediting").html('הוסף הכנסה / הוצאה');
        } else {
            fetch('/clickbuttonediting', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Revenueediting, Fromensbroughtediting, Remarksediting, id, Dailydate
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
            htmll = `הינך ביתרה של ${Math.abs(total.reduce(myFunc))}`
        } else {
            htmll = `הינך בחוב של ${total.reduce(myFunc)}`
        }
        if (totalRevenue.reduce(myFunc) == null) {
            a = ''
        } else {
            a = totalRevenue.reduce(myFunc) + ' ₪'
        }
        if (totalFromensbrought.reduce(myFunc) == null) {
            b = ''
        }
        else {
            b = totalFromensbrought.reduce(myFunc) + ' ₪'
        }
    }


    $(".list").html("")
    let myTable = ""

    if (deta[0] == undefined) {
        $(".list").html("<h1>עדיין לא הוספת מידע</h1>")
    }
    else {
        $(".list").html(
            `<table>
                <tr>
                <th class="nonepone">תאריך</th>
                    <th>הכנסות</th>
                    <th>תרומות</th>
                    <th>חיוב מעשרות</th>
                    <th>הערות</th>
                </tr>
                </table>`)

        for (i = 0; i < deta.length; i++) {
            if (deta[i].Revenue == null) {

                myTable += `
            <tr onclick='edetelist("${deta[i]._id}")'>
            <td style="text-align: center;  padding: 12px 0px 9px 0px;" class="nonepone">${deta[i].Dailydate}</td>
            <td></td>
            <td>${deta[i].Fromensbrought} ₪</td>
            <td>${deta[i].total} ₪</td>
            <td>${deta[i].Remarks}</td>
           </tr>`

            }
            else if (deta[i].Fromensbrought == null) {
                myTable += `
                    <tr onclick='edetelist("${deta[i]._id}")'>
                    <td style="text-align: center;  padding: 12px 0px 9px 0px;" class="nonepone">${deta[i].Dailydate}</td>
                    <td>${deta[i].Revenue} ₪</td>
                    <td></td>
                    <td>${deta[i].total} ₪</td>
                    <td>${deta[i].Remarks}</td>
                    </tr>`

            }
            else {
                myTable += `
                <tr onclick='edetelist("${deta[i]._id}")'>
                <td style="text-align: center;  padding: 12px 0px 9px 0px;" class="nonepone">${deta[i].Dailydate}</td>
                <td>${deta[i].Revenue} ₪</td>
                <td>${deta[i].Fromensbrought} ₪</td>
                <td>${deta[i].total} ₪</td>
                <td>${deta[i].Remarks}</td>
                </tr>`

            }
        }


        myTable += `<tr style='background-color: var(--backgroundbutton)' >
                <td colspan="4 "class="colspanblock" style="cursor: default; text-align: center;">סיכום</td>
                             <td colspan="5" class="colspan" style="cursor: default; text-align: center;">סיכום</td>
                        </tr>
                        <tr>
        <td class="nonepone"></td>
                    <td>${a}</td>
                    <td>${b}</td>
                    <td colspan="2">${htmll} ₪</td>
                </tr> `
        $("table").append(myTable)
    }
}



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
            $(".cardTes").hide();
            $(".cardediting").show();
            $("#Revenueediting").val(deta.deta.Revenue);
            $("#Fromensbroughtediting").val(deta.deta.Fromensbrought);
            $("#Remarksediting").val(deta.deta.Remarks);
            $("#dataediting").val(deta.deta.Dailydate);
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
    $("#inputSearch").on('input',function () {
        const valSearch = $("#inputSearch").val();
        let radioValue = $("input[name='radioSearch']:checked").val()
        let resultSearchTerm = [];

        if(radioValue == 'date'){
            let regSearchTerm = new RegExp(valSearch, 'g');

            allData.forEach(element => {
                if (regSearchTerm.test(element.Dailydate)) {
                    resultSearchTerm.push(element)
                }
            })
            dom(resultSearchTerm)
        }

        if(radioValue == 'income'){
            let regSearchTerm = new RegExp(valSearch, 'g');

            allData.forEach(element => {
                if (regSearchTerm.test(element.Revenue)) {
                    resultSearchTerm.push(element)
                }
            })
            dom(resultSearchTerm)
        }

        if(radioValue == 'contribution'){
            let regSearchTerm = new RegExp(valSearch, 'g');

            allData.forEach(element => {
                if (regSearchTerm.test(element.Fromensbrought)) {
                    resultSearchTerm.push(element)
                }
            })
            dom(resultSearchTerm)
        }

        if(radioValue == 'Note'){
            let regSearchTerm = new RegExp(valSearch, 'g');

            allData.forEach(element => {
                if (regSearchTerm.test(element.Remarks)) {
                    resultSearchTerm.push(element)
                }
            })
            dom(resultSearchTerm)
        }
    });
});
