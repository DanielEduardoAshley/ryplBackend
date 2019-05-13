DROP DATABASE IF EXISTS rypl;
CREATE DATABASE rypl;

\c rypl

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    firebase_uid VARCHAR NOT NULL,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    img_url VARCHAR
);

CREATE TABLE category
(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);

CREATE TABLE video
(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    category_name INT REFERENCES category(id) ON DELETE CASCADE,
    video_title VARCHAR NOT NULL,
    video_url VARCHAR NOT NULL,
    annotation VARCHAR,
    description VARCHAR,
    time_posted TIMESTAMP DEFAULT NOW()
);

CREATE TABLE response
(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    video_id INT REFERENCES video(id) ON DELETE CASCADE,
    video_title VARCHAR NOT NULL,
    annotation VARCHAR,
    description VARCHAR,
    time_posted TIMESTAMP DEFAULT NOW()
);

CREATE TABLE response_to_response
(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    video_id INT REFERENCES response(id) ON DELETE CASCADE,
    video_title VARCHAR NOT NULL,
    annotation VARCHAR,
    description VARCHAR,
    time_posted TIMESTAMP DEFAULT NOW()
);

CREATE TABLE followers
(
    id SERIAL PRIMARY KEY,
    follower INT REFERENCES users(id) ON DELETE CASCADE,
    following INT REFERENCES users(id) ON DELETE CASCADE
);

-- INSERT INTO users
--     (username, email,firebase_uid,firstname,lastname,img_url)
-- VALUES
--     ('a', 'b', 'c', 'd', 'e', 'f');

-- INSERT INTO users
--     (username, email,firebase_uid,firstname,lastname,img_url)
-- VALUES
--     ('aa', 'bb', 'cc', 'dd', 'ee', 'ff');

-- INSERT INTO followers
--     (follower)
-- VALUES
--     (1);

-- INSERT INTO video
--     (user_id,video_title,video_url)
-- VALUES
--     (1, 'abc', 'def');

-- INSERT INTO response
--     (user_id,video_id,video_title)
-- VALUES
--     (1, 1, 'abc');

-- INSERT INTO response_to_response
--     (video_id, video_title)
-- VALUES
--     (1, 'ew')








