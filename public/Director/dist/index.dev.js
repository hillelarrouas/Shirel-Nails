"use strict";

var inputSearch = document.querySelector("#inputSearch");
var Search = document.querySelector('.Search');
var cardboxcatygory = document.querySelector('.cardboxcatygory');
var cardCategory = document.querySelector('.cardCategory');
var carbox = document.querySelector('.carbox');
var titlecategory = document.querySelector('.titlecategory');
var ShowAll = document.querySelector('.ShowAll');
var message = document.querySelector("#message");
var Registration = document.querySelector('.Registration');
var textmessage = document.querySelector('.textmessage');
var Searchtml = document.querySelector('.Searchtml');
var outcome = document.querySelector('.outcome');
var cardtext = document.querySelector('.cardtext');
var menu = document.querySelector(".menu");
var menubutoon = document.querySelector(".menubutoon");
var UsersList = document.getElementById('UsersList');
var ShelfList = document.getElementById('ShelfList');
var cardlogin = document.querySelector('.cardlogin');

function connected() {
  fetch('/alluserconnected').then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log(data);
    document.getElementById('UsersList').innerHTML = "\n                <h1>\u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD \u05DE\u05D7\u05D5\u05D1\u05E8\u05D9\u05DD</h1>\n    <table>\n    <thead>\n        <tr>\n            <th></th>\n            <th>\u05D6\u05D4\u05D5\u05EA \u05DE\u05E9\u05EA\u05DE\u05E9</th>\n            <th>\u05E9\u05DD \u05DE\u05E9\u05EA\u05DE\u05E9</th>\n            <th>\u05EA\u05E4\u05E7\u05D9\u05D3</th>\n        </tr>\n    </thead>\n        <tbody>\n            ".concat(data.data.map(function (elm) {
      return "<tr>\n            <td class=\"flexdeleteuser\">\n            <a action=\"Edit\" class=\"deleteuser\" onclick='editUser(\"".concat(elm._id, "\")'><img src=\"/img/edit-button.png\"></a>\n            <a action=\"Delete\" class=\"deleteuser\" onclick='deleteUser(\"").concat(elm._id, "\")'><img src=\"/img/deleteuser.png\"></a>\n            </td>\n                    <td>").concat(elm.id_user, "</td>\n                    <td>").concat(elm.userName, "</td>\n                    <td>").concat(elm.role, "</td> \n            </tr>\n    \n    ");
    }).join(''), "</tbody>\n    </table>");
    outcome.style.display = 'none';
    Registration.style.display = 'none';
    Search.style.display = 'none';
    cardediting.style.display = 'none';
    ShowAll.style.display = 'none';
    cardCategory.style.display = 'none';
    ShelfList.style.display = 'none';
    cardplusvideo.style.display = 'none';
    editUserById.style.display = 'none';
    menubutoondisplayblock();
    UsersList.style.display = 'block';
  });
}

var xdeta = new Date().getHours();
var hour;

if (xdeta >= 6 && xdeta < 12) {
  hour = "בוקר טוב";
}

if (xdeta >= 12 && xdeta < 18) {
  hour = "צהרים טובים";
}

if (xdeta >= 18 && xdeta < 23) {
  hour = "ערב טוב";
}

if (xdeta >= 23 || xdeta >= 0 && xdeta < 6) {
  hour = "לילה טוב";
}

setInterval(function () {
  testcoocik();
}, 100000);
testcoocik();

function testcoocik() {
  fetch('/Cookie-test').then(function (r) {
    return r.json();
  }).then(function (data) {
    if (data.validated == "ok") {
      document.body.style.display = "block";
      cardlogin.innerHTML = "<div class=\"textcardlogin\">".concat(hour, "</div><img onclick='editUsercardlogin(\"").concat(data.id, "\")' src=\"/img/user.jpg\" alt=\"\"><div class=\"textcardlogin\">").concat(data.name, "</div>");
    } else if (data.validate == 'none') {
      location.href = '/userRegular/index.html';
    } else {
      location.href = '/login/login.html';
    }
  });
}

function Output() {
  fetch('/Output').then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data) {
      location.href = '/login/login.html';
    }
  });
}

