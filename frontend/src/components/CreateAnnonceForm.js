import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateAnnonceForm.css';
axios.defaults.withCredentials = true;

function CreateAnnonceForm() {
    const [titre, setTitre] = useState('');
    const [contenu, setContenu] = useState('');
    const [immeubles, setImmeubles] = useState([]);
    const [selectedImmeuble, setSelectedImmeuble] = useState('');

    useEffect(() => {
        // Récupérer la liste des immeubles au chargement du composant
        axios.get('/api/immeubles')
            .then(response => {
                // Vérifier les données
                console.log('Immeubles récupérés:', response.data);
                setImmeubles(response.data);
            })
            .catch(error => console.error('Erreur lors de la récupération des immeubles:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const annonceData = {
            titre,
            contenu,
            immeuble: { id: selectedImmeuble },
            utilisateur: { id: 1 }, // L'id de l'utilisateur (exemple : admin/syndic)
            date: new Date(),  // Utilisation de la date actuelle
        };

        axios.post('/api/annonces', annonceData)
            .then(response => {
                console.log('Annonce créée avec succès:', response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la création de l\'annonce:', error);
            });
    };

    return (
        <div>
            <h2>Créer une annonce</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Titre:</label>
                    <input
                        type="text"
                        value={titre}
                        onChange={(e) => setTitre(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contenu:</label>
                    <textarea
                        value={contenu}
                        onChange={(e) => setContenu(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Immeuble:</label>
                    <select
                        value={selectedImmeuble}
                        onChange={(e) => setSelectedImmeuble(e.target.value)}
                        required
                    >
                        <option value="">Sélectionner un immeuble</option>
                        {immeubles.map((immeuble) => (
                            <option key={immeuble.id} value={immeuble.id}>
                                {immeuble.nom} {/* Ajustez cette propriété en fonction de votre modèle */}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <button type="submit">Créer Annonce</button>
                </div>
            </form>
        </div>
    );
}

export default CreateAnnonceForm;
