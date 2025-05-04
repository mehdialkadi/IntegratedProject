import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LogementForm.css';

axios.defaults.withCredentials = true;

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
    const [message, setMessage] = useState('');

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
        setLogement(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setLogement(prev => ({
            ...prev,
            [name]: value ? { id: value } : null
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Envoi du formulaire
        axios.post('/api/logements', logement)
            .then(response => {
                setMessage('✅ Logement ajouté avec succès !');
                setLogement({
                    numero: '',
                    etage: '',
                    montantChargeMensuelle: '',
                    proprietaire: null,
                    locataire: null,
                    immeuble: null,
                    placeGarage: null
                });
            })
            .catch(error => {
                console.error("Erreur lors de la création du logement", error);
                setMessage('❌ Erreur lors de l\'ajout du logement.');
            });
    };

    return (
        <form className="logement-form" onSubmit={handleSubmit}>
            <h2>Ajouter un Logement</h2>

            {message && <div className="message">{message}</div>}

            <div className="form-group">
                <label>Numéro</label>
                <input type="number" name="numero" value={logement.numero} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label>Étage</label>
                <input type="number" name="etage" value={logement.etage} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label>Montant des charges mensuelles (€)</label>
                <input type="number" step="0.01" name="montantChargeMensuelle" value={logement.montantChargeMensuelle} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label>Propriétaire</label>
                <select name="proprietaire" onChange={handleSelectChange} required>
                    <option value="">-- Sélectionner --</option>
                    {proprietaires.map(p => (
                        <option key={p.id} value={p.id}>{p.nom}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Locataire (optionnel)</label>
                <select name="locataire" onChange={handleSelectChange}>
                    <option value="">-- Aucun --</option>
                    {locataires.map(l => (
                        <option key={l.id} value={l.id}>{l.nom}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Immeuble</label>
                <select name="immeuble" onChange={handleSelectChange} required>
                    <option value="">-- Sélectionner --</option>
                    {immeubles.map(i => (
                        <option key={i.id} value={i.id}>{i.nom}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Place de garage (optionnel)</label>
                <select name="placeGarage" onChange={handleSelectChange}>
                    <option value="">-- Aucune --</option>
                    {placesGarage.map(pg => (
                        <option key={pg.id} value={pg.id}>{pg.numero}</option>
                    ))}
                </select>
            </div>

            <button type="submit" className="btn-submit">Créer le logement</button>
        </form>
    );
};

export default LogementForm;
