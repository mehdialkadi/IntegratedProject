import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {FaArrowLeft, FaSignOutAlt} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './ProprietaireDashboard.module.css';

axios.defaults.withCredentials = true;

export default function ProprietaireDashboard() {
    const [logements, setLogements] = useState([]);
    const [annonces, setAnnonces]   = useState([]);
    const [loading, setLoading]     = useState(true);
    const [error, setError]         = useState(null);
    const navigate                   = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                // 1) Récupérer les logements du propriétaire
                const { data: logData } = await axios.get(
                    '/api/logements/getLogementsByProprio'     // backend doit renvoyer List<Logement>
                );
                setLogements(logData);

                // 2) Récupérer les annonces qui concernent tous ses immeubles
                //    Supposez un endpoint qui retourne List<String> titres
                const { data: annData } = await axios.get(
                    '/api/annonces//getLastThreeAnnonceForProprio'
                );
                setAnnonces(annData);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) return <div className={styles.loading}>Chargement…</div>;
    if (error)   return <div className={styles.error}>Erreur : {error}</div>;

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

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.infoPanel}>

                {/* Back Button */}
                <button
                    className={styles.backButton}
                    onClick={handleLogOut}
                >
                    <FaSignOutAlt size={24}/>
                </button>

                {/* Documents & Réunions Buttons */}
                <div className={styles.topButtons}>
                    <button
                        className={styles.docsButton}
                        onClick={() => navigate('/ProprioDocuments')}
                    >
                        Documents communs
                    </button>
                    <button
                        className={styles.docsButton}
                        onClick={() => navigate('/ProprioFactures')}
                    >
                        Factures de l'immeuble
                    </button>
                    <button
                        className={styles.reunionsButton}
                        onClick={() => navigate('/ProprioReunions')}
                    >
                        Réunions
                    </button>
                </div>

                {/* Logements Cards */}
                <div className={styles.logementsContainer}>
                    {logements.map(log => (
                        <div key={log.id} className={styles.logementCard} onClick={() => navigate(`/ProprioLogement/${log.idLogement}`)}>
                            <p><strong>N° Logement :</strong> {log.numero}</p>
                            <p><strong>Étage :</strong> {log.etage}</p>
                            <p><strong>Charges :</strong> {log.montantChargeMensuelle} MAD</p>
                            <p>
                                <strong>Garage :</strong>{' '}
                                {log.placesGarage && log.placesGarage.length > 0
                                    ? log.placesGarage[0].numero
                                    : 'none'}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Annonces Section */}
                <h3
                    className={styles.annoncesHeading}
                    onClick={() => navigate('/ProprioAnnonces')}
                >
                    Annonces :
                </h3>
                <ul className={styles.annoncesList}>
                    {annonces.map((titre, idx) => (
                        <li key={idx}>{titre}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}