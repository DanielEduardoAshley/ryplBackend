const pgp = require('pg-promise')({});
const db = pgp('postgress://localhost/rypl');

module.exports = {
    db,
}