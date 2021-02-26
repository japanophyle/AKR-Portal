const express = require('express');
const momentjs = require('moment');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');


const router = express.Router();

// Handles POST for initial creation of the logged in user's profile
router.post('/profile', rejectUnauthenticated, async (req, res) => {
  console.log('Add profile:', req.body);

  // Get & format dates up front as pool.escape will not handle all date formats
  let dateOfBirth = momentjs(req.body.date_of_birth);
  if ( !dateOfBirth.isValid() ){
    // Date invalid and this is a required field so fail
    res.sendStatus(500);
    return;
  }

  // Escape query values up front so we can make sure things are matched
  // correctly and ensure any `?` characters in notes or other fields are not
  // treated as query parameters later on. 
  const fieldsToUpdate = { 
    user_id: pool.escape(req.body.user_id),
    fname: pool.escape(req.body.fname),
    lname: pool.escape(req.body.lname),
    phone_number: pool.escape(req.body.phone_number),
    address_1: pool.escape(req.body.address_1),  
    city: pool.escape(req.body.city),
    state: pool.escape(req.body.state),
    country: pool.escape(req.body.country),
    zipcode: pool.escape(req.body.zipcode),
    date_of_birth: dateOfBirth.toDate()
  }

  // Optional fields
  if (req.body.email) {
    fieldsToUpdate.email = pool.escape( req.body.email );
  } 
  if (req.body.address_2) {
    fieldsToUpdate.address_2 = pool.escape( req.body.address_2 );
  } 
  if (req.body.dojo_id) {
    fieldsToUpdate.dojo_id = pool.escape( req.body.dojo_id );
  }
  if (req.body.fname_japanese) {
    fieldsToUpdate.fname_japanese = pool.escape( req.body.fname_japanese );
  }  
  if (req.body.lname_japanese) {
    fieldsToUpdate.lname_japanese = pool.escape( req.body.lname_japanese );
  }  
  if (req.body.student_rank) {
    fieldsToUpdate.student_rank = pool.escape( req.body.student_rank );
  }  
  if (req.body.date_student_rank) {    
    const date = momentjs(req.body.date_student_rank);
    if ( date.isValid() ) {
      fieldsToUpdate.date_student_rank = date.toDate();
    } else {
      console.log(`WARN - invalid date (student rank) for profile update ${date}, will not set in profile`)
    }
  }  
  if (req.body.teaching_rank) {
    fieldsToUpdate.teaching_rank = pool.escape( req.body.teaching_rank );
  }  
  if (req.body.date_teaching_rank) {
    const date = momentjs(req.body.date_teaching_rank);
    if ( date.isValid() ) {
      fieldsToUpdate.date_teaching_rank = date.toDate();
    } else {
      console.log(`WARN - invalid date (teaching rank) for profile update ${date}, will not set in profile`)
    }
  }  
  if (req.body.ikyf) {
    fieldsToUpdate.ikyf = pool.escape( req.body.ikyf );
  }  
  // TODO - Why store age? Will become out of date & can be determined from birthdate
  if (req.body.age) {
    fieldsToUpdate.age = pool.escape( req.body.age );
  }  
  // TODO - Why store years_practice? Calculate? or does it assume breaks might occur?
  if (req.body.years_practice) {
    fieldsToUpdate.years_practice = pool.escape( req.body.years_practice );
  } 
  if (req.body.gender) {
    fieldsToUpdate.gender = pool.escape( req.body.gender );
  }  
  if (req.body.date_began_kyudo) {
    const date = momentjs(req.body.date_began_kyudo);
    if ( date.isValid() ) {
      fieldsToUpdate.date_began_kyudo = date.toDate();
    } else {
      console.log(`WARN - invalid date (began kyudo) for profile update ${date}, will not set in profile`)
    }
  }  
  if (req.body.citizenship) {
    fieldsToUpdate.citizenship = pool.escape( req.body.citizenship );
  }  
  if (req.body.usa_archery_id) {
    fieldsToUpdate.usa_archery_id = pool.escape( req.body.usa_archery_id );
  }  
  if (req.body.is_current_member) {
    fieldsToUpdate.is_current_member = pool.escape( req.body.is_current_member );
  } 

  const query = `INSERT INTO user_data SET ?;`;
  pool.query(query, fieldsToUpdate,
      (error, result, fields) => {
        if (error){
          console.log('ERROR - create user profile:', error);
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

// Update user profile information
//   All users can update their own information
//   Logged in user must have auth_level > 5 to update other users
// TODO - change 'edit' to 'profile' for consistency 
// TODO - Client should only send changed fields (not all)
router.put('/edit', rejectUnauthenticated, (req, res) => {

  // TODO - send user id as param to follow API best practices
  let profileId;
  if (req.user.auth_level <= 5) {
    profileId = req.user.id
  } else {
    profileId = req.body.user_id
  }

  // Escape query values up front so we can make sure things are matched
  // correctly and ensure any `?` characters in notes or other fields are not
  // treated as query parameters later on. 
  const fieldsToUpdate = {};
  if (req.body.fname) {
    fieldsToUpdate.fname = pool.escape( req.body.fname );
  }
  if (req.body.lname) {
    fieldsToUpdate.lname = pool.escape( req.body.lname );
  }
  if (req.body.email) {
    fieldsToUpdate.email = pool.escape( req.body.email );
  }
  if (req.body.phone_number) {
    fieldsToUpdate.phone_number = pool.escape( req.body.phone_number );
  }
  if (req.body.dojo_id) {
    fieldsToUpdate.dojo_id = pool.escape( req.body.dojo_id );
  }
  if (req.body.fname_japanese) {
    fieldsToUpdate.fname_japanese = pool.escape( req.body.fname_japanese );
  }  
  if (req.body.lname_japanese) {
    fieldsToUpdate.lname_japanese = pool.escape( req.body.lname_japanese );
  }  
  if (req.body.student_rank) {
    fieldsToUpdate.student_rank = pool.escape( req.body.student_rank );
  }  
  if (req.body.date_student_rank) {
    const date = momentjs(req.body.date_student_rank);
    if ( date.isValid() ) {
      fieldsToUpdate.date_student_rank = date.toDate();
    } else {
      console.log(`WARN - invalid date (student rank) for profile update ${date}, will not set in profile`)
    }
  }  
  if (req.body.teaching_rank) {
    fieldsToUpdate.teaching_rank = pool.escape( req.body.teaching_rank );
  }  
  if (req.body.date_teaching_rank) {
    const date = momentjs(req.body.date_teaching_rank);
    if ( date.isValid() ) {
      fieldsToUpdate.date_teaching_rank = date.toDate();
    } else {
      console.log(`WARN - invalid date (teaching rank) for profile update ${date}, will not set in profile`)
    }
  }  
  if (req.body.ikyf) {
    fieldsToUpdate.ikyf = pool.escape( req.body.ikyf );
  }  
  // TODO - Why store age? Will become out of date & can be determined from birthdate
  if (req.body.age) {
    fieldsToUpdate.age = pool.escape( req.body.age );
  }  
  // TODO - Is years practice similar? or does it assume breaks might occur?
  if (req.body.years_practice) {
    fieldsToUpdate.years_practice = pool.escape( req.body.years_practice );
  } 
  if (req.body.address_1) {
    fieldsToUpdate.address_1 = pool.escape( req.body.address_1 );
  }  
  if (req.body.address_2) {
    fieldsToUpdate.address_2 = pool.escape( req.body.address_2 );
  }  
  if (req.body.city) {
    fieldsToUpdate.city = pool.escape( req.body.city );
  }  
  if (req.body.state) {
    fieldsToUpdate.state = pool.escape( req.body.state );
  }  
  if (req.body.country) {
    fieldsToUpdate.country = pool.escape( req.body.country );
  }  
  if (req.body.zipcode) {
    fieldsToUpdate.zipcode = pool.escape( req.body.zipcode );
  }  
  if (req.body.gender) {
    fieldsToUpdate.gender = pool.escape( req.body.gender );
  }  
  if (req.body.date_of_birth) {
    const date = momentjs(req.body.date_of_birth);
    if ( date.isValid() ) {
      fieldsToUpdate.date_of_birth = date.toDate();
    } else {
      console.log(`WARN - invalid date (birthdate) for profile update ${date}, will not set in profile`)
    }
    }  
  if (req.body.date_began_kyudo) {
    const date = momentjs(req.body.date_began_kyudo);
    if ( date.isValid() ) {
      fieldsToUpdate.date_began_kyudo = date.toDate();
    } else {
      console.log(`WARN - invalid date (began kyudo) for profile update ${date}, will not set in profile`)
    }
    }  
  if (req.body.citizenship) {
    fieldsToUpdate.citizenship = pool.escape( req.body.citizenship );
  }  
  if (req.body.usa_archery_id) {
    fieldsToUpdate.usa_archery_id = pool.escape( req.body.usa_archery_id );
  }  
  if (req.body.is_current_member) {
    fieldsToUpdate.is_current_member = pool.escape( req.body.is_current_member );
  } 
  if (req.body.dues_amount) {
    fieldsToUpdate.dues_amount = pool.escape( req.body.dues_amount );
  }  
  if (req.body.amount_paid) {
    fieldsToUpdate.amount_paid = pool.escape( req.body.amount_paid );
  }  
  if (req.body.dues_date) {
    fieldsToUpdate.dues_date = pool.escape( req.body.dues_date );
  }  
  if (req.body.dues_method) {
    fieldsToUpdate.dues_method = pool.escape( req.body.dues_method );
  }  
  if (req.body.notes) {
    fieldsToUpdate.notes = pool.escape( req.body.notes );
  }  
  if (req.body.equipment_checkout) {
    fieldsToUpdate.equipment_checkout = pool.escape( req.body.equipment_checkout );
  } 
  
  // ? plugs in object created above with user data escaped 
  // `pool.escape` is IMPORTANT to prevent sql injection attacks  
  const queryText = `UPDATE user_data SET ? WHERE user_id = ?;`;
  pool.query(queryText, 
      [fieldsToUpdate, profileId],
      (error, result, fields) => {
        if (error){
          console.log('ERROR - update user profile:', error);
          res.sendStatus(500);
        } else {
          res.sendStatus(200)
        }
      }
  );
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
