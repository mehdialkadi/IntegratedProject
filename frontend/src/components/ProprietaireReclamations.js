import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './LocataireReclamations.module.css';


export default function ProprietaireReclamations() {
    const [reclamations, setReclamations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('/api/reclamations/getReclamationsByLogement')
            .then(({ data }) => setReclamations(data))
            .catch(err => setError(err.response?.data?.message || err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="loading">Chargement…</div>;
    if (error)   return <div className="error">Erreur : {error}</div>;

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.infoPanel}>

                {/* Back Button */}
                <button
                    className={styles.backButton}
                    onClick={() => navigate(-1)}
                >
                    <FaArrowLeft />
                </button>

                {/* New Reclamation Button */}
                <button
                    className={styles.newButton}
                    onClick={() => navigate('/ProprioCreateReclamation')}
                >
                    <FaPlus /> Nouvelle réclamation
                </button>

                <h3 className={styles.reclamationsHeading}>Réclamations :</h3>
                <ul className={styles.reclamationList}>
                    {reclamations.map(r => (
                        <li key={r.id} className={styles.reclamationItem}>
                            <h4>{r.titre}</h4>
                            <p>{r.description}</p>
                            <p>{r.date}</p>
                            <p>{r.etat}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}