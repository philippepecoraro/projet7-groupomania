const db = require("../models");
const Article = db.article;
const User = db.user;
const Op = db.Sequelize.Op;

// Créer et enregistrer un nouvel article
exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Le contenu ne peut pas être vide!"
        });
        return;
    }

    // Créer un article
    const article = {
        title: req.body.title,
        description: req.body.description,
        text: req.body.text,
        userId: req.body.userId

    };

    // Sauvegarder un article dans la base de donnée.
    Article.create(article)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Une erreur s'est produite lors de la création de l'article."
            });
        });
};

//Récupérer tous les articles de la base de données.
exports.findAll = (req, res) => {
    Article.findAll({ order: [['createdAt', 'DESC']], include: User })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Une erreur s'est produite lors de la récupération des articles."
            });
        });
};


// Trouver un seul article avec un id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Article.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur lors de la récupération de l'article avec l'ID=" + id
            });
        });
};

//Mettre à jour un article par l'id dans la requête
exports.update = (req, res) => {
    const id = req.params.id;

    Article.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "L'article a été mis à jour avec succès."
                });
            } else {
                res.send({
                    message: `Impossible de mettre à jour l'article avec  l'id=${id}.Peut-être que l'article n'a pas été trouvé ou que req.body est vide! !`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur lors de la mise à jour de l'article avec l'ID=" + id
            });
        });

};

// Supprimer un article avec l'ID spécifié dans la requête
exports.delete = (req, res) => {
    const id = req.params.id;

    Article.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "L'article a été supprimé avec succès!"
                });
            } else {
                res.send({
                    message: `Impossible de supprimer l'article avec l'identifiant=${id}.Peut-être que l'article n'a pas été trouvé !`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de supprimer l'article avec l'identifiant=" + id
            });
        });
};

//Supprimer tous les articles de la base de données .
exports.deleteAll = (req, res) => {
    Article.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} L'article a été supprimé avec succès!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Une erreur s'est produite lors de la suppression de tous les articles."
            });
        });
};

//Récupérer les articles signalés
exports.getSignalArticle = (req, res) => {
    const condition = { signal: req.params.signal };

    Article.findAll({ where: condition, include: User })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Erreur sur la récupération des articles"
            });
        });
}