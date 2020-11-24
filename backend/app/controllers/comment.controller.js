const groupomania = require("../models")
//const { article } = require("../models");
const Comment = groupomania.comment;
const User = groupomania.user;
const Role = groupomania.role;

exports.createComment = (req, res) => {
    const { text, ArticleId, UserId } = req.body
    if (text && ArticleId && UserId) {
        Comment.create({
            text: text,
            ArticleId: ArticleId,
            UserId: UserId
        })
            .then((data) => {
                res.status(201).send(data)
            })
            .catch((err) => {
                res.status(500).send({ message: err.message });
            })
    }
}
exports.deleteComment = (req, res) => {
    let commentId = req.params.id
    let userIdForDelete = req.UserId

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
                                        message: "Article was deleted successfully !"
                                    });

                                } else {
                                    res.send({
                                        message: `Cannot delete Article with id=${id}.Maybe article was not found`
                                    });
                                }

                            })
                            .catch(err => {
                                res.status(500).send({
                                    message: "Could not delete Article with id=" + id
                                });
                            });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error to find article"
                    })
                })
        })

        .catch(err => {
            res.status(400).send({
                message: "Error to find user"
            })
        })
}

exports.findAllComments = (req, res) => {
    const text = req.query.text;
    var condition = text ? { text: { [Op.like]: `%${text}%` } } : null;

    Comment.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving comments."
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
                message: "Error retrieving Comments with id=" + id
            });
        });
};
