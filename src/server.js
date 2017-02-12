import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './client.app.routes';
import NotFoundPage from './components/NotFoundPage';
import Mongoose from 'mongoose';
import apiRoutes from './api.routes';
import BodyParser from 'body-parser';
import Passport from 'passport';
import { Strategy } from 'passport-facebook';
import * as UserCtrl from './controllers/user.controller';
import webpackDevHelper from './index.dev.js';

Mongoose.Promise = require('bluebird');

const facebookAuth = {};
if (process.env.NODE_ENV !== "production") {
  var configAuth = require('./config/auth');
  facebookAuth.clientID = configAuth.facebookAuth.clientID;
  facebookAuth.clientSecret = configAuth.facebookAuth.clientSecret;
  facebookAuth.callbackURL = configAuth.facebookAuth.callbackURL;
}

const app = new Express();
const server = new Server(app);
const MONGODB_URI = process.env.database || 'mongodb://localhost/nightlifecoord';
const db = Mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
  console.log("Successfully connected to mongodb!")
})

Mongoose.connect(MONGODB_URI);

Passport.use(new Strategy({
    clientID: process.env.clientID || facebookAuth.clientID,
    clientSecret: process.env.clientSecret || facebookAuth.clientSecret,
    callbackURL: process.env.callbackURL || facebookAuth.callbackURL,
    profileFields: ["emails", "displayName"]
  },
  UserCtrl.facebookCallback
));

Passport.serializeUser(UserCtrl.serialize);
Passport.deserializeUser(UserCtrl.deserialize);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

if (process.env.NODE_ENV !== 'production') {
  console.log('DEVOLOPMENT ENVIRONMENT: Turning on WebPack Middleware...');
  webpackDevHelper.useWebpackMiddleware(app);
} else {
  app.use(Express.static(path.join(__dirname, 'static')));
}

app.use(BodyParser.json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(Passport.initialize());
app.use(Passport.session());
app.use('/api', apiRoutes);

app.get('*', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {

      if (err) {
        return res.status(500).send(err.message);
      }

      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      let markup;
      if (renderProps) {
        markup = renderToString(<RouterContext {...renderProps}/>);
      } else {
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

      return res.render('index', { markup });
    }
  );
});

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'dev';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});

module.exports = app