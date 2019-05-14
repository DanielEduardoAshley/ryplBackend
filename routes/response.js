const express = require('express');
const responseRouter = express.Router();
const responseService = require('../services/response');

responseRouter.get('/:id', (req, res) => {
    const {
        id
    } = req.params;
    responseService.getResponses(id)
        .then(data => res.status(200).json({
            data
        }))
        .catch(err => res.status(400).json({
            err
        }));
});



module.exports = responseRouter;