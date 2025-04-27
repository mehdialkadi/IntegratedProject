package ma.ac.uir.syndicproject.controller;

import ma.ac.uir.syndicproject.model.Locataire;
import ma.ac.uir.syndicproject.service.LocataireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/locataires")
@CrossOrigin(origins = "http://localhost:3000")  // adjust to your React dev URL
public class LocataireController {

    @Autowired
    private LocataireService locataireService;

    @GetMapping
    public List<Locataire> getAllLocataires() {
        return locataireService.getAllLocataires();
    }

    @GetMapping("/{id}")
    public Optional<Locataire> getLocataireById(@PathVariable Long id) {
        return locataireService.getLocataireById(id);
    }

    @PostMapping
    public Locataire createLocataire(@RequestBody Locataire locataire) {
        return locataireService.saveLocataire(locataire);
    }

    @PutMapping("/{id}")
    public Locataire updateLocataire(@PathVariable Long id, @RequestBody Locataire locataire) {
        locataire.setId(id);
        return locataireService.saveLocataire(locataire);
    }

    @DeleteMapping("/{id}")
    public void deleteLocataire(@PathVariable Long id) {
        locataireService.deleteLocataire(id);
    }
}
