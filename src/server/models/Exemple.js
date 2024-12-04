const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Exemple = sequelize.define('Exemple', {
        id_exemple: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_definition: DataTypes.INTEGER,
        exemple: DataTypes.TEXT
    }, {
        tableName: 'exemples',
        timestamps: false
    });

    Exemple.associate = (models) => {
        Exemple.belongsTo(models.Definition, {
            foreignKey: 'id_definition',
            as: 'Definition'
        });
    };

    return Exemple;
};
