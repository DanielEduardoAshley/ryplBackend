const {
    db
} = require('./dbConnect')
const responseService = {};

responseService.getResponses = (id) => {
    const sql = `
    SELECT *
    FROM response
    WHERE video_id = $[id]
    `;

    return db.any(sql, {
        id
    });
};

module.exports = responseService;