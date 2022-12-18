import passport from 'passport';
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from 'bcrypt'
import Repository from '../repositories/repository.js';

class Validator {
  constructor(app) {
  }

  authenticate(user, password, done) {
    const result = new Repository().findUser(username);
    if (!result) {
      return done(null, false);
    }

    bcrypt.compare(password, result.passwordHash, (err, isValid) => {
      if (err) return done(err);
      if (!isValid) return done(null, false);
      return done(null, result);
    })
  }

  initialize(passport) {
    passport.use(new LocalStrategy(authUser))
    // passport.use(new LocalStrategy(function(username, password, done) {
    //   const user = new Repository().findUser(username);
    //   if (!user) {
    //     return done(null, false);
    //   }

    //   bcrypt.compare(password, user.passwordHash, (err, isValid) => {
    //     if (err) return done(err);
    //     if (!isValid) return done(null, false);
    //     return done(null, user);
    //   })
    // }))
  }

  serializeUser() {
    passport.serializeUser((userObj, done) => {
      done(null, userObj);
    })
  }

  deserializeUser() {
    passport.deserializeUser((userObj, done) => {
      done(null, userObj);
    })
  }

}

export default Validator;


