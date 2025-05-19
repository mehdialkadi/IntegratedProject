import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LogementForm = () => {
    const [logement, setLogement] = useState({
        numero: '',
        etage: '',
        montantChargeMensuelle: '',
        proprietaire: null,
        locataire: null,
        immeuble: null,
        placeGarage: null
    });

    const [proprietaires, setProprietaires] = useState([]);
    const [locataires, setLocataires] = useState([]);
    const [immeubles, setImmeubles] = useState([]);
    const [placesGarage, setPlacesGarage] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/proprietaires').then(res => setProprietaires(res.data));
        axios.get('http://localhost:8080/api/locataires').then(res => setLocataires(res.data));
        axios.get('http://localhost:8080/api/immeubles').then(res => setImmeubles(res.data));
        axios.get('http://localhost:8080/api/places-garage').then(res => setPlacesGarage(res.data));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogement(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setLogement(prev => ({
            ...prev,
            [name]: { id: value }  // Pour que l'objet soit envoyé avec son id seulement
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/logement', logement)
            .then(response => {
                alert("Logement ajouté !");
                console.log(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la création du logement", error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Ajouter un Logement</h2>

            <input type="number" name="numero" placeholder="Numéro" onChange={handleChange} required />
            <input type="number" name="etage" placeholder="Étage" onChange={handleChange} required />
            <input type="number" step="0.01" name="montantChargeMensuelle" placeholder="Montant Charges" onChange={handleChange} required />

            <select name="proprietaire" onChange={handleSelectChange} required>
                <option value="">-- Sélectionner un propriétaire --</option>
                {proprietaires.map(p => (
                    <option key={p.id} value={p.id}>{p.nom}</option>
                ))}
            </select>

            <select name="locataire" onChange={handleSelectChange}>
                <option value="">-- Sélectionner un locataire (optionnel) --</option>
                {locataires.map(l => (
                    <option key={l.id} value={l.id}>{l.nom}</option>
                ))}
            </select>

            <select name="immeuble" onChange={handleSelectChange} required>
                <option value="">-- Sélectionner un immeuble --</option>
                {immeubles.map(i => (
                    <option key={i.id} value={i.id}>{i.nom}</option>
                ))}
            </select>

            <select name="placeGarage" onChange={handleSelectChange}>
                <option value="">-- Sélectionner une place de garage (optionnel) --</option>
                {placesGarage.map(pg => (
                    <option key={pg.id} value={pg.id}>{pg.numero}</option>
                ))}
            </select>

            <button type="submit">Créer Logement</button>
        </form>
    );
};

export default LogementForm;
