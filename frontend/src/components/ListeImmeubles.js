import React, { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

const ListeImmeubles = () => {
    const [immeubles, setImmeubles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Faire une requête GET pour récupérer les immeubles
        axios.get('/api/immeubles')
            .then((response) => {
                setImmeubles(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Erreur lors du chargement des immeubles :", err);
                setError("Impossible de charger les immeubles.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Chargement des immeubles...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Liste des Immeubles</h2>
            <ul style={styles.list}>
                {immeubles.map((immeuble) => (
                    <li key={immeuble.id} style={styles.listItem}>
                        <h3>{immeuble.nom}</h3>
                        <p>Adresse: {immeuble.adresse}</p>
                        <p>Nombre d'appartements: {immeuble.nombreAppart}</p>
                        <p>Garage: {immeuble.garage ? "Oui" : "Non"}</p>
                        <p>Ascenseur: {immeuble.aAscenseur ? "Oui" : "Non"}</p>
                        <p>Concierge: {immeuble.aConcierge ? "Oui" : "Non"}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
    },
    title: {
        textAlign: 'center',
    },
    list: {
        listStyleType: 'none',
        padding: 0,
    },
    listItem: {
        border: '1px solid #ddd',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
    },
};

export default ListeImmeubles;
