const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Item = sequelize.define('Item', {
        id_item: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_racine: DataTypes.INTEGER,
        item: DataTypes.STRING(30),
        translititem: DataTypes.STRING(30),
        autresformesitem: DataTypes.STRING(40),
        formcat: DataTypes.STRING(20),
        xscheme: DataTypes.STRING(20)
    }, {
        tableName: 'items',
        timestamps: false
    });

    Item.associate = (models) => {
        Item.belongsTo(models.Racine, {
            foreignKey: 'id_racine',
            as: 'Racine'
        });
        Item.hasMany(models.Definition, {
            foreignKey: 'id_item',
            as: 'Definitions'
        });
    };

    return Item;
};
