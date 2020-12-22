const express = require('express');
const router = express.Router();
//const { verifySignUp } = require("../middleware");
const controller = require('../controllers/user');
const auth = require('../middleware/authJwt');


router.post("/signup", controller.signup);
router.post("/signin", controller.signin);
router.put("/signupdate/:id", controller.signupdate);
router.delete("/:id", auth.verify, controller.delete);


module.exports = router;