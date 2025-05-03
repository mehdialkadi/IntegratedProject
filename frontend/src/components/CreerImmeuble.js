import React, { useState } from 'react';
import axios from 'axios';

const CreerImmeuble = () => {
    const [nom, setNom] = useState('');
    const [adresse, setAdresse] = useState('');
    const [nombreAppart, setNombreAppart] = useState('');
    const [garage, setGarage] = useState(false);
    const [nombrePlaceGarage, setNombrePlaceGarage] = useState('');
    const [aAscenseur, setAAscenseur] = useState(false);
    const [aConcierge, setAConcierge] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const immeuble = {
            nom,
            adresse,
            nombreAppart,
            garage,
            nombrePlaceGarage,
            aAscenseur,
            aConcierge
        };

        try {
            // Axios envoie la requête POST au backend
            await axios.post('http://localhost:8082/api/immeubles', immeuble, {
                headers: {
                    'Content-Type': 'application/json' // Déclare le type du contenu, généralement géré par Axios
                }
            });
            setMessage("✅ Immeuble créé avec succès !");
            // Reset des champs du formulaire
            setNom('');
            setAdresse('');
            setNombreAppart('');
            setGarage(false);
            setNombrePlaceGarage('');
            setAAscenseur(false);
            setAConcierge(false);
        } catch (error) {
            console.error("Erreur lors de l’envoi :", error);
            setMessage("❌ Échec de la création de l’immeuble.");
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Créer un Immeuble</h2>

            {message && <p style={styles.message}>{message}</p>}

            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Nom de l'immeuble :</label>
                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Adresse :</label>
                    <input
                        type="text"
                        value={adresse}
                        onChange={(e) => setAdresse(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Nombre d'appartements :</label>
                    <input
                        type="number"
                        value={nombreAppart}
                        onChange={(e) => setNombreAppart(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Garage :</label>
                    <input
                        type="checkbox"
                        checked={garage}
                        onChange={(e) => setGarage(e.target.checked)}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Nombre de places de garage :</label>
                    <input
                        type="number"
                        value={nombrePlaceGarage}
                        onChange={(e) => setNombrePlaceGarage(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Ascenseur :</label>
                    <input
                        type="checkbox"
                        checked={aAscenseur}
                        onChange={(e) => setAAscenseur(e.target.checked)}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Concierge :</label>
                    <input
                        type="checkbox"
                        checked={aConcierge}
                        onChange={(e) => setAConcierge(e.target.checked)}
                    />
                </div>

                <button type="submit" style={styles.submitButton}>
                    Envoyer l'immeuble
                </button>
            </form>
        </div>
    );
};

// Styles
const styles = {
    container: {
        padding: '20px',
        maxWidth: '600px',
        margin: 'auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    title: {
        textAlign: 'center',
        fontSize: '24px',
        color: '#333',
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        fontSize: '16px',
        color: '#555',
        marginBottom: '5px',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100%',
    },
    submitButton: {
        padding: '10px 20px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#4CAF50',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    message: {
        textAlign: 'center',
        fontSize: '18px',
        color: '#333',
        marginBottom: '20px',
    }
};

export default CreerImmeuble;
