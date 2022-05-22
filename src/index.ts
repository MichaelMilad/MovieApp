import express, { Application } from 'express';
import { config } from './config/config';
import { IndexRouter } from './routes/index.router';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import * as passportLocal from 'passport-local';
import User from './models/user';

const PORT: number = config.port || 8080;

const dbUrl = 'mongodb://localhost:27017/movieApp';
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log('Database is Connected!!');
  })
  .catch((err) => {
    console.log('OH NO ,MONGO CONNECTION ERROR', err);
  });

// create an instance server
const app: Application = express();

//Using express session
app.use(
  session({
    name: 'Session',
    secret: config.session_secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      // secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

const LocalStrategy = passportLocal.Strategy;
passport.use(
  new LocalStrategy(
    {
      usernameField: 'username'
    },
    User.authenticate()
  )
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.json());
app.use('/', IndexRouter);

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`);
});

export default app;
