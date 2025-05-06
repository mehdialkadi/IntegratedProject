import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import './CreateFacture.css';

const CreateFacture = () => {
    const [formData, setFormData] = useState({
        type: '',
        description: '',
        montant: '',
        date: '',
        fichier: null,
        immeubleId: ''
    });

    const [immeubles, setImmeubles] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/immeubles')
            .then((response) => {
                setImmeubles(response.data);
            })
            .catch((error) => {
                console.error("Erreur de chargement des immeubles :", error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const immeubleId = parseInt(formData.immeubleId, 10);
        const factureData = new FormData();

        factureData.append('type', formData.type);
        factureData.append('description', formData.description);
        factureData.append('montant', formData.montant);
        factureData.append('date', formData.date);

        // Ajouter le fichier seulement s'il est sélectionné
        if (formData.fichier) {
            factureData.append('file', formData.fichier);
        }

        try {
            const response = await axios.post(
                `http://localhost:8080/api/factures-immeuble/immeuble/${immeubleId}/upload`,
                factureData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            alert("✅ Facture créée avec succès !");
            if (response.data) {
                generateFacturePDF(response.data, immeubleId);
            }
        } catch (error) {
            console.error("Erreur lors de la création de la facture :", error);
            alert("❌ Échec de la création de la facture.");
        }
    };

    const generateFacturePDF = (facture, immeubleId) => {
        const immeuble = immeubles.find(i => i.id === immeubleId);
        if (!immeuble) {
            alert("Immeuble non trouvé.");
            return;
        }

        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('Facture - Immeuble', 20, 20);
        doc.setFontSize(12);
        doc.text(`Type: ${facture.type}`, 20, 30);
        doc.text(`Description: ${facture.description}`, 20, 40);
        doc.text(`Montant: ${facture.montant} €`, 20, 50);
        doc.text(`Date: ${facture.date}`, 20, 60);
        doc.text(`Immeuble: ${immeuble.nom} - ${immeuble.adresse}`, 20, 70);

        if (facture.urlFichier) {
            doc.text(`Fichier: ${facture.urlFichier}`, 20, 80);
        }

        doc.text(`Numéro de facture: ${facture.id}`, 20, 90);
        doc.setFontSize(10);
        doc.text("Merci pour votre confiance !", 20, 280);

        // Sauvegarder le PDF
        doc.save(`facture_${facture.id}.pdf`);
    };

    return (
        <div className="facture-container">
            <h2>Créer une facture</h2>
            <form onSubmit={handleSubmit} className="facture-form">
                <div className="form-group">
                    <label htmlFor="type">Type :</label>
                    <input
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        placeholder="Entrez le type de facture"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description :</label>
                    <input
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Entrez la description"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="montant">Montant (€) :</label>
                    <input
                        id="montant"
                        name="montant"
                        type="number"
                        value={formData.montant}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="date">Date :</label>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="fichier">Fichier (facultatif) :</label>
                    <input
                        id="fichier"
                        name="fichier"
                        type="file"
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="immeubleId">Immeuble :</label>
                    <select
                        id="immeubleId"
                        name="immeubleId"
                        value={formData.immeubleId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Sélectionnez un immeuble --</option>
                        {immeubles.map((i) => (
                            <option key={i.id} value={i.id}>
                                {i.nom} - {i.adresse}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn-submit">Créer la facture</button>
            </form>
        </div>
    );
};

export default CreateFacture;
