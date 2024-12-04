const React = require('react');
const { useRef, forwardRef } = require('react');
const { sortItems } = require('../../utils/arabicUtils');
const { handleEdit, handleDelete, handleAdd } = require('../../utils/crudOperations');
const { focusRacine, captureViewportPosition, restoreViewportPosition } = require('../../utils/viewportManager');
require('../../styles/global.css');
const racineStyles = require('../../styles/DataEntryStyles/racine.module.css');
const styles = require('../../styles/DataEntry.module.css');
const Item = require('./item');

const Racine = forwardRef(({
    currentRacine,
    onUpdateRacine,
    onDeleteRacine,
    currentIndex,
    totalRacines,
    onModalOpen
}, ref) => {
    const itemRefs = useRef({});
    const scrollPosition = useRef(null);

    const handleOpenItemModal = () => {
        scrollPosition.current = captureViewportPosition();
        onModalOpen('item', {
            title: `Add New Item to racine ${currentRacine.racine}`,
            onSubmit: handleAddItem,
            currentRacine: currentRacine
        });
    };

    const handleDeleteRacine = async () => {
        try {
            await handleDelete('racine', currentRacine.id_racine, onDeleteRacine);
        } catch (error) {
            console.error('Failed to delete racine:', error);
        }
    };

    const handleAddItem = async (newItem) => {
        try {
            const addedItem = await handleAdd(
                'item',
                { ...newItem, id_racine: currentRacine.id_racine },
                currentRacine,
                (added) => {
                    const updatedItems = currentRacine.Items ? [...currentRacine.Items, added] : [added];
                    onUpdateRacine({ ...currentRacine, Items: updatedItems });
                    setTimeout(() => {
                        const itemElement = itemRefs.current[added.id_item];
                        if (itemElement) {
                            itemElement.scrollIntoView({ behavior: 'smooth' });
                            itemElement.focus();
                        }
                    }, 100);
                }
            );
            return addedItem;
        } catch (error) {
            console.error('Failed to add item:', error);
            throw error;
        }
    };

    const handleUpdateItem = async (updatedItem) => {
        try {
            const updatedItems = currentRacine.Items.map(item =>
                item.id_item === updatedItem.id_item ? updatedItem : item
            );
            onUpdateRacine({ ...currentRacine, Items: updatedItems });
        } catch (error) {
            console.error('Failed to update item:', error);
        }
    };

    const handleDeleteItem = async (itemId) => {
        try {
            const currentItemIndex = sortedItems.findIndex(item => item.id_item === itemId);
            const isLastItem = currentItemIndex === sortedItems.length - 1;
            const updatedItems = currentRacine.Items.filter(item => item.id_item !== itemId);
            onUpdateRacine({ ...currentRacine, Items: updatedItems });

            setTimeout(() => {
                const nextIndex = isLastItem ? Math.max(0, currentItemIndex - 1) : currentItemIndex;
                if (updatedItems.length > 0) {
                    const targetItem = sortedItems[nextIndex];
                    if (targetItem) {
                        const itemElement = itemRefs.current[targetItem.id_item];
                        if (itemElement) {
                            itemElement.focus();
                        }
                    }
                } else {
                    focusRacine(ref);
                }
            }, 100);
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    };

    const sortedItems = currentRacine.Items
        ? sortItems(currentRacine.Items, currentRacine.r1, currentRacine.r2, currentRacine.r3,
            currentRacine.r4, currentRacine.r5, currentRacine.r6, currentRacine.r7)
        : [];

    return (
        <div className={racineStyles.racineWrapper} ref={ref}>
            <div className={racineStyles.racineTopContainer}>
                <div className={racineStyles.racineWrapper}>
                    <div className={racineStyles.racineTopContainer}>
                        <div className={racineStyles.racineGrid}>
                            {['R7', 'R6', 'R5', 'R4', 'R3', 'R2', 'R1', '', 'Seq1', 'Seq2', 'Seq3', 'Seq4', 'Seq5', 'Seq6'].map(label => (
                                <div key={label} className={racineStyles[label]}>{label}</div>
                            ))}
                            {['r7', 'r6', 'r5', 'r4', 'r3', 'r2', 'r1', '', 'seq1', 'seq2', 'seq3', 'seq4', 'seq5', 'seq6'].map(field => (
                                <div key={field} className={`arabicText ${racineStyles[field]}`}>{currentRacine[field]}</div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={racineStyles.buttonsContainer}>
                    <button onClick={handleDeleteRacine} className="dataentryButton deleteButton">
                        Delete Racine
                    </button>
                    <button
                        onClick={handleOpenItemModal}
                        className="dataentryButton addButton"
                    >
                        Add Item
                    </button>
                </div>
            </div>
            <div className={styles.itemsContainer}>
                {sortedItems.map((item, index) => (
                    <Item
                        key={item.id_item}
                        ref={el => itemRefs.current[item.id_item] = el}
                        currentItem={item}
                        onUpdateItem={handleUpdateItem}
                        onDeleteItem={handleDeleteItem}
                        sortedItems={sortedItems}
                        currentIndex={index}
                        onModalOpen={onModalOpen}
                    />
                ))}
            </div>
        </div>
    );
});

module.exports = Racine;
