package ma.ac.uir.syndicproject.controller;

import ma.ac.uir.syndicproject.model.FactureImmeuble;
import ma.ac.uir.syndicproject.service.FactureImmeubleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/factures-immeuble")
@CrossOrigin(origins = "http://localhost:3000")
public class FactureImmeubleController {

    @Autowired
    private FactureImmeubleService factureService;

    // 🔵 Récupérer toutes les factures
    @GetMapping
    public List<FactureImmeuble> getAllFactures() {
        return factureService.getAllFactures();
    }

    // 🔵 Récupérer une facture par ID
    @GetMapping("/{id}")
    public FactureImmeuble getFactureById(@PathVariable Long id) {
        return factureService.getFactureById(id);
    }

    // 🟢 Créer une facture pour un immeuble
    @PostMapping("/immeuble/{immeubleId}")
    public FactureImmeuble createFacture(@PathVariable Long immeubleId, @RequestBody FactureImmeuble facture) {
        return factureService.createFacturePourImmeuble(immeubleId, facture);
    }

    // 🟡 Modifier une facture
    @PutMapping("/{id}")
    public FactureImmeuble updateFacture(@PathVariable Long id, @RequestBody FactureImmeuble facture) {
        facture.setId(id);
        return factureService.saveFacture(facture);
    }

    // 🔴 Supprimer une facture
    @DeleteMapping("/{id}")
    public void deleteFacture(@PathVariable Long id) {
        factureService.deleteFacture(id);
    }
}
