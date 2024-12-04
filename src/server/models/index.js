const { Sequelize } = require('sequelize');
const config = require('../config/config');
const RacineModel = require('./Racine');
const ItemModel = require('./Item');
const DefinitionModel = require('./Definition');
const ConstructionModel = require('./Construction');
const ExempleModel = require('./Exemple');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

const modelDefiners = [
    RacineModel,
    ItemModel,
    DefinitionModel,
    ConstructionModel,
    ExempleModel
];

const models = {};

// Initialize models
modelDefiners.forEach(modelDefiner => {
    const model = modelDefiner(sequelize);
    models[model.name] = model;
});

// Set up associations
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

module.exports = { models, sequelize };
