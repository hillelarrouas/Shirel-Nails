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
                aryyuser.push(deta.deta[0])
                $(".cardlogin").html(
                    `<img onclick='editUsercardlogin()' src="/img/user.png" alt=""><div class="textcardlogin">${deta.deta[0].name}</div>`
                );
            }
        })
}

function editUsercardlogin() {
    $(".menu").slideToggle(100);
    $(".sing_in").show();
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

                    if (deta.ok == true) {
                        usermenu()
                        $(".meseggesing_in").html('עדכון המשתמש בוצע בהצלחה')
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
        })
}

$(document).ready(function () {
    $("#clickbuttonplus").click(function () {
        const Revenue = $("#Revenue").val();
        const Fromensbrought = $("#Fromensbrought").val();
        const Remarks = $("#Remarks").val();

        if (Revenue.length == 0) {
            $(".meseggecardplus").html('הזן הכנסה');
        }
        else {
            fetch('/button-plus', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Revenue, Fromensbrought, Remarks
                })
            }).then(res => res.json())
                .then(deta => {
                    getcategoryinit()
                    $(".meseggecardplus").html('');
                    $("#Revenue").val('');
                    $("#Fromensbrought").val('');
                    $("#Remarks").val('');
                    $(".cardTes").show();
                    $(".cardplus").hide();
                })
        }
    });
});


function dom(deta) {
    $(".list").html("")

    if (deta[0] == undefined) {
        $(".list").html("<h1>עדיין לא הוספת מידע</h1>")
    }
    else {
        $(".list").html(
            `<table>
        <tr>
            <th>הכנסות</th>
            <th>מעשרות שהבאתי</th>
            <th>סה"כ מעשרות</th>
            <th>הערות</th>
        </tr>
        ${deta.map(elm =>
                `<tr ondblclick='edetelist("${elm._id}")'>
            <td>${elm.Revenue} ₪</td>
            <td>${elm.Fromensbrought} ₪</td>
            <td>${elm.total} ₪</td>
             <td>${elm.Remarks}</td>
        </tr>
`).join('')}
</table>`
        )
    }
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
        })
}


$(document).ready(function () {
    $("#clickbuttonediting").click(function () {
        const Revenueediting = $("#Revenueediting").val();
        const Fromensbroughtediting = $("#Fromensbroughtediting").val();
        const Remarksediting = $("#Remarksediting").val();

        if (Revenueediting.length == 0) {
            console.log('fbf')
            $(".meseggecardediting").html('הזן הכנסה');
        }
        else {
            fetch('/clickbuttonediting', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Revenueediting, Fromensbroughtediting, Remarksediting, id
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
                })
        }
    });
});

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
        fetch('/Cookie-test')
            .then(r => r.json())
            .then(deta => {
                console.log(deta)
                if (deta.validated == false) {
                    testlogin()
                }
            })
    });
});


function testlogin() {
    location.href = '/login.html'
}