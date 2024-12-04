const React = require('react');
const { useState, useEffect } = require('react');
const styles = require('../../../styles/DataEntryStyles/ModalFormStyles/RacineModal.module.css');

const RacineModal = ({ isOpen, onClose, onSubmit, currentRacine, isEditMode }) => {
    const [formData, setFormData] = useState({
        r1: '', r2: '', r3: '', r4: '', r5: '', r6: '', r7: '',
        seq1: '', seq2: '', seq3: '', seq4: '', seq5: '', seq6: '',
        racine: '', translitracine: ''
    });

    useEffect(() => {
        if (currentRacine && isEditMode) {
            setFormData({
                r1: currentRacine.r1 || '',
                r2: currentRacine.r2 || '',
                r3: currentRacine.r3 || '',
                r4: currentRacine.r4 || '',
                r5: currentRacine.r5 || '',
                r6: currentRacine.r6 || '',
                r7: currentRacine.r7 || '',
                seq1: currentRacine.seq1 || '',
                seq2: currentRacine.seq2 || '',
                seq3: currentRacine.seq3 || '',
                seq4: currentRacine.seq4 || '',
                seq5: currentRacine.seq5 || '',
                seq6: currentRacine.seq6 || '',
                racine: currentRacine.racine || '',
                translitracine: currentRacine.translitracine || ''
            });
        }
    }, [currentRacine, isEditMode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit(formData);
            onClose();
        } catch (error) {
            console.error('Error submitting racine:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>{isEditMode ? 'Edit Racine' : 'Add New Racine'}</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.modalBody}>
                        <div className={styles.rContainer}>
                            {['r7', 'r6', 'r5', 'r4', 'r3', 'r2', 'r1'].map((r) => (
                                <div key={r} className={styles.rField}>
                                    <label htmlFor={r}>{r}</label>
                                    <input
                                        id={r}
                                        type="text"
                                        value={formData[r]}
                                        onChange={(e) => setFormData({ ...formData, [r]: e.target.value })}
                                        className="arabicFields"
                                        maxLength={1}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className={styles.formGroup}>
                            <label>Racine</label>
                            <input
                                type="text"
                                value={formData.racine}
                                onChange={(e) => setFormData({ ...formData, racine: e.target.value })}
                                className="arabicFields"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Translit. Racine</label>
                            <input
                                type="text"
                                value={formData.translitracine}
                                onChange={(e) => setFormData({ ...formData, translitracine: e.target.value })}
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

module.exports = RacineModal;
