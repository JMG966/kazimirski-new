const React = require('react');
const { useState, useEffect } = require('react');
const styles = require('../../../styles/DataEntryStyles/ModalFormStyles/ExempleModal.module.css');

const ExempleModal = ({ isOpen, onClose, onSubmit, currentExemple, isEditMode }) => {
    const [formData, setFormData] = useState({
        exemple: ''
    });

    useEffect(() => {
        if (currentExemple && isEditMode) {
            setFormData({
                exemple: currentExemple.exemple || ''
            });
        }
    }, [currentExemple, isEditMode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit(formData);
            onClose();
        } catch (error) {
            console.error('Error submitting exemple:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>{isEditMode ? 'Edit Exemple' : 'Add New Exemple'}</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.modalBody}>
                        <div className={styles.formGroup}>
                            <label>Exemple</label>
                            <textarea
                                value={formData.exemple}
                                onChange={(e) => setFormData({ ...formData, exemple: e.target.value })}
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

module.exports = ExempleModal;
