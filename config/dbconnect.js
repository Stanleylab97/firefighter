module.exports = {
    HOST: "localhost",
    PORT: "3306",
    USER: "root",
    PASSWORD: "stan",
    DB: "firefighter",
    dialect: "mysql",
    dialectOptions: {
        useUTC: false, //for reading from database
        dateStrings: true,
        typeCast: true
    },
    timezone: '+01:00', //for writing to database
    pool: {
        max: 100,
        min: 0,
        acquire: 120000,
        idle: 10000
    }
};