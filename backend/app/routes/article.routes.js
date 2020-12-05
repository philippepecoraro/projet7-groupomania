const { authJwt } = require("../middleware");
module.exports = app => {
    const articles = require("../controllers/article.controller.js");

    var router = require("express").Router();

    // Create a new Article
    router.post("/", articles.create);

    // Retrieve all Articles
    router.get("/", [authJwt.verifyToken], articles.findAll);


    // Retrieve a single Article with id
    router.get("/:id", [authJwt.verifyToken], articles.findOne);

    // Update a Article with id
    router.put("/:id", articles.update);

    // Delete a Article with id
    router.delete("/:id", [authJwt.verifyToken], articles.delete);

    // Delete all Articles
    router.delete("/", [authJwt.verifyToken], articles.deleteAll);


    app.use('/api/articles', router);
};