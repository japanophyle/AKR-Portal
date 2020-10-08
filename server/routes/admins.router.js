const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GETs all admins
router.get('/', (req, res) => {
    let queryText = `SELECT "user_data".fname, "user_data".lname, "user".id from "user"
                    JOIN "user_data" ON "user".id = "user_data".user_id
                    WHERE "user".auth_level >= 10;`;
    pool.query(queryText).then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error getting admins', error);
        res.sendStatus(500);
    });
})

module.exports = router;

