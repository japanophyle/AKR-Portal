const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles POST for initial creation of the logged in user's profile
// TODO - ISSUE - Why age? it will change. Unless intended as age started, 
//  should calculate for display from birthdate and current date
router.post('/profile', rejectUnauthenticated, async (req, res) => {
  const info = req.body;
  const query = `
    INSERT INTO user_data (
      fname, lname, user_id, email, phone_number, dojo_id, 
      fname_japanese, lname_japanese, student_rank, date_student_rank,
      teaching_rank, date_teaching_rank, ikyf, age, years_practice,
      address_1, address_2, city, state, country, zipcode, 
      gender,
      date_of_birth, date_began_kyudo, citizenship, usa_archery_id, is_current_member
    ) VALUES (
      ?, ?, ?, ?, ?, ?, 
      ?, ?, ?, ?,
      ?, ?, ?, ?, ?, 
      ?, ?, ?, ?, ?, ?, 
      ?, ?, ?, ?, 
      ?, ?
    );`;
  pool.query(query, 
    [
      info.fname, info.lname, req.user.id, info.email, info.phone_number, info.dojo_id, 
      info.fname_japanese, info.lname_japanese, info.student_rank, info.date_student_rank, 
      info.teaching_rank, info.date_teaching_rank, info.ikyf, info.age, info.years_practice, 
      info.address_1, info.address_2, info.city, info.state, info.country, info.zipcode, 
      info.gender, info.date_of_birth, info.date_began_kyudo, info.citizenship,
      info.usa_archery_id, info.is_current_member
    ],
    (error, results, fields) => {
      if (error){
        console.log('error in /api/user/profile post:', error);
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }
    }
  );
});

// Gets a user profile data by id
//   Only allows access to the logged in user's profile for auth level < 10
//   Auth level > 10 may access any profile by id.
router.get('/profile/:id', rejectUnauthenticated, async (req, res) => {
  console.log('Logged in user:', req.user);

  let userToGet = req.params.id;

  // TODO - this is weird... fix client to just send user id?
  if (userToGet === 'user' || Number(userToGet) === req.user.id) {
    userToGet = req.user.id
  }

  // Must be asking for their own data or at a higher auth level
  if (req.user.id == userToGet || req.user.auth_level === 10 || 
      req.user.auth_level === 15 || req.user.auth_level === 20) {
        // OK, so do query
        const queryText = `
            SELECT user.username, user_data.*, dojo.region_name, dojo.dojo_name
            FROM user
            JOIN user_data ON user.id = user_data.user_id
            JOIN dojo ON user_data.dojo_id = dojo.id
            WHERE user.id = ?`;
        pool.query(queryText, 
          [userToGet],
          (error, result, fields) => {
            if (error){
              console.log('error in /api/user/profile get:', error);
              res.sendStatus(500);
            } else {
              res.send(result[0])
            }
          }
        );
  } else {
    // Not OK, so forbidden
    res.sendStatus(403);
  } 
});

// TODO - Update for MySQL
router.put('/edit', rejectUnauthenticated, (req, res) => {

  let who
  if (req.user.auth_level <= 5) {
    who = req.user.id
  } else {
    who = req.body.user_id
  }
  
  const queryText =
    `UPDATE "user_data" 
    SET
      "fname" = $1,
      "lname" = $2,
      "email" = $4,
      "phone_number" = $5,
      "dojo_id" = $6,
      "fname_japanese" = $7 ,
      "lname_japanese" = $8,
      "student_rank" = $9,
      "date_student_rank" = $10,
      "teaching_rank" = $11,
      "date_teaching_rank" = $12,
      "ikyf" = $13,
      "age" = $14,
      "years_practice" = $15,
      "address_1" = $16,
      "address_2" = $17,
      "city" = $18,
      "state" = $19,
      "country" = $20,
      "zipcode" = $21,
      "gender" = $22,
      "date_of_birth" = $23,
      "date_began_kyudo" = $24,
      "citizenship" = $25,
      "usa_archery_id" = $26,
      "is_current_member" = $27,
      "dues_amount" = $28,
      "amount_paid" = $29,
      "dues_date"  = $30,
      "dues_method" = $31,
      "notes" = $32,
      equipment_checkout = $33
      WHERE "user_id" = $3;`;
  pool.query(queryText, [
    req.body.fname, // $1
    req.body.lname, // $2
    // not using this, since it'll be the logged in user:
    // req.body.user_id,
    // using this instead:
    who, // $3
    req.body.email, // $4
    req.body.phone_number, // $5
    // dojo_id will be sent over as an integer value from client
    req.body.dojo_id, // $6
    req.body.fname_japanese, // $7
    req.body.lname_japanese, // $8
    // student_rank will be sent over and stored as a string
    req.body.student_rank, // $9
    req.body.date_student_rank, // $10
    // likewise with teaching rank
    req.body.teaching_rank, // $11
    req.body.date_teaching_rank, // $12
    req.body.ikyf, // $13
    req.body.age, // $14
    req.body.years_practice, // $15
    req.body.address_1, // $16
    req.body.address_2, // $17
    req.body.city, // $18
    req.body.state, // $19
    req.body.country, // $20
    req.body.zipcode, // $21
    req.body.gender, // $22
    req.body.date_of_birth, // $23
    req.body.date_began_kyudo, // $24
    req.body.citizenship, // $25
    req.body.usa_archery_id, // $26
    req.body.is_current_member, // $27
    req.body.dues_amount, //$28
    req.body.amount_paid, //$29
    req.body.dues_date, // $30
    req.body.dues_method, //$31
    req.body.notes, // $32
    req.body.equipment_checkout // $33
  ])
    .then(response => {
      res.sendStatus(200)
    })
    .catch(error => {
      console.log('error in /api/user/edit PUT:', error);
      res.sendStatus(500);
    })
})

// Gets logged in user information 
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Add (register) new user  
//   Body must contain username and password (plaintext) 
//   Note: newly registered users have an auth level of zero
router.post('/register', (req, res) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const defaultAuthLevel = 0;

  const queryText = `INSERT INTO user (username, password, auth_level)
      VALUES (?, ?, ?)`;
  pool.query(queryText, 
      [username, password, defaultAuthLevel], 
      (error, results, fields) => {
        if (error) {
          console.log(error);
          res.sendStatus(500);
        } else {
          console.log('New user ID', results.insertId);
          res.sendStatus(201)
        }
      }
    )
});

// Handles user login through Passport local authentication
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// Handles user logout - clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
