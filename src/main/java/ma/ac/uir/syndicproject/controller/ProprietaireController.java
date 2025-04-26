package ma.ac.uir.syndicproject.controller;

import ma.ac.uir.syndicproject.model.Proprietaire;
import ma.ac.uir.syndicproject.service.ProprietaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/proprietaires")
public class ProprietaireController {

    @Autowired
    private ProprietaireService proprietaireService;

    @GetMapping
    public List<Proprietaire> getAllProprietaires() {
        return proprietaireService.getAllProprietaires();
    }

    @GetMapping("/{id}")
    public Optional<Proprietaire> getProprietaireById(@PathVariable Long id) {
        return proprietaireService.getProprietaireById(id);
    }

    @PostMapping
    public Proprietaire createProprietaire(@RequestBody Proprietaire proprietaire) {
        return proprietaireService.saveProprietaire(proprietaire);
    }

    @PutMapping("/{id}")
    public Proprietaire updateProprietaire(@PathVariable Long id, @RequestBody Proprietaire proprietaire) {
        proprietaire.setId(id);
        return proprietaireService.saveProprietaire(proprietaire);
    }

    @DeleteMapping("/{id}")
    public void deleteProprietaire(@PathVariable Long id) {
        proprietaireService.deleteProprietaire(id);
    }
}
