const React = require('react');
const { useState, useEffect, useRef, useCallback } = require('react');
const styles = require('../styles/DataEntry.module.css');

const Lexique = () => {
    const [definitions, setDefinitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const searchInputRef = useRef(null);

    const fetchDefinitions = useCallback(async () => {
        try {
            setLoading(true);
            const response = await window.electronAPI.getDefinitions(page, 10, searchTerm);
            setDefinitions(response.definitions);
            setTotalPages(response.totalPages);
            setLoading(false);
        } catch (error) {
            setError('Error fetching definitions: ' + error.message);
            setLoading(false);
        }
    }, [page, searchTerm]);

    useEffect(() => {
        fetchDefinitions();
    }, [fetchDefinitions]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        fetchDefinitions();
        searchInputRef.current.blur();
    };

    const handlePrevPage = () => {
        setPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setPage(prev => Math.min(prev + 1, totalPages));
    };

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    const groupedDefinitions = definitions.reduce((acc, def) => {
        const racine = def.Item?.racine || 'Unknown';
        const formcat = def.Item?.formcat || 'Unknown';
        if (!acc[racine]) {
            acc[racine] = {};
        }
        if (!acc[racine][formcat]) {
            acc[racine][formcat] = [];
        }
        acc[racine][formcat].push(def);
        return acc;
    }, {});

    return (
        <div className={styles.definitionList}>
            <h2 className={styles.title}>Arabic-French Definitions</h2>
            <form onSubmit={handleSearch} className={styles.searchForm}>
                <input
                    ref={searchInputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search definitions..."
                    className={styles.searchInput}
                />
                <button type="submit" className={styles.searchButton}>Search</button>
            </form>

            <div className={styles.definitionsContainer}>
                {Object.entries(groupedDefinitions).map(([racine, formcats]) => (
                    <div key={racine} className={styles.racineGroup}>
                        <h3 className={styles.racineTitle}>{racine}</h3>
                        {Object.entries(formcats).map(([formcat, defs]) => (
                            <div key={formcat} className={styles.formcatGroup}>
                                <h4 className={styles.formcatTitle}>{formcat}</h4>
                                <ul className={styles.list}>
                                    {defs.map(def => (
                                        <li key={def.id_definition} className={styles.item}>
                                            <div className={styles.termWrapper}>
                                                <span className={styles.term}>{def.Item?.item}</span>
                                                <span className={styles.transliteration}>({def.Item?.translititem})</span>
                                            </div>
                                            <div className={styles.definition}>{def.definition}</div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className={styles.pagination}>
                <button
                    onClick={handlePrevPage}
                    className={styles.button}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span className={styles.pageInfo}>
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    className={styles.button}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

module.exports = Lexique;
