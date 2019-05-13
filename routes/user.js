const express = require('express');
const userRouter = express.Router();
const userService = require('../services/user');

userRouter.get('/:username', (req, res) => {
    const {
        username
    } = req.params;

    userService.getUser(username)
        .then(data => res.status(200).json({
            data
        }))
        .catch(err => res.status(400).json({
            err
        }));
});

userRouter.post('/', (req, res) => {
    const {
        username,
        email,
        firebaseUid,
        firstName,
        lastName,
        imgUrl
    } = req.body;

    userService.createUser(username, email, firebaseUid, firstName, lastName, imgUrl)
        .then(data => res.status(200).json({
            data
        }))
        .catch(err => res.status(400).json({
            err
        }));
});

userRouter.delete('/', (req, res) => {
    const {
        username
    } = req.body;

    userService.deleteUser(username)
        .then(data => res.status(200).json({
            data
        }))
        .catch(err => res.status(400).json({
            err
        }));
});

module.exports = userRouter;