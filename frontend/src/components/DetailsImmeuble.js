// src/components/DetailsImmeuble.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;

const DetailsImmeuble = () => {
    const { id } = useParams();  // récupère l'id depuis l'URL
    const [immeuble, setImmeuble] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await axios.get(`/api/immeubles/${id}`);
                setImmeuble(res.data);
            } catch (err) {
                console.error('Erreur lors du chargement des détails :', err);
            }
        };
        fetchDetails();
    }, [id]);

    if (!immeuble) return <p>Chargement des détails...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Détails de l’Immeuble</h2>
            <p><strong>Nom :</strong> {immeuble.nom}</p>
            <p><strong>Adresse :</strong> {immeuble.adresse}</p>
            <p><strong>Surface :</strong> {immeuble.surface} m²</p>
            <p><strong>Nombre d’étages :</strong> {immeuble.nbrEtages}</p>
            <p><strong>Description :</strong> {immeuble.description}</p>
        </div>
    );
};

export default DetailsImmeuble;
