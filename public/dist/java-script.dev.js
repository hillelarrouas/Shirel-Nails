"use strict";

$(document).ready(function () {
  $(".plus").click(function () {
    $(".cardTes").hide();
    $(".cardplus").show();
    $("#Revenue").focus();
    $("#data").attr("placeholder", detedete());
  });
});

function detedete() {
  if (new Date().getMonth() < 10) {
    return "\u05D4\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05D9\u05D5\u05DD -  ".concat(new Date().getFullYear(), " /0").concat(new Date().getMonth() + 1, "/ ").concat(new Date().getDate());
  } else {
    return "\u05D4\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05D9\u05D5\u05DD -  ".concat(new Date().getFullYear(), " /").concat(new Date().getMonth() + 1, "/ ").concat(new Date().getDate());
  }
}

$(document).ready(function () {
  $(".return").click(function () {
    $(".cardTes").show();
    $(".cardplus").hide();
  });
});

function buttoneroor() {
  $(".whit100").animate({
    top: '-350px'
  });
  setTimeout(function () {
    $(".erroorr").css({
      display: 'none'
    });
  }, 300);
  setTimeout(function () {
    window.location.reload(); // getcategoryinit()
  }, 450);
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
    $("#inputSearch").focus();
    $("#inputSearch").val('');
    setTimeout(function () {
      getcategoryinit();
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
    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;

    if (key !== 8 && key !== 46 && key !== 0) {
      var TempDate = $(this).val().replace(/\//g, "");

      if ($.isNumeric(TempDate)) {
        if (TempDate.length >= 4) {
          TempDate = TempDate.substr(0, 2) + "/" + TempDate.substr(2, 2) + "/" + TempDate.substr(4);
        } else if (TempDate.length >= 2) {
          TempDate = TempDate.substr(0, 2) + "/" + TempDate.substr(2);
        }

        $(this).val(TempDate);
      }
    }
  });
});
$(document).ready(function () {
  $('#dataediting').bind('keyup', function (e) {
    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;

    if (key !== 8 && key !== 46 && key !== 0) {
      var TempDate = $(this).val().replace(/\//g, "");

      if ($.isNumeric(TempDate)) {
        if (TempDate.length >= 4) {
          TempDate = TempDate.substr(0, 2) + "/" + TempDate.substr(2, 2) + "/" + TempDate.substr(4);
        } else if (TempDate.length >= 2) {
          TempDate = TempDate.substr(0, 2) + "/" + TempDate.substr(2);
        }

        $(this).val(TempDate);
      }
    }
  });
});
setInterval(function () {
  var _id = aryyuser[0]._id;
  var LastSeen = new Date().toString();
  fetch('/LastSeen', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      _id: _id,
      LastSeen: LastSeen,
      pag: pag
    })
  }).then(function (res) {
    return res.json();
  }).then(function (deta) {
    console.log(deta);

    if (deta.versionUpdate) {
      eroorfirsa();
    }
  });
}, 10000);

function init() {
  getcategoryinit();
  usermenu();
}

var allData;
var aryyuser = [];

function usermenu() {
  aryyuser = [];
  fetch('/get-userid').then(function (res) {
    return res.json();
  }).then(function (deta) {
    if (deta.validated == false) {
      testlogin();
    } else {
      document.body.style.display = 'block';
      aryyuser.push(deta.deta[0]);
      $(".cardlogin").html("<div class=\"textcardlogin\">".concat(deta.deta[0].name, "<div class=\"img\" onclick='editUsercardlogin()'><img class='pen' src=\"/img/pen.png\"></div></div>"));
    }
  });
}

function editUsercardlogin() {
  $(".menu").slideToggle(100);
  $(".scrin").slideToggle(0);
  $(".sing_in").show();
  $(".cardediting").hide();
  $(".cardplus").hide();
  $(".cardTes").hide();
  $(".meseggesing_in").html('');
  $("#namesing_in").val(aryyuser[0].name);
  $("#telsing_in").val(aryyuser[0].phone);
  $("#emailsing_in").val(aryyuser[0].email);
  $("#paswordsing_in").val(aryyuser[0].password);
}

