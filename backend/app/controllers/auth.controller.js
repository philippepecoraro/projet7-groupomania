const db = require("../models");
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
require('dotenv').config();
const User = db.user;


exports.signup = (req, res) => {
    if (req.body.firstname !== "" && req.body.lastname !== "" && req.body.email !== "" && req.body.password !== "") {
        User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        })
            .then(user => {
                res.status(200).send({ message: "User create" });
            })

            .catch(err => {
                res.status(500).send({ error: err.message });
                console.log("signup erreur 500");
            });
    } else {
        res.status(400).json({ error: "empty body" });
    }
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: '24h'
            });

            res.status(200).send({
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                accessToken: token,
                isAdmin: user.isAdmin
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signupdate = (req, res) => {
    const id = req.params.id;
    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Updated"
                });
            } else {
                res.status(400).send({
                    message: `Cannot updated user with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating user with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};