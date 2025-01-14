// index.js
const Sequelize = require("sequelize");
const dbConfig = require("./config/db.config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./models/user.model.js")(sequelize, Sequelize);
db.bootcamps = require("./models/bootcamp.model.js")(sequelize, Sequelize);

db.users.belongsToMany(db.bootcamps, { through: "user_bootcamps" });
db.bootcamps.belongsToMany(db.users, { through: "user_bootcamps" });

module.exports = db;