import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

function ResidencyDetails() {
    const [residencies, setResidencies] = useState([]);
    const [selectedResidency, setSelectedResidency] = useState(null);
    const [immeubles, setImmeubles] = useState([]);
    const [loadingImmeubles, setLoadingImmeubles] = useState(false);
    const [error, setError] = useState(null);

    // Charger les résidences disponibles au démarrage
    useEffect(() => {
        axios.get("/api/residencies")
            .then(response => {
                setResidencies(response.data);
            })
            .catch(error => {
                console.error("Erreur lors du chargement des résidences :", error);
            });
    }, []);

    // Gérer la sélection d'une résidence
    const handleResidencyChange = (e) => {
        const residencyId = e.target.value;
        setSelectedResidency(residencies.find(res => res.id === parseInt(residencyId)));
        setImmeubles([]);  // Réinitialiser la liste des immeubles
    };

    // Charger les immeubles de la résidence sélectionnée
    const handleShowImmeubles = async () => {
        if (selectedResidency) {
            setLoadingImmeubles(true);
            try {
                // Assurez-vous que l'ID de la résidence est correct
                console.log('ID de la résidence sélectionnée :', selectedResidency.id);

                const response = await axios.get(`/api/residencies/${selectedResidency.id}/immeubles`);
                setImmeubles(response.data);  // Mettre à jour la liste des immeubles
            } catch (error) {
                console.error("Erreur lors du chargement des immeubles :", error);
                setError("Erreur lors du chargement des immeubles.");
            } finally {
                setLoadingImmeubles(false);
            }
        }
    };

    return (
        <div>
            <h2>Détails de la résidence</h2>

            {/* Sélectionner une résidence */}
            <div>
                <label>Résidence :</label>
                <select onChange={handleResidencyChange} required>
                    <option value="">-- Sélectionner une résidence --</option>
                    {residencies.map(residency => (
                        <option key={residency.id} value={residency.id}>
                            {residency.nom}
                        </option>
                    ))}
                </select>
            </div>

            {/* Afficher les immeubles de la résidence sélectionnée */}
            <button onClick={handleShowImmeubles} disabled={!selectedResidency}>
                Voir les immeubles de cette résidence
            </button>

            {/* Afficher les immeubles */}
            {loadingImmeubles ? (
                <p>Chargement des immeubles...</p>
            ) : (
                <div>
                    {immeubles.length > 0 ? (
                        <ul>
                            {immeubles.map(immeuble => (
                                <li key={immeuble.id}>
                                    <p>Nom : {immeuble.nom}</p>
                                    <p>Adresse : {immeuble.adresse}</p>
                                    <p>Nombre d'appartements : {immeuble.nombreAppart}</p>
                                    {/* Afficher d'autres informations de l'immeuble ici */}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Aucun immeuble trouvé pour cette résidence.</p>
                    )}
                </div>
            )}

            {/* Afficher l'erreur s'il y en a */}
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
}

export default ResidencyDetails;
