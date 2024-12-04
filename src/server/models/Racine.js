const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Racine = sequelize.define('Racine', {
        id_racine: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        racine: DataTypes.STRING(7),
        translitracine: DataTypes.STRING(7),
        r1: DataTypes.CHAR(1),
        r2: DataTypes.CHAR(1),
        r3: DataTypes.CHAR(1),
        r4: DataTypes.CHAR(1),
        r5: DataTypes.CHAR(1),
        r6: DataTypes.CHAR(1),
        r7: DataTypes.CHAR(1),
        seq1: DataTypes.CHAR(6),
        seq2: DataTypes.CHAR(6),
        seq3: DataTypes.CHAR(6),
        seq4: DataTypes.CHAR(6),
        seq5: DataTypes.CHAR(6),
        seq6: DataTypes.CHAR(6)
    }, {
        tableName: 'racines',
        timestamps: false
    });

    Racine.associate = (models) => {
        Racine.hasMany(models.Item, {
            foreignKey: 'id_racine',
            as: 'Items'
        });
    };

    return Racine;
};
