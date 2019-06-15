const express = require("express");
const videoRouter = express.Router();
const videoService = require("../services/video");

videoRouter.get("/home", async (req, res) => {
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

videoRouter.get("/categories", (req, res) => {
  videoService
    .getAllCategories()
    .then(data =>
      res.status(200).json({
        data
      })
    )
    .catch(err =>
      res.status(400).json({
        err
      })
    );
});

videoRouter.get("/singlevid/:id", async (req, res) => {
  const { id } = req.params;
  const data = {};
  try {
    data.masterVid = await videoService.getMasterVid(id);
    data.responseToMaster = await videoService.getResponseToMaster(id);

    for (let i = 0; i < data.responseToMaster.length; i++) {
      data.responseToMaster[
        i
      ].response = await videoService.getResponseToResponse(
        data.responseToMaster[i].id
      );
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

videoRouter.get("/category/:id", async (req, res) => {
  const { id } = req.params;

  let info = {};

  try {
    info.categories = await videoService.getAllCategories();
    info.vidsOfCategory = await videoService.getCategoryPageVideoCardData(id);
    info.categoryName = await videoService.getCategoryName(id);

    for (let i = 0; i < info.vidsOfCategory.length; i++) {
      info.vidsOfCategory[i].responses = await videoService.getResponseToMaster(
        info.vidsOfCategory[i].id
      );
    }

    res.status(200).json({
      info
    });
  } catch (err) {
    res.status(400).json({
      err
    });
  }

  // videoService.getVidsOfCategory(id)
  //     .then(data => res.status(200).json({
  //         data
  //     }))
  //     .catch(err => res.status(400).json({
  //         err
  //     }));
});

videoRouter.post("/", (req, res) => {
  const {
    userId,
    categoryId,
    videoTitle,
    responseTo,
    videoUrl,
    thumbnailUrl,
    annotation,
    description
  } = req.body;

  videoService
    .postVideo(
      userId,
      categoryId,
      videoTitle,
      responseTo,
      videoUrl,
      thumbnailUrl,
      annotation,
      description
    )
    .then(data =>
      res.status(200).json({
        data
      })
    )
    .catch(err =>
      res.status(400).json({
        err
      })
    );
});

videoRouter.delete("/", (req, res) => {
  const { id } = req.body;

  videoService
    .deleteVideo(id)
    .then(data =>
      res.status(200).json({
        data
      })
    )
    .catch(err =>
      res.status(400).json({
        err
      })
    );
});

videoRouter.put("/", (req, res) => {
  const { id, title, description } = req.body;

  videoService
    .updateVideo(id, title, description)
    .then(data =>
      res.status(200).json({
        data
      })
    )
    .catch(err =>
      res.status(400).json({
        err
      })
    );
});

videoRouter.put("/views", (req, res) => {
  const { id } = req.body;

  videoService
    .addView(id)
    .then(data =>
      res.status(200).json({
        data
      })
    )
    .catch(err =>
      res.status(400).json({
        err
      })
    );
});

videoRouter.get("/homepagevideocards", (req, res) => {
  videoService
    .getHomePageVideoCardData()
    .then(data => res.status(200).json({ data }))
    .catch(err => res.status(400).json({ err }));
});

videoRouter.get("/categorypagevideocards/:id", (req, res) => {
  const { id } = req.params;
  videoService
    .getCategoryPageVideoCardData(id)
    .then(data => res.status(200).json({ data }))
    .catch(err => res.status(400).json({ err }));
});

videoRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  videoService
    .getVideos(id)
    .then(data =>
      res.status(200).json({
        data
      })
    )
    .catch(err =>
      res.status(400).json({
        err
      })
    );
});

module.exports = videoRouter;
