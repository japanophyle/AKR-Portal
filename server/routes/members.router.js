const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


// Update to promote a member 
//   Logged in user must be at least a dojo admin (auth_level 10) 
//   Cannot promote user to a auth_level higher than self
router.put('/promote', rejectUnauthenticated, (req, res) => {

  const queryText = `UPDATE user SET auth_level = ? WHERE user.id = ?;`;

  if (req.user.auth_level >= 10 && req.user.auth_level >= req.body.value) {
    pool.query(queryText, [req.body.value, req.body.id],
      (error, result, fields) => {
        if (error) {
            console.log('ERROR - promote user:', error);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
      }
    );
  } else {
    console.log(`WARN - Rejected unauthorized attempt to promote user ${req.body.id} 
        to level ${req.body.value} by ${req.user.username}`);
    res.sendStatus(403);
  }
});

// Update to activate a member
//   Logged in user must be at least a dojo admin (auth_level 10)
//   Member auth_level is set to 5 to activate
router.put('/activate', rejectUnauthenticated, (req, res) => {

  // TODO - send user id as param to follow API best practices
  const memberId = req.body.id

  if (req.user.auth_level >= 10) {
    const queryText = `UPDATE user SET auth_level = 5 WHERE user.id = ?;`
    pool.query(queryText, [memberId],
      (error, result, fields) => {
        if (error) {
            console.log('ERROR - activate user:', error);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
      }
    );
  } else {
    // Unauthorized
    console.log(`WARN - Rejected unauthorized attempt to activate user ${memberId} by ${req.user.username}`)
    res.sendStatus(403);
  }
});

// Update to inactivate a member
//   Logged in user must be at least a dojo admin (auth_level 10)
//   Member auth_level is set to 5 to activate
// TODO - ISSUE - This potentially allows a dojo admin to remove access 
//   for a site/national admin by setting their auth_level to 0
router.put('/deactivate', rejectUnauthenticated, (req, res) => {

  // TODO - send user id as param to follow API best practices
  const memberId = req.body.id

  if (req.user.auth_level >= 10) {
    const queryText = `UPDATE user SET auth_level = 0 WHERE user.id = ?;`
    pool.query(queryText, [memberId],
      (error, result, fields) => {
        if (error) {
            console.log('ERROR - activate user:', error);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
      }
    );
  } else {
    // Unauthorized
    console.log(`WARN - Rejected unauthorized attempt to inactivate user ${memberId} by ${req.user.username}`);
    res.sendStatus(403);
  }
});

// Get all active members by dojo id
//   Access is restricted to dojo administration or site/national admin
// TODO - combine with inactive route to DRY the code, add query string for status
// TODO - consider move to dojo router for API best practice
router.get('/active/:id', rejectUnauthenticated, async (req, res) => {

  if (req.user.auth_level === 10) {
    // Get logged in user's dojo to make sure it matches what they are asking for
    const dojoAdminQueryText = `SELECT user_data.dojo_id FROM user_data
        WHERE user_data.user_id = ? LIMIT 1;`

    pool.query(dojoAdminQueryText, [req.user.id], 
        (error, result, fields) => {
        if (error) {
          console.log('Error - Get active members auth_lvl 10 access:', error);
          res.sendStatus(500);
        } else {
          // If the request is for the admin's dojo, select the active members
          const adminDojoId = result[0].dojo_id;
          if (adminDojoId === Number(req.params.id)) {
            const queryText = `
                SELECT user_data.*, user.id, user.username, user.auth_level, dojo.dojo_name 
                FROM user
                JOIN user_data ON user.id = user_data.user_id
                JOIN dojo ON user_data.dojo_id = dojo.id
                WHERE user.auth_level > 0 AND user_data.dojo_id = ?;`;
            pool.query(queryText, [req.params.id], 
                (error, result, fields) => {
                  if (error) {
                    console.log('Error - Get active members auth_lvl 10 access:', error);
                    res.sendStatus(500);
                  } else {
                    // Use this to select the active members
                    res.send(result);
                  }
                }
            );
          } else {
            console.log(`WARN: Rejected get active members request from ${req.user.username} for dojo_id=${req.params.id}`)
            res.sendStatus(403);
          }
        }
      }
    );  
  } else if (req.user.auth_level >= 20) {
    // Site/National admin can access all data
    const siteAdminQueryText = `
        SELECT user_data.*, user.id, user.username, user.auth_level, dojo.dojo_name FROM user
        JOIN user_data ON user.id = user_data.user_id
        JOIN dojo ON user_data.dojo_id = dojo.id
        WHERE user.auth_level > 0 AND user_data.dojo_id = ?;
        `
    pool.query(siteAdminQueryText, 
        [req.params.id],
        (error, result, fields) => {
          if (error) {
            console.log('Error - Get active members auth_lvl 20+ access:', error);
            res.sendStatus(500);
          } else {
            res.send(result);
          }
        }
    );
  } else {
    console.log(`WARN - Rejected get active members request from ${req.user.username} for dojo_id=${req.params.id}`)
    res.sendStatus(403);
  }
});

// Get all inactive members by dojo id
//   Access is restricted to dojo administration or site/national admin
// TODO - combine with active route to DRY the code, add query string for status
// TODO - consider move to dojo router for API best practice
router.get('/inactive/:id', rejectUnauthenticated, async (req, res) => {

  if (req.user.auth_level === 10) {
    // Get logged in user's dojo to make sure it matches what they are asking for
    const dojoAdminQueryText = `SELECT user_data.dojo_id FROM user_data
        WHERE user_data.user_id = ? LIMIT 1;`

    pool.query(dojoAdminQueryText, [req.user.id], 
        (error, result, fields) => {
        if (error) {
          console.log('ERROR - Get inactive members auth_lvl 10 access:', error);
          res.sendStatus(500);
        } else {
          // If the request is for the admin's dojo, select the active members
          const adminDojoId = result[0].dojo_id;
          if (adminDojoId === Number(req.params.id)) {
            const queryText = `
                SELECT user_data.*, user.id, user.username, user.auth_level, dojo.dojo_name 
                FROM user
                JOIN user_data ON user.id = user_data.user_id
                JOIN dojo ON user_data.dojo_id = dojo.id
                WHERE user.auth_level = 0 AND user_data.dojo_id = ?;`;
            pool.query(queryText, [req.params.id], 
                (error, result, fields) => {
                  if (error) {
                    console.log('Error - Get inactive members auth_lvl 10 access:', error);
                    res.sendStatus(500);
                  } else {
                    // Use this to select the active members
                    res.send(result);
                  }
                }
            );
          } else {
            console.log(`WARN - Rejected get inactive members request from ${req.user.username} for invalid dojo_id=${req.params.id}`)
            res.sendStatus(403);
          }
        }
      }
    );  
  } else if (req.user.auth_level >= 20) {
    // Site/National admin can access all data
    const siteAdminQueryText = `
        SELECT user_data.*, user.id, user.username, user.auth_level, dojo.dojo_name FROM user
        JOIN user_data ON user.id = user_data.user_id
        JOIN dojo ON user_data.dojo_id = dojo.id
        WHERE user.auth_level = 0 AND user_data.dojo_id = ?;`;

    pool.query(siteAdminQueryText, 
        [req.params.id],
        (error, result, fields) => {
          if (error) {
            console.log('ERROR - Get inactive members auth_lvl 20+ access:', error);
            res.sendStatus(500);
          } else {
            res.send(result);
          }
        }
    );
  } else {
    console.log(`WARN - Rejected get inactive members request from ${req.user.username} for invalid dojo_id=${req.params.id}`)
    res.sendStatus(403);
  }
});

// Gets a list of *ONLY* the names and ranks for the user's dojo
//   Logged in user must be an active member of a dojo (auth_level >= 5)
router.get('/mydojo', rejectUnauthenticated, async (req, res) => {
 
  if (req.user.auth_level >= 5) {
    // Get logged in user's dojo 
    const sqlText = `SELECT user_data.dojo_id FROM user_data
        WHERE user_data.user_id = ? LIMIT 1;`

    pool.query(sqlText, 
        [req.user.id], 
        (error, result, fields) => {
          // Get user's dojo id
          const dojoId = result[0].dojo_id;
          if (error) {
            console.log('Error - GET active members auth_lvl 10 access:', error);
            res.sendStatus(500);
          } else {
            // Get member info
            const queryText = `SELECT user_data.fname, user_data.lname,
                  user_data.fname_japanese, user_data.lname_japanese, 
                  user_data.student_rank, user_data.teaching_rank FROM user_data
                  WHERE user_data.dojo_id = ? ORDER BY user_data.fname ASC;`
            pool.query(queryText, [dojoId], 
                (error, result, fields) => {
                  if (error) {
                    console.log('Error - get my dojo members:', error);
                    res.sendStatus(500);
                  } else {
                    // Use this to select the active members
                    res.send(result);
                  }
                }
            );
          }
        }
    );  
  } else {
    console.log(`WARN - Rejected get dojo members request from ${req.user.username}. User is not active with a dojo.`)
    res.sendStatus(403)
  }
})

// TODO - Update for MySQL (not used?)
// router.get(`/search/:term`, rejectUnauthenticated, (req, res) => {

//   if (req.user.auth_level >= 5) {
//   queryText = `
//   SELECT "user_data".*, "user".* FROM "user_data" 
//   JOIN "user" ON "user_data".user_id = "user".id
//   WHERE "user_data".fname ILIKE '%' || $1 || '%';
//   `;
//   // LIMIT ?
//   pool
//     .query(queryText, [req.params.term])
//     .then( (result) => {
//       res.send(result.rows);
//     })
//     .catch(
//       (error) => {
//         console.log('Error in search', error);
//         res.sendStatus(500);
//       })
//   } else {
//     res.sendStatus(403)
//   }
// })

// Deletes all data associated with a user 
router.delete('/:id', rejectUnauthenticated, (req, res) => {

  // TODO - ISSUE - should at least be a dojo adim? level >= 10?
  //   IF can delete self, should also do logout
  if (req.user.auth_level >= 5) {
    const queryText = `DELETE FROM user WHERE id = ?;`;
    pool.query(queryText, [req.params.id],
      (error, result, fields) => {
          if (error) {
            console.log('Error - Delete user:', error);
            res.sendStatus(500);
          } else {
            res.sendStatus(200);
          }
        }
    );
  } else {
    console.log(`WARN - rejected DELETE user request from ${req.user.username}`)
    res.sendStatus(403)
  }
});

module.exports = router;
