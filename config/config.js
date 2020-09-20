module.exports={
    key:"StanleyLab97",
    baseUrl:"stark-garden-07837.herokuapp.com/"
};

if (process.env.NODE_ENV === 'test') {
    module.exports = {
        JWT_SECRET: 'StanleyLab97',
        oauth: {
            google: {
                clientID: 'number',
                clientSecret: 'string',
            }
        },
    };
} else {
    module.exports = {
        JWT_SECRET: 'StanleyLab97',
        oauth: {
            google: {
                clientID: 'number',
                clientSecret: 'string',
            }
        },
    };
}