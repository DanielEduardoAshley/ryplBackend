const {
    db
} = require('./dbConnect')
const userService = {};

userService.getUser = (id) => {
    const sql = `
    SELECT * 
    FROM users
    WHERE firebase_uid = $[id]
    `;

    return db.one(sql, {
        id
    });
};

userService.createUser = (username, email, firebaseUid, firstName, lastName, imgUrl) => {
    const sql = `
    INSERT INTO users (username, email, firebase_uid, firstname, lastname, img_url)
    VALUES ($[username], $[email], $[firebaseUid], $[firstName], $[lastName], $[imgUrl])
    RETURNING id
    `;

    return db.one(sql, {
        username,
        email,
        firebaseUid,
        firstName,
        lastName,
        imgUrl
    });
};

userService.updateUser = (id, username, firstName, lastName, imgUrl) => {
    const sql = `
    UPDATE users
    SET username = $[username], firstname = $[firstName], lastname = $[lastName], img_url = $[imgUrl]
    WHERE id = $[id]
    RETURNING id
    `;
    return db.one(sql, {
        id,
        username,
        firstName,
        lastName,
        imgUrl
    });
};

userService.deleteUser = (username) => {
    const sql = `
    DELETE 
    FROM users
    WHERE username = $[username]
    `;

    return db.none(sql, {
        username
    });
};



module.exports = userService;