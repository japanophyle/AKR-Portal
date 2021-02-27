const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

router.put('/', rejectUnauthenticated, async (req, res) => {
  // OK to transfer self, otherwise must be at least dojo admin (level > 10)
  if (req.user.id === req.body.user_id || req.user.auth_level >= 10) { 

    // Need a single connection for the transaction
    pool.getConnection( (error, connection) => {
      if (error) {
        console.log('ERROR - dojo transfer:', error)
        res.sendStatus(500);
        return;
      }
      try {
        connection.beginTransaction( (err) => {
            if (error) throw error; 
            const firstQuery = `UPDATE user_data SET dojo_id = ? WHERE user_id = ?;`;
            connection.query(firstQuery, [req.body.dojo_id, req.body.user_id],  
                (error, results, fields) => {
                  if (error) throw error;
                  const secondQuery = `UPDATE user SET auth_level = 0 WHERE id = ?;`;
                  connection.query(secondQuery, [req.body.user_id],
                      (error, results, fields) => {
                        if (error) throw error;      
                        connection.commit((err) => {
                            if (error) throw error;
                            res.sendStatus(200);
                          }
                        );
                      }
                  );
                }
            );
        });  
      } catch (error) {
        console.log('ERROR - transfer dojo:', error);
        connection.rollback();
        res.sendStatus(500);
      } finally {
        connection.release();
      }
    });   
  } else {
    console.log(`WARN - Rejected dojo transfer for user ${req.body.user_id} by ${req.user.username}`)
    res.sendStatus(403)
  }
});

module.exports = router;
