const db = require("../models");
const Article = db.article;
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new Article
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Article
    const article = {
        title: req.body.title,
        description: req.body.description,
        text: req.body.text,
        userId: req.body.userId

    };

    // Save Article in the database
    Article.create(article)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Article."
            });
        });
};

// Retrieve all Articles from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Article.findAll({ where: condition, include: User })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving articles."
            });
        });
};

// Find a single Article with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Article.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Article with id=" + id
            });
        });
};

// Update a Article by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Article.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Article was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Article with id=${id}. Maybe Article was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Article with id=" + id
            });
        });

};

// Delete a Article with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Article.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Article was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Article with id=${id}. Maybe Article was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Article with id=" + id
            });
        });
};

// Delete all Articles from the database.
exports.deleteAll = (req, res) => {
    Article.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Article were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all articles."
            });
        });
};