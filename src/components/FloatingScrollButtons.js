const React = require('react');
const { FiArrowUp, FiArrowDown } = require('react-icons/fi');
const styles = require('../styles/FloatingScrollButtons.module.css');

const FloatingScrollButtons = ({ isModalOpen }) => {
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleScrollToBottom = () => {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    };

    return (
        <div className={styles.floatingButtonsContainer}>
            <button
                onClick={handleScrollToTop}
                className={styles.floatingButton}
                disabled={isModalOpen}
            >
                ↑
            </button>
            <button
                onClick={handleScrollToBottom}
                className={styles.floatingButton}
                disabled={isModalOpen}
            >
                ↓
            </button>
        </div>
    );
};

module.exports = FloatingScrollButtons;
