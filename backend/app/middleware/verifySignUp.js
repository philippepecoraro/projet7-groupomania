const db = require("../models");
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    console.log('salut#########################')
    // Username
    User.findOne({
        where: {
            lastname: req.body.lastname
        }
    }).then(user => {
        console.log('salut5#########################')
        if (user) {
            console.log(user)
            return res.status(400).json({
                error: "Failed! lastname is already in use!"
            });

        }
        console.log('salut2#########################')
        // Email
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            console.log('salut3#########################')
            if (user) {
                res.status(400).json({
                    error: "Failed! Email is already in use!"
                });
                return;
            }

            next();
        });

    }).catch(error => {
        console.log('salut4#########################')
        res.status(400).send({
            error: "Failed! Email is already in use!"
        });
    })
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;