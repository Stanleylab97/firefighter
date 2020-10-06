const dbConfig = require("../config/dbconnect.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    timezone: "+01:00",

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

db.users = require("./user")(sequelize, Sequelize);
db.sinistre = require("./sinistre")(sequelize, Sequelize);
db.caserne= require("./caserne")(sequelize,Sequelize);
db.rapport=require("./rapport")(sequelize,Sequelize);
db.sinistre.belongsTo(db.users);
db.rapport.belongsTo(db.caserne);
db.rapport.belongsTo(db.sinistre);

module.exports = db;