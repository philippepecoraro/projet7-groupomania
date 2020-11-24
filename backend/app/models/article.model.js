module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("Article", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        text: {
            type: Sequelize.TEXT
        },

    }, {
        freezeTableName: true
    });

    return Article;
};
