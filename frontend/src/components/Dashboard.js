import React, { useState } from 'react';
import Immeubles from './Immeubles';
import CreateAnnonceForm from './CreateAnnonceForm';
import ResidencyForm from './ResidencyForm';
import ImmeubleForm from './ImmeubleForm';
import ResidencesList from './ResidencesList';
import LoginForm from './LoginForm';
import ListeImmeubles from "./ListeImmeubles";
import LogementForm from "./LogementForm";
import CreateFacture from './CreateFacture'; // ✅ Import du formulaire de facture


import './Dashboard.css';

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
                return <ResidencyForm />;
            case 'creerImmeuble':
                return <ImmeubleForm />;
            case 'listeresidence':
                return <ResidencesList />;
            case 'ListeImmeubles':
                return <ListeImmeubles />;
            case 'creerFacture':
                return <CreateFacture />; // ✅ Affichage du formulaire facture
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
                <h2 style={{ marginBottom: '30px' }}>Menu</h2>
                <button onClick={() => setActiveComponent('creerImmeuble')}>Créer Immeuble</button>
                <button onClick={() => setActiveComponent('creerResidency')}>Créer Résidence</button>
                <button onClick={() => setActiveComponent('creerLogement')}>Créer Logement</button>
                <button onClick={() => setActiveComponent('creerAnnonce')}>Créer Annonce</button>
                <button onClick={() => setActiveComponent('listeresidence')}>Liste Résidence</button>
                <button onClick={() => setActiveComponent('ListeImmeubles')}>Liste Immeubles</button>
                <button onClick={() => setActiveComponent('creerFacture')}>Créer Facture Immeuble</button> {/* ✅ Ajout du bouton */}

                <div className="spacer" />
                <button className="logout-btn" onClick={handleLogout}>Se Déconnecter</button>
            </div>
            <div className="content">
                {renderContent()}
            </div>
        </div>
    );
};

export default Dashboard;
