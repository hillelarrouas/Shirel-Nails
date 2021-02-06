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
  });
});
$(document).ready(function () {
  $(".menu").click(function () {
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

var aryyuser = [];

function usermenu() {
  aryyuser = [];
  fetch('/get-userid').then(function (res) {
    return res.json();
  }).then(function (deta) {
    if (deta.validated == false) {
      testlogin();
    } else {
      aryyuser.push(deta.deta[0]);
      $(".cardlogin").html("<div class=\"textcardlogin\">".concat(deta.deta[0].name, "<div class=\"img\" onclick='editUsercardlogin()'><img class='pen' src=\"/img/pen.png\"></div></div>"));
    }
  });
}

function editUsercardlogin() {
  $(".menu").slideToggle(100);
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
        if (deta.ok == true) {
          usermenu();
          $(".meseggesing_in").html('עדכון המשתמש בוצע בהצלחה');
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
  });
}

$(document).ready(function () {
  $("#clickbuttonplus").click(function () {
    var Revenue = $("#Revenue").val();
    var Fromensbrought = $("#Fromensbrought").val();
    var Remarks = $("#Remarks").val();
    var Dailydate = $("#data").val();

    if (Revenue.length == 0) {
      $(".meseggecardplus").html('הזן הכנסה');
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

function dom(deta) {
  var totalRevenue = [];
  var totalFromensbrought = [];
  var total = [];
  deta.forEach(function (element) {
    totalRevenue.push(element.Revenue);
    totalFromensbrought.push(element.Fromensbrought);
    total.push(element.total);
  });
  $(".list").html("");

  if (deta[0] == undefined) {
    $(".list").html("<h1>עדיין לא הוספת מידע</h1>");
  } else {
    $(".list").html("<table>\n        <tr>\n            <th>\u05D4\u05DB\u05E0\u05E1\u05D5\u05EA</th>\n            <th>\u05DE\u05E2\u05E9\u05E8\u05D5\u05EA \u05E9\u05D4\u05D1\u05D0\u05EA\u05D9</th>\n            <th>\u05E1\u05D4\"\u05DB \u05DE\u05E2\u05E9\u05E8\u05D5\u05EA</th>\n            <th>\u05D4\u05E2\u05E8\u05D5\u05EA</th>\n        </tr>\n        ".concat(deta.map(function (elm) {
      return "<tr onclick='edetelist(\"".concat(elm._id, "\")'>\n            <td>").concat(elm.Revenue, " \u20AA</td>\n            <td>").concat(elm.Fromensbrought, " \u20AA</td>\n            <td>").concat(elm.total, " \u20AA</td>\n             <td>").concat(elm.Remarks, "</td>\n        </tr>\n");
    }).join(''), "\n<tr style='background-color: var(--backgroundbutton)'>\n             <td colspan=\"4\">\u05E1\u05D9\u05DB\u05D5\u05DD</td>\n        </tr>\n<tr>\n            <td>").concat(totalRevenue.reduce(myFunc), " \u20AA</td>\n            <td>").concat(totalFromensbrought.reduce(myFunc), " \u20AA</td>\n            <td>").concat(total.reduce(myFunc), " \u20AA</td>\n             <td></td>\n        </tr> \n</table>"));
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
  $("#clickbuttonediting").click(function () {
    var Revenueediting = $("#Revenueediting").val();
    var Fromensbroughtediting = $("#Fromensbroughtediting").val();
    var Remarksediting = $("#Remarksediting").val();
    var Dailydate = $("#dataediting").val();

    if (Revenueediting.length == 0) {
      console.log('fbf');
      $(".meseggecardediting").html('הזן הכנסה');
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
    testlogin();
  });
});

function testlogin() {
  location.href = '/login.html';
}