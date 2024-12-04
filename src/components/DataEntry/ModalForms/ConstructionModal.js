const React = require('react');
const { useState, useEffect } = require('react');
const styles = require('../../../styles/DataEntryStyles/ModalFormStyles/ConstructionModal.module.css');

const ConstructionModal = ({ isOpen, onClose, onSubmit, currentConstruction, isEditMode }) => {
    const [formData, setFormData] = useState({
        construction: ''
    });

    useEffect(() => {
        if (currentConstruction && isEditMode) {
            setFormData({
                construction: currentConstruction.construction || ''
            });
        }
    }, [currentConstruction, isEditMode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit(formData);
            onClose();
        } catch (error) {
            console.error('Error submitting construction:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>{isEditMode ? 'Edit Construction' : 'Add New Construction'}</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.modalBody}>
                        <div className={styles.formGroup}>
                            <label>Construction</label>
                            <textarea
                                value={formData.construction}
                                onChange={(e) => setFormData({ ...formData, construction: e.target.value })}
                                className="mixedContent"
                            />
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

module.exports = ConstructionModal;
