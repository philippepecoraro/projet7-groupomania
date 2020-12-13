const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// analyser les requêtes de type de contenu - application / json
app.use(bodyParser.json());

// analyser les requêtes de type de contenu - application / x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();


// suppression de la table si elle existe déjà
/*db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
    /* initial();*/
/*});*/

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Céline application." });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/article.routes')(app);
require('./app/routes/comment.routes')(app);

// définir le port, écouter les requêtes
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
