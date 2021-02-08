"use strict";

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
    $("#inputSearch").focus();
    $('input[name="radioSearch"]')[0].checked = false;
    $('input[name="radioSearch"]')[1].checked = false;
    $('input[name="radioSearch"]')[2].checked = false;
    $('input[name="radioSearch"]')[3].checked = false;
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

function getcategoryinit() {
  fetch('/get-categoryinit').then(function (res) {
    return res.json();
  }).then(function (deta) {
    dom(deta.deta);
    allData = deta.deta;
  });
}

$(document).ready(function () {
  $("#clickbuttonplus").click(function () {
    var Revenue = $("#Revenue").val();
    var Fromensbrought = $("#Fromensbrought").val();
    var Remarks = $("#Remarks").val();
    var Dailydate = $("#data").val(); // const datavalue = $("#data").val()
    // let Dailydate = datavalue.split('-')[0] + "/ " + datavalue.split('-')[1] + " / " + datavalue.split('-')[2]

    console.log(Dailydate);

    if (Revenue.length == 0 && Fromensbrought.length == 0) {
      $(".meseggecardplus").html('הוסף הכנסה / הוצאה');
    } else {
      fetch('/button-plus', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Revenue: Revenue,
          Fromensbrought: Fromensbrought,
          Remarks: Remarks,
          Dailydate: Dailydate
        })
      }).then(function (res) {
        return res.json();
      }).then(function (deta) {
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
  });
});
$(document).ready(function () {
  $("#clickbuttonediting").click(function () {
    var Revenueediting = $("#Revenueediting").val();
    var Fromensbroughtediting = $("#Fromensbroughtediting").val();
    var Remarksediting = $("#Remarksediting").val();
    var Dailydate = $("#dataediting").val();

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
          Dailydate: Dailydate
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
      htmll = "\u05D4\u05D9\u05E0\u05DA \u05D1\u05D9\u05EA\u05E8\u05D4 \u05E9\u05DC ".concat(Math.abs(total.reduce(myFunc)));
    } else {
      htmll = "\u05D4\u05D9\u05E0\u05DA \u05D1\u05D7\u05D5\u05D1 \u05E9\u05DC ".concat(total.reduce(myFunc));
    }

    if (totalRevenue.reduce(myFunc) == null) {
      a = '';
    } else {
      a = totalRevenue.reduce(myFunc) + ' ₪';
    }

    if (totalFromensbrought.reduce(myFunc) == null) {
      b = '';
    } else {
      b = totalFromensbrought.reduce(myFunc) + ' ₪';
    }
  }

  $(".list").html("");
  var myTable = "";

  if (deta[0] == undefined) {
    $(".list").html("<h1>עדיין לא הוספת מידע</h1>");
  } else {
    $(".list").html("<table>\n                <tr>\n                <th class=\"nonepone\">\u05EA\u05D0\u05E8\u05D9\u05DA</th>\n                    <th>\u05D4\u05DB\u05E0\u05E1\u05D5\u05EA</th>\n                    <th>\u05EA\u05E8\u05D5\u05DE\u05D5\u05EA</th>\n                    <th>\u05D7\u05D9\u05D5\u05D1 \u05DE\u05E2\u05E9\u05E8\u05D5\u05EA</th>\n                    <th>\u05D4\u05E2\u05E8\u05D5\u05EA</th>\n                </tr>\n                </table>");

    for (i = 0; i < deta.length; i++) {
      if (deta[i].Revenue == null) {
        myTable += "\n            <tr onclick='edetelist(\"".concat(deta[i]._id, "\")'>\n            <td style=\"text-align: center;  padding: 12px 0px 9px 0px;\" class=\"nonepone\">").concat(deta[i].Dailydate, "</td>\n            <td></td>\n            <td>").concat(deta[i].Fromensbrought, " \u20AA</td>\n            <td>").concat(deta[i].total, " \u20AA</td>\n            <td>").concat(deta[i].Remarks, "</td>\n           </tr>");
      } else if (deta[i].Fromensbrought == null) {
        myTable += "\n                    <tr onclick='edetelist(\"".concat(deta[i]._id, "\")'>\n                    <td style=\"text-align: center;  padding: 12px 0px 9px 0px;\" class=\"nonepone\">").concat(deta[i].Dailydate, "</td>\n                    <td>").concat(deta[i].Revenue, " \u20AA</td>\n                    <td></td>\n                    <td>").concat(deta[i].total, " \u20AA</td>\n                    <td>").concat(deta[i].Remarks, "</td>\n                    </tr>");
      } else {
        myTable += "\n                <tr onclick='edetelist(\"".concat(deta[i]._id, "\")'>\n                <td style=\"text-align: center;  padding: 12px 0px 9px 0px;\" class=\"nonepone\">").concat(deta[i].Dailydate, "</td>\n                <td>").concat(deta[i].Revenue, " \u20AA</td>\n                <td>").concat(deta[i].Fromensbrought, " \u20AA</td>\n                <td>").concat(deta[i].total, " \u20AA</td>\n                <td>").concat(deta[i].Remarks, "</td>\n                </tr>");
      }
    }

    myTable += "<tr style='background-color: var(--backgroundbutton)' >\n                <td colspan=\"4 \"class=\"colspanblock\" style=\"cursor: default; text-align: center;\">\u05E1\u05D9\u05DB\u05D5\u05DD</td>\n                             <td colspan=\"5\" class=\"colspan\" style=\"cursor: default; text-align: center;\">\u05E1\u05D9\u05DB\u05D5\u05DD</td>\n                        </tr>\n                        <tr>\n        <td class=\"nonepone\"></td>\n                    <td>".concat(a, "</td>\n                    <td>").concat(b, "</td>\n                    <td colspan=\"2\">").concat(htmll, " \u20AA</td>\n                </tr> ");
    $("table").append(myTable);
  }
}

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
    $(".cardTes").hide();
    $(".cardediting").show();
    $("#Revenueediting").val(deta.deta.Revenue);
    $("#Fromensbroughtediting").val(deta.deta.Fromensbrought);
    $("#Remarksediting").val(deta.deta.Remarks);
    $("#dataediting").val(deta.deta.Dailydate);
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
    functionSearch();
  });
});
$(document).ready(function () {
  $("input[name='radioSearch']").change(function () {
    functionSearch();
  });
});

