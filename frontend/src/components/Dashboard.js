import React, { useState } from 'react';
import CreateAnnonceForm from './CreateAnnonceForm';
import ResidencyForm from './ResidencyForm';
import ImmeubleForm from './ImmeubleForm';
import ResidencesList from './ResidencesList';
import PaiementForm from './PaiementForm';
import PaiementList from './PaiementList';
import FactureForm from './FactureForm';
import FactureList from './FactureList';
import LoginForm from './LoginForm';
import DashboardStats from './DashboardStats';
import LogementForm from './LogementForm';
import CreatePlaceGarage from './CreatePlaceGarage';
import ListeAnnonces from './ListeAnnonces';
import ReclamationDetails from './ReclamationDetails';
import './Dashboard.css';

const Dashboard = () => {
    const [activeComponent, setActiveComponent] = useState('stats');
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const renderContent = () => {
        switch (activeComponent) {
            case 'creerResidency': return <ResidencyForm />;
            case 'creerImmeuble': return <ImmeubleForm />;
            case 'LogementForm': return <LogementForm />;
            case 'listeresidence': return <ResidencesList />;
            case 'CreateAnnonce': return <CreateAnnonceForm />;
            case 'ListeAnnonces': return <ListeAnnonces />;
            case 'ReclamationDetails': return <ReclamationDetails />;// ✅ Ajouté
            case 'PaiementForm': return <PaiementForm />;
            case 'PaiementList': return <PaiementList />;
            case 'FactureForm': return <FactureForm />;
            case 'FactureList': return <FactureList />;
            case 'CreatePlaceGarage': return <CreatePlaceGarage />;
            case 'stats':
            default: return <DashboardStats />;

        }
    };

    if (!isLoggedIn) {
        return <LoginForm onLoginSuccess={() => setIsLoggedIn(true)} />;
    }

    return (
        <div className="dashboard-container">
            <div className="topbar">
                <div className="topbar-title">🏠 Tableau de Bord - Résidences</div>

                {/* Statistiques */}
                <div className="section">
                    <h4>📊 Tableau de bord</h4>
                    <button onClick={() => setActiveComponent('stats')}>Voir les statistiques</button>
                </div>

                {/* Section Gestion Résidences */}
                <div className="section">
                    <h4>🏢 Gestion des Résidences</h4>
                    <button onClick={() => setActiveComponent('creerResidency')}>Créer Résidence</button>
                    <button onClick={() => setActiveComponent('creerImmeuble')}>Créer Immeuble</button>
                    <button onClick={() => setActiveComponent('LogementForm')}>Créer Logement</button>
                    <button onClick={() => setActiveComponent('CreatePlaceGarage')}>Créer Place Garage</button>
                    <button onClick={() => setActiveComponent('listeresidence')}>Liste Résidences</button>
                </div>

                {/* Section Gestion Annonces */}
                <div className="section">
                    <h4>📢 Annonces</h4>
                    <button onClick={() => setActiveComponent('CreateAnnonce')}>Créer Annonce</button>
                    <button onClick={() => setActiveComponent('ListeAnnonces')}>Liste Annonces</button>
                    <button onClick={() => setActiveComponent('ReclamationDetails')}>CReclamationDetails</button>
                </div>

                {/* Section Paiements et Factures */}
                <div className="section">
                    <h4>💰 Paiements & Factures</h4>
                    <button onClick={() => setActiveComponent('PaiementForm')}>Créer Paiement</button>
                    <button onClick={() => setActiveComponent('PaiementList')}>Liste Paiements</button>
                    <button onClick={() => setActiveComponent('FactureForm')}>Créer Facture</button>
                    <button onClick={() => setActiveComponent('FactureList')}>Liste Factures</button>
                </div>

                {/* Déconnexion */}
                <div className="section">
                    <button className="logout-btn" onClick={handleLogout}>🚪 Déconnexion</button>
                </div>
            </div>

            <div className="main-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default Dashboard;
