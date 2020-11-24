const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
const groupomania = {};

groupomania.Sequelize = Sequelize;
groupomania.sequelize = sequelize;

groupomania.user = require("./user.model.js")(sequelize, Sequelize);
groupomania.article = require("./article.model.js")(sequelize, Sequelize);

groupomania.comment = require("./comment.model.js")(sequelize, Sequelize);
//groupomania.role = require("./role.model.js")(sequelize, Sequelize);

/*groupomania.role.belongsToMany(groupomania.user, {
    through: "user_role",
    foreignKey: "roleId",
    otherKey: "userId"
});
groupomania.user.belongsToMany(groupomania.role, {
    through: "user_role",
    foreignKey: "userId",
    otherKey: "roleId"
});*/

groupomania.user.hasOne(groupomania.article, {
    foreignKey: "userId"
});

groupomania.article.belongsTo(groupomania.user, {
    foreignKey: "userId"
});

/*groupomania.article.belongsTo(groupomania.user, {
    foreignKey: {
        name: "userId"
        //  allowNull: false
    }
});*/

groupomania.user.hasMany(groupomania.comment, {
    foreignKey: "userId"
});
groupomania.comment.belongsTo(groupomania.user, {
    foreignKey: "userId"
});

/*groupomania.user.hasMany(groupomania.comment, {
    foreignKey: {
        name: "userId"
        // allowNull: false
    }
});*/

groupomania.article.hasMany(groupomania.comment, {
    foreignKey: "articleId"
});
groupomania.comment.belongsTo(groupomania.article, {
    foreignKey: "articleId"
});

/*groupomania.article.hasMany(groupomania.comment, {
    foreignKey: {
        name: "articleId",
        //  allowNull: false
    }
});*/

//groupomania.ROLES = ["user", "admin", "moderator"];

module.exports = groupomania;