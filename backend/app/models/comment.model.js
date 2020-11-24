module.exports = (sequelize, Sequelize) => {
    const Commentaire = sequelize.define("Commentaire", {
        text: {
            type: Sequelize.STRING
        },
    }, {
        freezeTableName: true
    });

    return Commentaire;
};