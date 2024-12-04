const React = require('react');
const { useMemo, useRef } = require('react');
const Construction = require('./construction');
const Exemple = require('./exemple');
const { formcatVerbal } = require('../../utils/constants');
const styles = require('../../styles/DataEntryStyles/definition.module.css');

const Definition = ({
    currentDefinition,
    onUpdateDefinition,
    onDeleteDefinition,
    formcat,
    item
}) => {
    const constructionRefs = useRef({});
    const exempleRefs = useRef({});

    const sortedConstructions = useMemo(() => {
        return (currentDefinition.Constructions || []).sort((a, b) =>
            a.construction.localeCompare(b.construction, 'ar')
        );
    }, [currentDefinition.Constructions]);

    const sortedExemples = useMemo(() => {
        return (currentDefinition.Exemples || []).sort((a, b) =>
            a.exemple.localeCompare(b.exemple, 'ar')
        );
    }, [currentDefinition.Exemples]);

    return (
        <div className={styles.definitionWrapper}>
            <div className={styles.contentContainer}>
                <div className={styles.columnLeft}>
                    <div className={styles.definitionHeader}>
                        {currentDefinition.voyinacc && (
                            <span className={styles.voyinacc}>Voy. inacc. : {currentDefinition.voyinacc}</span>
                        )}
                        {currentDefinition.diptote && (
                            <span className={styles.diptote}>Diptote</span>
                        )}
                        {currentDefinition.origine && (
                            <span className={styles.origine}>Origine : {currentDefinition.origine}</span>
                        )}
                        {currentDefinition.collectif && (
                            <span className={styles.collectif}>Collectif</span>
                        )}
                    </div>
                    <div className={styles.definitionContainer}>
                        {formcatVerbal.includes(formcat) ? (
                            <div className={styles.masdarRow}>
                                <span className={styles.masdarLabel}>Masdar:</span>
                                <div className={styles.masdarList}>
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num, index) =>
                                        currentDefinition[`masdar${num}`] && (
                                            <span key={num} className="arabicText">
                                                {currentDefinition[`masdar${num}`]}
                                                {index < 7 && currentDefinition[`masdar${num + 1}`] && ", "}
                                            </span>
                                        )
                                    )}
                                </div>
                                <div className={styles.autresMasdarsContainer}>
                                    {currentDefinition.autresmasdars}
                                </div>
                            </div>
                        ) : (
                            <div className={styles.plurielRow}>
                                {currentDefinition.estpluriel && (
                                    <span>Est pluriel</span>
                                )}
                                <span className={styles.plurielLabel}>Pluriel:</span>
                                <div className={styles.plurielList}>
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num, index) =>
                                        currentDefinition[`pluriel${num}`] && (
                                            <span key={num} className="arabicText">
                                                {currentDefinition[`pluriel${num}`]}
                                                {index < 7 && currentDefinition[`pluriel${num + 1}`] && ", "}
                                            </span>
                                        )
                                    )}
                                </div>
                                <div className={styles.autresPlurielsContainer}>
                                    {currentDefinition.autrespluriels}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.buttonsContainer}>
                    <button onClick={() => onUpdateDefinition(currentDefinition)} className="dataentryButton editButton">
                        Edit Definition
                    </button>
                    <button onClick={() => onDeleteDefinition(currentDefinition.id_definition)} className="dataentryButton deleteButton">
                        Delete Definition
                    </button>
                </div>
            </div>
            <div className={styles.gridContainer}>
                <div className={currentDefinition.definition ? styles.defContainer : styles.invisible}>
                    <div className={styles.definitionLabel}>Definition</div>
                    <div className="mixedContent">{currentDefinition.definition}</div>
                </div>
                <div className={currentDefinition.remarque ? styles.remContainer : styles.invisible}>
                    <div className={styles.remarqueLabel}>Remarque</div>
                    <div className="mixedContent">{currentDefinition.remarque}</div>
                </div>
                <div className={styles.cstContainer}>
                    {sortedConstructions.map(construction => (
                        <Construction
                            key={construction.id_construction}
                            ref={el => constructionRefs.current[construction.id_construction] = el}
                            currentConstruction={construction}
                            onUpdateConstruction={onUpdateDefinition}
                            onDeleteConstruction={onDeleteDefinition}
                        />
                    ))}
                </div>
                <div className={styles.xplContainer}>
                    {sortedExemples.map(exemple => (
                        <Exemple
                            key={exemple.id_exemple}
                            ref={el => exempleRefs.current[exemple.id_exemple] = el}
                            currentExemple={exemple}
                            onUpdateExemple={onUpdateDefinition}
                            onDeleteExemple={onDeleteDefinition}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

module.exports = Definition;
