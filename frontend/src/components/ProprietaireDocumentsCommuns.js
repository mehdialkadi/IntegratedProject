import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ProprietaireDocumentsCommuns.module.css';

axios.defaults.withCredentials = true;

export default function ProprietaireDocumentsCommuns() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading]     = useState(true);
    const [error, setError]         = useState(null);

    useEffect(() => {
        axios.get('/api/documents-communs/getDocumentsByImmeuble')
            .then(({ data }) => setDocuments(data))
            .catch(err => setError(err.response?.data?.message || err.message))
            .finally(() => setLoading(false));
    }, []);

    const downloadFile = (doc) => {
        axios.get(`/api/documents-communs/download/${doc.id}`, {
            responseType: 'blob'
        })
            .then(({ data }) => {
                const url = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement('a');
                link.href = url;
                // Use the original filename or fallback to doc title + extension
                const extension = doc.type || 'bin';
                link.setAttribute('download', `${doc.nom}.${extension}`);
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);
            })
            .catch(err => {
                console.error("Download failed", err);
                alert("Erreur lors du téléchargement.");
            });
    };

    if (loading) return <div className={styles.loading}>Chargement...</div>;
    if (error)   return <div className={styles.error}>Erreur : {error}</div>;

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.infoPanel}>
                <h2>Documents Communs</h2>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>Titre</th>
                        <th>Type de fichier</th>
                        <th>Télécharger</th>
                    </tr>
                    </thead>
                    <tbody>
                    {documents.map(doc => (
                        <tr key={doc.id}>
                            <td>{doc.nom}</td>
                            <td>{doc.type || '—'}</td>
                            <td>
                                <button
                                    className={styles.downloadButton}
                                    onClick={() => downloadFile(doc)}
                                >
                                    Télécharger
                                </button>
                            </td>
                        </tr>
                    ))}
                    {documents.length === 0 && (
                        <tr>
                            <td colSpan="3" style={{textAlign: 'center'}}>Aucun document disponible</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}