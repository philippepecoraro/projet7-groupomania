const { authJwt } = require("../middleware");

module.exports = app => {
    const comment = require("../controllers/comment.controller");
    var router = require("express").Router();


    router.post("/", comment.createComment);


    router.delete("/:id", comment.deleteComment);


    router.get("/all/:articleId", comment.findAllComments);


    router.get("/:id", comment.findOneComment);


    router.put("/:id", comment.updateComment);


    router.get("/signal/:signal", comment.getSignalComment);



    app.use('/api/comment', router);


};



