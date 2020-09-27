const bcrypt = require('bcryptjs');

module.exports = (sequelize, Sequelize) => {

 
    const User = sequelize.define('User', {
        method: { type: Sequelize.STRING,  allowNull: false },
        email: { type: Sequelize.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
        google_id: { type: Sequelize.STRING, allowNull: true },
        tel: { type: Sequelize.INTEGER, allowNull: true },
        password: { type: Sequelize.STRING, allowNull: true },
       
    }, { timestamps: false },
    {
        instanceMethods: {
            comparePassword: function (candidatePassword, cb) {
                bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
                    if (err) return cb(err);
                    cb(null, isMatch);
                });
            }
        }
    });

    User.beforeCreate(async (user, options) => {
        try {
                    
            if (user.method === 'local') {
                //the user schema is instantiated
                // Generate a salt
                const salt = await bcrypt.genSalt(10);
                // Generate a password hash (salt + hash)
                const passwordHash = await bcrypt.hash(user.dataValues.password, salt);
                // Re-assign hashed version over original, plain text password
                user.password = passwordHash;
            } else if (user.method === 'google'){
                user.method="google"
            }else{
                return ;
            }
           
        } catch (error) {
           console.log(error)
        }
    });
    
    return User;
};   