$(document).ready(function () {
  $("#clickbuttosing_in").click(function () {
    var namesing_in = $("#namesing_in").val();
    var telsing_in = $("#telsing_in").val();
    var emailsing_in = $("#emailsing_in").val();
    var paswordsing_in = $("#paswordsing_in").val();
    var _id = aryyuser[0]._id;
    $(".meseggesing_in").html('');

    if (namesing_in.length == 0) {
      $(".meseggesing_in").html('הזן שם פרטי');
    } else if (telsing_in.length == 0) {
      $(".meseggesing_in").html('הזן מספר טלפון');
    } else if (emailsing_in.length == 0) {
      $(".meseggesing_in").html('הזן כתובת אימייל');
    } else if (paswordsing_in.length == 0) {
      $(".meseggesing_in").html('הזן סיסמה');
    } else {
      fetch('/UserUpdate', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          namesing_in: namesing_in,
          telsing_in: telsing_in,
          emailsing_in: emailsing_in,
          paswordsing_in: paswordsing_in,
          _id: _id
        })
      }).then(function (res) {
        return res.json();
      }).then(function (deta) {
        if (deta.validated == false) {
          location.href = '/login.html';
        }

        if (deta.ok == true) {
          usermenu();
          $(".meseggesing_in").html('עדכון בוצע בהצלחה');
          setTimeout(function () {
            $(".cardTes").show();
            $(".sing_in").hide();
          }, 1500);
        } else {
          $(".meseggesing_in").html('משתמש קיים');
        }
      });
    }
  });
});
var pag = 1;

function getcategoryinit() {
  fetch('/get-categoryinit', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      pag: pag
    })
  }).then(function (res) {
    return res.json();
  }).then(function (deta) {
    if (deta.versionUpdate) {
      eroorfirsa();
    } else {
      dom(deta.deta);
      allData = deta.deta;
    }
  });
}

var d = 0;
$(document).ready(function () {
  $("#clickbuttonplus").click(function () {
    var Revenue = $("#Revenue").val();
    var Fromensbrought = $("#Fromensbrought").val();
    var Remarks = $("#Remarks").val();
    var Dailydate = $("#data").val();
    var time = "".concat(new Date().toLocaleTimeString(), " - ").concat(new Date().getDate(), " /0").concat(new Date().getMonth() + 1, "/ ").concat(new Date().getFullYear());

    if (d === 1) {} else {
      if (Revenue.length == 0 && Fromensbrought.length == 0) {
        $(".meseggecardplus").html('הוסף הכנסה / הוצאה');
      } else {
        d = 1;
        $(".meseggecardplus").html("<img class='imggifreturn' src=\"/img/gif.gif\"/>");
        fetch('/button-plus', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            Revenue: Revenue,
            Fromensbrought: Fromensbrought,
            Remarks: Remarks,
            Dailydate: Dailydate,
            time: time
          })
        }).then(function (res) {
          return res.json();
        }).then(function (deta) {
          d = 0;
          getcategoryinit();
          $(".meseggecardplus").html('');
          $("#Revenue").val('');
          $("#Fromensbrought").val('');
          $("#Remarks").val('');
          $("#data").val('');
          $(".cardTes").show();
          $(".cardplus").hide();
        });
      }
    }
  });
});
$(document).ready(function () {
  $("#clickbuttonediting").click(function () {
    var Revenueediting = $("#Revenueediting").val();
    var Fromensbroughtediting = $("#Fromensbroughtediting").val();
    var Remarksediting = $("#Remarksediting").val();
    var Dailydate = $("#dataediting").val();
    var time = "".concat(new Date().toLocaleTimeString(), " - ").concat(new Date().getDate(), " /0").concat(new Date().getMonth() + 1, "/ ").concat(new Date().getFullYear());

    if (Revenueediting.length == 0 && Fromensbroughtediting.length == 0) {
      $(".meseggecardediting").html('הוסף הכנסה / הוצאה');
    } else {
      fetch('/clickbuttonediting', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Revenueediting: Revenueediting,
          Fromensbroughtediting: Fromensbroughtediting,
          Remarksediting: Remarksediting,
          id: id,
          Dailydate: Dailydate,
          time: time
        })
      }).then(function (res) {
        return res.json();
      }).then(function (deta) {
        getcategoryinit();
        $(".meseggecardediting").html('');
        $("#Revenueediting").val('');
        $("#Fromensbroughtediting").val('');
        $("#dataediting").val('');
        $("#Remarksediting").val('');
        $(".cardediting").hide();
        $(".cardTes").show();
      });
    }
  });
});

function myFunc(total, num) {
  return total + num;
}

var id;

