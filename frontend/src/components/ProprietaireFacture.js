import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './ProprietaireFacture.module.css'; // Add your own styles

axios.defaults.withCredentials = true;

export default function ProprietaireFacture() {
    const [factures, setFactures] = useState([]);
    const [loading, setLoading]     = useState(true);
    const [error, setError]         = useState(null);
    const navigate                 = useNavigate();

    useEffect(() => {
        async function fetchFactures() {
            try {
                const response = await axios.get('/api/factures-immeuble/getFactureByImmeuble');
                setFactures(response.data);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchFactures();
    }, []);

    const downloadFile = (facture) => {
        axios.get(`/api/factures-immeuble/download/${facture.id}`, {
            responseType: 'blob'
        })
            .then(({ data, headers }) => {
                const url = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement('a');
                // Use the original filename or fallback to facture title + extension
                const extension = facture.type || 'bin';
                link.setAttribute('download', `${facture.description}.${extension}`);
                document.body.appendChild(link);
                link.href = url;
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);
            })
            .catch(err => {
                console.error('Download failed', err);
                alert('Erreur lors du téléchargement.');
            });
    };

    if (loading) return <div className={styles.loading}>Chargement...</div>;
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

                <h3 className={styles.title}>Liste des Factures</h3>

                {/* Factures Table */}
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>Description</th>
                        <th>Montant</th>
                        <th>Date</th>
                        <th>Télécharger</th>
                    </tr>
                    </thead>
                    <tbody>
                    {factures.map((facture) => (
                        <tr key={facture.id}>
                            <td>{facture.description}</td>
                            <td>{facture.montant} MAD</td>
                            <td>{new Date(facture.date).toLocaleDateString()}</td>
                            <td>
                                <button
                                    className={styles.downloadButton}
                                    onClick={() => downloadFile(facture)}
                                >
                                    Télécharger
                                </button>
                            </td>
                        </tr>
                    ))}
                    {factures.length === 0 && (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>
                                Aucune facture disponible
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