var editUsercardlogin = function editUsercardlogin(userId) {
  menubutoondisplayblock();
  outcome.style.display = 'none';
  Registration.style.display = 'none';
  Search.style.display = 'none';
  cardplusvideo.style.display = 'none';
  cardediting.style.display = 'none';
  ShowAll.style.display = 'none';
  cardCategory.style.display = 'none';
  UsersList.style.display = 'none';
  ShelfList.style.display = 'none';
  fetch('/get-details-users' + userId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    editUserById.style.display = "block";
    document.getElementById('editUserById').innerHTML = "\n                <h1>\u05E2\u05E8\u05D9\u05DB\u05EA \u05E4\u05E8\u05D8\u05D9\u05DD \u05D0\u05D9\u05E9\u05D9\u05D9\u05DD</h1>\n                    <form onsubmit=\"handleEditUser(event)\">\n                 <div class=\"rtl\">\n                     <label for=\"id_user\">\u05DE\u05E1\u05E4\u05E8 \u05D6\u05D4\u05D5\u05EA:\n                    <input type=\"text\" name=\"id_user\" id=\"id_user\" value=\"".concat(data.id_user, "\" disabled=\"disabled\" autocomplete='off'></br>\n                </label>\n                <label for=\"name\">\u05E9\u05DD:\n                    <input type=\"text\" name=\"name\" id=\"name\" value=\"").concat(data.name, "\" autocomplete='off'></br>\n                </label>\n                <label for=\"userName\">\u05E9\u05DD \u05DE\u05E9\u05EA\u05DE\u05E9:\n                    <input type=\"text\" name=\"username\" id=\"userName\" value=").concat(data.userName, " autocomplete='off'></br>\n                </label>\n                <label for=\"password\">\u05E1\u05D9\u05E1\u05DE\u05D4:\n                    <input type=\"text\" name=\"password\" id=\"password\" value=").concat(data.password, " autocomplete='off'></br>\n                </label>\n                <label for=\"email\">\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC:\n                    <input type=\"email\" name=\"email\" id=\"email\" value=").concat(data.email, " autocomplete='off'></br>\n                </label>\n                <label for=\"phone\">\u05E4\u05DC\u05D0\u05E4\u05D5\u05DF:\n                    <input type=\"text\" name=\"phone\" id=\"phone\" value=").concat(data.phone, " autocomplete='off'></br>\n                </label>\n            </div>\n            <input type=\"text\" value=\"").concat(data.role, "\" disabled=\"disabled\" autocomplete='off'></br>\n            <div id=\"messag\"></div></br>\n            <input type=\"submit\" value=\"\u05E9\u05DE\u05D5\u05E8 \u05E9\u05D9\u05E0\u05D5\u05D9\u05D9\u05DD\">\n        </form>");
  });
};

function displaynoneeditusercardlogin() {
  editUserById.style.display = 'none';
}

inputSearch.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    functionSearch();
  }
});

function deletesearch() {
  Search.style.display = 'none';
  inputSearch.value = '';
}

function cardCategorydisplaynone() {
  cardCategory.style.display = 'none';
}

function Addauser() {
  menubutoondisplayblock();
  editUserById.style.display = "none";
  cardCategory.style.display = 'none';
  ShowAll.style.display = 'none';
  Search.style.display = 'none';
  UsersList.style.display = 'none';
  cardediting.style.display = 'none';
  cardplusvideo.style.display = 'none';
  Registration.style.display = 'block';
}

function Registrationdisplaynone() {
  Registration.style.display = 'none';
}

function Searchdisplayblock() {
  menubutoondisplayblock();
  Search.style.display = 'block';
  editUserById.style.display = "none";
  cardCategory.style.display = 'none';
  ShowAll.style.display = 'none';
  cardediting.style.display = 'none';
  UsersList.style.display = 'none';
  cardplusvideo.style.display = 'none';
  Registration.style.display = 'none';
  ShelfList.style.display = 'none';
  inputSearch.focus();
}

function deleteoutcome() {
  outcome.style.display = 'none';
}

function functionSearch() {
  var inputvalue = inputSearch.value;

  if (inputvalue.length == 0) {
    textmessage.innerHTML = 'הזן מידע לחיפוש';
  } else {
    textmessage.innerHTML = '<img src="/img/gif.gif">';
    fetch('/Searchdeta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputvalue: inputvalue
      })
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      Searchtml.innerHTML = "";

      if (data.data[0] == undefined) {
        textmessage.innerHTML = "מידע לא נמצא";
      } else {
        textmessage.innerHTML = "console.log";
        console.log(data.data);
      }
    });
  }
}

