const React = require('react');

const Introduction = () => {
    return (
        <div>
            <h1>Introduction</h1>
            <p>Welcome to the Kazimirski Dictionary project.</p>
            <h2>Origine</h2>
            <p>D'un échange avec Jean-Claude Rolland (éminent lexicographe) au sujet de la génèse de son oeuvre "Dictionnaire des Séquences Bilitères de l'Arabe Classique", le besoin d'utiliser une version numérique du dictionnaire Arabe-Français d'Albin Biberstein Kazimirski s'est rapidement imposé comme une nécessité pour aller de l'avant et économiser du temps dans l'utilisation de l'oeuvre.</p>
            <p>Structure de la base de données</p>
            <p>Elle reflète la structure du dictionnaire avec les différents niveaux de description des éléments:</p>
            <p>Racine, Item, Definition, Construction et Exemple</p>
        </div>
    );
};

module.exports = Introduction;
