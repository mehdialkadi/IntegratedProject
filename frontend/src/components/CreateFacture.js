import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import './CreateFacture.css';  // Nous allons créer ce fichier CSS

const CreateFacture = () => {
    const [formData, setFormData] = useState({
        type: '',
        description: '',
        montant: '',
        date: '',
        fichier: '',
        immeubleId: ''
    });
    const [immeubles, setImmeubles] = useState([]);

    useEffect(() => {
        // Charger la liste des immeubles depuis l'API
        axios.get('http://localhost:8080/api/immeubles')
            .then((response) => {
                setImmeubles(response.data);
            })
            .catch((error) => {
                console.error("Erreur lors du chargement des immeubles", error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { immeubleId, ...factureData } = formData;

        try {
            // Envoi de la requête POST pour créer la facture
            const response = await axios.post(
                `http://localhost:8080/api/factures-immeuble/immeuble/${immeubleId}`,
                factureData
            );
            console.log("Réponse de l'API:", response.data); // Vérifiez la réponse de l'API

            alert("Facture créée avec succès !");
            generateFacturePDF(response.data, immeubleId); // Générer le PDF après création de la facture
        } catch (error) {
            console.error("Erreur lors de la création de la facture :", error);
            alert("Erreur lors de la création de la facture.");
            console.error("Détails de l'erreur:", error.response || error.message);
        }
    };

    // Fonction pour générer la facture en PDF
    const generateFacturePDF = (facture, immeubleId) => {
        console.log("Données de la facture pour le PDF:", facture); // Vérifiez les données reçues

        // Recherche des données de l'immeuble
        const immeuble = immeubles.find((i) => i.id === parseInt(immeubleId));
        if (!immeuble) {
            console.error("Immeuble introuvable");
            alert("Immeuble introuvable.");
            return;
        }

        const doc = new jsPDF();

        // Titre de la facture
        doc.setFontSize(18);
        doc.text('Facture Immeuble', 20, 20);

        // Détails de la facture
        doc.setFontSize(12);
        doc.text(`Type: ${facture.type}`, 20, 30);
        doc.text(`Description: ${facture.description}`, 20, 40);
        doc.text(`Montant: ${facture.montant}€`, 20, 50);
        doc.text(`Date: ${facture.date}`, 20, 60);

        // Ajouter des informations sur l'immeuble
        doc.text(`Immeuble: ${immeuble.nom} - ${immeuble.adresse}`, 20, 70);

        // Si un fichier est fourni, ajouter un détail
        if (facture.fichier) {
            doc.text(`Fichier: ${facture.fichier}`, 20, 80);
        }

        // Numéro de facture
        const factureNumber = `Numéro de facture: ${facture.id || 'Inconnu'}`;
        doc.text(factureNumber, 20, 90);

        // Footer
        const footerText = "Merci pour votre confiance !";
        doc.setFontSize(10);
        doc.text(footerText, 20, 280);

        // Sauvegarder le PDF
        doc.save(`facture_${facture.id}.pdf`);
    };

    return (
        <div className="create-facture-container">
            <h2>Créer une facture pour un immeuble</h2>
            <form onSubmit={handleSubmit} className="facture-form">
                <div className="form-group">
                    <label>Type :</label>
                    <input
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Description :</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Montant :</label>
                    <input
                        type="number"
                        name="montant"
                        value={formData.montant}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Date :</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Nom du fichier (facultatif) :</label>
                    <input
                        type="text"
                        name="fichier"
                        value={formData.fichier}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>ID de l'Immeuble :</label>
                    <select
                        name="immeubleId"
                        value={formData.immeubleId}
                        onChange={handleChange}
                        required
                        className="form-control"
                    >
                        <option value="">Sélectionner un immeuble</option>
                        {immeubles.map((immeuble) => (
                            <option key={immeuble.id} value={immeuble.id}>
                                {immeuble.nom} - {immeuble.adresse}
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
