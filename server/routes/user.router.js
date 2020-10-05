const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// NEW CODE ========

router.get('/profile', rejectUnauthenticated, (req, res) => {
  
  queryText = `
  SELECT
  "user".username,
  "user_data".*,
  "dojo".dojo_name,
  "region".region_name
  FROM "user"
  JOIN "user_data" ON "user".id = "user_data".user_id
  JOIN "dojo" ON "user_data".dojo_id = "dojo".id
  JOIN "region" ON "dojo".region_id = "region".id
  WHERE "user".id = $1
  `;

  pool
      .query(queryText, [req.user.id])
      .then( response => {
          console.log('/api/profile/user get response:', response.rows[0]);
          res.send(response.rows[0])
          // res.sendStatus(200)
      })
      .catch( error => {
          console.log('error in /api/user/profile get:', error);
          res.sendStatus(500);
      })
});

// BOILER PLATE ====

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
