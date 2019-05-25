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
    category_id INT REFERENCES category(id) ON DELETE CASCADE,
    video_title VARCHAR NOT NULL,
    response_to INT REFERENCES video(id) NULL,
    video_url VARCHAR NOT NULL,
    thumbnail_url VARCHAR,
    annotation VARCHAR,
    description VARCHAR,
    likes INT,
    dislikes INT,
    views INT,
    time_posted TIMESTAMP DEFAULT NOW()
);

-- CREATE TABLE response
-- (
--     id SERIAL PRIMARY KEY,
--     user_id INT REFERENCES users(id) ON DELETE CASCADE,
--     video_id INT REFERENCES video(id) ON DELETE CASCADE,
--     video_title VARCHAR NOT NULL,
--     video_url VARCHAR NOT NULL,
--     annotation VARCHAR,
--     description VARCHAR,
--     time_posted TIMESTAMP DEFAULT NOW()
-- );

-- CREATE TABLE response_to_response
-- (
--     id SERIAL PRIMARY KEY,
--     user_id INT REFERENCES users(id) ON DELETE CASCADE,
--     video_id INT REFERENCES video(id) ON DELETE CASCADE,
--     response_id INT REFERENCES response(id) ON DELETE CASCADE,
--     video_title VARCHAR NOT NULL,
--     video_url VARCHAR NOT NULL,
--     annotation VARCHAR,
--     description VARCHAR,
--     time_posted TIMESTAMP DEFAULT NOW()
-- );

CREATE TABLE followers
(
    id SERIAL PRIMARY KEY,
    follower_id INT REFERENCES users(id) ON DELETE CASCADE,
    following_id INT REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users
    (username, email,firebase_uid,firstname,lastname,img_url)
VALUES
    ('john222', 'john@email.com', 'fbuid', 'john', 'doe', 'imgurl'),
    ('syed327', 'aziz', 'fbuid2', 'syed', 'aziz', 'url'),
    ('dan7', 'dan@email.com', 'fbuid3', 'dan', 'ash', 'url3'),
    ('yun99f', 'yun', 'fbuid3', 'yun', 'huang', 'url4'),
    ('abdul', 'abdul@email', 'fbuid5', 'abdul', 'ab', 'url5');

INSERT INTO followers
    (follower_id, following_id)
VALUES
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5),
    (2, 1),
    (2, 5),
    (4, 3),
    (3, 1);

INSERT INTO category
    (name)
VALUES
    ('news'),
    ('comedy'),
    ('music'),
    ('art'),
    ('cooking');

INSERT INTO video
    (user_id, category_id, video_title,response_to,video_url, description, likes, dislikes, views)
VALUES
    (1, 1, 'my dog is happy', null, 'urlforvid', 'he wont stop licking me!', 10, 2, 20),
    (1, 2, 'my cat is cute', 1, 'urlforvid2', 'he scratched me' , 0, 0, 5),
    (2, 3, 'hear me sing', 1, 'urlforvid3', 'my voice is nice', 0, 0, 3),
    (3, 4, 'my painting', 2, 'urlforvid4', 'watch me draw', 0, 0, 8),
    (3, 5, 'im making chicken', 3, 'urlforvid5', 'curry chicken', 0, 0, 40),
    (3, 5, 'im making chicken', 3, 'urlforvid5', 'curry chicken', 0, 0, 40),
    (3, 5, 'im making chicken', 2, 'urlforvid5', 'curry chicken', 0, 0, 40)


-- INSERT INTO response
--     (user_id,video_id,video_title, video_url, description)
-- VALUES
--     (1, 5, 'my recipe is better', 'urlforvid', 'use cayenne pepper'),
--     (2, 4, 'i drew something similar', 'url vid', 'look at my painting of a tree'),
--     (3, 5, 'fried chicken is the way to go', 'vid url', 'no fry, no eat'),
--     (5, 3, 'we should duet', 'fb url', 'lets collab');

-- INSERT INTO response_to_response
--     (user_id, video_id, response_id, video_title, video_url, description)
-- VALUES
--     (1, 3, 4, 'let me join!', 'firebase url', 'we should start a band!'),
--     (5, 5, 3, 'nah man, grilled!', 'url for fb', 'grill it like this, its healthier');








