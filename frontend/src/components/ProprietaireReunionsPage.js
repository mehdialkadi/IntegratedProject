import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './ProprietaireDashboard.module.css'; // reuse your existing panel CSS

axios.defaults.withCredentials = true;

export default function ProprietaireReunionsPage() {
    const [reunions, setReunions] = useState([]);
    const [loading, setLoading]   = useState(true);
    const [error, setError]       = useState(null);
    const navigate                 = useNavigate();

    useEffect(() => {
        axios.get('/api/reunions/getReunionsByImmeuble')
            .then(({ data }) => setReunions(data))
            .catch(err => setError(err.response?.data?.message || err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className={styles.loading}>Chargement…</div>;
    if (error)   return <div className={styles.error}>Erreur : {error}</div>;

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.infoPanel}>

                {/* Back Button */}
                <button
                    className={styles.backButton}
                    onClick={() => navigate(-1)}
                >
                    <FaArrowLeft /> Retour
                </button>

                <h3 className={styles.annoncesHeading}>Réunions à venir :</h3>

                {reunions.length === 0 ? (
                    <p>Aucune réunion prévue pour le moment.</p>
                ) : (
                    <ul className={styles.annoncesList}>
                        {reunions.map(r => (
                            <li key={r.id}>
                                <h4>{r.titre}</h4>
                                <p>{r.description}</p>
                                <p>{r.lieu}</p>
                                <small>
                                    {new Date(r.date).toLocaleString(undefined, {
                                        dateStyle: 'long',
                                    })}
                                    <small> </small>at {r.heure}
                                </small>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}