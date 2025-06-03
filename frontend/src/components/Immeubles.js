import React, { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

const Immeubles = () => {
    const [immeubles, setImmeubles] = useState([]);
    const [immeubleSelectionne, setImmeubleSelectionne] = useState(null);
    const [logements, setLogements] = useState([]);
    const [afficherLogements, setAfficherLogements] = useState(false);
    const [error, setError] = useState(null); // Ajout de l'état d'erreur

    useEffect(() => {
        const fetchImmeubles = async () => {
            try {
                const response = await axios.get('/api/immeubles');
                // Vérifier si la réponse est un tableau avant de l'assigner
                if (Array.isArray(response.data)) {
                    setImmeubles(response.data);
                } else {
                    throw new Error('La réponse n\'est pas un tableau');
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des immeubles :", error);
                setError("Erreur lors du chargement des immeubles");
            }
        };
        fetchImmeubles();
    }, []);

    const handleClick = (immeuble) => {
        setImmeubleSelectionne(immeuble);
        setAfficherLogements(false); // Réinitialiser l'affichage des logements
    };

    const chargerLogements = async () => {
        if (!immeubleSelectionne) return;

        try {
            const response = await axios.get('/api/logements');
            const logementsImmeuble = response.data.filter(log => log.immeuble.id === immeubleSelectionne.id);
            setLogements(logementsImmeuble);
            setAfficherLogements(true);
        } catch (error) {
            console.error("Erreur lors de la récupération des logements :", error);
            setError("Erreur lors du chargement des logements");
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Liste des Immeubles</h2>

            {/* Affichage des erreurs */}
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {Array.isArray(immeubles) && immeubles.length > 0 ? (
                    immeubles.map((imm) => (
                        <button
                            key={imm.id}
                            onClick={() => handleClick(imm)}
                            style={{
                                padding: '10px 20px',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                backgroundColor: '#f5f5f5',
                                cursor: 'pointer',
                                boxShadow: '2px 2px 5px rgba(0,0,0,0.1)'
                            }}
                        >
                            🏢 {imm.nom}
                        </button>
                    ))
                ) : (
                    <p>Aucun immeuble trouvé.</p>
                )}
            </div>

            {immeubleSelectionne && (
                <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
                    <h3>Détails de l'immeuble sélectionné</h3>
                    <p><strong>Nom :</strong> {immeubleSelectionne.nom}</p>
                    <p><strong>Adresse :</strong> {immeubleSelectionne.adresse}</p>
                    <p><strong>Surface :</strong> {immeubleSelectionne.surface} m²</p>
                    <p><strong>Nombre d'étages :</strong> {immeubleSelectionne.nbrEtages}</p>
                    <p><strong>Description :</strong> {immeubleSelectionne.description}</p>

                    <button
                        onClick={chargerLogements}
                        style={{
                            marginTop: '10px',
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        📋 Liste des logements
                    </button>

                    {afficherLogements && (
                        <div style={{ marginTop: '15px' }}>
                            <h4>Logements de l'immeuble</h4>
                            {logements.length > 0 ? (
                                <ul>
                                    {logements.map(log => (
                                        <li key={log.id}>
                                            <strong>Numéro :</strong> {log.numero} |{" "}
                                            <strong>Surface :</strong> {log.surface} m² |{" "}
                                            <strong>Type :</strong> {log.type}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Aucun logement trouvé pour cet immeuble.</p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Immeubles;
