const pg = require('pg');
require('dotenv').config();

const pool = new pg.Pool({
    user: process.env.DB_USER ,
    host:process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});

pool.on('connect', ()=>{
    console.log("connected to database");
});

pool.on('error',(err,client)=>{
    console.error(error);
    process.exit(-1);
});

module.exports = {
    query: (text,param)=>pool.query(text,param),
    pool
}