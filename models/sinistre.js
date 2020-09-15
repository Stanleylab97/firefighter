module.exports = (sequelize, Sequelize) => {

    const Sinistre = sequelize.define('Sinistre', {
        typeSin: { type: Sequelize.STRING, allowNull: false },
        lon: { type: Sequelize.FLOAT, allowNull: false },
        lat: { type: Sequelize.FLOAT, allowNull: false },
        image: { type: Sequelize.STRING, allowNull: false },
        dateSin: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    }, { timestamps: false }, { underscored: true });

return Sinistre;
};   