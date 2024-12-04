const React = require('react');
const { useState, useEffect } = require('react');
const { Link, useLocation } = require('react-router-dom');
const { FiPower } = require('react-icons/fi');
const styles = require('../styles/Layout.module.css');
require('../styles/global.css');

const Layout = ({ children }) => {
    const [activeTab, setActiveTab] = useState('/');
    const location = useLocation();

    useEffect(() => {
        setActiveTab(location.pathname);
    }, [location]);

    const handleTabClick = (path) => {
        setActiveTab(path);
    };

    const handleQuit = () => {
        if (window.electronAPI) {
            window.electronAPI.quitApp();
        }
    };

    return (
        <div className={styles.layout}>
            <header className={styles.header}>
                <h1>Kazimirski Dictionary Project</h1>
            </header>
            <nav className={styles.nav}>
                <Link
                    to="/"
                    className={`${styles.navLink} ${activeTab === '/' ? styles.activeNavLink : ''}`}
                    onClick={() => handleTabClick('/')}
                >
                    Introduction
                </Link>
                <Link
                    to="/data-entry"
                    className={`${styles.navLink} ${activeTab === '/data-entry' ? styles.activeNavLink : ''}`}
                    onClick={() => handleTabClick('/data-entry')}
                >
                    Data Entry
                </Link>
                <Link
                    to="/database-management"
                    className={`${styles.navLink} ${activeTab === '/database-management' ? styles.activeNavLink : ''}`}
                    onClick={() => handleTabClick('/database-management')}
                >
                    Database Management
                </Link>
                <Link
                    to="/tools"
                    className={`${styles.navLink} ${activeTab === '/tools' ? styles.activeNavLink : ''}`}
                    onClick={() => handleTabClick('/tools')}
                >
                    Tools
                </Link>
                <Link
                    to="/definitions"
                    className={`${styles.navLink} ${activeTab === '/definitions' ? styles.activeNavLink : ''}`}
                    onClick={() => handleTabClick('/definitions')}
                >
                    Lexique
                </Link>
                <Link
                    to="/acknowledgements"
                    className={`${styles.navLink} ${activeTab === '/acknowledgements' ? styles.activeNavLink : ''}`}
                    onClick={() => handleTabClick('/acknowledgements')}
                >
                    Acknowledgements
                </Link>
                <Link
                    to="/references"
                    className={`${styles.navLink} ${activeTab === '/references' ? styles.activeNavLink : ''}`}
                    onClick={() => handleTabClick('/references')}
                >
                    References
                </Link>
                <button onClick={handleQuit} className={styles.quitButton}>
                    <FiPower size={24} className={styles.quitIcon} />
                </button>
            </nav>
            <main className={styles.main}>
                {children}
            </main>
            <footer className={styles.footer}>
                <p>&copy; 2024 Kazimirski Dictionary Project</p>
            </footer>
        </div>
    );
};

module.exports = Layout;
