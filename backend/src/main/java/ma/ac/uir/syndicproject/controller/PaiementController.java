package ma.ac.uir.syndicproject.controller;

import ch.qos.logback.classic.Logger;
import ma.ac.uir.syndicproject.model.Paiement;
import ma.ac.uir.syndicproject.service.PaiementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/paiements")
@CrossOrigin(origins = "http://localhost:3000")  // adjust to your React dev URL
public class PaiementController {

    @Autowired
    private PaiementService paiementService;

    @GetMapping
    public List<Paiement> getAllPaiements() {
        return paiementService.getAllPaiements();
    }

    @GetMapping("/{id}")
    public Optional<Paiement> getPaiementById(@PathVariable Long id) {
        return paiementService.getPaiementById(id);
    }

    @PostMapping
    public Paiement createPaiement(@RequestBody Paiement paiement) {
        return paiementService.savePaiement(paiement);
    }

    @PutMapping("/{id}")
    public Paiement updatePaiement(@PathVariable Long id, @RequestBody Paiement paiement) {
        paiement.setId(id);
        return paiementService.savePaiement(paiement);
    }

    @DeleteMapping("/{id}")
    public void deletePaiement(@PathVariable Long id) {
        paiementService.deletePaiement(id);
    }
    @GetMapping("/{id}/facture")
    public ResponseEntity<String> generateFacture(@PathVariable Long id) {
        Optional<Paiement> paiementOpt = paiementService.getPaiementById(id);
        if (paiementOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Paiement paiement = paiementOpt.get();
        String facture = "FACTURE PAIEMENT\n" +
                "ID: " + paiement.getId() + "\n" +
                "Montant: " + paiement.getMontant() + " MAD\n" +
                "Date: " + paiement.getDate() + "\n" +
                "Logement: " + paiement.getLogement().getIdLogement();

        return ResponseEntity.ok(facture);
    }
    @GetMapping("/paiements/with-details")
    public List<Paiement> getPaiementsWithDetails() {
        return paiementService.findAllWithDetails();
    }






}