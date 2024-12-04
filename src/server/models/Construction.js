const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Construction = sequelize.define('Construction', {
        id_construction: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_definition: DataTypes.INTEGER,
        construction: DataTypes.TEXT
    }, {
        tableName: 'constructions',
        timestamps: false
    });

    Construction.associate = (models) => {
        Construction.belongsTo(models.Definition, {
            foreignKey: 'id_definition',
            as: 'Definition'
        });
    };

    return Construction;
};
