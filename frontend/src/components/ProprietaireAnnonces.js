// src/AnnoncesPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './LocataireAnnonces.module.css';
import {FaArrowLeft} from "react-icons/fa";
import {useNavigate} from "react-router-dom";  // reuse the same styles

axios.defaults.withCredentials = true;

const ProprietaireAnnonces = () => {
    const [annonces, setAnnonces] = useState([]);
    const [loading,  setLoading]  = useState(true);
    const [error,    setError]    = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/annonces/getAllImmeubleAnnoncesForProprio')
            .then(({ data }) => setAnnonces(data))
            .catch(err => setError(err.response?.data?.message || err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="loading">Chargement…</div>;
    if (error)   return <div className="error">Erreur : {error}</div>;

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.infoPanel}>
                <button
                    className={styles.backButton}
                    onClick={() => navigate(-1)}
                >
                    <FaArrowLeft size={20}/>
                </button>
                <h3 className={styles.annoncesHeading}>Annonces :</h3>
                <ul className={styles.annoncesList}>
                    {annonces.map(a => (
                        <li key={a.id}>
                            <h4>{a.titre}</h4>
                            <p>{a.contenu}</p>
                            <small>{new Date(a.date).toLocaleDateString()}</small>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProprietaireAnnonces;