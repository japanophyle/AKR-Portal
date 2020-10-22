const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// GETs all dojos
router.get('/', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT * from "dojo" ORDER BY "dojo".region_name ASC;`;
    pool.query(queryText).then(result => {
        res.send(result.rows);
    })
        .catch(error => {
            console.log('error getting dojos', error);
            res.sendStatus(500);
        });
})

// POSTs new dojo
router.post('/', rejectUnauthenticated, async (req, res) => {

    const client = await pool.connect();

    if (req.user.auth_level >= 20) {
        try {
            const firstQuery = `INSERT INTO "dojo" ("dojo_name", "region_name")
                            VALUES ($1, $2) RETURNING "id";`;
            const secondQuery = `UPDATE "user_data"
                             SET "dojo_id" = $1
                             WHERE "user_id"= $2;`;
            await client.query('BEGIN');
            const result = await client.query(firstQuery, [req.body.dojo_name, req.body.region_name])
            await client.query(secondQuery, [result.rows[0].id, req.body.admin_id])
            await client.query('COMMIT');
            res.sendStatus(201)
        } catch (error) {
            console.log('error in adding dojo', error);
            await client.query('ROLLBACK')
            res.sendStatus(500)
        } finally {
            await client.release();
        }
    } else {
        res.sendStatus(403)
    }
});

// DELETE a dojo
router.delete('/:id', rejectUnauthenticated, (req, res) => {

    let queryText = `DELETE FROM "dojo"
                    WHERE "id" = $1;`;

    if (req.user.auth_level >= 20) {
        pool.query(queryText, [req.params.id])
            .then((result) => {

                res.sendStatus(200);
            })
            .catch((error) => {
                console.log('Error in delete dojo', error);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403)
    }
});

// UPDATE dojo info
router.put('/', rejectUnauthenticated, (req, res) => {

    let queryText = `UPDATE "dojo"
                    SET "dojo_name" = $1, "region_name" = $2
                    WHERE "id" = $3;`;

    if (req.user.auth_level >= 20) {
        pool.query(queryText, [req.body.dojo_name, req.body.region_name, req.body.id])
            .then(result => {
                res.sendStatus(201);
            })
            .catch(error => {
                console.log(`Error updating dojo`, error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403)
    }
});

//route for setting dojo dues
router.put('/dues', rejectUnauthenticated, (req, res) => {

    const { dues_amount, dues_date, dojo_id } = req.body

    const updateDuesQuery = `
        UPDATE "user_data" 
        SET "dues_amount" = $1, "dues_date" = $2
        WHERE "dojo_id" = $3;    
        `;

    if (req.user.auth_level >= 10) {
        pool.query(updateDuesQuery, [dues_amount, dues_date, dojo_id])
            .then(result => { res.sendStatus(200) })
            .catch(err => {
                console.log('Error in /dues route', err);
                res.sendStatus(500)
            });
    } else {
        res.sendStatus(403)
    }
});


module.exports = router;
