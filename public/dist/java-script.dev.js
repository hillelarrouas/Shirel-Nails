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
  $(".SelectionMenu").click(function () {
    location.href = '/login.html';
  });
});
fetch('/get-categoryinit').then(function (res) {
  return res.json();
}).then(function (deta) {
  dom(deta.deta);
});
$(document).ready(function () {
  $("#clickbuttonplus").click(function () {
    var Revenue = $("#Revenue").val();
    var Fromensbrought = $("#Fromensbrought").val();
    var Remarks = $("#Remarks").val();

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
          Remarks: Remarks
        })
      }).then(function (res) {
        return res.json();
      }).then(function (deta) {
        dom(deta.deta);
        $(".meseggecardplus").html('');
        $("#Revenue").val('');
        $("#Fromensbrought").val('');
        $("#Remarks").val('');
        $(".cardTes").show();
        $(".cardplus").hide();
      });
    }
  });
});

function dom(deta) {
  $(".list").html("");

  if (deta[0] == undefined) {
    $(".list").html("<h1>עדיין אין לך חישובים</h1>");
  } else {
    $(".list").html("<table>\n        <tr>\n            <th>\u05D4\u05DB\u05E0\u05E1\u05D5\u05EA</th>\n            <th>\u05DE\u05E2\u05E9\u05E8\u05D5\u05EA \u05E9\u05D4\u05D1\u05D0\u05EA\u05D9</th>\n            <th>\u05E1\u05D4\"\u05DB \u05DE\u05E2\u05E9\u05E8\u05D5\u05EA</th>\n            <th>\u05D4\u05E2\u05E8\u05D5\u05EA</th>\n        </tr>\n        ".concat(deta.map(function (elm) {
      return "<tr ondblclick='edetelist(\"".concat(elm._id, "\")'>\n            <td>").concat(elm.Revenue, " \u20AA</td>\n            <td>").concat(elm.Fromensbrought, " \u20AA</td>\n            <td>").concat(elm.total, " \u20AA</td>\n             <td>").concat(elm.Remarks, "</td>\n        </tr>\n");
    }).join(''), "\n</table>"));
  }
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
  });
}

$(document).ready(function () {
  $("#clickbuttonediting").click(function () {
    var Revenueediting = $("#Revenueediting").val();
    var Fromensbroughtediting = $("#Fromensbroughtediting").val();
    var Remarksediting = $("#Remarksediting").val();

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
          id: id
        })
      }).then(function (res) {
        return res.json();
      }).then(function (deta) {
        console.log(deta);
        dom(deta.deta);
        $(".meseggecardediting").html('');
        $("#Revenueediting").val('');
        $("#Fromensbroughtediting").val('');
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
      dom(deta.deta);
      $(".meseggecardediting").html('');
      $("#Revenueediting").val('');
      $("#Fromensbroughtediting").val('');
      $("#Remarksediting").val('');
      $(".cardediting").hide();
      $(".cardTes").show();
    });
  });
});