const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

// GETs all ranks, and dates for ranks for logged in user
router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log(req.params.id);
    
    let queryText = `SELECT * from "ranks" 
                    WHERE "user_id" = $1 
                    ORDER BY "date_rank_made" DESC;`;
    pool.query(queryText, [req.params.id]).then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error getting ranks', error);
        res.sendStatus(500);
    });
})

// POSTs new rank to rank table and PUTs the new userdata rank info
router.post('/', rejectUnauthenticated, async (req, res) => {
    console.log('Adding new rank:', req.body);
    const client = await pool.connect();
    try {
        const firstQuery = `INSERT INTO "ranks" ("rank_name", "date_rank_made", "user_id")
                            VALUES ($1, $2, $3);`;
        const secondQuery = `UPDATE "user_data"
                            SET "student_rank" = $1, "date_student_rank" = $2
                            WHERE "user_id" = $3;`;
        await client.query('BEGIN');
        await client.query(firstQuery, [req.body.student_rank, req.body.date_student_rank, req.body.user_id])
        await client.query(secondQuery, [req.body.student_rank, req.body.date_student_rank, req.body.user_id])
        await client.query('COMMIT');
        res.sendStatus(201)
    }  catch (error) {
        console.log('error in rank router post', error);
        await client.query('ROLLBACK')
        res.sendStatus(500)
      } finally {
        await client.release();
      }
});

// DELETE a rank from ranks history table
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    console.log('In Delete:', req.params.id);
    let queryText = `
        DELETE FROM "ranks"
        WHERE "id" = $1;
        `
    pool.query(queryText, [req.params.id])
        .then( (result) => {
        console.log('Delete Rank');
        res.sendStatus(200);
    })
    .catch( (error) => {
        console.log('Error in delete rank', error);
        res.sendStatus(500);
    })
});



module.exports = router;
