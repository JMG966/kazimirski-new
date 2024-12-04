const React = require('react');
const { useState } = require('react');
const AddRacineModal = require('./ModalForms/RacineModal');
const { handleAdd } = require('../../utils/crudOperations');
const { captureViewportPosition, restoreViewportPosition } = require('../../utils/viewportManager');
require('../../styles/global.css');
const paginationStyles = require('../../styles/DataEntryStyles/pagination.module.css');
const styles = require('../../styles/DataEntry.module.css');

const Pagination = ({
    currentRacine,
    totalRacines,
    currentIndex,
    setCurrentIndex,
    setCurrentRacine,
    isModalOpen
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(null);

    const handleAddRacine = async (newRacine) => {
        setScrollPosition(captureViewportPosition());
        const addedRacine = await handleAdd(
            'racine',
            newRacine,
            null,
            async (added) => {
                const result = await window.electronAPI.racines.search(added.racine);
                setCurrentRacine(result.racine);
                setCurrentIndex(result.currentIndex);
                restoreViewportPosition(scrollPosition);
            },
            setIsAddModalOpen
        );
        return addedRacine;
    };

    const handleSearch = async () => {
        setScrollPosition(captureViewportPosition());
        try {
            const result = await window.electronAPI.racines.search(searchTerm);
            setCurrentRacine(result.racine);
            setCurrentIndex(result.currentIndex);
            restoreViewportPosition(scrollPosition);
        } catch (error) {
            console.error('Search failed:', error);
        }
    };

    const handlePrevious = async () => {
        setScrollPosition(captureViewportPosition());
        const newIndex = Math.max(currentIndex - 1, 0);
        const result = await window.electronAPI.getRacine(newIndex);
        setCurrentRacine(result.racine);
        setCurrentIndex(newIndex);
        restoreViewportPosition(scrollPosition);
    };

    const handleNext = async () => {
        setScrollPosition(captureViewportPosition());
        const newIndex = Math.min(currentIndex + 1, totalRacines - 1);
        const result = await window.electronAPI.getRacine(newIndex);
        setCurrentRacine(result.racine);
        setCurrentIndex(newIndex);
        restoreViewportPosition(scrollPosition);
    };

    return (
        <div className={paginationStyles.paginationContainer}>
            <div className={paginationStyles.racineContainer}>
                <span className={paginationStyles.racine}>{currentRacine.racine}</span>
                &nbsp;-&nbsp;{currentRacine.translitracine}
            </div>
            <div className={paginationStyles.navigationControlsContainer}>
                <button
                    onClick={handlePrevious}
                    className={`button ${paginationStyles.navigationControlsButtons}`}
                    disabled={currentIndex === 0 || isModalOpen}
                >
                    Previous
                </button>
                <span>
                    Racine {totalRacines > 0 ? currentIndex + 1 : 0} of {totalRacines}
                </span>
                <button
                    onClick={handleNext}
                    className={`button ${paginationStyles.navigationControlsButtons}`}
                    disabled={currentIndex === totalRacines - 1 || isModalOpen}
                >
                    Next
                </button>
            </div>
            <div className={paginationStyles.searchContainer}>
                <div className={paginationStyles.searchGroup}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`${paginationStyles.searchInput}`}
                        placeholder="...Search Racine"
                    />
                    <button
                        onClick={handleSearch}
                        className="button"
                    >
                        Search
                    </button>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="dataentryButton addButton"
                >
                    Add Racine
                </button>
            </div>
            <AddRacineModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleAddRacine}
                isEditMode={false}
            />
        </div>
    );
};

module.exports = Pagination;
