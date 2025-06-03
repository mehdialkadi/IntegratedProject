import React, { useEffect, useState } from "react";
import './ReclamationList.css';

function ReclamationList() {
    const [reclamations, setReclamations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/reclamations")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erreur lors du chargement");
                }
                return response.json();
            })
            .then((data) => {
                setReclamations(data);
            })
            .catch((error) => {
                setError(error.message);
                console.error("Erreur lors de la récupération :", error);
            });
    }, []);

    return (
        <div className="reclamation-container">
            <h2>Liste des Réclamations</h2>
            {error && <p className="reclamation-error">⚠ {error}</p>}
            {!error && reclamations.length === 0 && <p className="reclamation-loading">Chargement...</p>}

            {reclamations.map((rec) => (
                <div key={rec.id} className="reclamation-card">
                    <p><strong>ID :</strong> {rec.id}</p>
                    <p><strong>Titre :</strong> {rec.titre}</p>
                    <p><strong>Description :</strong> {rec.description}</p>
                    <p><strong>État :</strong> {rec.etat}</p>

                    <h3>Utilisateur</h3>
                    <p><strong>Nom :</strong> {rec.utilisateur?.nom}</p>
                    <p><strong>Prénom :</strong> {rec.utilisateur?.prenom}</p>

                    <h3>Logement</h3>
                    <p><strong>Numéro du logement :</strong> {rec.logement?.numero}</p>
                </div>
            ))}
        </div>
    );
}

export default ReclamationList;
