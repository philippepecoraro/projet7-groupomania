const db = require("../models")
const Comment = db.comment;
const User = db.user;


exports.createComment = (req, res) => {
    const { text, articleId, userId } = req.body
    if (text && articleId && userId) {
        Comment.create({
            text: text,
            articleId: articleId,
            userId: userId
        })
            .then((data) => {
                res.status(201).send(data)
            })
            .catch((err) => {
                res.status(500).send({ message: err.message });
            })
    }
};
exports.deleteComment = (req, res) => {
    let commentId = req.params.id
    let userIdForDelete = req.userId

    User.findOne({
        where: { id: userIdForDelete },
        include: [
            {
                model: Role
            }
        ]
    })
        .then(user => {
            let userForDeleteRole = user.roles[0].name;
            Comment.findOne({
                where: { id: commentId }
            })
                .then(comment => {
                    if (Comment.userId === userIdForDelete || userForDeleteRole === "admin") {
                        Comment.destroy({
                            where: { id: commentId }
                        })
                            .then(num => {
                                if (num == 1) {
                                    res.send({
                                        message: "L'article a été supprimé avecsuccès!"
                                    });

                                } else {
                                    res.send({
                                        message: `Impossible de supprimer le commentaire avec l'identifiant=${id}.Peut-être que le commentaire n'a pas été trouvé`
                                    });
                                }

                            })
                            .catch(err => {
                                res.status(500).send({
                                    message: "Impossible de supprimer le commentaire avec l'identifiant=" + id
                                });
                            });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Erreur de recherche de commentaire"
                    })
                })
        })

        .catch(err => {
            res.status(400).send({
                message: "Erreur sur la recherche de l'utilisateur"
            })
        })
};

exports.findAllComments = (req, res) => {
    // const title = req.query.title;
    const condition = { articleId: req.params.articleId };

    Comment.findAll({ where: condition, include: User })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Une erreur s'est produite lors de la récupération des commentaires"
            });
        });
};
exports.findOneComment = (req, res) => {
    const id = req.params.id;

    Comment.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur sur la récupération des commentaires avec id=" + id
            });
        });
};

exports.updateComment = (req, res) => {
    const id = req.params.id;

    Comment.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Commentaire mis a jour avec succès."
                });
            } else {
                res.send({
                    message: `Impossible de mettre à jour le commentaire avec l'ID=${id}. Peut-être que le commentaire n'a pas été trouvé ou que req.body est vide!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur sur la mise à jour des commentaires avec id=" + id
            });
        });
};

exports.getSignalComment = (req, res) => {
    const condition = { signal: req.params.signal };
    console.log('signal:', req.params.signal)

    Comment.findAll({ where: condition, include: User })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Erreur sur la récupération des commentaires"
            });
        });
};


