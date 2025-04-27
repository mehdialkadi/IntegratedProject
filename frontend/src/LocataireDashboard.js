import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import './LocataireDashboard.css';

const LocataireDashboard = () => {
    const logement = {
        numero: 9,
        etage: '5 ème',
        proprio: 'ff',
        placeGarage: 5,
        montantCharges: 400,
    };
    const annonces = ['annonce1', 'annonce2', 'annonce3'];

    const handleAnnoncesClick = () => {
        console.log('Annonces header clicked!');
        // you could navigate, open a modal, etc.
    };

    return (
        <div className="dashboard-container">
            <div className="info-panel">

                {/* Logout Icon */}
                <button className="logout-button">
                    <FaSignOutAlt size={24} />
                </button>

                {/* Property Fields */}
                <div className="field">
                    <span className="label">Numéro du logement</span>
                    <span className="value">{logement.numero}</span>
                </div>
                <div className="field">
                    <span className="label">Étage</span>
                    <span className="value">{logement.etage}</span>
                </div>
                <div className="field">
                    <span className="label">Propriétaire associé</span>
                    <span className="value">{logement.proprio}</span>
                </div>
                <div className="field">
                    <span className="label">Place de garage</span>
                    <span className="value">{logement.placeGarage}</span>
                </div>
                <div className="field">
                    <span className="label">Montant des charges mensuelles</span>
                    <span className="value">{logement.montantCharges}</span>
                </div>

                {/* Annonces List */}
                <div className="annonces">
                    <h3 className="annonces-heading" onClick={handleAnnoncesClick}>Annonces:</h3>
                    <ul className="annonces-list">
                        {annonces.map((a, i) => (
                            <li key={i}>{a}</li>
                        ))}
                    </ul>
                </div>

                {/* Button */}
                <button className="history-button">
                    Historique des réclamations
                </button>
            </div>
        </div>
    );
};

export default LocataireDashboard;
