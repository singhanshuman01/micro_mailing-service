const db = require('../config/db');

async function saveData(name,mob, loc, nature, budget, service) {
    try {        
        let i = await db.query("insert into data(name, mob, loc, nature, budget, service) values($1, $2, $3, $4, $5, $6) returning id, created_at",[name,mob, loc, nature, budget, service]);
        return i.rows[0];
    } catch (error) {
        console.error(error);
    }
}

module.exports = {saveData};