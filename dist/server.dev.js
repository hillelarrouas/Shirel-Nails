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
  phone: String
});
var Tens = mongoose.model('Tens', {
  Revenue: Number,
  Fromensbrought: Number,
  total: Number,
  Remarks: String,
  idUser: String
});
app.get('/get-categoryinit', function _callee(req, res) {
  var user, _newDate, jwtuser, deta;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          user = req.cookies.user;
          _newDate = new Date().getTime();

          if (!user) {
            _context.next = 16;
            break;
          }

          jwtuser = jwt.decode(user, secret);
          userid = jwtuser.id;
          Dateuser = jwtuser.newDate;

          if (!(Dateuser + 86400000 < _newDate)) {
            _context.next = 12;
            break;
          }

          res.cookie('user', token, {
            maxAge: 0,
            httpOnly: true
          });
          validated = false;
          _context.next = 16;
          break;

        case 12:
          _context.next = 14;
          return regeneratorRuntime.awrap(Tens.find({
            idUser: userid
          }));

        case 14:
          deta = _context.sent;
          res.send({
            deta: deta
          });

        case 16:
          _context.next = 21;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 18]]);
});
app.post("/button-plus", function _callee2(req, res) {
  var _req$body, Revenue, Fromensbrought, Remarks, user, jwtuser, _userid, total, Tensdata;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, Revenue = _req$body.Revenue, Fromensbrought = _req$body.Fromensbrought, Remarks = _req$body.Remarks;
          user = req.cookies.user;
          jwtuser = jwt.decode(user, secret);
          _userid = jwtuser.id;
          total = Revenue * 0.10 - Fromensbrought;
          Tensdata = new Tens({
            Revenue: Revenue,
            total: total,
            Fromensbrought: Fromensbrought,
            Remarks: Remarks,
            idUser: _userid
          });
          _context2.next = 9;
          return regeneratorRuntime.awrap(Tensdata.save().then(function (doc) {
            return console.log(doc);
          })["catch"](function (e) {
            return console.log(e);
          }));

        case 9:
          res.send(true);
          _context2.next = 15;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 12]]);
});
app.post('/edete-list', function _callee3(req, res) {
  var _id, deta;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _id = req.body._id;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Tens.findOne({
            _id: _id
          }));

        case 4:
          deta = _context3.sent;
          res.send({
            deta: deta
          });
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
app.post('/clickbuttonediting', function _callee4(req, res) {
  var _req$body2, Revenueediting, Fromensbroughtediting, Remarksediting, id, total;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body2 = req.body, Revenueediting = _req$body2.Revenueediting, Fromensbroughtediting = _req$body2.Fromensbroughtediting, Remarksediting = _req$body2.Remarksediting, id = _req$body2.id;
          total = Revenueediting * 0.10 - Fromensbroughtediting;
          _context4.next = 5;
          return regeneratorRuntime.awrap(Tens.updateOne({
            _id: id
          }, {
            Revenue: Revenueediting,
            Fromensbrought: Fromensbroughtediting,
            total: total,
            Remarks: Remarksediting
          }));

        case 5:
          res.send(true);
          _context4.next = 11;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
app.post('/deletelistditing', function _callee5(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.body.id;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Tens.deleteOne({
            _id: id
          }));

        case 4:
          res.send(true);
          _context5.next = 10;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
app.post('/login', function _callee6(req, res) {
  var ok, _req$body3, emaillogin, paswordlogin, deta, id, _token;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _req$body3 = req.body, emaillogin = _req$body3.emaillogin, paswordlogin = _req$body3.paswordlogin;
          _context6.next = 4;
          return regeneratorRuntime.awrap(Users.find({}));

        case 4:
          deta = _context6.sent;
          i = 0;

        case 6:
          if (!(i < deta.length)) {
            _context6.next = 20;
            break;
          }

          if (!(emaillogin == deta[i].email && paswordlogin == deta[i].password)) {
            _context6.next = 16;
            break;
          }

          id = deta[i]._id;
          newDate = new Date().getTime();
          _token = jwt.encode({
            id: id,
            newDate: newDate
          }, secret);
          res.cookie('user', _token, {
            maxAge: 86400000,
            httpOnly: true
          });
          ok = true;
          return _context6.abrupt("break", 20);

        case 16:
          ok = false;

        case 17:
          i++;
          _context6.next = 6;
          break;

        case 20:
          res.send({
            ok: ok
          });
          _context6.next = 26;
          break;

        case 23:
          _context6.prev = 23;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);

        case 26:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 23]]);
});
app.post('/sing_in', function _callee7(req, res) {
  var ok, _req$body4, namesing_in, telsing_in, emailsing_in, paswordsing_in, deta, plueuser;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          ok = true;
          _context7.prev = 1;
          _req$body4 = req.body, namesing_in = _req$body4.namesing_in, telsing_in = _req$body4.telsing_in, emailsing_in = _req$body4.emailsing_in, paswordsing_in = _req$body4.paswordsing_in;
          _context7.next = 5;
          return regeneratorRuntime.awrap(Users.find({}));

        case 5:
          deta = _context7.sent;
          i = 0;

        case 7:
          if (!(i < deta.length)) {
            _context7.next = 17;
            break;
          }

          if (!(emailsing_in == deta[i].email && paswordsing_in == deta[i].password)) {
            _context7.next = 13;
            break;
          }

          ok = false;
          return _context7.abrupt("break", 17);

        case 13:
          ok = true;

        case 14:
          i++;
          _context7.next = 7;
          break;

        case 17:
          if (!(ok == true)) {
            _context7.next = 21;
            break;
          }

          plueuser = new Users({
            name: namesing_in,
            phone: telsing_in,
            email: emailsing_in,
            password: paswordsing_in
          });
          _context7.next = 21;
          return regeneratorRuntime.awrap(plueuser.save().then(function (doc) {
            var id = doc._id;
            newDate = new Date().getTime();
            var token = jwt.encode({
              id: id,
              newDate: newDate
            }, secret);
            res.cookie('user', token, {
              maxAge: 86400000,
              httpOnly: true
            });
          })["catch"](function (e) {
            return console.log(e);
          }));

        case 21:
          res.send({
            ok: ok
          });
          _context7.next = 27;
          break;

        case 24:
          _context7.prev = 24;
          _context7.t0 = _context7["catch"](1);
          console.log(_context7.t0);

        case 27:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 24]]);
});
var port = process.env.PORT || 8080;
app.listen(port, function () {
  return console.log('http://localhost:8080/login/login.html');
});