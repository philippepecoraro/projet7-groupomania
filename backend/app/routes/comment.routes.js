const { authJwt } = require("../middleware");


module.exports = app => {
    const comment = require("../controllers/comment.controller");
    var router = require("express").Router();

    router.post("/", comment.createComment);

    router.delete("/:id", comment.deleteComment);

    router.get("/", comment.findAllComments);

    router.get("/:id", comment.findOneComment);



    app.use('/api/comment', router);


};



