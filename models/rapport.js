module.exports = (sequelize, Sequelize) => {

    const Rapport = sequelize.define('Rapport', {
        dateSaisie: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW  },
        circonstances: { type: Sequelize.TEXT, allowNull: false },
        degatsMateriels: { type: Sequelize.TEXT, allowNull: false },
    }, { timestamps: false }, { underscored: true });

    return Rapport;
};   