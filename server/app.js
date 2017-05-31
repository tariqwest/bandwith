const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');

const app = express();

app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({ extended: false }));
app.use(middleware.bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(middleware.auth.session);
app.use(middleware.passport.initialize());
app.use(middleware.passport.session());
app.use(middleware.flash());

app.use('/api/profiles', routes.profiles);
app.use('/api/preference', routes.preference);
app.use('/api/connections', routes.connections);
app.use('/api/chats', routes.chats);
app.use('/api', routes.api);
app.use('/auth', routes.auth);
app.use('/api/signup', routes.signup);
app.use(express.static(path.join(__dirname, '../public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public', 'index.html'));
});

module.exports = app;
