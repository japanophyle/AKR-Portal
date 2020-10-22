const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

router.put('/', rejectUnauthenticated, async (req, res) => {
   
    const firstQuery = `UPDATE "user_data"
    SET "dojo_id" = $1
    WHERE "user_id"= $2;`;

    const secondQuery = `
     UPDATE "user"
    SET "auth_level" = 0
    WHERE "id"= $1;`

    if (req.user.auth_level >= 10) {
        const client = await pool.connect();
        try {
          await client.query('BEGIN');

          //first query to get the admin dojo_id if they are auth_level 10
          await client.query(firstQuery, [req.body.dojo_id, req.body.user_id])
    
          await client.query(secondQuery, [req.body.user_id]);
    
          await client.query('COMMIT');
    
          res.sendStatus(200)
    
        } catch (error) {
          console.log(error);
          await client.query('ROLLBACK');
          res.sendStatus(500);
    
        } finally {
          await client.release();
        }
    } else if (req.user.auth_level <= 5 && req.user.id === req.body.user_id) {
        const client = await pool.connect();
        try {
          await client.query('BEGIN');
    
          //first query to get the admin dojo_id if they are auth_level 10
          await client.query(firstQuery, [req.body.dojo_id, req.body.user_id])
    
          await client.query(secondQuery, [req.body.user_id]);

          await client.query('COMMIT');
    
          res.sendStatus(200)
    
        } catch (error) {
          console.log(error);
          await client.query('ROLLBACK');
          res.sendStatus(500);
        } finally {
            await client.release();
          }
    } else {
        res.sendStatus(403)
    }
});

module.exports = router;
