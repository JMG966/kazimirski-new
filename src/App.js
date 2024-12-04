const React = require('react');
const { BrowserRouter, Routes, Route } = require('react-router-dom');
const Layout = require('./components/Layout');
const Introduction = require('./components/Introduction');
const DataEntry = require('./components/DataEntry');
const DatabaseManagement = require('./components/DatabaseManagement');
const Tools = require('./components/Tools');
const Lexique = require('./components/Lexique');
const Acknowledgements = require('./components/Acknowledgements');
const References = require('./components/References');
const Quit = require('./components/Quit');

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Introduction />} />
                    <Route path="/introduction" element={<Introduction />} />
                    <Route path="/data-entry" element={<DataEntry />} />
                    <Route path="/database-management" element={<DatabaseManagement />} />
                    <Route path="/tools" element={<Tools />} />
                    <Route path="/definitions" element={<Lexique />} />
                    <Route path="/acknowledgements" element={<Acknowledgements />} />
                    <Route path="/references" element={<References />} />
                    <Route path="/quit" element={<Quit />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

module.exports = App;
