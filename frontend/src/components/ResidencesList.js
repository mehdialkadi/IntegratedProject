import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ResidencyDetails() {
    const [residencies, setResidencies] = useState([]);
    const [selectedResidence, setSelectedResidence] = useState(null);
    const [selectedImmeuble, setSelectedImmeuble] = useState(null);
    const [selectedLogement, setSelectedLogement] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get("/api/residencies")
            .then(response => {
                setResidencies(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Erreur lors du chargement des résidences');
                setLoading(false);
            });
    }, []);

    const handleResidenceClick = (residence) => {
        setSelectedResidence(residence);
        setSelectedImmeuble(null);
        setSelectedLogement(null);
    };

    const handleImmeubleClick = (immeuble) => {
        setSelectedImmeuble(immeuble);
        setSelectedLogement(null);
    };

    const handleLogementClick = (logement) => {
        setSelectedLogement(logement);
        console.log("Détails du logement sélectionné:", logement);
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Liste des Résidences</h1>

            {residencies.length === 0 ? (
                <p>Aucune résidence trouvée.</p>
            ) : (
                <div>
                    {/* Liste des résidences */}
                    <div>
                        {residencies.map((residence) => (
                            <button
                                key={residence.id}
                                onClick={() => handleResidenceClick(residence)}
                                style={buttonStyle}
                            >
                                {residence.nom}
                            </button>
                        ))}
                    </div>

                    {/* Détails de la résidence sélectionnée */}
                    {selectedResidence && (
                        <div style={detailsStyle}>
                            <h2>{selectedResidence.nom}</h2>
                            <p>Adresse: {selectedResidence.adresse}</p>

                            <h3>Immeubles:</h3>
                            {selectedResidence.immeubles?.length > 0 ? (
                                <ul>
                                    {selectedResidence.immeubles.map((immeuble) => (
                                        <li key={immeuble.id}>
                                            <button
                                                onClick={() => handleImmeubleClick(immeuble)}
                                                style={buttonStyle}
                                            >
                                                {immeuble.nom} - {immeuble.adresse}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Aucun immeuble disponible</p>
                            )}
                        </div>
                    )}

                    {/* Détails de l'immeuble sélectionné */}
                    {selectedImmeuble && (
                        <div style={detailsStyle}>
                            <h3>{selectedImmeuble.nom}</h3>
                            <p>Adresse: {selectedImmeuble.adresse}</p>
                            <p>Nombre d'appartements: {selectedImmeuble.nombreAppart}</p>
                            <p>Garage: {selectedImmeuble.garage ? 'Disponible' : 'Non disponible'}</p>
                            <p>Nombre de places: {selectedImmeuble.nombrePlaceGarage}</p>
                            <p>Ascenseur: {selectedImmeuble.aAscenceur ? 'Présent' : 'Absent'}</p>
                            <p>Concierge: {selectedImmeuble.aConcierge ? 'Présent' : 'Absent'}</p>

                            <h4>Logements:</h4>
                            {selectedImmeuble.logements?.length > 0 ? (
                                <ul>
                                    {selectedImmeuble.logements.map((logement) => (
                                        <li key={logement.idLogement}>
                                            <button
                                                onClick={() => handleLogementClick(logement)}
                                                style={buttonStyle}
                                            >
                                                Logement {logement.numero} - Étage {logement.etage}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Aucun logement disponible</p>
                            )}
                        </div>
                    )}

                    {/* Détails du logement sélectionné */}
                    {selectedLogement && (
                        <div style={detailsStyle}>
                            <h4>Logement {selectedLogement.numero} (Étage {selectedLogement.etage})</h4>
                            <p>Charge mensuelle: {selectedLogement.montantChargeMensuelle} MAD</p>
                            <p>
                                Propriétaire :{" "}
                                {selectedLogement.proprietaire?.nom
                                    ? `${selectedLogement.proprietaire.nom} ${selectedLogement.proprietaire.prenom}`
                                    : "Non spécifié"}
                            </p>
                            <p>
                                Locataire :{" "}
                                {selectedLogement.locataire?.nom
                                    ? `${selectedLogement.locataire.nom} ${selectedLogement.locataire.prenom}`
                                    : "Non spécifié"}
                            </p>
                            <p>
                                Place de garage :{" "}
                                {selectedLogement.placeGarage?.numero
                                    ? `N° ${selectedLogement.placeGarage.numero}`
                                    : "Aucune"}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

const buttonStyle = {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease',
};

const detailsStyle = {
    marginTop: '20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
};

export default ResidencyDetails;
