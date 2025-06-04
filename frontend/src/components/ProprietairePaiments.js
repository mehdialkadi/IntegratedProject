import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './ProprietairePaiments.module.css'; // Add your own styles

axios.defaults.withCredentials = true;

export default function ProprietairePaiments() {
    const [paiements, setPaiements] = useState([]);
    const [loading, setLoading]   = useState(true);
    const [error, setError]       = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPaiements() {
            try {
                const response = await axios.get('/api/paiements/getPaiementByLogement');
                setPaiements(response.data);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchPaiements();
    }, []);

    if (loading) return <div className={styles.loading}>Chargement...</div>;
    if (error) return <div className={styles.error}>Erreur : {error}</div>;

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

                <h3 className={styles.title}>Liste des paiements</h3>

                {/* Paiements Table */}
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Montant</th>
                        <th>Statut</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paiements.map((paiement) => (
                        <tr key={paiement.id}>
                            <td>{new Date(paiement.date).toLocaleDateString()}</td>
                            <td>{paiement.montant} MAD</td>
                            <td>{paiement.factureEnvoye ? 'Envoyé' : 'Non envoyé'}</td>

                        </tr>
                    ))}
                    {paiements.length === 0 && (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>
                                Aucun paiement trouvé
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
