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
    $(".SelectionMenu").click(function () {
        location.href = '/login.html'
    });
});



fetch('/get-categoryinit')
    .then(res =>
        res.json()
    )
    .then(deta => {
        dom(deta.deta)
    })


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
                    dom(deta.deta)
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
        $(".list").html("<h1>עדיין אין לך חישובים</h1>")
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
                    console.log(deta)
                    dom(deta.deta)
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
                dom(deta.deta)
                $(".meseggecardediting").html('');
                $("#Revenueediting").val('');
                $("#Fromensbroughtediting").val('');
                $("#Remarksediting").val('');
                $(".cardediting").hide();
                $(".cardTes").show();
            });
    });
});