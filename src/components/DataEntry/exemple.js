const React = require('react');
const styles = require('../../styles/DataEntryStyles/exemple.module.css');

const Exemple = ({
    currentExemple,
    onUpdateExemple,
    onDeleteExemple
}) => {
    return (
        <div className={styles.exampleContainer}>
            <div className={styles.exampleText}>
                {currentExemple.exemple}
            </div>
            <div className={styles.buttons}>
                <button
                    onClick={() => onUpdateExemple(currentExemple)}
                    className="dataentryButton editButton"
                >
                    Edit Example
                </button>
                <button
                    onClick={() => onDeleteExemple(currentExemple.id_exemple)}
                    className="dataentryButton deleteButton"
                >
                    Delete Example
                </button>
            </div>
        </div>
    );
};

module.exports = Exemple;
