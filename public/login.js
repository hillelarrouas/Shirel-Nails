$("#emaillogin").focus();

$(document).ready(function () {
    $(".Bcardlogin").click(function () {
        $("#emaillogin").val('');
        $("#paswordlogin").val('');
        $(".meseggecardlogin").html('')
        $(".cardlogin").hide();
        $(".sing_in").show();
        $("#namesing_in").focus();
    });
});

$(document).ready(function () {
    $(".Bsing_in").click(function () {
        $("#namesing_in").val('');
        $("#telsing_in").val('');
        $("#emailsing_in").val('');
        $("#paswordsing_in").val('');
        $(".meseggesing_in").html('')
        $(".sing_in").hide();
        $(".cardlogin").show();
        $("#emaillogin").focus();
    });
});


function enterlogin(event) {
    if (event.keyCode === 13) {
        $("#clickbuttologin").click()
    }
}
function entersing_in(event) {
    if (event.keyCode === 13) {
        $("#clickbuttosing_in").click()
    }
}



function init() {
    fetch('/Entrance')
        .then(res =>
            res.json()
        )
        .then(data => {
            document.body.style.display = 'block'
            if (data.validated == true) {
                location.href = '/index.html'
            }
        })
}

$(document).ready(function () {
    $("#clickbuttologin").click(function () {
        const emaillogin = $("#emaillogin").val();
        const paswordlogin = $("#paswordlogin").val();
        $(".meseggecardlogin").html('')

        if (emaillogin.length == 0) {
            $(".meseggecardlogin").html('הזן כתובת אימייל')
            $("#emaillogin").focus();
        } else if (paswordlogin.length == 0) {
            $(".meseggecardlogin").html('הזן סיסמה')
            $("#paswordlogin").focus();
        } else {
            fetch('/login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    emaillogin, paswordlogin
                })
            }).then(res => res.json())
                .then(deta => {
                    if (deta.ok == true) {
                        location.href = '/index.html'
                    } else {
                        $(".meseggecardlogin").html('פרטים שגויים נסה שנית')
                    }
                })
        }
    });
});


$(document).ready(function () {
    $("#clickbuttosing_in").click(function () {
        const namesing_in = $("#namesing_in").val();
        const telsing_in = $("#telsing_in").val();
        const emailsing_in = $("#emailsing_in").val();
        const paswordsing_in = $("#paswordsing_in").val();
        $(".meseggesing_in").html('')

        if (namesing_in.length == 0) {
            $(".meseggesing_in").html('הזן שם פרטי')
            $("#namesing_in").focus();
        } else if (telsing_in.length == 0) {
            $(".meseggesing_in").html('הזן מספר טלפון')
            $("#telsing_in").focus();
        } else if (emailsing_in.length == 0) {
            $(".meseggesing_in").html('הזן כתובת אימייל')
            $("#emailsing_in").focus();
        }else if (paswordsing_in.length == 0) {
            $(".meseggesing_in").html('הזן סיסמה')
            $("#paswordsing_in").focus();
        } else {
            fetch('/sing_in', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    namesing_in, telsing_in, emailsing_in, paswordsing_in
                })
            }).then(res => res.json())
                .then(deta => {
                    if (deta.ok == false) {
                        // $(".meseggesing_in").html('משתמש קיים! <b id="Bsing_in">התחברות</b>')
                        $(".meseggesing_in").html(deta.mesag)
                    } else {
                        $(".meseggesing_in").html('משתמש נוסף בהצלחה')
                        setTimeout(function () {
                            location.href = '/index.html'
                        }, 1500);
                    }
                })
        }
    });
});



