module.exports = (sequelize, Sequelize) => {

    const Sinistre = sequelize.define('Sinistre', {
        typeSin: { type: Sequelize.STRING, allowNull: false },
        lon: { type: Sequelize.DOUBLE, allowNull: false },
        lat: { type: Sequelize.DOUBLE, allowNull: false },
        imageUrl: { type: Sequelize.STRING, allowNull: false },
        dateSin: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
        consulted: { type: Sequelize.BOOLEAN, defaultValue: false },

    }, { timestamps: false }, { underscored: true });

return Sinistre;
};   