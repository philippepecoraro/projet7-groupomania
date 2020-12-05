module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("Comment", {
        text: {
            type: Sequelize.STRING
        },
        signal: {
            type: Sequelize.BOOLEAN, defaultValue: false
        }
    }, {
        freezeTableName: true

    });

    return Comment;
};

