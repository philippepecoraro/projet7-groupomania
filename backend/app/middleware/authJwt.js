const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
const config = require("../config/auth.config");

exports.verify = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        // console.log('token0:', token);
        console.log('headers1:', req.headers.authorization);
        const decodedToken = jwt.verify(token, config.secret);
        console.log('decodedToken1:', decodedToken);
        console.log('token1:', token);
        console.log('config.secret1:', config.secret);

        const userId = decodedToken.id;

        console.log('decodedToken.id', decodedToken.id);
        console.log('req.body.userId:', req.body.userId);
        console.log('userId', userId);

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
exports.verifyAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, config.secret);
        console.log('decodedToken2:', decodedToken);
        console.log('token2:', token)
        console.log('config.secret2:', config.secret);
        const isAdmin = decodedToken.isAdmin;
        console.log('isAdmin2:', isAdmin)
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

