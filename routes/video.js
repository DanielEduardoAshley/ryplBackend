const express = require('express');
const videoRouter = express.Router();
const videoService = require('../services/video');

videoRouter.get('/home', async (req, res) => {
    try {
        const popVids = await videoService.getPopularVideos();
        const allCategories = await videoService.getAllCategories();

        res.status(200).json({
            popVids,
            allCategories
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

videoRouter.get('/singlevid/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const data = {}
    try {
        data.masterVid = await videoService.getMasterVid(id);
        data.responseToMaster = await videoService.getResponseToMaster(id);

        for (let i = 0; i < data.responseToMaster.length; i++) {
            data.responseToMaster[i].response = await videoService.getResponseToResponse(data.responseToMaster[i].id);
        }

        res.status(200).json({
            data
        });

    } catch (err) {
        res.status(400).json({
            err
        });
    }
});

videoRouter.get('/category/:id', (req, res) => {
    const {
        id
    } = req.params;

    videoService.getVidsOfCategory(id)
        .then(data => res.status(200).json({
            data
        }))
        .catch(err => res.status(400).json({
            err
        }));
});

videoRouter.get('/:id', (req, res) => {
    const {
        id
    } = req.params;
    videoService.getVideos(id)
        .then(data => res.status(200).json({
            data
        }))
        .catch(err => res.status(400).json({
            err
        }));
});

videoRouter.post('/', (req, res) => {
    const {
        id,
        category,
        title,
        url,
        annotation,
        description
    } = req.body;

    videoService.postVideo(id, category, title, url, annotation, description)
        .then(data => res.status(200).json({
            data
        }))
        .catch(err => res.status(400).json({
            err
        }));
});

videoRouter.delete('/', (req, res) => {
    const {
        id
    } = req.body;

    videoService.deleteVideo(id)
        .then(data => res.status(200).json({
            data
        }))
        .catch(err => res.status(400).json({
            err
        }))
});

videoRouter.put('/', (req, res) => {
    const {
        id,
        title,
        description
    } = req.body;

    videoService.updateVideo(id, title, description)
        .then(data => res.status(200).json({
            data
        }))
        .catch(err => res.status(400).json({
            err
        }));
});

module.exports = videoRouter