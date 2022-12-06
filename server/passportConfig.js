const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;
const db = require('./db.js');

module.exports = function(passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      db.query('select * from users where username = ?', [username], (err, user) => {
        console.log('user: ', user)
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user[0].password, (err, result) => {
          if (err) throw err;
          if (result) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
      })
    })
  )

  passport.serializeUser((user, cb) => {
    console.log('user in serializeUser: ', user)
    cb(null, user[0].id);
  });

  passport.deserializeUser((id, cb) => {
    db.query('select id from users where id = ?', [id], (err, result) => {
      cb(err, result);
    })
  })
}