const React = require('react');
const { useState, useEffect } = require('react');
const { formcatVerbal } = require('../../../utils/constants');
const styles = require('../../../styles/DataEntryStyles/ModalFormStyles/DefinitionModal.module.css');

const DefinitionModal = ({ isOpen, onClose, onSubmit, currentDefinition, isEditMode, formcat, itemValue }) => {
    const [formData, setFormData] = useState({
        voyinacc: '',
        masdar1: '', masdar2: '', masdar3: '', masdar4: '',
        masdar5: '', masdar6: '', masdar7: '', masdar8: '',
        autresmasdars: '',
        estpluriel: false,
        pluriel1: '', pluriel2: '', pluriel3: '', pluriel4: '',
        pluriel5: '', pluriel6: '', pluriel7: '', pluriel8: '',
        autrespluriels: '',
        origine: '',
        diptote: false,
        collectif: false,
        definition: '',
        remarque: ''
    });

    useEffect(() => {
        if (currentDefinition && isEditMode) {
            setFormData({
                voyinacc: currentDefinition.voyinacc || '',
                masdar1: currentDefinition.masdar1 || '',
                masdar2: currentDefinition.masdar2 || '',
                masdar3: currentDefinition.masdar3 || '',
                masdar4: currentDefinition.masdar4 || '',
                masdar5: currentDefinition.masdar5 || '',
                masdar6: currentDefinition.masdar6 || '',
                masdar7: currentDefinition.masdar7 || '',
                masdar8: currentDefinition.masdar8 || '',
                autresmasdars: currentDefinition.autresmasdars || '',
                estpluriel: currentDefinition.estpluriel || false,
                pluriel1: currentDefinition.pluriel1 || '',
                pluriel2: currentDefinition.pluriel2 || '',
                pluriel3: currentDefinition.pluriel3 || '',
                pluriel4: currentDefinition.pluriel4 || '',
                pluriel5: currentDefinition.pluriel5 || '',
                pluriel6: currentDefinition.pluriel6 || '',
                pluriel7: currentDefinition.pluriel7 || '',
                pluriel8: currentDefinition.pluriel8 || '',
                autrespluriels: currentDefinition.autrespluriels || '',
                origine: currentDefinition.origine || '',
                diptote: currentDefinition.diptote || false,
                collectif: currentDefinition.collectif || false,
                definition: currentDefinition.definition || '',
                remarque: currentDefinition.remarque || ''
            });
        }
    }, [currentDefinition, isEditMode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit(formData);
            onClose();
        } catch (error) {
            console.error('Error submitting definition:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>{isEditMode ? 'Edit Definition' : `Add Definition for ${itemValue}`}</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.firstRow}>
                        <div className={styles.fieldGroup}>
                            <label>Voy. inacc.</label>
                            <input
                                type="text"
                                value={formData.voyinacc}
                                onChange={(e) => setFormData({ ...formData, voyinacc: e.target.value })}
                                maxLength={3}
                            />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Origine</label>
                            <input
                                type="text"
                                value={formData.origine}
                                onChange={(e) => setFormData({ ...formData, origine: e.target.value })}
                            />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Diptote</label>
                            <input
                                type="checkbox"
                                checked={formData.diptote}
                                onChange={(e) => setFormData({ ...formData, diptote: e.target.checked })}
                            />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Collectif</label>
                            <input
                                type="checkbox"
                                checked={formData.collectif}
                                onChange={(e) => setFormData({ ...formData, collectif: e.target.checked })}
                            />
                        </div>
                    </div>

                    <div className={styles.formLayout}>
                        <div className={styles.gridContainer}>
                            {formcatVerbal.includes(formcat) ? (
                                <div className={styles.gridContainer.masdar}>
                                    {/* Masdar fields */}
                                </div>
                            ) : (
                                <div className={styles.gridContainer.pluriel}>
                                    {/* Pluriel fields */}
                                </div>
                            )}
                        </div>

                        <div className={styles.definitionSection}>
                            <div className={styles.definitionField}>
                                <label>Definition</label>
                                <textarea
                                    value={formData.definition}
                                    onChange={(e) => setFormData({ ...formData, definition: e.target.value })}
                                    className="mixedContent"
                                />
                            </div>
                            <div className={styles.remarqueField}>
                                <label>Remarque</label>
                                <textarea
                                    value={formData.remarque}
                                    onChange={(e) => setFormData({ ...formData, remarque: e.target.value })}
                                    className="mixedContent"
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.buttonGroup}>
                        <button type="button" onClick={onClose} className={styles.cancelButton}>
                            Cancel
                        </button>
                        <button type="submit" className={styles.submitButton}>
                            {isEditMode ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

module.exports = DefinitionModal;
