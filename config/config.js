
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
                clientID: '789214546618-mvf67p1oovvthqpgphc9g8r9v6itlumr.apps.googleusercontent.com',
                clientSecret: 'gMj7_C0Rb5HqvK_4khckrCEE',
            }
        },
    };
}