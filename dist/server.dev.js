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
var url = "mongodb+srv://hillel:Aa25802580@cluster0.rv8jb.mongodb.net/test";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
var Users = mongoose.model('User', {
  id_user: String,
  userName: String,
  name: String,
  password: String,
  email: String,
  phone: String,
  role: String,
  status: String
});
var video = mongoose.model('video', {
  link: String,
  name: String
}); // const Products = mongoose.model('product', {
//     UPS: String,
//     Name: String,
//     price: Number,
//     Amount: Number,
//     Category: String,
//     Weight: Number,
//     height: Number,
//     ExpiryDate: String,
//     Image: String,
//     Location: String
// });
// const testShelf = new Shelfs({
//     Line: 3,
//     Area: 'F',
//     Floor: 5,
//     UPS_Shelfs: ``,
//     NumberOfProductsonShelf:32,
//     MaximumWeight: 500,
//     CurrentWeight: 300,
//     height: 50
// });
// testShelf.save().then(doc => console.log(doc)).catch(e =>console.log(e));
// const product1 = new Products({
//     UPS: '81726',
//     Name: 'כוס',
//     price: '450',
//     Category: 'זכוכית',
//     Weight: '5',
//     ExpiryDate: '30/02/2021'
// })
// product1.save().then(doc => console.log(doc)).catch(e =>console.log(e));
// const user = new video({
//     link:'https://youtu.be/cA96kf-dnOg'
// });
//  user.save().then(doc => console.log('doc')).catch(e =>console.log(e));

app.post('/send-Login-details', function _callee(req, res) {
  var _req$body, userName, password, validate, id, data;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, userName = _req$body.userName, password = _req$body.password;
          validate = false;
          _context.next = 5;
          return regeneratorRuntime.awrap(Users.find({}));

        case 5:
          data = _context.sent;
          i = 0;

        case 7:
          if (!(i < data.length)) {
            _context.next = 22;
            break;
          }

          if (!(userName == data[i].userName && password == data[i].password)) {
            _context.next = 17;
            break;
          }

          id = data[i]._id;
          _context.next = 12;
          return regeneratorRuntime.awrap(Users.updateOne({
            _id: id
          }, {
            status: 'true'
          }));

        case 12:
          validate = true;

          if (data[i].role == 'מנהל') {
            role = 'ok';
          } else {
            role = 'none';
          }

          return _context.abrupt("break", 22);

        case 17:
          role = 'מחסנאי';
          console.log("no match ".concat(data[i].userName));

        case 19:
          i++;
          _context.next = 7;
          break;

        case 22:
          newDate = new Date().getTime();
          token = jwt.encode({
            role: role,
            userName: userName,
            id: id,
            newDate: newDate
          }, secret);

          if (validate) {
            res.cookie('validated', token, {
              maxAge: 86400000,
              httpOnly: true
            });
          }

          res.send({
            validate: validate,
            role: role
          });
          _context.next = 31;
          break;

        case 28:
          _context.prev = 28;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0.message);

        case 31:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 28]]);
}); // index.html

