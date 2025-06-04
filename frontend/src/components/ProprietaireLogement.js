import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSignOutAlt } from 'react-icons/fa';
import styles from './LocataireDashboard.module.css';
import {useNavigate, useParams} from "react-router-dom";

const ProprietaireLogement = () => {
    const { logementId } = useParams();
    const [logement, setLogement] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        async function fetchData() {
            try {
                // 1) Récupérer le logement du Proprietaire courant
                const { data: logData } = await axios.get(`/api/logements/getLogementById/${logementId}`);
                setLogement(logData);
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

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.infoPanel}>

                <button
                    className={styles.logoutButton}
                    onClick={() => navigate(-1)}
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
                <button
                    className={styles.historyButton}
                    onClick={() => navigate('/ProprioReclamations')}
                >
                    Historique des réclamations
                </button>
                <button
                    className={styles.paimentsButton}
                    onClick={() => navigate('/ProprioPaiments')}
                >
                    Historique des paiements
                </button>
            </div>
        </div>
    );
};

export default ProprietaireLogement;