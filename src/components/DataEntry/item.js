const React = require('react');
const { useMemo, useRef } = require('react');
const Definition = require('./definition');
const styles = require('../../styles/DataEntryStyles/item.module.css');

const Item = ({
    currentItem,
    onUpdateItem,
    onDeleteItem,
    sortedItems,
    currentIndex
}) => {
    const definitionRefs = useRef({});

    const sortedDefinitions = useMemo(() => {
        return (currentItem.Definitions || []).sort((a, b) =>
            a.definition.localeCompare(b.definition, 'ar')
        );
    }, [currentItem.Definitions]);

    return (
        <div
            className={styles.itemWrapper}
            data-item={currentItem.item}
            data-translititem={currentItem.translititem}
            tabIndex="-1"
        >
            <div className={styles.itemTopContainer}>
                <div className={styles.itemContainer}>
                    <div className={styles.row1}>
                        <span className={styles.item}>{currentItem.item}</span>
                        <span className={styles.translititem}>{currentItem.translititem}</span>
                        <span className={styles.formcat}>{currentItem.formcat}</span>
                        {currentItem.xscheme && (
                            <div className={styles.xscheme}>
                                <span className={styles.xschemeLabel}>xScheme:&nbsp;</span>
                                <span className="arabicText">{currentItem.xscheme}</span>
                            </div>
                        )}
                    </div>
                    {currentItem.autresformesitem && (
                        <div className={styles.row2}>
                            <span>{currentItem.autresformesitem}</span>
                        </div>
                    )}
                </div>
                <div className={styles.buttonsContainer}>
                    <button onClick={() => onUpdateItem(currentItem)} className="dataentryButton editButton">
                        Edit Item
                    </button>
                    <button onClick={() => onDeleteItem(currentItem.id_item)} className="dataentryButton deleteButton">
                        Delete Item
                    </button>
                </div>
            </div>
            <div className={styles.itemScrollableContent}>
                <div className={styles.definitionsContainer}>
                    {sortedDefinitions.map(definition => (
                        <Definition
                            key={definition.id_definition}
                            ref={el => definitionRefs.current[definition.id_definition] = el}
                            currentDefinition={definition}
                            formcat={currentItem.formcat}
                            item={currentItem.item}
                            onUpdateDefinition={(updatedDefinition) => {
                                const updatedDefinitions = currentItem.Definitions.map(d =>
                                    d.id_definition === updatedDefinition.id_definition ? updatedDefinition : d
                                );
                                onUpdateItem({ ...currentItem, Definitions: updatedDefinitions });
                            }}
                            onDeleteDefinition={(definitionId) => {
                                const updatedDefinitions = currentItem.Definitions.filter(d =>
                                    d.id_definition !== definitionId
                                );
                                onUpdateItem({ ...currentItem, Definitions: updatedDefinitions });
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

module.exports = Item;
