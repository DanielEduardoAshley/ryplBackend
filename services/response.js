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

responseService.postResponse = (userID, videoID, videoTitle, videoUrl, description) => {
    const sql = `
    INSERT into response (user_id, video_id, video_title, video_url, description)
    VALUES ($[userID], $[videoID], $[videoTitle], $[videoUrl], $[descriton])
    RETURNING id
    `;

    return db.one(sql, {
        userID,
        videoID,
        videoTitle,
        videoUrl,
        description
    })
}

module.exports = responseService;