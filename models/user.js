module.exports = (sequelize, Sequelize) => {

 
    const User = sequelize.define('User', {
        username: { type: Sequelize.STRING, unique: true, allowNull: false },
        email: { type: Sequelize.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
        tel: { type: Sequelize.INTEGER, allowNull: false },
        password: { type: Sequelize.STRING, allowNull: false },

    }, { timestamps: false });

  

    return User;
};   