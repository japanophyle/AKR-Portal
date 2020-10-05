const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {

    queryText = `
    SELECT "user".username FROM "user"
    WHERE "user".id = $1
    `;
    pool
        .query(queryText, [req.user.id])
        .then( response => {
            console.log('/api/profile get response:', response.rows);
            res.sendStatus(200)
        })
        .catch( error => {
            console.log('error in /api/profile get:', error);
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
