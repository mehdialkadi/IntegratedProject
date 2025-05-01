import React, { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

const CreerLogement = () => {
    const [immeubles, setImmeubles] = useState([]);
    const [immeubleId, setImmeubleId] = useState('');
    const [logement, setLogement] = useState({
        numero: '',
        etage: '',
        montantChargeMensuelle: '',
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('/api/immeubles')
            .then(response => setImmeubles(response.data))
            .catch(error => console.error("Erreur lors du chargement des immeubles:", error));
    }, []);

    const handleChange = (e) => {
        setLogement({ ...logement, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!immeubleId) {
            setMessage("❗ Veuillez choisir un immeuble.");
            return;
        }

        const data = {
            ...logement,
            immeuble: {
                id: immeubleId
            }
        };

        axios.post('/api/logements', data)
            .then(() => {
                setMessage("✅ Logement ajouté avec succès !");
                setLogement({ numero: '', etage: '', montantChargeMensuelle: '' });
                setImmeubleId('');
            })
            .catch(() => setMessage("❌ Erreur lors de l'ajout du logement."));
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Créer un logement</h2>
            <form onSubmit={handleSubmit}>
                <label>Choisir un immeuble :</label><br />
                <select value={immeubleId} onChange={(e) => setImmeubleId(e.target.value)} required>
                    <option value="">-- Sélectionner --</option>
                    {immeubles.map(imm => (
                        <option key={imm.id} value={imm.id}>{imm.nom}</option>
                    ))}
                </select><br /><br />

                <input type="text" name="numero" placeholder="Numéro du logement" value={logement.numero} onChange={handleChange} required /><br /><br />
                <input type="number" name="etage" placeholder="Étage" value={logement.etage} onChange={handleChange} required /><br /><br />
                <input type="number" name="montantChargeMensuelle" placeholder="Montant Charge Mensuelle" value={logement.montantChargeMensuelle} onChange={handleChange} required /><br /><br />

                <button type="submit">Ajouter</button>
            </form>

            {message && <p style={{ marginTop: '10px', color: message.includes('✅') ? 'green' : 'red' }}>{message}</p>}
        </div>
    );
};

export default CreerLogement;
