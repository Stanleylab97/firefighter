module.exports = (sequelize, Sequelize) => {

    const Caserne = sequelize.define('Caserne', {
        code: { type: Sequelize.STRING, allowNull: false },
        libelle: { type: Sequelize.FLOAT, allowNull: false },
        ville: { type: Sequelize.FLOAT, allowNull: false },
    }, { timestamps: false }, { underscored: true });

    return Caserne;
};   