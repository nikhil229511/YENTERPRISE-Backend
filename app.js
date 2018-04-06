var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors=require('cors');

//include js files
var index = require('./routes/index');
var login = require('./routes/login.js');
var users = require('./routes/users');
var suppliers = require('./routes/suppliers');
var customers = require('./routes/customers');
var company = require('./routes/companyDetail');
var itemMaster = require('./routes/itemMaster');
var itemDetail = require('./routes/itemDetail');
var miscItem = require('./routes/miscItem');
var miscIncome = require('./routes/miscIncome');
var miscExpense = require('./routes/miscExpense');
var transportMaster = require('./routes/transportMaster');
var purchase = require('./routes/purchase');
var rent = require('./routes/rent');

//var testStateAPI = require('./routes/testStateAPI');

var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//link page name to js page
app.use('/', index);
app.use('/login',login);
app.use('/users', users);
app.use('/suppliers', suppliers);
app.use('/customers', customers);
app.use('/companyDetails', company);
app.use('/itemMaster', itemMaster);
app.use('/itemDetail', itemDetail );
app.use('/miscItem', miscItem);
app.use('/miscExpense', miscExpense);
app.use('/miscIncome', miscIncome);
app.use('/transportMaster', transportMaster);
app.use('/purchase', purchase);
app.use('/rent', rent);

// app.use('/testStateAPI', testStateAPI);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
