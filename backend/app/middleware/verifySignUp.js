const { user } = require("../models");
const db = require("../models");
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {

    // Lastname
    User.findOne(
        {
            where: {
                lastname: req.body.lastname
            }
        }).then(user => {
            if (user) {
                return res.status(400).json({
                    error: "Failed! lastname is already in use!"
                });
            }

            // Email
            User.findOne({
                where: {
                    email: req.body.email
                }
            }).then(user => {
                if (user) {
                    res.status(400).json({
                        error: "Failed! Email is already in use!"
                    });
                    return;
                }
                next();
            });
        }).catch(error => {
            res.status(400).send({
                error: "Failed! Email is already in use!"
            });
        })
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;