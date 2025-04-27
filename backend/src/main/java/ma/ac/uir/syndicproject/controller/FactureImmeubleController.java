package ma.ac.uir.syndicproject.controller;

import ma.ac.uir.syndicproject.model.FactureImmeuble;
import ma.ac.uir.syndicproject.service.FactureImmeubleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/factures-immeuble")
@CrossOrigin(origins = "http://localhost:3000")  // adjust to your React dev URL
public class FactureImmeubleController {

    @Autowired
    private FactureImmeubleService factureService;

    @GetMapping
    public List<FactureImmeuble> getAllFactures() {
        return factureService.getAllFactures();
    }

    @GetMapping("/{id}")
    public Optional<FactureImmeuble> getFactureById(@PathVariable Long id) {
        return factureService.getFactureById(id);
    }

    @PostMapping
    public FactureImmeuble createFacture(@RequestBody FactureImmeuble facture) {
        return factureService.saveFacture(facture);
    }

    @PutMapping("/{id}")
    public FactureImmeuble updateFacture(@PathVariable Long id, @RequestBody FactureImmeuble facture) {
        facture.setId(id);
        return factureService.saveFacture(facture);
    }

    @DeleteMapping("/{id}")
    public void deleteFacture(@PathVariable Long id) {
        factureService.deleteFacture(id);
    }
}
