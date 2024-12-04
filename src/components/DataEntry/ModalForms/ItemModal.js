const React = require('react');
const { useState, useEffect } = require('react');
const styles = require('../../../styles/DataEntryStyles/ModalFormStyles/ItemModal.module.css');

const ItemModal = ({ isOpen, onClose, onSubmit, currentItem, isEditMode, currentRacine }) => {
    const [formData, setFormData] = useState({
        id_racine: currentRacine?.id_racine || '',
        item: '',
        translititem: '',
        autresformesitem: '',
        formcat: '',
        xscheme: ''
    });

    useEffect(() => {
        if (currentItem && isEditMode) {
            setFormData({
                id_racine: currentItem.id_racine,
                item: currentItem.item || '',
                translititem: currentItem.translititem || '',
                autresformesitem: currentItem.autresformesitem || '',
                formcat: currentItem.formcat || '',
                xscheme: currentItem.xscheme || ''
            });
        }
    }, [currentItem, isEditMode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit(formData);
            onClose();
        } catch (error) {
            console.error('Error submitting item:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>{isEditMode ? 'Edit Item' : 'Add New Item'}</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.modalBody}>
                        <div className={styles.formGroup}>
                            <label>Item</label>
                            <input
                                type="text"
                                value={formData.item}
                                onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                                className="arabicFields"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Translit. Item</label>
                            <input
                                type="text"
                                value={formData.translititem}
                                onChange={(e) => setFormData({ ...formData, translititem: e.target.value })}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Autres Formes Item</label>
                            <input
                                type="text"
                                value={formData.autresformesitem}
                                onChange={(e) => setFormData({ ...formData, autresformesitem: e.target.value })}
                                className="arabicFields"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Form Cat</label>
                            <input
                                type="text"
                                value={formData.formcat}
                                onChange={(e) => setFormData({ ...formData, formcat: e.target.value })}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>xScheme</label>
                            <input
                                type="text"
                                value={formData.xscheme}
                                onChange={(e) => setFormData({ ...formData, xscheme: e.target.value })}
                                className="arabicFields"
                            />
                        </div>
                    </div>
                    <div className={styles.modalFooter}>
                        <div className={styles.buttonGroup}>
                            <button type="button" onClick={onClose} className={styles.cancelButton}>
                                Cancel
                            </button>
                            <button type="submit" className={styles.submitButton}>
                                {isEditMode ? 'Update' : 'Add'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

module.exports = ItemModal;
