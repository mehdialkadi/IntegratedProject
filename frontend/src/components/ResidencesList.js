import React, { useEffect, useState } from 'react';
import axios from 'axios';

<<<<<<< HEAD
const ResidencesList = () => {
    const [residences, setResidences] = useState([]);
    const [loading, setLoading] = useState(true);
=======
axios.defaults.withCredentials = true;

function ResidencyDetails() {
    const [residencies, setResidencies] = useState([]);
    const [selectedResidency, setSelectedResidency] = useState(null);
    const [immeubles, setImmeubles] = useState([]);
    const [loadingImmeubles, setLoadingImmeubles] = useState(false);
>>>>>>> c8024bd9c9bf17eabccd9848bbfe906ad5ca66e9
    const [error, setError] = useState(null);
    const [selectedResidence, setSelectedResidence] = useState(null);
    const [selectedImmeuble, setSelectedImmeuble] = useState(null);
    const [selectedLogement, setSelectedLogement] = useState(null); // Etat pour le logement sélectionné

    useEffect(() => {
<<<<<<< HEAD
        axios.get('http://localhost:8080/api/residencies')
=======
        axios.get("/api/residencies")
>>>>>>> c8024bd9c9bf17eabccd9848bbfe906ad5ca66e9
            .then(response => {
                setResidences(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Erreur lors du chargement des résidences');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleResidenceClick = (residence) => {
        setSelectedResidence(residence);
        setSelectedImmeuble(null);
        setSelectedLogement(null);  // Réinitialiser le logement sélectionné
    };

    const handleImmeubleClick = (immeuble) => {
        setSelectedImmeuble(immeuble);
        setSelectedLogement(null); // Réinitialiser le logement sélectionné
    };

<<<<<<< HEAD
    const handleLogementClick = (logement) => {
        setSelectedLogement(logement);
        console.log("Détails du logement sélectionné:", logement);  // Affichage détaillé dans la console
=======
                const response = await axios.get(`/api/residencies/${selectedResidency.id}/immeubles`);
                setImmeubles(response.data);  // Mettre à jour la liste des immeubles
            } catch (error) {
                console.error("Erreur lors du chargement des immeubles :", error);
                setError("Erreur lors du chargement des immeubles.");
            } finally {
                setLoadingImmeubles(false);
            }
        }
>>>>>>> c8024bd9c9bf17eabccd9848bbfe906ad5ca66e9
    };

    return (
        <div>
            <h1>Liste des Résidences</h1>
            {residences.length === 0 ? (
                <p>Aucune résidence trouvée.</p>
            ) : (
                <div>
                    {/* Affichage des résidences */}
                    <div>
                        {residences.map((residence) => (
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
                            <ul>
                                {selectedResidence.immeubles && selectedResidence.immeubles.length > 0 ? (
                                    selectedResidence.immeubles.map((immeuble) => (
                                        <li key={immeuble.id}>
                                            <button
                                                onClick={() => handleImmeubleClick(immeuble)}
                                                style={buttonStyle}
                                            >
                                                {immeuble.nom} - {immeuble.adresse}
                                            </button>
                                        </li>
                                    ))
                                ) : (
                                    <p>Aucun immeuble disponible</p>
                                )}
                            </ul>
                        </div>
                    )}

                    {/* Détails de l'immeuble sélectionné */}
                    {selectedImmeuble && (
                        <div style={detailsStyle}>
                            <h3>{selectedImmeuble.nom}</h3>
                            <p>Adresse: {selectedImmeuble.adresse}</p>
                            <p>Nombre d'appartements: {selectedImmeuble.nombreAppart}</p>
                            <p>Garage: {selectedImmeuble.garage ? 'Disponible' : 'Non disponible'}</p>
                            <p>Nombre de places de garage: {selectedImmeuble.nombrePlaceGarage}</p>
                            <p>Ascenseur: {selectedImmeuble.aAscenceur ? 'Présent' : 'Absent'}</p>
                            <p>Concierge: {selectedImmeuble.aConcierge ? 'Présent' : 'Absent'}</p>
                            <h3>Logements:</h3>
                            <ul>
                                {selectedImmeuble.logements && selectedImmeuble.logements.length > 0 ? (
                                    selectedImmeuble.logements.map((logement) => (
                                        <li key={logement.idLogement}>
                                            <button
                                                onClick={() => handleLogementClick(logement)}
                                                style={buttonStyle}
                                            >
                                                Logement {logement.numero} - Étage {logement.etage}
                                            </button>
                                        </li>
                                    ))
                                ) : (
                                    <p>Aucun logement disponible dans cet immeuble</p>
                                )}
                            </ul>
                        </div>
                    )}

                    {/* Détails du logement sélectionné */}
                    {selectedLogement && (
                        <div style={detailsStyle}>
                            <h4>Logement {selectedLogement.numero} (Étage {selectedLogement.etage})</h4>
                            <p>Montant charge mensuelle: {selectedLogement.montantChargeMensuelle} MAD</p>

                            {/* Propriétaire */}
                            <p>
                                Propriétaire :{" "}
                                {selectedLogement.proprietaire && selectedLogement.proprietaire.nom && selectedLogement.proprietaire.prenom
                                    ? `${selectedLogement.proprietaire.nom} ${selectedLogement.proprietaire.prenom}`
                                    : "Non spécifié"}
                            </p>

                            {/* Locataire */}
                            <p>
                                Locataire :{" "}
                                {selectedLogement.locataire && selectedLogement.locataire.nom && selectedLogement.locataire.prenom
                                    ? `${selectedLogement.locataire.nom} ${selectedLogement.locataire.prenom}`
                                    : "Non spécifié"}
                            </p>

                            {/* Place de Garage */}
                            <p>
                                Place de garage :{" "}
                                {selectedLogement.placeGarage && selectedLogement.placeGarage.numero
                                    ? `N° ${selectedLogement.placeGarage.numero}`
                                    : "Aucune"}
                            </p>
                        </div>
                    )}

                </div>
            )}
        </div>
    );
};

// Style pour les boutons
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

// Style pour les détails
const detailsStyle = {
    marginTop: '20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
};

export default ResidencesList;
