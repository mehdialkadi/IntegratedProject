import React, { useState, useEffect } from 'react';
import axios from 'axios';



const CreatePlaceGarage = () => {
    const [numero, setNumero] = useState('');
    const [statut, setStatut] = useState('');
    const [immeubleId, setImmeubleId] = useState('');
    const [immeubles, setImmeubles] = useState([]); // Liste des immeubles

    useEffect(() => {
        // Récupérer la liste des immeubles
        axios.get('http://localhost:8080/api/immeubles')  // Ajustez l'URL en fonction de votre API
            .then(response => {
                setImmeubles(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des immeubles:', error);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Vérifiez si les champs sont remplis
        if (!numero || !statut || !immeubleId) {
            alert('Tous les champs doivent être remplis');
            return;
        }

        // Préparer les données à envoyer
        const newPlaceGarage = {
            numero,
            statut,
            immeuble: { id: immeubleId } // Assurez-vous d'envoyer l'ID de l'immeuble
        };

        // Envoi de la requête POST pour créer la place de garage
        axios.post('http://localhost:8080/api/places-garage', newPlaceGarage)
            .then(response => {
                alert('Place de garage créée avec succès');
                // Réinitialiser le formulaire
                setNumero('');
                setStatut('');
                setImmeubleId('');
            })
            .catch(error => {
                console.error('Erreur lors de la création de la place de garage:', error);
                alert('Erreur lors de la création de la place de garage');
            });
    };

    return (
        <div>
            <h2>Créer une Place de Garage</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Numéro de la place :</label>
                    <input
                        type="text"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Statut :</label>
                    <input
                        type="text"
                        value={statut}
                        onChange={(e) => setStatut(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Immeuble :</label>
                    <select
                        value={immeubleId}
                        onChange={(e) => setImmeubleId(e.target.value)}
                        required
                    >
                        <option value="">Sélectionnez un immeuble</option>
                        {immeubles.map((immeuble) => (
                            <option key={immeuble.id} value={immeuble.id}>
                                {immeuble.nom}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <button type="submit">Créer la Place de Garage</button>
                </div>
            </form>
        </div>
    );
};

export default CreatePlaceGarage;