app.get('/Cookie-test', function _callee2(req, res) {
  var validated, name, id, checkCookie, decoded;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          checkCookie = req.cookies.validated;
          newDate = new Date().getTime();

          if (!checkCookie) {
            _context2.next = 14;
            break;
          }

          decoded = jwt.decode(checkCookie, secret);
          validated = decoded.role;
          name = decoded.userName;
          id = decoded.id;

          if (!(decoded.newDate + 86400000 < newDate)) {
            _context2.next = 12;
            break;
          }

          _context2.next = 10;
          return regeneratorRuntime.awrap(Users.updateOne({
            _id: id
          }, {
            status: 'false'
          }));

        case 10:
          res.cookie('validated', token, {
            maxAge: 0,
            httpOnly: true
          });
          validated = false;

        case 12:
          _context2.next = 15;
          break;

        case 14:
          validated = false;

        case 15:
          res.send({
            validated: validated,
            name: name,
            id: id
          });

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.put("/update", function _callee3(req, res) {
  var data, myquery, newvalues;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Users.find({}));

        case 2:
          data = _context3.sent;
          i = 0;

        case 4:
          if (!(i < data.length)) {
            _context3.next = 21;
            break;
          }

          if (!(req.body.id_user !== data[i].id_user)) {
            _context3.next = 18;
            break;
          }

          if (!(req.body.userName == data[i].userName)) {
            _context3.next = 11;
            break;
          }

          message = 'שם משתמש כבר קיים';
          return _context3.abrupt("break", 21);

        case 11:
          if (!(req.body.email == data[i].email)) {
            _context3.next = 16;
            break;
          }

          message = 'מייל זה כבר קיים במערכת';
          return _context3.abrupt("break", 21);

        case 16:
          message = 'ok';
          return _context3.abrupt("break", 21);

        case 18:
          i++;
          _context3.next = 4;
          break;

        case 21:
          if (!(message == 'ok')) {
            _context3.next = 26;
            break;
          }

          myquery = {
            id_user: req.body.id_user
          };
          newvalues = {
            $set: {
              userName: req.body.userName,
              name: req.body.name,
              password: req.body.password,
              email: req.body.email,
              phone: req.body.phone,
              role: req.body.role
            }
          };
          _context3.next = 26;
          return regeneratorRuntime.awrap(Users.updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
          }));

        case 26:
          setTimeout(function () {
            res.send({
              message: message
            });
          }, 1000);

        case 27:
        case "end":
          return _context3.stop();
      }
    }
  });
});
var newDate = new Date().getTime();
var role = "מחסנאי";
var ok = false;
var token;
app.get('/Output', function _callee4(req, res) {
  var checkCookie, decoded, _id;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          checkCookie = req.cookies.validated;
          decoded = jwt.decode(checkCookie, secret);
          _id = decoded.id;
          _context4.next = 5;
          return regeneratorRuntime.awrap(Users.updateOne({
            _id: _id
          }, {
            status: 'false'
          }));

        case 5:
          res.cookie('validated', token, {
            maxAge: 0,
            httpOnly: true
          });
          res.send(true);

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
});
app.get('/get-details-users:userId', function _callee5(req, res) {
  var userId, findUser;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          userId = req.params.userId;
          console.log(userId);
          _context5.prev = 2;
          _context5.next = 5;
          return regeneratorRuntime.awrap(Users.findOne({
            _id: userId
          }));

        case 5:
          findUser = _context5.sent;
          res.send(findUser);
          _context5.next = 12;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](2);
          console.log(_context5.t0);

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[2, 9]]);
});
app.post('/Searchdeta', function _callee6(req, res) {
  var inputvalue, data;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          inputvalue = req.body.inputvalue;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Products.find({}));

        case 3:
          data = _context6.sent;
          res.send({
            data: data
          });

        case 5:
        case "end":
          return _context6.stop();
      }
    }
  });
});
app.get('/alluserconnected', function _callee7(req, res) {
  var data;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(Users.find({
            status: true
          }));

        case 2:
          data = _context7.sent;
          res.send({
            data: data
          });

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
});
app.get('/Cookie-test', function _callee8(req, res) {
  var validated, name, id, checkCookie, decoded;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          checkCookie = req.cookies.validated;
          newDate = new Date().getTime();

          if (!checkCookie) {
            _context8.next = 14;
            break;
          }

          decoded = jwt.decode(checkCookie, secret);
          validated = decoded.role;
          name = decoded.userName;
          id = decoded.id;

          if (!(decoded.newDate + 86400000 < newDate)) {
            _context8.next = 12;
            break;
          }

          _context8.next = 10;
          return regeneratorRuntime.awrap(Users.updateOne({
            _id: id
          }, {
            status: 'false'
          }));

        case 10:
          res.cookie('validated', token, {
            maxAge: 0,
            httpOnly: true
          });
          validated = false;

        case 12:
          _context8.next = 15;
          break;

        case 14:
          validated = false;

        case 15:
          res.send({
            validated: validated,
            name: name,
            id: id
          });

        case 16:
        case "end":
          return _context8.stop();
      }
    }
  });
});
app.post('/send-User-details-sign-up', function _callee9(req, res) {
  var message, _req$body2, id_user, name, userName, password, email, phone, role, data, user;

  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          message = '';
          _req$body2 = req.body, id_user = _req$body2.id_user, name = _req$body2.name, userName = _req$body2.userName, password = _req$body2.password, email = _req$body2.email, phone = _req$body2.phone, role = _req$body2.role;
          _context9.next = 4;
          return regeneratorRuntime.awrap(Users.find({}));

        case 4:
          data = _context9.sent;
          i = 0;

        case 6:
          if (!(i < data.length)) {
            _context9.next = 27;
            break;
          }

          if (!(id_user == data[i].id_user)) {
            _context9.next = 12;
            break;
          }

          message = 'מספר זהות קיים';
          return _context9.abrupt("break", 27);

        case 12:
          if (!(userName == data[i].userName)) {
            _context9.next = 17;
            break;
          }

          message = 'שם משתמש כבר קיים';
          return _context9.abrupt("break", 27);

        case 17:
          if (!(email == data[i].email)) {
            _context9.next = 22;
            break;
          }

          message = 'מייל זה כבר קיים במערכת';
          return _context9.abrupt("break", 27);

        case 22:
          message = 'ok';
          return _context9.abrupt("break", 27);

        case 24:
          i++;
          _context9.next = 6;
          break;

        case 27:
          if (!(message == 'ok')) {
            _context9.next = 31;
            break;
          }

          user = new Users({
            id_user: id_user,
            name: name,
            userName: userName,
            password: password,
            email: email,
            phone: phone,
            role: role
          });
          _context9.next = 31;
          return regeneratorRuntime.awrap(user.save().then(function (doc) {
            return console.log(doc);
          })["catch"](function (e) {
            return console.log(e);
          }));

        case 31:
          setTimeout(function () {
            res.send({
              message: message
            });
          }, 1000);

        case 32:
        case "end":
          return _context9.stop();
      }
    }
  });
});
app.get('/get-category', function _callee10(req, res) {
  var data;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(video.find({}));

        case 2:
          data = _context10.sent;
          res.send({
            data: data
          });

        case 4:
        case "end":
          return _context10.stop();
      }
    }
  });
});
app.get('/get-List-Users', function _callee11(req, res) {
  var data;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap(Users.find());

        case 2:
          data = _context11.sent;
          res.send({
            data: data
          });

        case 4:
        case "end":
          return _context11.stop();
      }
    }
  });
});
app["delete"]('/:userId', function _callee12(req, res) {
  var userId, data;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          userId = req.params.userId;
          _context12.next = 4;
          return regeneratorRuntime.awrap(Users.findByIdAndDelete(userId));

        case 4:
          _context12.next = 6;
          return regeneratorRuntime.awrap(Users.find({}));

        case 6:
          data = _context12.sent;
          res.send(data);
          _context12.next = 13;
          break;

        case 10:
          _context12.prev = 10;
          _context12.t0 = _context12["catch"](0);
          console.log(_context12.t0);

        case 13:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
app.post('/plusvideo', function _callee13(req, res) {
  var _req$body3, linkvideovalue, namevideovalue, vide, data;

  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _req$body3 = req.body, linkvideovalue = _req$body3.linkvideovalue, namevideovalue = _req$body3.namevideovalue;
          _context13.prev = 1;
          vide = new video({
            link: linkvideovalue,
            name: namevideovalue
          });
          _context13.next = 5;
          return regeneratorRuntime.awrap(vide.save().then(function (doc) {
            return console.log(doc);
          })["catch"](function (e) {
            return console.log(e);
          }));

        case 5:
          _context13.next = 7;
          return regeneratorRuntime.awrap(video.find({}));

        case 7:
          data = _context13.sent;
          res.send({
            data: data
          });
          _context13.next = 14;
          break;

        case 11:
          _context13.prev = 11;
          _context13.t0 = _context13["catch"](1);
          console.log(_context13.t0);

        case 14:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[1, 11]]);
});
app.post('/editingvideo', function _callee14(req, res) {
  var id, data;
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          id = req.body.id;
          _context14.prev = 1;
          _context14.next = 4;
          return regeneratorRuntime.awrap(video.findOne({
            _id: id
          }));

        case 4:
          data = _context14.sent;
          res.send({
            data: data
          });
          _context14.next = 11;
          break;

        case 8:
          _context14.prev = 8;
          _context14.t0 = _context14["catch"](1);
          console.log(_context14.t0);

        case 11:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
app.post('/deletevideo', function _callee15(req, res) {
  var id, data;
  return regeneratorRuntime.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          id = req.body.id;
          _context15.prev = 1;
          _context15.next = 4;
          return regeneratorRuntime.awrap(video.deleteOne({
            _id: id
          }));

        case 4:
          data = _context15.sent;
          res.send({
            data: data
          });
          _context15.next = 11;
          break;

        case 8:
          _context15.prev = 8;
          _context15.t0 = _context15["catch"](1);
          console.log(_context15.t0);

        case 11:
        case "end":
          return _context15.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
app.post('/editing', function _callee16(req, res) {
  var _req$body4, id, linkvideovalue, namevideovalue;

  return regeneratorRuntime.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _req$body4 = req.body, id = _req$body4.id, linkvideovalue = _req$body4.linkvideovalue, namevideovalue = _req$body4.namevideovalue;
          _context16.prev = 1;
          _context16.next = 4;
          return regeneratorRuntime.awrap(video.findByIdAndUpdate({
            _id: id
          }, {
            link: linkvideovalue,
            name: namevideovalue
          }));

        case 4:
          res.send(true);
          _context16.next = 10;
          break;

        case 7:
          _context16.prev = 7;
          _context16.t0 = _context16["catch"](1);
          console.log(_context16.t0);

        case 10:
        case "end":
          return _context16.stop();
      }
    }
  }, null, null, [[1, 7]]);
});
var port = process.env.PORT || 8080;
app.listen(port, function () {
  return console.log('http://localhost:8080/login/login.html');
});