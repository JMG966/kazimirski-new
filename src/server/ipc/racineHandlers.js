const { ipcMain } = require('electron');
const { Op } = require('sequelize');
const { models } = require('../models');

const setupRacineHandlers = () => {
    ipcMain.handle('racines:get', async (event, index) => {
        try {
            const racine = await models.Racine.findOne({
                where: { id_racine: index },
                include: [{
                    model: models.Item,
                    as: 'Items',
                    include: [{
                        model: models.Definition,
                        as: 'Definitions',
                        include: [
                            { model: models.Construction, as: 'Constructions' },
                            { model: models.Exemple, as: 'Exemples' }
                        ]
                    }]
                }]
            });
            return racine;
        } catch (error) {
            console.error('Error fetching racine:', error);
            throw error;
        }
    });

    ipcMain.handle('racines:getCount', async () => {
        try {
            const count = await models.Racine.count();
            return count;
        } catch (error) {
            console.error('Error fetching racine count:', error);
            throw error;
        }
    });

    ipcMain.handle('racines:search', async (event, term) => {
        try {
            const racines = await models.Racine.findAll({
                where: {
                    racine: {
                        [Op.like]: `%${term}%`
                    }
                }
            });
            return racines;
        } catch (error) {
            console.error('Error searching racines:', error);
            throw error;
        }
    });
};

module.exports = { setupRacineHandlers };
