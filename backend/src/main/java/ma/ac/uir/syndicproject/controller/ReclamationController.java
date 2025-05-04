package ma.ac.uir.syndicproject.controller;

import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.Id;
import jakarta.servlet.http.HttpSession;
import ma.ac.uir.syndicproject.model.Locataire;
import ma.ac.uir.syndicproject.model.Logement;
import ma.ac.uir.syndicproject.model.Reclamation;
import ma.ac.uir.syndicproject.model.Utilisateur;
import ma.ac.uir.syndicproject.service.LocataireService;
import ma.ac.uir.syndicproject.service.LogementService;
import ma.ac.uir.syndicproject.service.ReclamationService;
import ma.ac.uir.syndicproject.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reclamations")
@CrossOrigin(origins = "http://localhost:3000")  // adjust to your React dev URL
public class ReclamationController {
    private ReclamationService reclamationService;
    private UtilisateurService utilisateurService;
    private LogementService logementService;

    @Autowired
    public ReclamationController(ReclamationService reclamationService, UtilisateurService utilisateurService, LogementService logementService) {
        this.reclamationService = reclamationService;
        this.utilisateurService = utilisateurService;
        this.logementService = logementService;
    }

    @GetMapping
    public List<Reclamation> getAllReclamations() {
        return reclamationService.getAllReclamations();
    }

    @GetMapping("/{id}")
    public Optional<Reclamation> getReclamationById(@PathVariable Long id) {
        return reclamationService.getReclamationById(id);
    }

    @PostMapping
    public Reclamation createReclamation(@RequestBody Reclamation reclamation, HttpSession session) {
        Locataire currentUser = (Locataire) session.getAttribute("currentUser");
        Logement currentLogement = logementService.findByLocataire(currentUser.getId());
        reclamation.setUtilisateur(currentUser);
        reclamation.setLogement(currentLogement);
        reclamation.setEtat("en attente");
        return reclamationService.saveReclamation(reclamation);
    }

    @PutMapping("/{id}")
    public Reclamation updateReclamation(@PathVariable Long id, @RequestBody Reclamation reclamation) {
        reclamation.setId(id);
        return reclamationService.saveReclamation(reclamation);
    }

    @DeleteMapping("/{id}")
    public void deleteReclamation(@PathVariable Long id) {
        reclamationService.deleteReclamation(id);
    }

    @GetMapping("/getReclamationsByLocataire")
    public List<Reclamation> getReclamationsByLocataire(HttpSession session) {
        Locataire me = (Locataire) session.getAttribute("currentUser");
        return reclamationService.findByLocataire(me.getId());
    }
}