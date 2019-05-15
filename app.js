const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const userRouter = require('./routes/user');
const videoRouter = require('./routes/video');
const responseRouter = require('./routes/response');

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/video', videoRouter);
app.use('/response', responseRouter);

module.exports = {
    app,
}