var handleRegistration = function handleRegistration(e) {
  e.preventDefault();
  var id_user = document.querySelector('#id_user');
  var name = document.querySelector('#name');
  var userName = document.querySelector('#userName');
  var password = document.querySelector('#password');
  var email = document.querySelector('#email');
  var phone = document.querySelector('#phone');
  var role = document.querySelector('#role');

  if (id_user.value.length !== 9) {
    message.innerHTML = 'מספר זהות לא תקין';
  } else if (name.value.length < 2) {
    message.innerHTML = 'נדרש להזין שם מלא תקין';
  } else if (userName.value.length < 2) {
    message.innerHTML = 'נדרש להזין שם משתמש</br> המכיל 2 תווים לפחות ';
  } else if (password.value.length < 6) {
    message.innerHTML = 'בחר/י סיסמה המכילה 6</br> תווים לפחות';
  } else if (email.value.length == 0) {
    message.innerHTML = 'נדרש להזין כתובת מייל';
  } else if (phone.value.length !== 9 && phone.value.length !== 10) {
    message.innerHTML = 'מספר טלפון לא תקין';
  } else if (role.value == "דירוג") {
    message.innerHTML = 'בחר דירוג למשתמש';
  } else {
    var concat = {
      "id_user": id_user.value,
      "name": name.value,
      "userName": userName.value,
      "password": password.value,
      "email": email.value,
      "phone": phone.value,
      "role": role.value
    };
    message.innerHTML = '<img src="/img/gif.gif">';
    fetch('/send-User-details-sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(concat)
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      console.log(data.message);

      if (data.message == 'ok') {
        message.innerHTML = "הוספת המשתמש בוצע בהצלחה";
        console.log('הוספת המשתמש בוצע בהצלחה');
        id_user.value = '';
        name.value = '';
        userName.value = '';
        password.value = '';
        email.value = '';
        phone.value = '';
        role.value = 'דירוג';
        setTimeout(function () {
          getListUsers();
        }, 500);
      } else {
        message.innerHTML = data.message;
      }
    });
  }
};

function getCategory() {
  menubutoondisplayblock();
  var aryycategory = [];
  cardediting.style.display = 'none';
  cardplusvideo.style.display = 'none';
  editUserById.style.display = "none";
  Registration.style.display = 'none';
  Search.style.display = 'none';
  ShowAll.style.display = 'none';
  UsersList.style.display = 'none';
  ShelfList.style.display = 'none';
  cardCategory.style.display = 'block';
  cardboxcatygory.innerHTML = '';
  fetch('/get-category').then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log(data.data[0]);

    if (data.data[0] == undefined) {
      cardboxcatygory.innerHTML = '<h1>אין לך סרטונים</h1>';
    } else {
      data.data.forEach(function (elm) {
        console.log(elm._id);
        cardboxcatygory.innerHTML += "<div class=\"videodiv\"><img src=\"/img/editing.png\" onclick=\"editingvideo('".concat(elm._id, "')\"><h1>").concat(elm.name, "</h1>").concat(elm.link, "</div>");
      });
    }
  });
}

var cardediting = document.querySelector('.cardediting');

function editingvideo(id) {
  cardediting.style.display = 'block';
  cardCategory.style.display = 'none';
  fetch('/editingvideo', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: id
    })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    cardediting.innerHTML = "<img src=\"/img/return.png\" onclick=\"reterngetCategory()\">\n            <h1>\u05E2\u05E8\u05D9\u05DB\u05EA \u05D5\u05D5\u05D9\u05D3\u05D0\u05D5</h1>\n                <div class=\"rtl\">\n                    <label for=\"namevideo\">\u05E9\u05DD \u05D5\u05D5\u05D9\u05D3\u05D0\u05D5\n                        <input type=\"text\" name=\"namevideo\" id=\"namevideoediting\" autocomplete='off' value=\"".concat(data.data.name, "\"></br>\n                    </label>\n                    <label for=\"linkvideo\">\u05E7\u05D9\u05E9\u05D5\u05E8 \u05D5\u05D5\u05D9\u05D3\u05D0\u05D5\n                        <input type=\"text\" name=\"linkvideo\" id=\"linkvideoediting\" autocomplete='off' value='").concat(data.data.link, "'></br>\n                    </label>\n                </div>\n                <div class=\"mesaediting\"></div>\n                <button onclick='editing(\"").concat(data.data._id, "\")'>\u05E9\u05DE\u05D9\u05E8\u05D4</button>\n                <button onclick='deletevideo(\"").concat(data.data._id, "\")'>\u05DE\u05D7\u05D9\u05E7\u05D4</button>\n        ");
  });
}

function deletevideo(id) {
  fetch('/deletevideo', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: id
    })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    namevideo.value = '';
    linkvideo.value = '';
    getCategory();
  });
}

function reterngetCategory() {
  cardediting.style.display = 'none';
  cardplusvideo.style.display = 'none';
  cardCategory.style.display = 'block';
}

