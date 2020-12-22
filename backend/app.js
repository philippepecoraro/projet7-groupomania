const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const articleRoutes = require('./app/routes/article');
const authRoutes = require('./app/routes/user');
const commentRoutes = require('./app/routes/comment');
const helmet = require('helmet');




const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

//Synchronisation BDD
const db = require('./app/models');
db.sequelize.sync();


app.use(helmet());
//app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/articles', articleRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/comment', commentRoutes);

module.exports = app;