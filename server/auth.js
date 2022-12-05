const passport = require('passport');
const Localtrategy = require('passport-local');
const crypto = require('crypto');
const db = require('./db.js');

passport.use(new Localtrategy(function verify(username, password, cb) {
  db.get('select * from users where username = ?', [username], function(err, user) {
    if (err) return cb(err);

    if (!user) {
      return cb(null, false, { message: 'Incorrect username or password.' });
    }

    crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) return cb(err);

      if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }

      return cb(null, user);
    })
  })
}))