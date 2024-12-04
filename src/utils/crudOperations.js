const { captureViewportPosition, restoreViewportPosition } = require('./viewportManager');

const handleApiRequest = async (entityType, method, data = null) => {
    try {
        const result = await window.electronAPI[entityType][method](data);
        return result;
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
};

const handleEdit = async (entityType, id, data, onUpdate) => {
    const updatedEntity = await handleApiRequest(entityType, 'update', { id, ...data });
    if (updatedEntity) {
        onUpdate(updatedEntity);
        return updatedEntity;
    }
};

const handleDelete = async (entityType, id, onDelete) => {
    if (!window.confirm(`Are you sure you want to delete this ${entityType}?`)) {
        return;
    }

    if (entityType === 'racine') {
        const items = await handleApiRequest('items', 'getByRacineId', id);
        for (const item of items) {
            const definitions = await handleApiRequest('definitions', 'getByItemId', item.id_item);
            for (const definition of definitions) {
                await handleApiRequest('definitions', 'delete', definition.id_definition);
            }
            await handleApiRequest('items', 'delete', item.id_item);
        }
    }

    await handleApiRequest(entityType, 'delete', id);
    onDelete();
};

const handleAdd = async (entityType, data, parent, onUpdate, setModalOpen) => {
    const scrollPosition = captureViewportPosition();
    const added = await handleApiRequest(entityType, 'create', data);
    if (added) {
        onUpdate(added);
        setModalOpen(false);
        restoreViewportPosition(scrollPosition);
        return added;
    }
};

const handleSubmit = async (entityType, data, mode, onSubmit) => {
    const scrollPosition = captureViewportPosition();
    const method = mode === 'edit' ? 'update' : 'create';
    const result = await handleApiRequest(entityType, method, data);
    if (result) {
        onSubmit(result);
        restoreViewportPosition(scrollPosition);
        return result;
    }
};

const handleUpdate = async (entityType, id, data, onUpdate) => {
    const updatedEntity = await handleApiRequest(entityType, 'update', { id, ...data });
    if (updatedEntity) {
        onUpdate(updatedEntity);
        return updatedEntity;
    }
};

module.exports = {
    handleEdit,
    handleDelete,
    handleAdd,
    handleSubmit,
    handleUpdate
};
