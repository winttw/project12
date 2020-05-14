var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config = require('./configs/config');
const mongoose = require('mongoose');
const {User} = require('./models/user.model');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const helmet = require('helmet');
const MongoStore = require('connect-mongo')(session);
const argon2 = require('argon2');
const flash = require('connect-flash');

mongoose.connect(config.mongodb_url, {
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: config.mongodb_user,
  pass: config.mongodb_pass,
  useCreateIndex: true,
  useFindAndModify: false
});
var db = mongoose.connection;

db.on('open', () => {console.log('Connected to MongoDB!')});
db.on('disconnected', () => {console.error('Disconnected from MongoDB!')});
db.on('reconnected', () => {console.log('Reconnected to MongoDB!')});
db.on('error', err => {console.error(err)});

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const dashboardRouter = require('./routes/dashboard');
const hoursRouter = require('./routes/hours')
const calendarRouter = require('./routes/calendar')
const supportRouter = require('./routes/support')
const tasksRouter = require('./routes/tasks')
const teamRouter = require('./routes/team');

const {isLoggedIn, isAuthorized_bool} = require('./middleware/authorize')

var app = express();

app.use(session({
  // proxy: true,
  secret: config.session_secret,
  store: new MongoStore({ mongooseConnection: db }),
  resave: true,
  saveUninitialized: true,
  key: config.cookie_key,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: new Date( Date.now() + 24 * 60 * 60 * 1000 ) // cookie expires in 1 day
  }
}));

passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'},(username, password, done) => {
  User.findOne({email: username}).exec().then(async user_doc => {
    if (!user_doc) return done(null, false, {message: 'User does not exist'});
    const password_compare_result = await argon2.verify(user_doc.password, password);
    if (!password_compare_result) return done(null, false, {message: "User does not exist"});
    return done(null, user_doc, {message: "Successful login!"})
  })
  .catch(err => {return done(err)});
}))

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(isAuthorized_bool);
app.use(flash());
app.use('*', isLoggedIn);

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/dashboard', dashboardRouter);
app.use('/hours', hoursRouter);
app.use('/calendar', calendarRouter);
app.use('/support', supportRouter);
app.use('/tasks', tasksRouter);
app.use('/team', teamRouter);
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