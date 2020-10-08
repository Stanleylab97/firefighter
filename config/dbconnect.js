module.exports = {
    HOST: "us-cdbr-east-02.cleardb.com",
    PORT: "3306",
    USER: "b508196e624064",
    PASSWORD: "63b63504",
    DB: "heroku_c20885353691853",
/*  local server =>
    HOST: "localhost",
    PORT: "3306",
    USER: "root",
    PASSWORD: "stan",
    DB: "firefighter", */
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