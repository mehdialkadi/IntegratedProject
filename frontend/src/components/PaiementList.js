import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

function PaiementList() {
    const [logements, setLogements] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [logementsRes, immeublesRes, residenciesRes, locatairesRes] = await Promise.all([
                    axios.get('http://localhost:8080/api/logement'),
                    axios.get('http://localhost:8080/api/immeubles'),
                    axios.get('http://localhost:8080/api/residencies'),
                    axios.get('http://localhost:8080/api/locataires')
                ]);

                // Filtrer les logements ayant des paiements valides
                const logementsAvecPaiements = logementsRes.data.filter(logement =>
                    logement.paiements && Array.isArray(logement.paiements) && logement.paiements.length > 0
                );

                const logementsAvecDetails = logementsAvecPaiements.map(logement => {
                    const immeuble = immeublesRes.data.find(imm =>
                        imm.logements.some(l => l.idLogement === logement.idLogement)
                    );

                    const residence = residenciesRes.data.find(res =>
                        res.immeubles.some(imm => imm.id === immeuble?.id)
                    );

                    const locataire = locatairesRes.data.find(loc => loc.idLogement === logement.idLogement);

                    return {
                        ...logement,
                        immeuble: immeuble || null,
                        residence: residence || null,
                        locataire: locataire || null
                    };
                });

                setLogements(logementsAvecDetails);
            } catch (error) {
                console.error("Erreur lors du chargement des données :", error);
            }
        };

        fetchData();
    }, []);

    const handlePaiementEffectue = (logementId, paiementId) => {
        const updatedLogements = logements.map(logement => {
            if (logement.idLogement === logementId) {
                const updatedPaiements = logement.paiements.map(paiement => {
                    if (paiement.id === paiementId) {
                        return { ...paiement, factureEnvoye: true };
                    }
                    return paiement;
                });
                return { ...logement, paiements: updatedPaiements };
            }
            return logement;
        });
        setLogements(updatedLogements);

        axios.put(`http://localhost:8080/api/paiement/${paiementId}`, { factureEnvoye: true })
            .then(response => {
                console.log("Paiement marqué comme effectué :", response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la mise à jour du paiement :", error);
            });
    };

    const handleGenererPDF = (logement, paiement) => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Facture de Paiement", 70, 20);

        doc.setFontSize(12);
        doc.text(`Date: ${paiement.date}`, 20, 40);
        doc.text(`Montant: ${paiement.montant} DH`, 20, 50);
        doc.text(`Facture envoyée: ${paiement.factureEnvoye ? "Oui" : "Non"}`, 20, 60);

        doc.text(`Logement: ${logement.numero}`, 20, 80);
        doc.text(`Immeuble: ${logement.immeuble?.nom || "N/A"}`, 20, 90);
        doc.text(`Résidence: ${logement.residence?.nom || "N/A"}`, 20, 100);
        doc.text(`Locataire: ${logement.locataire?.nom || "Inconnu"}`, 20, 110);

        doc.save(`Facture_Paiement_Logement${logement.numero}_Paiement${paiement.id}.pdf`);
    };

    return (
        <div>
            <h2>Liste des Logements et Paiements</h2>
            <table border="1" cellPadding="10">
                <thead>
                <tr>
                    <th>Logement</th>
                    <th>Immeuble</th>
                    <th>Résidence</th>
                    <th>Date Paiement</th>
                    <th>Montant</th>
                    <th>Facture envoyée</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {logements.map(logement =>
                        logement.paiements && logement.paiements.length > 0 && logement.paiements.map((paiement, index) => (
                            <tr key={`${logement.idLogement}-${index}`}>
                                <td>Logement {logement.numero}</td>
                                <td>{logement.immeuble?.nom || "N/A"}</td>
                                <td>{logement.residence?.nom || "N/A"}</td>
                                <td>{paiement.date}</td>
                                <td>{paiement.montant} DH</td>
                                <td>{paiement.factureEnvoye ? "Oui" : "Non"}</td>
                                <td>
                                    {!paiement.factureEnvoye ? (
                                        <button
                                            onClick={() => handlePaiementEffectue(logement.idLogement, paiement.id)}
                                            style={{ backgroundColor: 'green', color: 'white', marginRight: '5px' }}
                                        >
                                            Marquer comme payé
                                        </button>
                                    ) : (
                                        <span>🟢 Paiement effectué</span>
                                    )}
                                    <button
                                        onClick={() => handleGenererPDF(logement, paiement)}
                                        style={{ backgroundColor: 'blue', color: 'white', marginLeft: '5px' }}
                                    >
                                        Générer PDF
                                    </button>
                                </td>
                            </tr>
                        ))
                )}
                </tbody>
            </table>
        </div>
    );
}

export default PaiementList;