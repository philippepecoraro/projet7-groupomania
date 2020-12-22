const express = require('express');
const router = express.Router();
const comment = require("../controllers/comment");
const auth = require("../middleware/authJwt");


router.post("/", auth.verify, comment.createComment);
router.delete("/:id", auth.verifyAdmin, comment.deleteComment);
router.get("/all/:articleId", auth.verify, comment.findAllComments);
router.get("/:id", auth.verify, comment.findOneComment);
router.put("/:id", auth.verify, comment.updateComment);
router.get("/signal/:signal", auth.verifyAdmin, comment.getSignalComment);


module.exports = router;

