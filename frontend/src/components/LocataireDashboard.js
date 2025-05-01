import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSignOutAlt } from 'react-icons/fa';
import './LocataireDashboard.css';
import {useNavigate} from "react-router-dom";

const LocataireDashboard = () => {
    const [logement, setLogement] = useState(null);
    const [annonces, setAnnonces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        async function fetchData() {
            try {
                // 1) Récupérer le logement du locataire courant
                const { data: logData } = await axios.get('/api/logements/getLogementByLocataire');
                setLogement(logData);

                // 2) Récupérer les annonces pour l'immeuble du logement
                const { data: annData } = await axios.get(`/api/annonces/getLastThreeAnnonce`);
                setAnnonces(annData);
            } catch (err) {
                // Axios jette sur les codes non-2xx
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) return <div className="loading">Chargement…</div>;
    if (error)   return <div className="error">Erreur : {error}</div>;

    const handleAnnoncesClick = () => {
        console.log('Annonces header clicked!');
    };

    const handleLogOut = async () => {
        axios.post('/api/locataires/logout', {}, { withCredentials: true })
            .then(() => {
                // redirect after logout
                navigate('/', { replace: true });
            })
            .catch(err => {
                console.error('Logout failed', err);
            });
    }

    return (
        <div className="dashboard-container">
            <div className="info-panel">
                <button className="logout-button">
                    <FaSignOutAlt size={24} />
                </button>

                {/* Champs dynamiques */}
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
                    <span className="value">{logement.proprietaire.nom}</span>
                </div>
                <div className="field">
                    <span className="label">Place de garage</span>
                    <span className="value">
                        {logement.placeGarage
                            ? logement.placeGarage.numero
                            : 'none'}
                    </span>
                </div>
                <div className="field">
                    <span className="label">Montant des charges mensuelles</span>
                    <span className="value">{logement.montantChargeMensuelle} MAD</span>
                </div>

                <h3 className="annonces-heading" onClick={handleAnnoncesClick}>
                    Annonces:
                </h3>
                <ul className="annonces-list">
                    {annonces.map((titre, idx) => (
                        <li key={idx}>{titre}</li>
                    ))}
                </ul>

                <button className="history-button" onClick={handleLogOut}>
                    Historique des réclamations
                </button>
            </div>
        </div>
    );
};

export default LocataireDashboard;