function edetelist(_id) {
  id = _id;
  fetch('/edete-list', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      _id: _id
    })
  }).then(function (res) {
    return res.json();
  }).then(function (deta) {
    if (deta.deta == null) {
      $(document).ready(function () {
        $(".erroorr").css({
          display: 'block'
        });
        $(".whit100").animate({
          top: '10px'
        });
        $(".erroorr").html("    <div class=\"whit100\">\n                        <div class=\"carerror\">\n                    <img src=\"/img/error.png\" alt=\"\">\n                    <div class=\"texteror\"><b>\u05E9\u05D2\u05D9\u05D0\u05EA \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD</b></br> <div style=\"padding: 10px 0;\">\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05E7\u05E8\u05D9\u05D0\u05EA \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05DC\u05D7\u05E5 \u05DB\u05D3\u05D9 \u05DC\u05E8\u05E2\u05E0\u05DF \u05D0\u05EA \u05D4\u05D8\u05D1\u05DC\u05D4</div></div>\n                    <button onclick='buttoneroor()'>\u05E8\u05E2\u05E0\u05DF</button></div></div>");
      });
    } else {
      $(".cardTes").hide();
      $(".cardediting").show();
      $("#Revenueediting").val(deta.deta.Revenue);
      $("#Fromensbroughtediting").val(deta.deta.Fromensbrought);
      $("#Remarksediting").val(deta.deta.Remarks);
      $("#dataediting").val(deta.deta.Dailydate);
      $("#dataediting").attr("placeholder", detedete());
    }
  });
}

