// config/db.config.js
module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "mariapaz08",
    DB: "db_bootcamp",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};