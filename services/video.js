const { db } = require("./dbConnect");

const videoService = {};

videoService.getPopularVideos = () => {
  const sql = `
    SELECT video.*,
    rank() OVER(
        ORDER BY views DESC
    )
    FROM video
    LIMIT 10
    `;

  return db.any(sql);
};

videoService.getMasterVid = id => {
  const sql = `
    SELECT *
    FROM video
    WHERE id = $[id]
    `;

  return db.one(sql, {
    id
  });
};

videoService.getResponseToMaster = id => {
  const sql = `
    SELECT *
    FROM video
    WHERE response_to = $[id]
    `;

  return db.any(sql, {
    id
  });
};

videoService.getResponseToResponse = id => {
  const sql = `
    SELECT *
    FROM video 
    WHERE response_to = $[id]
    `;

  return db.any(sql, {
    id
  });
};

videoService.getAllCategories = () => {
  const sql = `
    SELECT *
    FROM category
    `;

  return db.any(sql);
};

videoService.getVidsOfCategory = id => {
  const sql = `
    SELECT *
    FROM video
    WHERE category_id = $[id]
    `;

  return db.any(sql, {
    id
  });
};

videoService.getVideos = id => {
  const sql = `
    SELECT *
    FROM video
    WHERE user_id = $[id]
    `;

  return db.any(sql, {
    id
  });
};

videoService.postVideo = (
  userId,
  categoryId,
  videoTitle,
  responseTo,
  videoUrl,
  thumbnailUrl,
  annotation,
  description
) => {
  const sql = `
    INSERT 
    INTO video (user_id, category_id, video_title, response_to, video_url, thumbnail_url, annotation, description)
    VALUES ($[userId], $[categoryId], $[videoTitle], $[responseTo], $[videoUrl], $[thumbnailUrl], $[annotation], $[description])
    RETURNING id
    `;

  return db.one(sql, {
    userId,
    categoryId,
    videoTitle,
    responseTo,
    videoUrl,
    thumbnailUrl,
    annotation,
    description
  });
};

videoService.deleteVideo = id => {
  const sql = `
    DELETE FROM video
    WHERE id = $[id]`;

  return db.none(sql, {
    id
  });
};

videoService.updateVideo = (id, title, description) => {
  const sql = `
    UPDATE video
    SET video_title = $[title], description = $[description]
    WHERE user_id = $[id]
    RETURNING id
    `;
  return db.one(sql, {
    id,
    title,
    description
  });
};

videoService.getCategoryName = id => {
  const sql = `
    SELECT *
    FROM category
    WHERE id = $[id]
    `;
  return db.one(sql, {
    id
  });
};

videoService.addView = id => {
  const sql = `
    UPDATE video
    SET views = views + 1
    WHERE id = $[id]
    RETURNING views
    `;
  return db.any(sql, {
    id
  });
};

videoService.getHomePageVideoCardData = () => {
  const sql = `
  SELECT * 
  FROM video 
  JOIN users 
  ON video.user_id = users.id`;
  return db.any(sql);
};

videoService.getCategoryPageVideoCardData = id => {
  const sql = `
    SELECT * 
    FROM video 
    JOIN users 
    ON video.user_id = users.id 
    WHERE category_id = $[id]`;
  return db.any(sql, { id });
};

module.exports = videoService;
