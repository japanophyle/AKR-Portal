const mysql = require('mysql');
const url = require('url');

let config = {};

if (process.env.DATABASE_URL) {
  config = process.env.DATABASE_URL;
} else if (process.env.DATABASE_USER && process.env.DATABASE_PASSWORD) {
    config = {
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      host: 'localhost', // Server hosting the postgres database
      port: 3306, // env var: PGPORT
      database: 'akr_portal', // CHANGE THIS LINE! env var: PGDATABASE, this is likely the one thing you need to change to get up and running
      max: 10, // max number of clients in the pool
      idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    };
} else {
  console.log('MySQL database requires Auth info, please set this up and try again');
}

// this creates the pool that will be shared by all other modules
const pool = mysql.createPool(config);

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err) => {
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
