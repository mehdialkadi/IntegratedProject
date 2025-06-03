import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FactureForm({ fetchFactures }) {
    const [immeubleId, setImmeubleId] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [montant, setMontant] = useState('');
    const [nomFichier, setNomFichier] = useState('');
    const [immeubles, setImmeubles] = useState([]);

    // Charger les immeubles
    const fetchImmeubles = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/immeubles');
            setImmeubles(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des immeubles:', error);
        }
    };

    useEffect(() => {
        fetchImmeubles();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const facture = {
            description,
            date,
            montant: parseFloat(montant),
            urlFichier: nomFichier
        };

        try {
            await axios.post(
                `http://localhost:8080/api/factures-immeuble/immeuble/${immeubleId}`,
                facture
            );
            fetchFactures(); // Met à jour la liste
            setImmeubleId('');
            setDescription('');
            setDate('');
            setMontant('');
            setNomFichier('');
        } catch (error) {
            console.error('Erreur lors de la création de la facture:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Immeuble :</label>
                <select value={immeubleId} onChange={(e) => setImmeubleId(e.target.value)} required>
                    <option value="">Sélectionner un immeuble</option>
                    {immeubles.map((immeuble) => (
                        <option key={immeuble.id} value={immeuble.id}>
                            {immeuble.nom}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Description :</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Date :</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Montant (€) :</label>
                <input
                    type="number"
                    step="0.01"
                    value={montant}
                    onChange={(e) => setMontant(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Nom du fichier :</label>
                <input
                    type="text"
                    value={nomFichier}
                    onChange={(e) => setNomFichier(e.target.value)}
                    placeholder="ex: facture_mai_2024.pdf"
                    required
                />
            </div>

            <button type="submit">Créer Facture</button>
        </form>
    );
}

export default FactureForm;
