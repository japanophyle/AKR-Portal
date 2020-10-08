const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */

// GET ALL ACTIVE MEMBERS
router.get('/active', (req, res) => {
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
          console.log('response from db:', result);
          res.send(result)
        }
        )
        .catch(error => {
          console.log('error in /api/members/active get:', error);
          res.sendStatus(500);
        })
});

// GET ALL INACTIVE MEMBERS
router.get('/inactive', (req, res) => {
    const queryText = `
    SELECT "user_data".*, "user".id, "user".username, "user".auth_level FROM "user"
    JOIN "user_data" ON "user".id = "user_data".user_id
    WHERE "user_data".is_current_member = FALSE OR "user".auth_level = 0;
    `;
    
    pool
        .query(queryText)
        .then((response) => {
          const result = response.rows;
          console.log('response from db:', result);
          res.send(result)
        }
        )
        .catch(error => {
          console.log('error in /api/members/active get:', error);
          res.sendStatus(500);
        })
  });

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
