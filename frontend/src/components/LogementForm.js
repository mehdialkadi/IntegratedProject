import React, { useEffect, useState } from "react";
import axios from "axios";

const LogementForm = () => {
    const [proprietaires, setProprietaires] = useState([]);
    const [locataires, setLocataires] = useState([]);
    const [immeubles, setImmeubles] = useState([]);
    const [placesGarage, setPlacesGarage] = useState([]);

    useEffect(() => {
        // Récupérer les propriétaires, locataires, immeubles et places de garage
        axios.get("http://localhost:8080/api/proprietaires").then((response) => setProprietaires(response.data));
        axios.get("http://localhost:8080/api/locataires").then((response) => setLocataires(response.data));
        axios.get("http://localhost:8080/api/residencies").then((response) => setImmeubles(response.data));
        axios.get("http://localhost:8080/api/places-garage").then((response) => setPlacesGarage(response.data));
    }, []);

    return (
        <form>
            <label htmlFor="proprietaire">Propriétaire:</label>
            <select name="proprietaire" id="proprietaire">
                {proprietaires.map((proprietaire) => (
                    <option key={proprietaire.id} value={proprietaire.id}>
                        {proprietaire.nom} {proprietaire.prenom}
                    </option>
                ))}
            </select>

            <label htmlFor="locataire">Locataire:</label>
            <select name="locataire" id="locataire">
                {locataires.map((locataire) => (
                    <option key={locataire.id} value={locataire.id}>
                        {locataire.nom} {locataire.prenom}
                    </option>
                ))}
            </select>

            <label htmlFor="immeuble">Immeuble:</label>
            <select name="immeuble" id="immeuble">
                {immeubles.map((immeuble) => (
                    <option key={immeuble.id} value={immeuble.id}>
                        {immeuble.nom}
                    </option>
                ))}
            </select>

            <label htmlFor="placeGarage">Place de Garage:</label>
            <select name="placeGarage" id="placeGarage">
                {placesGarage.map((place) => (
                    <option key={place.id} value={place.id}>
                        {place.numero}
                    </option>
                ))}
            </select>

            {/* Autres champs du formulaire */}

            <button type="submit">Créer Logement</button>
        </form>
    );
};

export default LogementForm;
