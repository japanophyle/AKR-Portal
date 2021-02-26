const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  pool.query('SELECT * FROM user WHERE id = ?',
      [id],
      (error, results, fields) => {
        if (error) {
          console.log('Error with query during deserializing user ', error);
          // done takes an error (we have one) and a user (null in this case)
          // this will result in the server returning a 500 status code
          done(error, null);
        } else {
          const user = results && results[0];
          if (user) {
            // user found
            // remove password so it doesn't get sent
            delete user.password; 
            // done takes an error (null in this case) and a user
            done(null, user);
          } else {
            // user not found
            // done takes an error (null in this case) and a user (also null in this case)
            // this will result in the server returning a 401 status code
            done(null, null);
          }
        }
      }
  );
});

// Does actual work of logging in
passport.use(
  'local',
  new LocalStrategy((username, password, done) => {
    // TODO - Add user_info dojo id from user_info via join
    //   This will simplify auth checks across API requests
    pool.query('SELECT * FROM user WHERE username = ?', 
        [username],
        (error, results, fields) => {
          if (error){
            console.log('Error with query for user ', error);
            // done takes an error (we have one) and a user (null in this case)
            // this will result in the server returning a 500 status code
            done(error, null);
          } else {
            const user = results && results[0];
            if (user && encryptLib.comparePassword(password, user.password)) {
              // All good! Passwords match!
              // done takes an error (null in this case) and a user
              done(null, user);
            } else {
              // Not good! Username and password do not match.
              // done takes an error (null in this case) and a user (also null in this case)
              // this will result in the server returning a 401 status code
              done(null, null);
            }
          }
        }
    );
  })
);

module.exports = passport;
