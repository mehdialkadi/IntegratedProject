import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSignOutAlt } from 'react-icons/fa';
import styles from './LocataireDashboard.module.css';
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
        navigate('/locataireAnnonces');
    };

    const handleLogOut = () => {
        axios.post('/api/locataires/logout', {}, { withCredentials: true })
            .then(() => {
                // redirect after logout
                navigate('/login', { replace: true });
            })
            .catch(err => {
                console.error('Logout failed', err);
            });
    }

    const handleReclamationsClick = () => {
        navigate('/locataireReclamations');
    }

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.infoPanel}>

                <button
                    className={styles.logoutButton}
                    onClick={handleLogOut}
                >
                    <FaSignOutAlt size={24}/>
                </button>

                <div className={styles.field}>
                    <span className={styles.label}>Numéro du logement</span>
                    <span className={styles.value}>{logement.numero}</span>
                </div>
                <div className={styles.field}>
                    <span className={styles.label}>Étage</span>
                    <span className={styles.value}>{logement.etage}</span>
                </div>
                <div className={styles.field}>
                    <span className={styles.label}>Propriétaire associé</span>
                    <span className={styles.value}>
            {logement.proprietaire?.nom ?? 'none'}
          </span>
                </div>
                <div className={styles.field}>
                    <span className={styles.label}>Place de garage</span>
                    <span className={styles.value}>
            {logement.placeGarage?.numero ?? 'none'}
          </span>
                </div>
                <div className={styles.field}>
                    <span className={styles.label}>Montant des charges mensuelles</span>
                    <span className={styles.value}>
            {logement.montantChargeMensuelle} MAD
          </span>
                </div>

                <h3
                    className={styles.annoncesHeading}
                    onClick={handleAnnoncesClick}
                >
                    Annonces:
                </h3>
                <ul className={styles.annoncesList}>
                    {annonces.map((titre, idx) => (
                        <li key={idx}>{titre}</li>
                    ))}
                </ul>

                <button className={styles.historyButton} onClick={handleReclamationsClick}>
                    Historique des réclamations
                </button>

            </div>
        </div>
    );
};

export default LocataireDashboard;