$(document).ready(function () {
  $("#deletelistditing").click(function () {
    fetch('/deletelistditing', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    }).then(function (res) {
      return res.json();
    }).then(function (deta) {
      getcategoryinit();
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
    fetch('/Output').then(function (res) {
      return res.json();
    }).then(function (data) {
      testlogin();
    });
  });
});

function testlogin() {
  location.href = '/login.html';
}

$(document).ready(function () {
  $("#inputSearch").on('input', function () {
    var valSearch = $("#inputSearch").val();
    var resultSearchTerm = [];
    var regSearchTerm = new RegExp(valSearch, 'g');
    allData.forEach(function (element) {
      if (regSearchTerm.test(element.Dailydate) || regSearchTerm.test(element.Revenue) || regSearchTerm.test(element.Fromensbrought) || regSearchTerm.test(element.Remarks)) {
        resultSearchTerm.push(element);
      }
    });
    dom(resultSearchTerm);
  });
});

function numberf(x) {
  var n = x.toString();
  var g = n.split('.');
  var d;

  if (g[1] && g[1][1]) {
    d = g[0] + '.' + g[1][0] + g[1][1] + " ₪ ";
  } else if (g[1]) {
    d = g[0] + '.' + g[1][0] + " ₪ ";
  } else {
    d = g[0] + " ₪ ";
  }

  return d;
}

function dom(deta) {
  var htmll = '';
  var total = [];
  var totalRevenue = [];
  var totalFromensbrought = [];
  deta.forEach(function (element) {
    total.push(element.total);
    totalRevenue.push(element.Revenue);
    totalFromensbrought.push(element.Fromensbrought);
  });
  var a = "";
  var b = "";

  if (total.length > 0) {
    if (total.reduce(myFunc) < 0) {
      htmll = "\u05D4\u05D9\u05E0\u05DA \u05D1\u05D9\u05EA\u05E8\u05D4 \u05E9\u05DC ".concat(numberf(Math.abs(total.reduce(myFunc))));
    } else {
      htmll = "\u05D4\u05D9\u05E0\u05DA \u05D1\u05D7\u05D5\u05D1 \u05E9\u05DC ".concat(numberf(total.reduce(myFunc)));
    }

    if (totalRevenue.reduce(myFunc) == null) {
      a = '';
    } else {
      a = numberf(totalRevenue.reduce(myFunc));
    }

    if (totalFromensbrought.reduce(myFunc) == null) {
      b = '';
    } else {
      b = numberf(totalFromensbrought.reduce(myFunc));
    }
  }

  $(".list").html("");
  var myTable = "";

  if (deta[0] == undefined) {
    if ($(".cardSearch").css("display") == "none") {
      $(".list").html("<h1>עדיין לא הוספת מידע</h1>");
      $(".Search").css("display", "none");
    } else {
      $(".list").html("<h1>לא נמצאו תוצאות חיפוש</h1>");
    }
  } else {
    $(".Search").css("display", "block");
    $(".list").html("<table>\n                <tr>\n                <th class=\"nonepone\">\u05EA\u05D0\u05E8\u05D9\u05DA</th>\n                    <th>\u05D4\u05DB\u05E0\u05E1\u05D5\u05EA</th>\n                    <th>\u05EA\u05E8\u05D5\u05DE\u05D5\u05EA</th>\n                    <th>\u05E1\u05D4\"\u05DB</th>\n                    <th>\u05D4\u05E2\u05E8\u05D5\u05EA</th>\n                </tr>\n                </table>");

    for (i = 0; i < deta.length; i++) {
      if (deta[i].Revenue == null) {
        myTable += "\n            <tr onclick='edetelist(\"".concat(deta[i]._id, "\")'>\n            <td style=\"text-align: center;  padding: 12px 0px 9px 0px;\" class=\"nonepone\">").concat(deta[i].Dailydate, "</td>\n            <td></td>\n            <td>").concat(numberf(deta[i].Fromensbrought), "</td>\n            <td>").concat(numberf(deta[i].total), "</td>\n            <td>").concat(deta[i].Remarks, "</td>\n           </tr>");
      } else if (deta[i].Fromensbrought == null) {
        myTable += "\n                    <tr onclick='edetelist(\"".concat(deta[i]._id, "\")'>\n                    <td style=\"text-align: center;  padding: 12px 0px 9px 0px;\" class=\"nonepone\">").concat(deta[i].Dailydate, "</td>\n                    <td>").concat(numberf(deta[i].Revenue), "</td>\n                    <td></td>\n                    <td>").concat(numberf(deta[i].total), "</td>\n                    <td>").concat(deta[i].Remarks, "</td>\n                    </tr>");
      } else {
        myTable += "\n                <tr onclick='edetelist(\"".concat(deta[i]._id, "\")'>\n                <td style=\"text-align: center;  padding: 12px 0px 9px 0px;\" class=\"nonepone\">").concat(deta[i].Dailydate, "</td>\n                <td>").concat(numberf(deta[i].Revenue), "</td>\n                <td>").concat(numberf(deta[i].Fromensbrought), "</td>\n                <td>").concat(numberf(deta[i].total), "</td>\n                <td>").concat(deta[i].Remarks, "</td>\n                </tr>");
      }
    }

    if ($(".cardSearch").css("display") == "none") {
      myTable += "<tr style='background-color: var(--backgroundbutton)' class=\"displaynoneserch\">\n                <td colspan=\"4 \"class=\"colspanblock\" style=\"cursor: default; text-align: center;\"><b>\u05E1\u05D9\u05DB\u05D5\u05DD</b></td>\n                             <td colspan=\"5\" class=\"colspan\" style=\"cursor: default; text-align: center;\"><b>\u05E1\u05D9\u05DB\u05D5\u05DD</b></td>\n                        </tr>\n                        <tr class=\"displaynoneserch\">\n        <td class=\"nonepone\"  style='cursor: default'></td>\n                    <td  style='cursor: default'>".concat(a, "</td>\n                    <td  style='cursor: default'>").concat(b, "</td>\n                    <td colspan=\"2\"  style='cursor: default'>").concat(htmll, "</td>\n                </tr> ");
    }

    myTable += $("table").append(myTable);
  }
} // $(document).ready(function () {


function eroorfirsa() {
  $(".erroorr").html("     <div class=\"whit100\">\n        <div class=\"carerror\">\n            <img src=\"/img/Refresh.png\" alt=\"\">\n            <div class=\"texteror\"><b>\u05E2\u05D3\u05DB\u05D5\u05DF</b></br> <div style=\"padding: 10px 0;\">\u05D2\u05D9\u05E8\u05E1\u05D4 \u05D7\u05D3\u05E9\u05D4 \u05D6\u05DE\u05D9\u05E0\u05D4 \u05DC\u05D7\u05E5 \u05DB\u05D0\u05DF \u05DB\u05D3\u05D9 \u05DC\u05E2\u05D3\u05DB\u05DF</div></div>\n            <button onclick='buttoneroor()'>\u05E2\u05D3\u05DB\u05DF \u05D2\u05D9\u05E8\u05E1\u05D4</button>\n        </div>\n    </div>");
  $(".erroorr").css({
    display: 'block'
  });
  $(".whit100").animate({
    top: '10px'
  });
} // })