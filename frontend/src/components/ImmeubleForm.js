import { useState, useEffect } from "react";
import axios from "axios";
import './ImmeubleForm.css';
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
        aAscenseur: false, // corrigé ici
        aConcierge: false,
    });


    useEffect(() => {
        axios.get("/api/residencies")
            .then(response => setResidencies(response.data))
            .catch(error => {
                console.error("Erreur lors du chargement des résidences :", error);
                setError("Erreur de chargement des résidences.");
            });
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleResidencyChange = (e) => {
        setSelectedResidency(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        const payload = {
            ...formData,
            residency: { id: selectedResidency },
            syndic: { id: 1 } // à adapter selon ton contexte
        };

        axios.post("/api/immeubles", payload)
            .then(response => {
                alert("Immeuble ajouté !");
                setFormData({
                    nom: "",
                    adresse: "",
                    nombreAppart: "",
                    garage: false,
                    nombrePlaceGarage: "",
                    aAscenseur: false,
                    aConcierge: false,
                });
                setSelectedResidency("");
            })
            .catch(error => {
                console.error("Erreur complète :", error);
                if (error.response && error.response.data) {
                    setError(`Erreur : ${JSON.stringify(error.response.data)}`);
                } else {
                    setError("Erreur inconnue lors de l'ajout.");
                }
            });
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
            <h2>Ajouter un Immeuble</h2>
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

                {formData.garage && (
                    <div>
                        <label>Nombre de places de garage :</label>
                        <input type="number" name="nombrePlaceGarage" value={formData.nombrePlaceGarage} onChange={handleChange} required />
                    </div>
                )}

                <div>
                    <label>Ascenseur :</label>
                    <input type="checkbox" name="aAscenseur" checked={formData.aAscenseur} onChange={handleChange} />
                </div>

                <div>
                    <label>Concierge :</label>
                    <input type="checkbox" name="aConcierge" checked={formData.aConcierge} onChange={handleChange} />
                </div>

                <div>
                    <label>Résidence :</label>
                    <select value={selectedResidency} onChange={handleResidencyChange} required>
                        <option value="">-- Sélectionner une résidence --</option>
                        {residencies.map(res => (
                            <option key={res.id} value={res.id}>
                                {res.nom}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" style={{ marginTop: "10px" }}>Ajouter Immeuble</button>
            </form>

            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
        </div>
    );
}

export default ImmeubleForm;
