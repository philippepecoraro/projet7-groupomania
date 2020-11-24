module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        firstname: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        isAdmin: {
            type: Sequelize.BOOLEAN, defaultValue: false
        },
    }, {
        freezeTableName: true

    });

    return User;
};

