const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { query } = require('../modules/pool');
const pool = require('../modules/pool');
const router = express.Router();

// GET ALL ACTIVE MEMBERS
router.get('/active', rejectUnauthenticated, (req, res) => {
    const queryText = `
    SELECT "user_data".*, "user".id, "user".username, "user".auth_level FROM "user"
    JOIN "user_data" ON "user".id = "user_data".user_id
    WHERE "user_data".is_current_member = TRUE
    AND "user".auth_level > 0;
    `;
    pool
        .query(queryText)
        .then((response) => {
          const result = response.rows;
          console.log('active member response from db:', result);
          res.send(result)
        }
        )
        .catch(error => {
          console.log('error in /api/members/active get:', error);
          res.sendStatus(500);
        })
});

// GET ALL INACTIVE MEMBERS
router.get('/active', rejectUnauthenticated, (req, res) => {
    const queryText = `
    SELECT "user_data".*, "user".id, "user".username, "user".auth_level FROM "user"
    JOIN "user_data" ON "user".id = "user_data".user_id
    WHERE "user_data".is_current_member = FALSE
    OR "user".auth_level = 0;
    `;
    pool
        .query(queryText)
        .then((response) => {
          const result = response.rows;
          console.log('inactive member response from db:', result);
          res.send(result)
        }
        )
        .catch(error => {
          console.log('error in /api/members/active get:', error);
          res.sendStatus(500);
        })
  });

// GET *ONLY* NAMES AND RANKS (FOR MY DOJO)
router.get('/mydojo', async (req, res) => {
  // console.log('in myDojo route')
  // console.log(req.user.id);
  const client = await pool.connect();
  try {
    const firstQuery = `
    SELECT "user_data".dojo_id FROM "user_data"
    WHERE "user_data".user_id = $1 LIMIT 1;
    `;
    const secondQuery = `
    SELECT "user_data".fname, "user_data".lname,
    "user_data".fname_japanese, "user_data".lname_japanese, 
    "user_data".student_rank, "user_data".teaching_rank 
    FROM "user_data"
    WHERE "user_data".dojo_id = $1;
    `;
    await client.query('BEGIN');
    // await client.query(firstQuery, [req.user.id]);
    userDojoId = await client.query(firstQuery, [req.user.id]);
    userDojoId = userDojoId.rows[0].dojo_id;
    // console.log('we got the userDojoId',userDojoId);
    response = await client.query(secondQuery, [userDojoId]);
    await client.query('COMMIT');
    // set our response deals to send back
    res.send(response.rows)
    // res.sendStatus(200);
  } catch (error) {
    console.log('error in mydojo get',error);
    await client.query('ROLLBACK');
    res.sendStatus(500);
  } finally {
    await client.release();
  }
})

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
