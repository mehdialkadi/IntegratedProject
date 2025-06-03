import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ResidencyDetails.css';

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
    };

    if (loading) return <div className="loading">Chargement...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="residency-container">
            <h1 className="title">🏘️ Résidences</h1>

            {residencies.length === 0 ? (
                <p>Aucune résidence trouvée.</p>
            ) : (
                <div>
                    <div className="button-group">
                        {residencies.map((residence) => (
                            <button
                                key={residence.id}
                                onClick={() => handleResidenceClick(residence)}
                                className="residence-btn"
                            >
                                {residence.nom}
                            </button>
                        ))}
                    </div>

                    {selectedResidence && (
                        <div className="card">
                            <h2>{selectedResidence.nom}</h2>
                            <p><strong>Adresse:</strong> {selectedResidence.adresse}</p>

                            <h3>🏢 Immeubles</h3>
                            {selectedResidence.immeubles?.length > 0 ? (
                                <ul className="item-list">
                                    {selectedResidence.immeubles.map((immeuble) => (
                                        <li key={immeuble.id}>
                                            <button
                                                onClick={() => handleImmeubleClick(immeuble)}
                                                className="item-btn"
                                            >
                                                {immeuble.nom} – {immeuble.adresse}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Aucun immeuble disponible</p>
                            )}
                        </div>
                    )}

                    {selectedImmeuble && (
                        <div className="card">
                            <h3>{selectedImmeuble.nom}</h3>
                            <p><strong>Adresse:</strong> {selectedImmeuble.adresse}</p>
                            <p><strong>Appartements:</strong> {selectedImmeuble.nombreAppart}</p>
                            <p><strong>Garage:</strong> {selectedImmeuble.garage ? '✔️' : '❌'}</p>
                            <p><strong>Places garage:</strong> {selectedImmeuble.nombrePlaceGarage}</p>
                            <p><strong>Ascenseur:</strong> {selectedImmeuble.aAscenceur ? '✔️' : '❌'}</p>
                            <p><strong>Concierge:</strong> {selectedImmeuble.aConcierge ? '✔️' : '❌'}</p>

                            <h4>🏠 Logements</h4>
                            {selectedImmeuble.logements?.length > 0 ? (
                                <ul className="item-list">
                                    {selectedImmeuble.logements.map((logement) => (
                                        <li key={logement.idLogement}>
                                            <button
                                                onClick={() => handleLogementClick(logement)}
                                                className="item-btn"
                                            >
                                                N° {logement.numero} – Étage {logement.etage}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Aucun logement disponible</p>
                            )}
                        </div>
                    )}

                    {selectedLogement && (
                        <div className="card">
                            <h4>🔑 Logement N°{selectedLogement.numero} (Étage {selectedLogement.etage})</h4>
                            <p><strong>Charge mensuelle:</strong> {selectedLogement.montantChargeMensuelle} MAD</p>
                            <p><strong>Propriétaire:</strong> {selectedLogement.proprietaire?.nom
                                ? `${selectedLogement.proprietaire.nom} ${selectedLogement.proprietaire.prenom}`
                                : "Non spécifié"}</p>
                            <p><strong>Locataire:</strong> {selectedLogement.locataire?.nom
                                ? `${selectedLogement.locataire.nom} ${selectedLogement.locataire.prenom}`
                                : "Non spécifié"}</p>
                            <p><strong>Place de garage:</strong> {selectedLogement.placeGarage?.numero
                                ? `N° ${selectedLogement.placeGarage.numero}` : "Aucune"}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ResidencyDetails;
