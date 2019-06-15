

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
    annotation VARCHAR NULL,
    description VARCHAR,
    likes INT ,
    dislikes INT ,
    views INT ,
    time_posted TIMESTAMP DEFAULT NOW()
);

CREATE TABLE followers
(
    id SERIAL PRIMARY KEY,
    follower_id INT REFERENCES users(id) ON DELETE CASCADE,
    following_id INT REFERENCES users(id) ON DELETE CASCADE
);



INSERT INTO category
    (name)
VALUES
    ('News'),
    ('Comedy'),
    ('Music'),
    ('Art'),
    ('Food'),
    ('Politics'),
    ('Religion'),
    ('Science'),
    ('Technology');


    





