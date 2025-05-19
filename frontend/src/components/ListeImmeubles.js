import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListeImmeubles = () => {
    const [immeubles, setImmeubles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingImmeuble, setEditingImmeuble] = useState(null);

    useEffect(() => {
        fetchImmeubles();
    }, []);

    const fetchImmeubles = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/immeubles');
            setImmeubles(response.data);
        } catch (err) {
            setError('Impossible de charger les immeubles.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cet immeuble ?")) {
            try {
                await axios.delete(`http://localhost:8080/api/immeubles/${id}`);
                setImmeubles(immeubles.filter((imm) => imm.id !== id));
            } catch (err) {
                alert("Erreur lors de la suppression.");
            }
        }
    };

    const handleEdit = (immeuble) => {
        setEditingImmeuble({
            ...immeuble,
            garage: immeuble.garage ?? false,
            aAscenseur: immeuble.aAscenseur ?? false,
            aConcierge: immeuble.aConcierge ?? false
        });
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setEditingImmeuble((prev) => ({ ...prev, [name]: newValue }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:8080/api/immeubles/${editingImmeuble.id}`,
                editingImmeuble
            );

            // Mise à jour de l'état des immeubles avec la nouvelle version modifiée
            setImmeubles((prevImmeubles) =>
                prevImmeubles.map((imm) =>
                    imm.id === editingImmeuble.id ? response.data : imm
                )
            );

            // Réinitialiser l'immeuble en cours d'édition
            setEditingImmeuble(null);
        } catch (err) {
            alert("Erreur lors de la mise à jour.");
        }
    };

    if (loading) return <p>Chargement des immeubles...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Liste des Immeubles</h2>
            <ul style={styles.list}>
                {immeubles.map((immeuble) => (
                    <li key={immeuble.id} style={styles.listItem}>
                        <h3>{immeuble.nom}</h3>
                        <p><strong>Adresse:</strong> {immeuble.adresse}</p>
                        <p><strong>Nombre d'appartements:</strong> {immeuble.nombreAppart}</p>
                        <p><strong>Garage:</strong> {immeuble.garage ? "Oui" : "Non"}</p>
                        <p><strong>Ascenseur:</strong> {immeuble.aAscenseur ? "Oui" : "Non"}</p>
                        <p><strong>Concierge:</strong> {immeuble.aConcierge ? "Oui" : "Non"}</p>
                        <button onClick={() => handleEdit(immeuble)} style={styles.buttonEdit}>Modifier</button>
                        <button onClick={() => handleDelete(immeuble.id)} style={styles.buttonDelete}>Supprimer</button>
                    </li>
                ))}
            </ul>

            {editingImmeuble && (
                <form onSubmit={handleUpdate} style={styles.form}>
                    <h3>Modifier Immeuble</h3>
                    <input
                        type="text"
                        name="nom"
                        value={editingImmeuble.nom || ''}
                        onChange={handleInputChange}
                        placeholder="Nom"
                        required
                    />
                    <input
                        type="text"
                        name="adresse"
                        value={editingImmeuble.adresse || ''}
                        onChange={handleInputChange}
                        placeholder="Adresse"
                        required
                    />
                    <input
                        type="number"
                        name="nombreAppart"
                        value={editingImmeuble.nombreAppart || ''}
                        onChange={handleInputChange}
                        placeholder="Nombre d'appartements"
                        required
                    />
                    <label>
                        <input
                            type="checkbox"
                            name="garage"
                            checked={editingImmeuble.garage || false}
                            onChange={handleInputChange}
                        /> Garage
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="aAscenseur"
                            checked={editingImmeuble.aAscenseur || false}
                            onChange={handleInputChange}
                        /> Ascenseur
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="aConcierge"
                            checked={editingImmeuble.aConcierge || false}
                            onChange={handleInputChange}
                        /> Concierge
                    </label>
                    <br /><br />
                    <button type="submit" style={styles.buttonEdit}>Enregistrer</button>
                    <button type="button" onClick={() => setEditingImmeuble(null)} style={styles.buttonDelete}>Annuler</button>
                </form>
            )}
        </div>
    );
};

const styles = {
    container: { padding: '20px' },
    title: { textAlign: 'center' },
    list: { listStyleType: 'none', padding: 0 },
    listItem: {
        border: '1px solid #ddd',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
    },
    buttonEdit: {
        marginRight: '10px',
        padding: '5px 10px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer',
    },
    buttonDelete: {
        padding: '5px 10px',
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer',
    },
    form: {
        marginTop: '20px',
    }
};

export default ListeImmeubles;
