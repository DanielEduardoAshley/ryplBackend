const {
    db
} = require('./dbConnect')
const videoService = {};

videoService.getVideos = (id) => {
    const sql = `
    SELECT *
    FROM video
    WHERE user_id = $[id]
    `;
    return db.any(sql, {
        id
    });
};

videoService.postVideo = (id, category, title, url, annotation, description) => {
    const sql = `
    INSERT INTO video (user_id, category_id, video_title, video_url, annotation, description)
    VALUES ($[id], $[category], $[title], $[url], $[annotation], $[description])
    RETURNING id`;

    return db.one(sql, {
        id,
        category,
        title,
        url,
        annotation,
        description
    });
};

videoService.deleteVideo = (id) => {
    const sql = `
    DELETE FROM video
    WHERE id = $[id]`;

    return db.none(sql, {
        id
    });
};

videoService.updateVideo = () => {
    const sql = `

    `
}


module.exports = videoService;