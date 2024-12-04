const React = require('react');
const { useEffect } = require('react');

const Quit = () => {
    useEffect(() => {
        window.electronAPI.quitApp();
    }, []);

    return <div>Quitting application...</div>;
};

module.exports = Quit;
