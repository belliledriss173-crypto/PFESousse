var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const http = require("http")

require('dotenv').config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/UserRouter');
//terrain
var terrainRoutes = require('./routes/terrainRoutes');
//player
var playerRoutes = require('./routes/playerRoutes');
var matchRoutes = require('./routes/matchRoutes');
var reservationRoutes = require('./routes/reservationRoutes');




const {connectToMongoDb}=require('./config/db')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/players', playerRoutes);
app.use('/terrains', terrainRoutes);
app.use('/matches', matchRoutes);
app.use('/reservations', reservationRoutes);





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
  res.json({ message: err.message, stack: err.stack });
});

module.exports = app;
const server =http.createServer(app);
server.listen(process.env.port,()=> {
  connectToMongoDb();
  console.log("app is running on port ",process.env.port)})  
  