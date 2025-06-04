import React, { useState } from 'react';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './LocataireCreateReclamations.module.css';

// ensure cookies are sent
axios.defaults.withCredentials = true;

export default function ProprietaireCreateReclamation() {
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                '/api/reclamations/createProprioReclamation',
                { titre, description }
            );
            // on success, go back to list
            navigate(-1);
        } catch (err) {
            setError('Erreur lors de la soumission');
        }
    };

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

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="titre">Titre:</label>
                        <input
                            id="titre"
                            type="text"
                            value={titre}
                            onChange={e => setTitre(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className={styles.error}>{error}</p>}

                    <button
                        type="submit"
                        className={styles.submitButton}
                    >
                        Soumettre
                    </button>
                </form>
            </div>
        </div>
    );
}