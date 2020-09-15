module.exports = {
    HOST: "localhost",
    PORT: "3306",
    USER: "root",
    PASSWORD: "stan",
    DB: "firefighter",
    dialect: "mysql",

   /*  HOST: "213.186.33.176",
    PORT: "3306",
    USER: "gabassurijfire",
    PASSWORD: "Atlantique1",
    DB: "gabassurijfire",
    dialect: "mysql", */

    // HOST: "lelordstan.raidghost.com",
    // PORT: "3306",
    // USER: "lordstan",
    // PASSWORD: "lordstan",
    // DB: "firefighter",
    // dialect: "mysql",


    pool: {
        max: 100,
        min: 0,
        acquire: 120000,
        idle: 10000
    }
};