import passport from 'passport';
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from 'bcrypt'
import Repository from '../repositories/repository.js';

passport.use(new LocalStrategy(function(username, password, done) {
  const user = new Repository().findUser(username);
  if (!user) {
    return done(null, false);
  }

  bcrypt.compare(password, user.passwordHash, (err, isValid) => {
    if (err) return done(err);
    if (!isValid) return done(null, false);
    return done(null, user);
  })
}))

