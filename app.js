var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const passport = require("passport");
const passportsetup = require('./passport')
const authRouter = require('./routes/auth')
const cookieSession = require("cookie-session");


const {connect} = require('./dbConnection/connect')
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/movies')
const theaterRouter = require ('./routes/theater')
const reservation = require('./routes/reservation')

var app = express();
connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(
  cookieSession({ name: "session", keys: ["justin"], maxAge: 24 * 60 * 60 * 1000 })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ['GET','POST','PUT','PATCH','DELETE'],
    credentials: true,
  })
);

app.use('/auth',authRouter)
app.use('/api/users',usersRouter);
app.use('/api/admin',adminRouter);
app.use('/api/theater',theaterRouter)
app.use('/api/user',reservation)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
