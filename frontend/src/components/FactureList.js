import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function FactureList() {
    const [factures, setFactures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentFacture, setCurrentFacture] = useState(null);
    const [immeubles, setImmeubles] = useState([]);

    // Charger les factures
    const fetchFactures = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/factures-immeuble');
            setFactures(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des factures:', error);
        } finally {
            setLoading(false);
        }
    };

    // Charger les immeubles pour le select
    const fetchImmeubles = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/immeubles');
            setImmeubles(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des immeubles:', error);
        }
    };

    useEffect(() => {
        fetchFactures();
        fetchImmeubles();
    }, []);

    if (loading) {
        return <p>Chargement des factures...</p>;
    }

    // Générer le PDF d'une facture
    const handleGenererPDF = (facture) => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Facture", 70, 20);

        doc.setFontSize(12);
        doc.text(`ID Facture: ${facture.id}`, 20, 40);
        doc.text(`Description: ${facture.description}`, 20, 50);
        doc.text(`Date: ${new Date(facture.date).toLocaleDateString()}`, 20, 60);
        doc.text(`Montant: ${facture.montant} €`, 20, 70);  // <-- Ajout du montant ici
        doc.text(`Immeuble: ${facture.immeuble?.nom || "Immeuble non spécifié"}`, 20, 80);

        doc.save(`Facture_${facture.id}.pdf`);
    };


    // Démarrer la modification
    const handleModifierFacture = (facture) => {
        setCurrentFacture({
            ...facture,
            immeubleId: facture.immeuble ? facture.immeuble.id : '',
        });
        setIsEditing(true);
    };

    // Annuler modification
    const handleAnnulerModification = () => {
        setIsEditing(false);
        setCurrentFacture(null);
    };

    // Mettre à jour la facture
    const handleUpdateFacture = async (e) => {
        e.preventDefault();

        const updatedFacture = {
            id: currentFacture.id,
            description: currentFacture.description,
            date: currentFacture.date,
            montant: currentFacture.montant,
            urlFichier: currentFacture.urlFichier,
            immeuble: immeubles.find(i => i.id === parseInt(currentFacture.immeubleId)) || null,
        };

        try {
            await axios.put(`http://localhost:8080/api/factures-immeuble/${updatedFacture.id}`, updatedFacture);
            await fetchFactures();
            setIsEditing(false);
            setCurrentFacture(null);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la facture:', error);
        }
    };

    return (
        <div>
            <h2>Liste des Factures</h2>

            {isEditing ? (
                <div>
                    <h3>Modifier la Facture</h3>
                    <form onSubmit={handleUpdateFacture}>
                        <div>
                            <label>ID Facture:</label>
                            <input type="text" value={currentFacture.id} readOnly disabled />
                        </div>

                        <div>
                            <label>Description:</label>
                            <textarea
                                value={currentFacture.description}
                                onChange={(e) =>
                                    setCurrentFacture({ ...currentFacture, description: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div>
                            <label>Date:</label>
                            <input
                                type="date"
                                value={new Date(currentFacture.date).toISOString().split('T')[0]}
                                onChange={(e) =>
                                    setCurrentFacture({ ...currentFacture, date: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div>
                            <label>Montant (€):</label>
                            <input
                                type="number"
                                step="0.01"
                                value={currentFacture.montant}
                                onChange={(e) =>
                                    setCurrentFacture({ ...currentFacture, montant: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div>
                            <label>Nom du fichier :</label>
                            <input
                                type="text"
                                value={currentFacture.urlFichier || ''}
                                onChange={(e) =>
                                    setCurrentFacture({ ...currentFacture, urlFichier: e.target.value })
                                }
                            />
                        </div>

                        <div>
                            <label>Immeuble :</label>
                            <select
                                value={currentFacture.immeubleId || ''}
                                onChange={(e) =>
                                    setCurrentFacture({ ...currentFacture, immeubleId: e.target.value })
                                }
                                required
                            >
                                <option value="">Sélectionner un immeuble</option>
                                {immeubles.map((immeuble) => (
                                    <option key={immeuble.id} value={immeuble.id}>
                                        {immeuble.nom}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={{ marginTop: '10px' }}>
                            <button type="submit">Mettre à jour</button>
                            <button type="button" onClick={handleAnnulerModification} style={{ marginLeft: '10px' }}>
                                Annuler
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Montant (€)</th>
                        <th>Immeuble</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {factures.length > 0 ? (
                        factures.map((facture) => (
                            <tr key={facture.id}>
                                <td>{facture.id}</td>
                                <td>{facture.description}</td>
                                <td>{new Date(facture.date).toLocaleDateString()}</td>
                                <td>{facture.montant}</td>
                                <td>{facture.immeuble ? facture.immeuble.nom : 'Immeuble non spécifié'}</td>
                                <td>
                                    <button
                                        onClick={() => handleGenererPDF(facture)}
                                        style={{
                                            backgroundColor: 'blue',
                                            color: 'white',
                                            padding: '5px 10px',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            marginRight: '10px',
                                        }}
                                    >
                                        Générer PDF
                                    </button>

                                    <button
                                        onClick={() => handleModifierFacture(facture)}
                                        style={{
                                            backgroundColor: 'orange',
                                            color: 'white',
                                            padding: '5px 10px',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            marginRight: '10px',
                                        }}
                                    >
                                        Modifier
                                    </button>

                                    <button
                                        onClick={() => {
                                            if(window.confirm('Êtes-vous sûr de vouloir supprimer cette facture ?')){
                                                axios.delete(`http://localhost:8080/api/factures-immeuble/${facture.id}`)
                                                    .then(() => {
                                                        alert('Facture supprimée');
                                                        fetchFactures();
                                                    })
                                                    .catch(console.error);
                                            }
                                        }}
                                        style={{
                                            backgroundColor: 'red',
                                            color: 'white',
                                            padding: '5px 10px',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">Aucune facture disponible</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default FactureList;
