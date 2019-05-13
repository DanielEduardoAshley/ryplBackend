const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const userRouter = require('./routes/user');

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use('/user', userRouter);

module.exports = {
    app,
}