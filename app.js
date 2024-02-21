var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var dishRouter = require("./routes/dishRouter");
var promotionRouter = require("./routes/promoRouter");
var body = require("body-parser");
var toppinged = require("./routes/toppingRouter");
const toppingRouter = require("./routes/toppingRouter");
const cakeRouter = require("./routes/cakeRouter");
const docRouter = require("./routes/documentRouter");
const youRouter = require("./routes/youtubeRouter");
const cakeRoute = require("./routes/CakeRoute");
const userRoute = require('./routes/UserRouter')
var app = express();



// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cookieParser('12345-67890'));
app.use(logger("dev"));
app.use(express.json());
app.use(body.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));



var session = require('express-session');
var FileStore = require('session-file-store')(session);

app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));
app.use("/user", userRoute)
app.use(auth);

// app.use('/', indexRouter);
app.use("/dishes", dishRouter);
app.use("/promotions", promotionRouter);
app.use("/toppings", toppingRouter);
// app.use('/cakes' , cakeRouter)
app.use("/document", docRouter);
app.use("/youtubes", youRouter);
app.use("/cakes", cakeRoute);


// Di chuyển middleware auth lên trên middleware express-session

function auth (req, res, next) {
      console.log(req.session);
  
    if(!req.session.user) {
        var err = new Error('You are not authenticated!');
        err.status = 403;
        return next(err);
    }
    else {
      if (req.session.user === 'authenticated') {
        next();
      }
      else {
        var err = new Error('You are not authenticated!');
        err.status = 403;
        return next(err);
      }
    }
  }
  
  


// function auth (req, res, next) {
//   console.log(req.signedCookies.user)
//   if (!req.signedCookies.user) {
//     var authHeader = req.headers.authorization;
//     if (!authHeader) {
//         var err = new Error('You are not authenticated!');
//         res.setHeader('WWW-Authenticate', 'Basic');              
//         err.status = 401;
//         next(err);
//         return;
//     }
//     var auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
//     var user = auth[0];
//     var pass = auth[1];
//     if (user == 'admin' && pass == 'password') {
//         res.cookie('user','admin',{signed: true});
//         next(); // authorized
//     } else {
//         var err = new Error('You are not authenticated!');
//         res.setHeader('WWW-Authenticate', 'Basic');              
//         err.status = 401;
//         next(err);
//     }
//   }
//   else {
//       if (req.signedCookies.user === 'admin') {
//           next();
//       }
//       else {
//           var err = new Error('You are not authenticated!');
//           err.status = 401;
//           next(err);
//       }
//   }
// }


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
