const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GETs all dojos
router.get('/', (req, res) => {
    let queryText = `SELECT * from "dojo";`;
    pool.query(queryText).then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error getting dojos', error);
        res.sendStatus(500);
    });
})

// POSTs new dojo
router.post('/', (req, res) => {
    console.log('Adding new dojo:', req.body);
    let queryText = `INSERT INTO "dojo" ("dojo_name", "region_name")
                     VALUES ($1, $2);`;
    pool.query(queryText, [req.body.dojo_name, req.body.region_name])
    .then(result => {
        res.sendStatus(201);
    })
    .catch(error => {
        console.log(`Error adding dojo`, error); 
        res.sendStatus(500);
    });
});

// DELETE a dojo
router.delete('/:id', (req, res) => {
    console.log('In Delete:', req.params.id);
    let queryText = `DELETE FROM "dojo"
                    WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id])
        .then( (result) => {
        console.log('Delete Dojo');
        res.sendStatus(200);
    })
    .catch( (error) => {
        console.log('Error in delete dojo', error);
        res.sendStatus(500);
    })
});

// UPDATE dojo info
router.put('/', (req, res) => {
    console.log('Editing dojo info:', req.body);
    let queryText = `UPDATE "dojo"
                    SET "dojo_name" = $1, "region_name" = $2
                    WHERE "id" = $3;`;
    pool.query(queryText, [req.body.dojo_name, req.body.region_name, req.body.id])
    .then(result => {
        res.sendStatus(201);
    })
    .catch(error => {
        console.log(`Error updating dojo`, error); 
        res.sendStatus(500);
    });
});


module.exports = router;
