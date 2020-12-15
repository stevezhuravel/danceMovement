const config = require("../config/config.json");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.db, config.user, config.password, {
    host: config.host,
    dialect: config.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./User")(sequelize, Sequelize)
db.Video = require("./Video")(sequelize, Sequelize)

module.exports = db;