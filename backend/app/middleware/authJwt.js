const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
const config = require("../config/auth.config");

//Vérification du token
exports.verify = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, config.secret);
        const userId = decodedToken.id;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};
//Vérification que l'utilisateur est admin
exports.verifyAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, config.secret);
        const isAdmin = decodedToken.isAdmin;
        if (isAdmin) {
            next();
        } else {
            throw 'Pas admin';
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};

