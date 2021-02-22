"use strict";

var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');

var jwt = require('jwt-simple');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express["static"]('public'));

var mongoose = require('mongoose');

var secret = 'gvfdgb%$^$%&3$4054423654073467$6@$&*(@%$^&2310*/-/+';
var url = "mongodb+srv://hillel:Aa25802580@cluster0.rv8jb.mongodb.net/Tens";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
var Users = mongoose.model('User', {
  name: String,
  password: String,
  email: String,
  phone: String,
  LastSeen: String
});
var Tens = mongoose.model('Tens', {
  Revenue: Number,
  Fromensbrought: Number,
  total: Number,
  Remarks: String,
  idUser: String,
  Dailydate: String,
  time: String
});
var pagserver = 1;
var versionUpdate = 'true';
var coocik;
app.post('/LastSeen', function _callee(req, res) {
  var _req$body, _id, LastSeen, pag;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, _id = _req$body._id, LastSeen = _req$body.LastSeen, pag = _req$body.pag;

          if (!(pagserver !== pag)) {
            _context.next = 6;
            break;
          }

          console.log(pag);
          res.send({
            versionUpdate: versionUpdate
          });
          return _context.abrupt("return", false);

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(Users.updateOne({
            _id: _id
          }, {
            LastSeen: LastSeen
          }));

        case 8:
          res.send(true);
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
app.get('/get-userid', testcoocik, function _callee2(req, res) {
  var user, jwtuser, deta;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          user = req.cookies.user;
          jwtuser = jwt.decode(user, secret);
          userid = jwtuser.id;
          _context2.next = 6;
          return regeneratorRuntime.awrap(Users.find({
            _id: userid
          }));

        case 6:
          deta = _context2.sent;
          res.send({
            deta: deta
          });
          _context2.next = 13;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
app.post('/get-categoryinit', function _callee3(req, res) {
  var user, _newDate, jwtuser, deta;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;

          if (!(req.body.pag !== pagserver)) {
            _context3.next = 4;
            break;
          }

          res.send({
            versionUpdate: versionUpdate
          });
          return _context3.abrupt("return", false);

        case 4:
          user = req.cookies.user;
          _newDate = new Date().getTime();

          if (!user) {
            _context3.next = 19;
            break;
          }

          jwtuser = jwt.decode(user, secret);
          userid = jwtuser.id;
          Dateuser = jwtuser.newDate;

          if (!(Dateuser + 172800000 < _newDate)) {
            _context3.next = 15;
            break;
          }

          res.cookie('user', user, {
            maxAge: 0,
            httpOnly: true
          });
          validated = false;
          _context3.next = 19;
          break;

        case 15:
          _context3.next = 17;
          return regeneratorRuntime.awrap(Tens.find({
            idUser: userid
          }));

        case 17:
          deta = _context3.sent;
          res.send({
            deta: deta
          });

        case 19:
          _context3.next = 24;
          break;

        case 21:
          _context3.prev = 21;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 24:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 21]]);
});
app.post("/button-plus", function _callee4(req, res) {
  var _req$body2, Revenue, Fromensbrought, Remarks, Dailydate, time, user, jwtuser, _userid, total, Tensdata;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body2 = req.body, Revenue = _req$body2.Revenue, Fromensbrought = _req$body2.Fromensbrought, Remarks = _req$body2.Remarks, Dailydate = _req$body2.Dailydate, time = _req$body2.time;
          user = req.cookies.user;
          jwtuser = jwt.decode(user, secret);
          _userid = jwtuser.id;
          total = Revenue * 0.10 - Fromensbrought;
          Tensdata = new Tens({
            Revenue: Revenue,
            total: total,
            Fromensbrought: Fromensbrought,
            Remarks: Remarks,
            idUser: _userid,
            Dailydate: Dailydate,
            time: time
          });
          _context4.next = 9;
          return regeneratorRuntime.awrap(Tensdata.save().then(function (doc) {
            return console.log(doc);
          })["catch"](function (e) {
            return console.log(e);
          }));

        case 9:
          res.send(true);
          _context4.next = 15;
          break;

        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 12]]);
});
app.post('/edete-list', function _callee5(req, res) {
  var _id, deta;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _id = req.body._id;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Tens.findOne({
            _id: _id
          }));

        case 4:
          deta = _context5.sent;
          res.send({
            deta: deta
          });
          _context5.next = 11;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
app.post('/clickbuttonediting', function _callee6(req, res) {
  var _req$body3, Revenueediting, Fromensbroughtediting, Remarksediting, id, Dailydate, time, total;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _req$body3 = req.body, Revenueediting = _req$body3.Revenueediting, Fromensbroughtediting = _req$body3.Fromensbroughtediting, Remarksediting = _req$body3.Remarksediting, id = _req$body3.id, Dailydate = _req$body3.Dailydate, time = _req$body3.time;
          total = Revenueediting * 0.10 - Fromensbroughtediting;
          _context6.next = 5;
          return regeneratorRuntime.awrap(Tens.updateOne({
            _id: id
          }, {
            Revenue: Revenueediting,
            Fromensbrought: Fromensbroughtediting,
            total: total,
            Remarks: Remarksediting,
            Dailydate: Dailydate,
            time: time
          }));

        case 5:
          res.send(true);
          _context6.next = 11;
          break;

        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
app.post('/deletelistditing', function _callee7(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          id = req.body.id;
          _context7.next = 4;
          return regeneratorRuntime.awrap(Tens.deleteOne({
            _id: id
          }));

        case 4:
          res.send(true);
          _context7.next = 10;
          break;

        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);

        case 10:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
app.post('/login', function _callee8(req, res) {
  var ok, _req$body4, emaillogin, paswordlogin, deta, id, token;

  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _req$body4 = req.body, emaillogin = _req$body4.emaillogin, paswordlogin = _req$body4.paswordlogin;
          _context8.next = 4;
          return regeneratorRuntime.awrap(Users.find({}));

        case 4:
          deta = _context8.sent;
          i = 0;

        case 6:
          if (!(i < deta.length)) {
            _context8.next = 21;
            break;
          }

          if (!(emaillogin == deta[i].email && paswordlogin == deta[i].password)) {
            _context8.next = 17;
            break;
          }

          id = deta[i]._id;
          newDate = new Date().getTime();
          token = jwt.encode({
            id: id,
            newDate: newDate
          }, secret);
          coocik = token;
          res.cookie('user', token, {
            httpOnly: true
          });
          ok = true;
          return _context8.abrupt("break", 21);

        case 17:
          ok = false;

        case 18:
          i++;
          _context8.next = 6;
          break;

        case 21:
          res.send({
            ok: ok
          });
          _context8.next = 27;
          break;

        case 24:
          _context8.prev = 24;
          _context8.t0 = _context8["catch"](0);
          console.log(_context8.t0);

        case 27:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 24]]);
});
app.post('/sing_in', function _callee9(req, res) {
  var ok, mesag, _req$body5, namesing_in, telsing_in, emailsing_in, paswordsing_in, deta, plueuser;

  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          ok = true;
          mesag = '';
          _context9.prev = 2;
          _req$body5 = req.body, namesing_in = _req$body5.namesing_in, telsing_in = _req$body5.telsing_in, emailsing_in = _req$body5.emailsing_in, paswordsing_in = _req$body5.paswordsing_in;
          _context9.next = 6;
          return regeneratorRuntime.awrap(Users.find({}));

        case 6:
          deta = _context9.sent;
          i = 0;

        case 8:
          if (!(i < deta.length)) {
            _context9.next = 25;
            break;
          }

          if (!(emailsing_in == deta[i].email)) {
            _context9.next = 21;
            break;
          }

          if (!(paswordsing_in == deta[i].password)) {
            _context9.next = 16;
            break;
          }

          ok = false;
          mesag = 'חשבון זה כבר קיים';
          return _context9.abrupt("break", 25);

        case 16:
          mesag = 'מייל כבר קיים במערכת';
          ok = false;
          return _context9.abrupt("break", 25);

        case 19:
          _context9.next = 22;
          break;

        case 21:
          ok = true;

        case 22:
          i++;
          _context9.next = 8;
          break;

        case 25:
          if (!(ok == true)) {
            _context9.next = 29;
            break;
          }

          plueuser = new Users({
            name: namesing_in,
            phone: telsing_in,
            email: emailsing_in,
            password: paswordsing_in
          });
          _context9.next = 29;
          return regeneratorRuntime.awrap(plueuser.save().then(function (doc) {
            var id = doc._id;
            newDate = new Date().getTime();
            var token = jwt.encode({
              id: id,
              newDate: newDate
            }, secret);
            res.cookie('user', token, {
              httpOnly: true
            });
          })["catch"](function (e) {
            return console.log(e);
          }));

        case 29:
          res.send({
            ok: ok,
            mesag: mesag
          });
          _context9.next = 35;
          break;

        case 32:
          _context9.prev = 32;
          _context9.t0 = _context9["catch"](2);
          console.log(_context9.t0);

        case 35:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[2, 32]]);
});
app.post('/UserUpdate', testcoocik, function _callee10(req, res) {
  var _req$body6, namesing_in, telsing_in, emailsing_in, paswordsing_in, _id;

  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _req$body6 = req.body, namesing_in = _req$body6.namesing_in, telsing_in = _req$body6.telsing_in, emailsing_in = _req$body6.emailsing_in, paswordsing_in = _req$body6.paswordsing_in, _id = _req$body6._id; // const deta = await Users.find({})
          // for (i = 0; i < deta.length; i++) {
          //     if (emailsing_in == deta[i].email && _id ==  deta[i]._id) {
          //         if (paswordsing_in == deta[i].password) {
          //             ok = false
          //             mesag = 'חשבון זה כבר קיים'
          //             break
          //         }
          //         else{
          //             mesag = 'מייל כבר קיים במערכת'
          //             ok = false
          //             break
          //         }
          //     } else {
          //         ok = true
          //     }
          // }

          _context10.next = 4;
          return regeneratorRuntime.awrap(Users.updateOne({
            _id: _id
          }, {
            name: namesing_in,
            phone: telsing_in,
            email: emailsing_in,
            password: paswordsing_in
          }));

        case 4:
          res.send({
            ok: true
          });
          _context10.next = 10;
          break;

        case 7:
          _context10.prev = 7;
          _context10.t0 = _context10["catch"](0);
          console.log(_context10.t0);

        case 10:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
app.get('/Output', function (req, res) {
  var user = req.cookies.user;
  res.cookie('user', user, {
    maxAge: 0,
    httpOnly: true
  });
  res.send(true);
});
app.get('/Entrance', testcoocik, function (req, res) {
  var validated = true;
  res.send({
    validated: validated
  });
});

function testcoocik(req, res, next) {
  var user = req.cookies.user;
  var newDate = new Date().getTime();
  var validated = false;

  if (user) {
    var jwtuser = jwt.decode(user, secret);
    var _Dateuser = jwtuser.newDate;

    if (_Dateuser + 172800000 < newDate) {
      res.cookie('user', user, {
        maxAge: 0,
        httpOnly: true
      });
      res.send({
        validated: validated
      });
    } else {
      next();
    }
  } else {
    res.send({
      validated: validated
    });
  }
}

var port = process.env.PORT || 8080;
app.listen(port, function () {
  return console.log('listen on port 8080');
});