const query = require('../db/query');
const {send} = require('../services/emailer');

async function submission(req,res){
    try {
        const {name, mob, loc, nature, budget, service} = req.body;
        let response = await query.saveData(name, mob, loc, nature, budget, service);

        await send({name, mob, loc, nature, budget, service});
        res.status(201).json({
            success: true,
            message: "Query submitted successfully",
            submissionId: response.id
        });
    } catch (error) {
        console.error(error);
        if(error.code){
            return res.status(503).json({
                error: "Database error",
                message: "Cannot process request this time"
            });
        }

        res.status(500).json({
            error: "internal server error",
            message: "An internal error occurred"
        });
    }
}

module.exports = {submission}