function editing(id) {
  var mesaediting = document.querySelector('.mesaediting');
  var namevideovalue = document.querySelector('#namevideoediting').value;
  var linkvideovalue = document.querySelector('#linkvideoediting').value;
  console.log(linkvideovalue.length);
  cardboxcatygory.innerHTML = '';

  if (namevideovalue.length == 0) {
    mesaediting.innerHTML = 'הזן שם לסרטון';
  } else if (linkvideovalue.length == 0) {
    mesaediting.innerHTML = 'הוסף קישור';
  } else if (linkvideovalue.length !== 219) {
    mesaediting.innerHTML = 'קישור לא תקין';
  } else {
    fetch('/editing', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        linkvideovalue: linkvideovalue,
        namevideovalue: namevideovalue,
        id: id
      })
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      getCategory();
    });
  }
}

var cardplusvideo = document.querySelector('.cardplusvideo');
var namevideo = document.querySelector('#namevideo');
var linkvideo = document.querySelector('#linkvideo');
var mesa = document.querySelector('.mesa');

function plusvideo() {
  cardplusvideo.style.display = 'block';
  cardCategory.style.display = 'none';
  namevideo.focus();
  menubutoondisplayblock();
}

function oksubmitvideo(e) {
  e.preventDefault();
  var namevideovalue = namevideo.value;
  var linkvideovalue = linkvideo.value;
  cardboxcatygory.innerHTML = '';

  if (namevideovalue.length == 0) {
    mesa.innerHTML = 'הזן שם לסרטון';
  } else if (linkvideovalue.length == 0) {
    mesa.innerHTML = 'הוסף קישור';
  } else if (linkvideovalue.length !== 219) {
    mesa.innerHTML = 'קישור לא תקין';
  } else {
    fetch('/plusvideo', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        linkvideovalue: linkvideovalue,
        namevideovalue: namevideovalue
      })
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      data.data.forEach(function (elm) {
        cardboxcatygory.innerHTML += "<div class=\"videodiv\"><img src=\"/img/editing.png\" onclick=\"editingvideo(\"".concat(elm._id, "\")\"><h1>").concat(elm.name, "</h1>").concat(elm.link, "</div>");
      });
      getCategory();
      cardplusvideo.style.display = 'none';
    });
  }
}

function getListUsers() {
  menu.style.right = '-220px';
  fetch('/get-List-Users').then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.data != null) {
      cardplusvideo.style.display = 'none';
      outcome.style.display = 'none';
      Registration.style.display = 'none';
      Search.style.display = 'none';
      ShowAll.style.display = 'none';
      cardCategory.style.display = 'none';
      editUserById.style.display = "none";
      ShelfList.style.display = 'none';
      UsersList.style.display = 'block';
      alluser(data.data);
    }
  });
}

var deleteUser = function deleteUser(userId) {
  fetch('/' + userId, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    alluser(data);
  });
};

function displayblockmenu(event) {
  menu.style.right = '0';
}

function menubutoondisplayblock() {
  menu.style.right = '-220px';
}

function UsersListnone() {
  UsersList.style.display = 'none';
}

function alluser(data) {
  document.getElementById('UsersList').innerHTML = "<div class=\"col-sm-4\">\n        <button class=\"Addanewuser\" onclick=\"Addauser()\"><img src=\"/img/adduser.png\"></button>\n        </div>\n<table>\n<thead>\n    <tr>\n        <th></th>\n        <th>\u05D6\u05D4\u05D5\u05EA \u05DE\u05E9\u05EA\u05DE\u05E9</th>\n        <th>\u05E9\u05DD \u05DE\u05E9\u05EA\u05DE\u05E9</th>\n        <th>\u05EA\u05E4\u05E7\u05D9\u05D3</th>\n    </tr>\n</thead>\n    <tbody>\n        ".concat(data.map(function (elm) {
    return "<tr>\n        <td class=\"flexdeleteuser\">\n        <a action=\"Edit\" class=\"deleteuser\" onclick='editUser(\"".concat(elm._id, "\")'><img src=\"/img/edit-button.png\"></a>\n        <a action=\"Delete\" class=\"deleteuser\" onclick='deleteUser(\"").concat(elm._id, "\")'><img src=\"/img/deleteuser.png\"></a>\n        </td>\n                <td>").concat(elm.id_user, "</td>\n                <td>").concat(elm.userName, "</td>\n                <td>").concat(elm.role, "</td> \n        </tr>\n\n");
  }).join(''), "</tbody>\n</table>");
}

