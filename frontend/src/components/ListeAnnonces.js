import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListeAnnonces.css'; // Assure-toi que ce fichier existe

axios.defaults.withCredentials = true;

function ListeAnnonces() {
    const [annonces, setAnnonces] = useState([]);
    const [editingAnnonceId, setEditingAnnonceId] = useState(null);
    const [editTitre, setEditTitre] = useState('');
    const [editContenu, setEditContenu] = useState('');
    const [editImmeubleId, setEditImmeubleId] = useState('');
    const [immeubles, setImmeubles] = useState([]);

    useEffect(() => {
        fetchAnnonces();
        fetchImmeubles();
    }, []);

    const fetchAnnonces = () => {
        axios.get('/api/annonces')
            .then(response => setAnnonces(response.data))
            .catch(error => console.error('Erreur lors du chargement des annonces:', error));
    };

    const fetchImmeubles = () => {
        axios.get('/api/annonces/immeubles')
            .then(response => setImmeubles(response.data))
            .catch(error => console.error('Erreur lors du chargement des immeubles:', error));
    };

    const startEdit = (annonce) => {
        setEditingAnnonceId(annonce.id);
        setEditTitre(annonce.titre);
        setEditContenu(annonce.contenu);
        setEditImmeubleId(annonce.immeuble?.id || '');
    };

    const cancelEdit = () => {
        setEditingAnnonceId(null);
        setEditTitre('');
        setEditContenu('');
        setEditImmeubleId('');
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedAnnonce = {
            id: editingAnnonceId,
            titre: editTitre,
            contenu: editContenu,
            immeuble: { id: editImmeubleId },
            utilisateur: { id: 1 },
            date: new Date(),
        };

        axios.put(`/api/annonces/${editingAnnonceId}`, updatedAnnonce)
            .then(() => {
                fetchAnnonces();
                cancelEdit();
            })
            .catch(error => console.error("Erreur lors de la mise à jour :", error));
    };

    const handleDelete = (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cette annonce ?")) {
            axios.delete(`/api/annonces/${id}`)
                .then(() => fetchAnnonces())
                .catch(error => console.error("Erreur de suppression :", error));
        }
    };

    return (
        <div className="annonces-container">
            <h2 className="annonces-title">Liste des Annonces</h2>
            <ul className="annonces-list">
                {annonces.map(annonce => (
                    <li key={annonce.id} className="annonce-item">
                        {editingAnnonceId === annonce.id ? (
                            <form onSubmit={handleUpdate} className="annonce-form">
                                <input
                                    type="text"
                                    value={editTitre}
                                    onChange={(e) => setEditTitre(e.target.value)}
                                    placeholder="Titre"
                                    required
                                />
                                <textarea
                                    value={editContenu}
                                    onChange={(e) => setEditContenu(e.target.value)}
                                    placeholder="Contenu"
                                    required
                                />
                                <select
                                    value={editImmeubleId}
                                    onChange={(e) => setEditImmeubleId(e.target.value)}
                                    required
                                >
                                    <option value="">Sélectionner un immeuble</option>
                                    {immeubles.map(imm => (
                                        <option key={imm.id} value={imm.id}>{imm.nom}</option>
                                    ))}
                                </select>
                                <div className="button-group">
                                    <button type="submit" className="btn btn-save">Enregistrer</button>
                                    <button type="button" onClick={cancelEdit} className="btn btn-cancel">Annuler</button>
                                </div>
                            </form>
                        ) : (
                            <div className="annonce-details">
                                <h3>{annonce.titre}</h3>
                                <p>{annonce.contenu}</p>
                                <p><strong>Immeuble:</strong> {annonce.immeuble ? annonce.immeuble.nom : 'Non spécifié'}</p>
                                <p><strong>Date:</strong> {annonce.date ? new Date(annonce.date).toLocaleDateString() : 'Non spécifiée'}</p>
                                <div className="button-group">
                                    <button onClick={() => startEdit(annonce)} className="btn btn-edit">Modifier</button>
                                    <button onClick={() => handleDelete(annonce.id)} className="btn btn-delete">Supprimer</button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListeAnnonces;
