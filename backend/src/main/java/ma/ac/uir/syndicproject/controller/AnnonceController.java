package ma.ac.uir.syndicproject.controller;

import jakarta.servlet.http.HttpSession;
import ma.ac.uir.syndicproject.model.*;
import ma.ac.uir.syndicproject.service.AnnonceService;
import ma.ac.uir.syndicproject.service.LogementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Properties;

@RestController
@RequestMapping("/api/annonces")
@CrossOrigin(origins = "http://localhost:3000")  // adjust to your React dev URL
public class AnnonceController {
    private AnnonceService annonceService;
    private LogementService logementService;

    @Autowired
    public AnnonceController(AnnonceService annonceService, LogementService logementService) {
        this.annonceService = annonceService;
        this.logementService = logementService;
    }


    @GetMapping
    public List<Annonce> getAllAnnonces() {
        return annonceService.getAllAnnonces();
    }

    @GetMapping("/{id}")
    public Optional<Annonce> getAnnonceById(@PathVariable Long id) {
        return annonceService.getAnnonceById(id);
    }

    @PostMapping
    public Annonce createAnnonce(@RequestBody Annonce annonce) {
        return annonceService.saveAnnonce(annonce);
    }

    @PutMapping("/{id}")
    public Annonce updateAnnonce(@PathVariable Long id, @RequestBody Annonce annonce) {
        annonce.setId(id);
        return annonceService.saveAnnonce(annonce);
    }

    @DeleteMapping("/{id}")
    public void deleteAnnonce(@PathVariable Long id) {
        annonceService.deleteAnnonce(id);
    }

    @GetMapping("/getLastThreeAnnonce")
    public List<String> getLastThreeAnnonce(HttpSession session) {
        Locataire me = (Locataire) session.getAttribute("currentUser");

        Logement monLogement = logementService.findByLocataire(me.getId());

        Long immeubleId = monLogement.getImmeuble().getId();

        return annonceService.findTodayTitlesByImmeubleId(immeubleId);
    }

    @GetMapping("/getAllImmeubleAnnoncesForLocataire")
    public List<Annonce> getAllImmeubleAnnoncesForLocataire(HttpSession session) {
        Locataire me = (Locataire) session.getAttribute("currentUser");

        return annonceService.getAllImmeubleAnnonces(me.getLogement().getImmeuble().getId());
    }

    @GetMapping("/getLastThreeAnnonceForProprio")
    public List<String> getLastThreeAnnonceForProprio(HttpSession session) {
        Proprietaire me = (Proprietaire) session.getAttribute("currentUser");

        return annonceService.findTodayTitlesByImmeubleId(me.getLogements().get(0).getImmeuble().getId());
    }

    @GetMapping("/getAllImmeubleAnnoncesForProprio")
    public List<Annonce> getAllImmeubleAnnoncesForProprio(HttpSession session) {
        Proprietaire me = (Proprietaire) session.getAttribute("currentUser");

        return annonceService.getAllImmeubleAnnonces(me.getLogements().get(0).getImmeuble().getId());
    }

    @GetMapping("/immeubles")
    public List<Immeuble> getAllImmeubles() {
        return annonceService.getAllImmeubles();
    }
}
