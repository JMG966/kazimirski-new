const React = require('react');
const { useState, useEffect } = require('react');
const Pagination = require('./DataEntry/pagination');
const Racine = require('./DataEntry/racine');
const FloatingScrollButtons = require('./FloatingScrollButtons');
const styles = require('../styles/DataEntry.module.css');

console.log('Styles loaded:', styles);

const DataEntry = () => {
    const [currentRacine, setCurrentRacine] = useState({ racine: '', translitracine: '' });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [totalRacines, setTotalRacines] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const loadInitialRacine = async () => {
            try {
                const count = await window.electronAPI.getRacineCount();
                const response = await window.electronAPI.getRacine(1);
                setCurrentRacine(response);
                setCurrentIndex(1);
                setTotalRacines(count);
            } catch (error) {
                console.error('Error loading initial racine:', error);
            }
        };
        loadInitialRacine();
    }, []);

    return (
        <div className={styles.dataEntryWrapper}>
            <div className={styles.paginationWrapper}>
                <Pagination
                    currentRacine={currentRacine}
                    totalRacines={totalRacines}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    setCurrentRacine={setCurrentRacine}
                />
            </div>
            <div className={styles.racineWrapper}>
                {currentRacine && (
                    <Racine
                        currentRacine={currentRacine}
                        onUpdateRacine={setCurrentRacine}
                        onDeleteRacine={() => {
                            const nextIndex = currentIndex === totalRacines - 1
                                ? Math.max(0, currentIndex - 1)
                                : currentIndex;
                            setCurrentIndex(nextIndex);
                        }}
                        currentIndex={currentIndex}
                        totalRacines={totalRacines}
                    />
                )}
            </div>
            <FloatingScrollButtons />
        </div>
    );
};

module.exports = DataEntry;
