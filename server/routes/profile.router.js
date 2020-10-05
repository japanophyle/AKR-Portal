const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    
    // What's our user deal? req.user

    queryText = `this is where our query text goes`;
    pool
        .query(queryText, [/* this is where our injections go */])
        .then()
        .catch()
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    // POST route code here
});

module.exports = router;
