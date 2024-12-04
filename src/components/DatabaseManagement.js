const React = require('react');
const { useState, useEffect } = require('react');

const DatabaseManagement = () => {
    const [racines, setRacines] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/racines')
            .then(response => response.json())
            .then(data => setRacines(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
            <h1>Database Management</h1>
            <ul>
                {racines.map(racine => (
                    <li key={racine.id_racine}>{racine.racine} - {racine.translitracine}</li>
                ))}
            </ul>
        </div>
    );
};

module.exports = DatabaseManagement;
