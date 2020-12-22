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
                res.status(200).send({ message: "Utilisateur créé !" });
            })

            .catch(err => {
                res.status(500).send({ message: "Utilisateur non créé !" });
                console.log("signup erreur 500");
            });
    } else {
        res.status(400).json({ error: "Contenu vide" });
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
                return res.status(401).send({ message: "l'utilisateur n'a pas été trouvé." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Mot de passe invalide!"
                });
            }

            const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, config.secret, {
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
                    message: "Mis à jour"
                });
            } else {
                res.status(400).send({
                    message: `Ne peut pas mettre à jour un utilisateur avec id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur de mise à jour utilisateur avec id=" + id
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
                    message: "Utilisateur supprimé avec succès!"
                });
            } else {
                res.send({
                    message: `Impossible de supprimer l'utilisateur avec id=${id}. Peut-être que l'utilisateur n'a pas été trouvé!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de supprimer l'utilisateur avec id=" + id
            });
        });
};