const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Definition = sequelize.define('Definition', {
        id_definition: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_item: DataTypes.INTEGER,
        voyinacc: DataTypes.STRING(3),
        masdar1: DataTypes.STRING(20),
        masdar2: DataTypes.STRING(20),
        masdar3: DataTypes.STRING(20),
        masdar4: DataTypes.STRING(20),
        masdar5: DataTypes.STRING(20),
        masdar6: DataTypes.STRING(20),
        masdar7: DataTypes.STRING(20),
        masdar8: DataTypes.STRING(20),
        autresmasdars: DataTypes.STRING(40),
        estpluriel: DataTypes.BOOLEAN,
        pluriel1: DataTypes.STRING(20),
        pluriel2: DataTypes.STRING(20),
        pluriel3: DataTypes.STRING(20),
        pluriel4: DataTypes.STRING(20),
        pluriel5: DataTypes.STRING(20),
        pluriel6: DataTypes.STRING(20),
        pluriel7: DataTypes.STRING(20),
        pluriel8: DataTypes.STRING(20),
        autrespluriels: DataTypes.STRING(40),
        origine: DataTypes.STRING(20),
        diptote: DataTypes.BOOLEAN,
        collectif: DataTypes.BOOLEAN,
        definition: DataTypes.TEXT,
        remarque: DataTypes.TEXT
    }, {
        tableName: 'definitions',
        timestamps: false
    });

    Definition.associate = (models) => {
        Definition.belongsTo(models.Item, {
            foreignKey: 'id_item',
            as: 'Item'
        });
        Definition.hasMany(models.Construction, {
            foreignKey: 'id_definition',
            as: 'Constructions'
        });
        Definition.hasMany(models.Exemple, {
            foreignKey: 'id_definition',
            as: 'Exemples'
        });
    };

    return Definition;
};
