const React = require('react');
const styles = require('../../styles/DataEntryStyles/construction.module.css');

const Construction = ({
    currentConstruction,
    onUpdateConstruction,
    onDeleteConstruction
}) => {
    return (
        <div className={styles.constructionContainer}>
            <div className={styles.constructionText}>
                {currentConstruction.construction}
            </div>
            <div className={styles.buttons}>
                <button
                    onClick={() => onUpdateConstruction(currentConstruction)}
                    className="dataentryButton editButton"
                >
                    Edit Construction
                </button>
                <button
                    onClick={() => onDeleteConstruction(currentConstruction.id_construction)}
                    className="dataentryButton deleteButton"
                >
                    Delete Construction
                </button>
            </div>
        </div>
    );
};

module.exports = Construction;