var editUserById = document.querySelector("#editUserById");

function editUserByIddisplaynone() {
  editUserById.style.display = "none";
  UsersList.style.display = 'block';
}

var editUser = function editUser(userId) {
  menubutoondisplayblock();
  letdistinctResult = [];
  fetch('/get-details-users' + userId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    editUserById.style.display = "block";
    UsersList.style.display = 'none';
    document.getElementById('editUserById').innerHTML = "<img class=\"imgdeleteeditUser\" src=\"/img/return.png\" onclick=\"editUserByIddisplaynone()\">\n                    <h1>\u05E2\u05E8\u05D9\u05DB\u05EA \u05DE\u05E9\u05EA\u05DE\u05E9</h1>\n                    <form onsubmit=\"handleEditUser(event)\">\n                    \n                 <div class=\"rtl\">\n                 \n                     <label for=\"id_user\">\u05DE\u05E1\u05E4\u05E8 \u05D6\u05D4\u05D5\u05EA:\n                    <input type=\"text\" name=\"id_user\" id=\"id_user\" value=\"".concat(data.id_user, "\" disabled=\"disabled\" autocomplete='off'></br>\n                </label>\n                <label for=\"name\">\u05E9\u05DD:\n                    <input type=\"text\" name=\"name\" id=\"name\" value=\"").concat(data.name, "\" autocomplete='off'></br>\n                </label>\n                <label for=\"userName\">\u05E9\u05DD \u05DE\u05E9\u05EA\u05DE\u05E9:\n                    <input type=\"text\" name=\"username\" id=\"userName\" value=").concat(data.userName, " autocomplete='off'></br>\n                </label>\n                <label for=\"password\">\u05E1\u05D9\u05E1\u05DE\u05D4:\n                    <input type=\"text\" name=\"password\" id=\"password\" value=").concat(data.password, " autocomplete='off'></br>\n                </label>\n                <label for=\"email\">\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC:\n                    <input type=\"email\" name=\"email\" id=\"email\" value=").concat(data.email, " autocomplete='off'></br>\n                </label>\n                <label for=\"phone\">\u05E4\u05DC\u05D0\u05E4\u05D5\u05DF:\n                    <input type=\"text\" name=\"phone\" id=\"phone\" value=").concat(data.phone, " autocomplete='off'></br>\n                </label>\n            </div>\n            <select name=\"role\" id=\"role\" value=").concat(data.role, ">\n                <option style=\"display: none;\">").concat(data.role, "</option>\n                <option>\u05EA\u05DC\u05DE\u05D9\u05D3\u05D4</option>\n                <option>\u05DE\u05E0\u05D4\u05DC</option>\n            </select></br>\n            <div id=\"messag\"></div></br>\n            <input type=\"submit\" value=\"\u05E9\u05DE\u05D5\u05E8 \u05E9\u05D9\u05E0\u05D5\u05D9\u05D9\u05DD\">\n        </form>");
  });
};

function handleEditUser(e) {
  e.preventDefault();
  var id_user = e.target[0].value;
  var name = e.target[1].value;
  var userName = e.target[2].value;
  var password = e.target[3].value;
  var email = e.target[4].value;
  var phone = e.target[5].value;
  var role = e.target[6].value;
  var message = document.getElementById('messag');
  message.innerHTML = '';

  if (name.length < 2) {
    message.innerHTML = 'נדרש להזין שם מלא תקין';
  } else if (userName.length < 2) {
    message.innerHTML = 'נדרש להזין שם משתמש</br> המכיל 2 תווים לפחות ';
  } else if (password.length < 6) {
    message.innerHTML = 'בחר/י סיסמה המכילה 6</br> תווים לפחות';
  } else if (email.length == 0) {
    message.innerHTML = 'נדרש להזין כתובת מייל';
  } else if (phone.length !== 9 && phone.length !== 10) {
    message.innerHTML = 'מספר טלפון לא תקין';
  } else if (role == "דירוג") {
    message.innerHTML = 'בחר דירוג למשתמש';
  } else {
    console.log(id_user, name, userName, password, email, role);
    fetch("/update", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_user: id_user,
        name: name,
        userName: userName,
        password: password,
        email: email,
        phone: phone,
        role: role
      })
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      if (data.message == 'ok') {
        message.innerHTML = 'המשתמש עודכן במערכת';
        getListUsers();
      } else {
        message.innerHTML = data.message;
      }
    });
  }
}

function addNewShelf() {
  menubutoondisplayblock();
  ShelfList.style.display = 'none';
}

function addShelflist() {
  ShelfList.style.display = 'block';
}