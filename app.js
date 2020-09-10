const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const config = require('/Users/corgi/Desktop/sos_homepage/config/awsconfig.json')
//const config = require('/root/sos_homepage/config/awsconfig.json')

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const buildingListRouter = require('./routes/buildings');
const deviceListRouter = require('./routes/devices');

const app = express();

//cors
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(session({
  secret: config.sessionKey,
  resave: false,
  saveUninitialized: true,
  store: new FileStore({logFn: function(){}}),
  cookie: {
    // 나중에 ture로 바꾸기
    httpOnly: false,
    secure: false
  }
}))

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/buildings', buildingListRouter);
app.use('/devices', deviceListRouter);

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

app.listen(3000, () => {
  console.log('hompeage server is running');
});
module.exports = app;
