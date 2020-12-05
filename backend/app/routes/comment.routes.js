const { authJwt } = require("../middleware");


module.exports = app => {
    const comment = require("../controllers/comment.controller");
    var router = require("express").Router();

    //Create comment
    router.post("/", comment.createComment);

    //Delete comment by id
    router.delete("/:id", comment.deleteComment);

    //Get all comments
    router.get("/all/:articleId", comment.findAllComments);

    //Get comment by id
    router.get("/:id", comment.findOneComment);



    app.use('/api/comment', router);


};



