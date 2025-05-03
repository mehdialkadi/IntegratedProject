import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListeImmeubles.css'; // Assurez-vous que le chemin est correct

const ListeImmeubles = () => {
    const [immeubles, setImmeubles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [editingImmeuble, setEditingImmeuble] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/immeubles')
            .then((response) => {
                setImmeubles(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Impossible de charger les immeubles.");
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/api/immeubles/${id}`)
            .then(() => {
                setImmeubles(immeubles.filter((immeuble) => immeuble.id !== id));
                setSuccess('Immeuble supprimé avec succès.');
                setError('');
            })
            .catch(() => {
                setError("Impossible de supprimer l'immeuble.");
                setSuccess('');
            });
    };

    const handleEdit = (immeuble) => {
        setEditingImmeuble({ ...immeuble });
    };

    const handleUpdate = (id, updatedImmeuble) => {
        if (!updatedImmeuble.nom || !updatedImmeuble.adresse) {
            setError("Tous les champs doivent être remplis.");
            return;
        }

        axios.put(`http://localhost:8080/api/immeubles/${id}`, updatedImmeuble)
            .then((response) => {
                setImmeubles((prevImmeubles) =>
                    prevImmeubles.map((immeuble) =>
                        immeuble.id === id ? response.data : immeuble
                    )
                );
                setEditingImmeuble(null);
                setSuccess('Immeuble mis à jour avec succès.');
                setError('');
            })
            .catch((err) => {
                setError("Impossible de mettre à jour l'immeuble. Détails : " + (err.response?.data?.message || err.message));
                setSuccess('');
            });
    };

    if (loading) {
        return <p>Chargement des immeubles...</p>;
    }

    return (
        <div className="container">
            <h2 className="title">Liste des Immeubles</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            <ul className="list">
                {immeubles.map((immeuble) => (
                    <li key={immeuble.id} className="listItem">
                        {editingImmeuble && editingImmeuble.id === immeuble.id ? (
                            <div>
                                <h3>Modifier Immeuble</h3>
                                <label>Nom:</label>
                                <input
                                    type="text"
                                    value={editingImmeuble.nom}
                                    onChange={(e) => setEditingImmeuble({ ...editingImmeuble, nom: e.target.value })}
                                />
                                <label>Adresse:</label>
                                <input
                                    type="text"
                                    value={editingImmeuble.adresse}
                                    onChange={(e) => setEditingImmeuble({ ...editingImmeuble, adresse: e.target.value })}
                                />
                                <button onClick={() => handleUpdate(immeuble.id, editingImmeuble)}>Mettre à jour</button>
                                <button onClick={() => setEditingImmeuble(null)}>Annuler</button>
                            </div>
                        ) : (
                            <div>
                                <h3>{immeuble.nom}</h3>
                                <p>Adresse: {immeuble.adresse}</p>

                                {/* Affichage des factures */}
                                {immeuble.factures && immeuble.factures.length > 0 ? (
                                    <div className="factures">
                                        <h4>Factures :</h4>
                                        <ul>
                                            {immeuble.factures.map((facture) => (
                                                <li key={facture.id}>
                                                    Date : {facture.date} - Montant : {facture.montant} €
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <p>Aucune facture disponible.</p>
                                )}

                                <button onClick={() => handleEdit(immeuble)}>Modifier</button>
                                <button onClick={() => handleDelete(immeuble.id)}>Supprimer</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListeImmeubles;
