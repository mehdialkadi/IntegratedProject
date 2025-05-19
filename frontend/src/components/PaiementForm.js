import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

function PaiementForm() {
    const [logements, setLogements] = useState([]);
    const [montant, setMontant] = useState("");
    const [date, setDate] = useState("");
    const [factureEnvoye, setFactureEnvoye] = useState(false);
    const [idLogement, setIdLogement] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8080/api/logement") // Assure-toi d’avoir ce endpoint
            .then(response => setLogements(response.data));
    }, []);

    const generatePDF = (paiementData) => {
        if (!paiementData.logement) {
            alert("Le logement sélectionné est invalide.");
            return;
        }

        const doc = new jsPDF();

        // Titre
        doc.setFontSize(18);
        doc.text("Détails du Paiement", 20, 20);

        // Détails du paiement
        doc.setFontSize(12);
        doc.text(`Logement: ${paiementData.logement.numero} - Etage ${paiementData.logement.etage}`, 20, 30);
        doc.text(`Montant: ${paiementData.montant} MAD`, 20, 40);
        doc.text(`Date: ${paiementData.date}`, 20, 50);
        doc.text(`Facture envoyée: ${paiementData.factureEnvoye ? "Oui" : "Non"}`, 20, 60);

        // Sauvegarder le PDF
        doc.save(`paiement_${paiementData.logement.numero}_${paiementData.date}.pdf`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8080/api/paiements", {
            montant,
            date,
            factureEnvoye,
            logement: { idLogement }
        }).then(res => {
            alert("Paiement ajouté !");
            // Facultatif : générer la facture automatiquement
            axios.get(`http://localhost:8080/api/paiements/${res.data.id}/facture`)
                .then(facture => {
                    alert("Facture :\n" + facture.data);
                });
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Créer Paiement</h2>
                <select value={idLogement} onChange={(e) => setIdLogement(e.target.value)} required>
                    <option value="">-- Sélectionner un logement --</option>
                    {logements.map(l => (
                        <option key={l.idLogement} value={l.idLogement}>
                            Logement #{l.numero} - Etage {l.etage}
                        </option>
                    ))}
                </select>

                <input type="number" step="0.01" placeholder="Montant" value={montant} onChange={(e) => setMontant(e.target.value)} required />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                <label>
                    Facture envoyée ?
                    <input type="checkbox" checked={factureEnvoye} onChange={() => setFactureEnvoye(!factureEnvoye)} />
                </label>

                <button type="submit">Ajouter Paiement</button>
            </form>

            {/* Bouton pour générer la facture PDF */}
            <button
                type="button"
                onClick={() => {
                    const logementData = logements.find(l => l.idLogement === idLogement);
                    if (!logementData) {
                        alert("Veuillez sélectionner un logement.");
                        return;
                    }
                    generatePDF({
                        montant,
                        date,
                        factureEnvoye,
                        logement: logementData
                    });
                }}
                disabled={!idLogement} // Désactive le bouton si aucun logement n'est sélectionné
            >
                Télécharger la facture PDF
            </button>
        </div>
    );
}

export default PaiementForm;