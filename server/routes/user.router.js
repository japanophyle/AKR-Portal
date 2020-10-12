const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// NEW CODE ========

// NEW USER POST
router.post('/profile', rejectUnauthenticated, async (req, res) => {
    const query = `
    INSERT INTO "user_data" (
      "fname", 
      "lname", 
      "user_id", 
      "email", 
      "phone_number", 
      "dojo_id", 
      "fname_japanese", 
      "lname_japanese", 
      "student_rank", 
      "date_student_rank",
      "teaching_rank",
      "date_teaching_rank",
      "ikyf",
      "age",
      "years_practice",
      "address_1",
      "address_2",
      "city",
      "state",
      "country",
      "zipcode",
      "gender",
      "date_of_birth",
      "date_began_kyudo",
      "citizenship",
      "usa_archery_id",
      "is_current_member"
      )
    VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
      $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
      $21, $22, $23, $24, $25, $26, $27
    );
    `;
    pool
      .query(query, [
        req.body.fname, // $1
        req.body.lname, // $2
        // not using this, since it'll be the logged in user:
        // req.body.user_id,
        // using this instead:
        req.user.id, // $3
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
      ])
      .then(
        () => {
          res.sendStatus(201)
        }
      )
      .catch(
        error => {
          console.log('error in /api/user/profile post:', error);
          res.sendStatus(500);
        }
      )
});


// USER_DATA GET
// This Route serves to either get the current-user's user_data
// (in the case that :id is 'user')
// Or to get a specific member's,
// selected by admin in the member list and sent as an integer
// in :id
router.get('/profile/:id', rejectUnauthenticated, async (req, res) => {
  let userToGet = req.params.id;
  console.log(req.params.id)
  const client = await pool.connect();
  const queryText = `
    SELECT
    "user".username,
    "user_data".*,
    "dojo".region_name,
    "dojo".dojo_name
    FROM "user"
    JOIN "user_data" ON "user".id = "user_data".user_id
    JOIN "dojo" ON "user_data".dojo_id = "dojo".id
    WHERE "user".id = $1
    `;
  // If the user is just getting their own info
  if (userToGet === 'user' || Number(userToGet) === req.user.id) {
    console.log('userToGet = ', userToGet);
    userToGet = req.user.id
    // just do the regular thing
      pool
      .query(queryText, [userToGet])
        .then(response => {
          console.log('/api/user/profile get response:', response.rows[0]);
          // GET routes don't send res.sendStatuses
          res.send(response.rows[0])
          client.release();
        })
        .catch(error => {
          console.log('error in /api/user/profile get:', error);
          res.sendStatus(500);
          client.release();
        })
  // else if the user is getting another user's info...
  } else if (Number.isInteger( Number(userToGet) )) {
    userToGet = Number(userToGet);
    // console.log(`${userToGet} times 2 is ${userToGet + userToGet}`);
    // get their auth level from DB first
    // if it's high enough, then proceed to get
    // the desired user's data,
    // if not, then kick them out... (how?)
    let userData = [];
    try {
      const firstQuery = `
        SELECT "user".auth_level FROM "user"
        WHERE "user".id = $1;
      `;
      const secondQuery = `
      `;
      await client.query('BEGIN');
      let authLevel = await client.query(firstQuery, [req.user.id]);
      authLevel = authLevel.rows[0].auth_level;
      if (authLevel === 10 || authLevel === 15 || authLevel === 20) {
        userData = await client.query(queryText, [userToGet])
      } else {
        console.log('unauthorized');
        await client.query('ROLLBACK')
        res.sendStatus(200);
      }
      await client.query('COMMIT');
      res.send(userData.rows[0])
    } catch (error) {
      console.log('error getting member\'s data', error)
      await client.query('ROLLBACK')
      res.sendStatus(500)
    } finally {
      await client.release();
    }
  } else {
    console.log('invalid req.param value');
    userToGet = NaN;
    client.release();
  }
});

// END NEW-CODE ====

router.put('/edit', rejectUnauthenticated, (req, res) => {

  let who
  if (req.user.auth_level <= 5) {
    who = req.user.id
  } else {
    who = req.body.id
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
      WHERE "id" = $3;`;      
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
    console.log('/api/user/edit PUT');
    res.sendStatus(200)
  })
  .catch(error => {
    console.log('error in /api/user/edit PUT:', error);
    res.sendStatus(500);
  })
})


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

  const queryText = `INSERT INTO "user" (username, password, auth_level)
    VALUES ($1, $2, 0) RETURNING id`;
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
