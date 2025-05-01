import React, { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

const LogementForm = () => {
    const [formData, setFormData] = useState({
        numero: '',
        surface: '',
        etage: '',
        proprietaireId: '',
        locataireId: '',
        immeubleId: '',
        placeGarageId: '',
    });

    const [proprietaires, setProprietaires] = useState([]);
    const [locataires, setLocataires] = useState([]);
    const [immeubles, setImmeubles] = useState([]);
    const [placesGarage, setPlacesGarage] = useState([]);

    useEffect(() => {
        // Charger les données
        axios.get('/api/proprietaires')
            .then(response => setProprietaires(response.data))
            .catch(error => console.error('Erreur chargement propriétaires:', error));

        axios.get('/api/locataires')
            .then(response => setLocataires(response.data))
            .catch(error => console.error('Erreur chargement locataires:', error));

        axios.get('/api/immeubles')
            .then(response => setImmeubles(response.data))
            .catch(error => console.error('Erreur chargement immeubles:', error));

        axios.get('/api/places-garage')
            .then(response => setPlacesGarage(response.data))
            .catch(error => console.error('Erreur chargement places garage:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Envoi du formulaire
        axios.post('/api/logements', formData)
            .then(response => {
                console.log('Logement ajouté:', response.data);
                // Reset form
                setFormData({
                    numero: '',
                    surface: '',
                    etage: '',
                    proprietaireId: '',
                    locataireId: '',
                    immeubleId: '',
                    placeGarageId: '',
                });
            })
            .catch(error => console.error('Erreur ajout logement:', error));
    };

    return (
        <div>
            <h2>Ajouter un Logement</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Numéro :</label>
                    <input type="text" name="numero" value={formData.numero} onChange={handleChange} required />
                </div>

                <div>
                    <label>Surface :</label>
                    <input type="text" name="surface" value={formData.surface} onChange={handleChange} required />
                </div>

                <div>
                    <label>Étage :</label>
                    <input type="text" name="etage" value={formData.etage} onChange={handleChange} required />
                </div>

                <div>
                    <label>Propriétaire :</label>
                    <select name="proprietaireId" value={formData.proprietaireId} onChange={handleChange} required>
                        <option value="">Sélectionner un propriétaire</option>
                        {proprietaires.map((proprio) => (
                            <option key={proprio.id} value={proprio.id}>
                                {proprio.nom} {proprio.prenom}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Locataire :</label>
                    <select name="locataireId" value={formData.locataireId} onChange={handleChange}>
                        <option value="">Sélectionner un locataire</option>
                        {locataires.map((loc) => (
                            <option key={loc.id} value={loc.id}>
                                {loc.nom} {loc.prenom}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Immeuble :</label>
                    <select name="immeubleId" value={formData.immeubleId} onChange={handleChange} required>
                        <option value="">Sélectionner un immeuble</option>
                        {immeubles.map((imm) => (
                            <option key={imm.id} value={imm.id}>
                                {imm.nom}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Place de Garage :</label>
                    <select name="placeGarageId" value={formData.placeGarageId} onChange={handleChange}>
                        <option value="">Sélectionner une place de garage</option>
                        {placesGarage.map((pg) => (
                            <option key={pg.id} value={pg.id}>
                                {pg.numero} - {pg.statut}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">Ajouter Logement</button>
            </form>
        </div>
    );
};

export default LogementForm;
