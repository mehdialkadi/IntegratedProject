import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

function ImmeubleForm() {
    const [residencies, setResidencies] = useState([]);
    const [selectedResidency, setSelectedResidency] = useState("");
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        nom: "",
        adresse: "",
        nombreAppart: "",
        garage: false,
        nombrePlaceGarage: "",
        aAscenceur: false,
        aConcierge: false,
    });

    useEffect(() => {
        axios.get("/api/residencies")
            .then(response => {
                setResidencies(response.data);
            })
            .catch(error => {
                console.error("Erreur lors du chargement des résidences :", error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleResidencyChange = (e) => {
        setSelectedResidency(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Vérification des données avant l'envoi
        console.log("Données envoyées : ", formData);

        const payload = {
            ...formData,
            residency: { id: selectedResidency },   // 🧠 envoyer residency sous forme d'objet avec id
            syndic: { id: 1 } // 🧠 provisoire pour test : tu peux changer selon ton projet
        };

        axios.post("/api/immeubles", payload)
            .then(response => {
                console.log("Immeuble ajouté avec succès :", response.data);
                alert("Immeuble ajouté !");
                setError(null); // Réinitialiser l'erreur
            })
            .catch(error => {
                // Afficher l'objet complet de l'erreur pour le débogage
                console.error("Erreur complète :", error);

                if (error.response && error.response.data) {
                    setError(`Erreur lors de l'ajout de l'immeuble : ${JSON.stringify(error.response.data)}`);
                } else {
                    setError("Erreur inconnue lors de l'ajout de l'immeuble.");
                }
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom :</label>
                    <input type="text" name="nom" value={formData.nom} onChange={handleChange} required />
                </div>

                <div>
                    <label>Adresse :</label>
                    <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} required />
                </div>

                <div>
                    <label>Nombre d'appartements :</label>
                    <input type="number" name="nombreAppart" value={formData.nombreAppart} onChange={handleChange} required />
                </div>

                <div>
                    <label>Garage :</label>
                    <input type="checkbox" name="garage" checked={formData.garage} onChange={handleChange} />
                </div>

                <div>
                    <label>Nombre de places de garage :</label>
                    <input type="number" name="nombrePlaceGarage" value={formData.nombrePlaceGarage} onChange={handleChange} />
                </div>

                <div>
                    <label>Ascenseur :</label>
                    <input type="checkbox" name="aAscenceur" checked={formData.aAscenceur} onChange={handleChange} />
                </div>

                <div>
                    <label>Concierge :</label>
                    <input type="checkbox" name="aConcierge" checked={formData.aConcierge} onChange={handleChange} />
                </div>

                <div>
                    <label>Résidence :</label>
                    <select value={selectedResidency} onChange={handleResidencyChange} required>
                        <option value="">-- Sélectionner une résidence --</option>
                        {residencies.map(residency => (
                            <option key={residency.id} value={residency.id}>
                                {residency.nom}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">Ajouter Immeuble</button>
            </form>

            {/* Afficher l'erreur si elle existe */}
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
}

export default ImmeubleForm;
