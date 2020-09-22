
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