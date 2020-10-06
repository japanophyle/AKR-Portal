const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GETs all ranks, and dates for ranks for logged in user
router.get('/', (req, res) => {
    let queryText = `SELECT * from "ranks" where "user_id" = $1;`;
    pool.query(queryText, [req.user.id]).then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error getting ranks', error);
        res.sendStatus(500);
    });
})

// POSTs new rank to rank table and PUTs the new userdata rank info
router.post('/', async (req, res) => {
    console.log('Adding new rank:', req.body);
    const client = await pool.connect();
    try {
        const firstQuery = `INSERT INTO "ranks" ("rank_name", "date_rank_made", "user_id")
                            VALUES ($1, $2, $3);`;
        const secondQuery = `UPDATE "user_data"
                            SET "student_rank" = $1, "date_student_rank" = $2
                            WHERE "user_id" = $3;`;
        await client.query('BEGIN');
        await client.query(firstQuery, [req.body.rank_name, req.body.date_rank_made, req.user.id])
        await client.query(secondQuery, [req.body.rank_name, req.body.date_rank_made, req.user.id])
        await client.query('COMMIT');
        res.sendStatus(201)
    }  catch (error) {
        console.log(error);
        await client.query('ROLLBACK')
        res.sendStatus(500)
      } finally {
        await client.release();
      }
});

// DELETE a rank from ranks history table
router.delete('/:id', (req, res) => {
    console.log('In Delete:', req.params.id);
    let queryText = `
        DELETE FROM "ranks"
        WHERE "id" = $1 AND "user_id" = $2;
        `
    pool.query(queryText, [req.params.id, req.user.id])
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