function functionSearch() {
  var valSearch = $("#inputSearch").val();
  var radioValue = $("input[name='radioSearch']:checked").val();
  var resultSearchTerm = [];

  if (radioValue == 'date') {
    var regSearchTerm = new RegExp(valSearch, 'g');
    allData.forEach(function (element) {
      if (regSearchTerm.test(element.Dailydate)) {
        resultSearchTerm.push(element);
      }
    });
    dom(resultSearchTerm);
  }

  if (radioValue == 'income') {
    var _regSearchTerm = new RegExp(valSearch, 'g');

    allData.forEach(function (element) {
      if (_regSearchTerm.test(element.Revenue)) {
        resultSearchTerm.push(element);
      }
    });
    dom(resultSearchTerm);
  }

  if (radioValue == 'contribution') {
    var _regSearchTerm2 = new RegExp(valSearch, 'g');

    allData.forEach(function (element) {
      if (_regSearchTerm2.test(element.Fromensbrought)) {
        resultSearchTerm.push(element);
      }
    });
    dom(resultSearchTerm);
  }

  if (radioValue == 'Note') {
    var _regSearchTerm3 = new RegExp(valSearch, 'g');

    allData.forEach(function (element) {
      if (_regSearchTerm3.test(element.Remarks)) {
        resultSearchTerm.push(element);
      }
    });
    dom(resultSearchTerm);
  }
}