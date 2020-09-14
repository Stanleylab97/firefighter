module.exports = {
    HOST: "gabassurijfire.mysql.db",
    USER: "gabassurijfire",
    PASSWORD: "Atlantique1",
    DB: "gabassurijfire",
    dialect: "mysql",

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};