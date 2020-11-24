const db = require("../models");
const config = require("../config/auth.config");
const groupomania = require("../models");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^ (?=.*\d).{ 4, 8}$/;
require('dotenv').config();

const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

exports.signup = (req, res) => {
    console.log('hello');
    // Save User to Database
    User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(user => {
            res.status(200).send({ message: "User create" });
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
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
                expiresIn: 288000 // 8 hours
            });

            var authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
            });
            res.status(200).send({
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                roles: authorities,
                accessToken: token

            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};