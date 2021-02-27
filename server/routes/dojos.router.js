const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// Get all dojos, sorted by region name
// TODO - suggest sorting by name, since the region can't be seen
router.get('/', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT * from dojo ORDER BY dojo.region_name ASC;`;
    pool.query(queryText,
        (error, result, fields) => {
            if (error) {
                console.log('error getting dojos', error);
                res.sendStatus(500);
            } else {
                res.send(result);
            }
        }
    );
})

// Adds a new dojo
//   Body must contain dojo_name and region_name
//   Logged in user must be a site/national admin
router.post('/', rejectUnauthenticated, async (req, res) => {
    // Must be auth_level 20+ (site/national admin)
    if (req.user.auth_level >= 20) {
        const queryText = `INSERT INTO dojo (dojo_name, region_name)
                            VALUES (?, ?);`;
        pool.query(queryText, 
            [req.body.dojo_name, req.body.region_name],
            (error, result, fields) => {
                if (error) {
                    console.log('ERROR - adding dojo:', error);
                    res.sendStatus(500);
                } else {
                    res.send({dojo_id: result.insertId});
                }
            }
        );
    } else {
        console.log(`WARN - unauthorized attempt to add dojo by ${req.user.username}`);
        res.sendStatus(403);
    }
});


// Deletes a dojo by id
//   Logged in user must be a site/national admin 
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    // Must be auth_level 20+ (site/national admin)
    if (req.user.auth_level >= 20) {
        const queryText = `DELETE FROM dojo WHERE id = ?;`;
        pool.query(queryText, [req.params.id],
            (error, result, fields) => {
                if (error) {
                    console.log(`ERROR - deleting dojo id ${req.params.id}:`, error);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            } 
        );
    } else {
        console.log(`WARN - unauthorized attempt to delete dojo by ${req.user.username}`);
        res.sendStatus(403)
    }
});

// Updates dojo information
//   Body must contain dojo_name and region_name
//   Logged in user must be a site/national admin
router.put('/', rejectUnauthenticated, (req, res) => {
    // Must be auth_level 20+ (site/national admin)
    if (req.user.auth_level >= 20) {
        const queryText = `UPDATE dojo SET dojo_name = ?, region_name = ? WHERE id = ?;`;
        // TODO - update id to be on URL for API best practices
        const dojoId = req.body.id
        pool.query(queryText, 
            [req.body.dojo_name, req.body.region_name, dojoId],
            (error, result, fields) => {
                if (error) {
                    console.log(`ERROR - updating dojo id ${dojoId}:`, error);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            } 
        );
    } else {
        console.log(`WARN - unauthorized attempt to update dojo by ${req.user.username}`);
        res.sendStatus(403)
    }
});


// Updates the dues amount due for all members of a dojo 
//   Body must contain dojo_id, dues_amount and dues_date
//   Logged in user must be a dojo admin or a site/national admin
router.put('/dues', rejectUnauthenticated, (req, res) => {
    // Must be at least a dojo admin
    // TODO - ISSUE - it should have to be the admin for the dojo being set
    if (req.user.auth_level >= 10) {
        const sqlQuery = `
                UPDATE user_data SET dues_amount = ?, dues_date = ? 
                WHERE dojo_id = ?;`;
        // TODO - update id to be on URL for API best practices
        const dojoId = req.body.dojo_id;
        pool.query(sqlQuery, 
            [req.body.dues_amount, req.body.dues_date, dojoId],
            (error, result, fields) => {
                if (error) {
                    console.log(`ERROR - updating dues for dojo id ${dojoId}:`, error);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            } 
        );
    } else {
        console.log(`WARN - unauthorized attempt to update dojo dues by ${req.user.username}`);
        res.sendStatus(403);
    }
});


module.exports = router;
