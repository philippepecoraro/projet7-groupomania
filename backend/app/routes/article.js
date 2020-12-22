const express = require('express');
const router = express.Router();
const articles = require("../controllers/article");
const auth = require("../middleware/authJwt");


router.post("/", auth.verify, articles.create);
router.get("/", auth.verify, articles.findAll);
router.get("/:id", auth.verify, articles.findOne);
router.put("/:id", auth.verify, articles.update);
router.delete("/:id", auth.verify, articles.delete);
router.delete("/", auth.verifyAdmin, articles.deleteAll);
router.get("/signal/:signal", auth.verifyAdmin, articles.getSignalArticle);

module.exports = router;