import React, { useState } from 'react';
import axios from "axios";

axios.defaults.withCredentials = true;

const ResidencyForm = () => {
    const [nom, setNom] = useState('');
    const [adresse, setAdresse] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const residencyData = { nom, adresse };

        fetch('/api/residencies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(residencyData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Optionally clear the form
                setNom('');
                setAdresse('');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nom de la résidence</label>
                <input
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Adresse</label>
                <input
                    type="text"
                    value={adresse}
                    onChange={(e) => setAdresse(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Créer la résidence</button>
        </form>
    );
};

export default ResidencyForm;
