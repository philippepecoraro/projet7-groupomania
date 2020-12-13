const { authJwt } = require("../middleware");

module.exports = app => {
    const articles = require("../controllers/article.controller.js");

    var router = require("express").Router();


    router.post("/", articles.create);


    router.get("/", [authJwt.verifyToken], articles.findAll);


    router.get("/:id", [authJwt.verifyToken], articles.findOne);


    router.put("/:id", articles.update);


    router.delete("/:id", [authJwt.verifyToken], articles.delete);


    router.delete("/", [authJwt.verifyToken], articles.deleteAll);


    router.get("/signal/:signal", articles.getSignalArticle);



    app.use('/api/articles', router);
};