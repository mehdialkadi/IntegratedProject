import React, { useState } from 'react';
import Immeubles from './Immeubles';
import CreateAnnonceForm from './CreateAnnonceForm';
import CreerLogement from './CreerLogement';
import ResidencyForm from './ResidencyForm';  // Import du formulaire de création de résidence
import ImmeubleForm from './ImmeubleForm';
import ResidencesList from './ResidencesList';
import './Dashboard.css';
import ListeImmeubles from "./ListeImmeubles";
import LogementForm from "./LogementForm";
import LoginForm from "./LoginForm";

const Dashboard = () => {
    const [activeComponent, setActiveComponent] = useState('immeubles');
    const [isLoggedIn, setIsLoggedIn] = useState(true); // pour gérer la déconnexion

    const handleLogout = () => {
        setIsLoggedIn(false); // Mettre à jour l'état de la déconnexion
    };

    const renderContent = () => {
        switch (activeComponent) {
            case 'immeubles':
                return <Immeubles />;
            case 'creerLogement':
                return <LogementForm />;
            case 'creerAnnonce':
                return <CreateAnnonceForm />;
            case 'creerResidency':
                return <ResidencyForm />; // Formulaire de création de résidence
            case 'creerImmeuble':
                return <ImmeubleForm />;
            case 'listeresidence':
                return <ResidencesList />;
            case 'ListeImmeubles':
                return <ListeImmeubles />;
            default:
                return <Immeubles />;
        }
    };

    if (!isLoggedIn) {
        return <LoginForm />; // Retour au formulaire de connexion si déconnecté
    }

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <h2 style={{marginBottom: '30px'}}>🏠 Menu</h2>
                <button onClick={() => setActiveComponent('creerImmeuble')}>Créer Immeuble</button>
                <button onClick={() => setActiveComponent('creerResidency')}>Créer Résidence</button>
                <button onClick={() => setActiveComponent('creerLogement')}>Créer Logement</button>

                <button onClick={() => setActiveComponent('creerAnnonce')}>Créer Annonce</button>
                <button onClick={() => setActiveComponent('listeresidence')}>liste residence</button>
                <button onClick={() => setActiveComponent('ListeImmeubles')}>ListeImmeubles</button>


                <div className="spacer"/>

                <button className="logout-btn" onClick={handleLogout}>🚪 Se Déconnecter</button>
            </div>
            <div className="content">
                {renderContent()}
            </div>
        </div>
    );
};

export default Dashboard;