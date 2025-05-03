package ma.ac.uir.syndicproject.controller;

import ma.ac.uir.syndicproject.model.Immeuble;
import ma.ac.uir.syndicproject.service.ImmeubleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/immeubles")
@CrossOrigin(origins = "http://localhost:3000")  // Permet les appels depuis React
public class ImmeubleController {

    @Autowired
    private ImmeubleService immeubleService;

    // 🔵 Récupérer tous les immeubles
    @GetMapping
    public List<Immeuble> getAllImmeubles() {
        return immeubleService.getAllImmeubles();
    }

    // 🔵 Récupérer un immeuble par ID
    @GetMapping("/{id}")
    public ResponseEntity<Immeuble> getImmeubleById(@PathVariable Long id) {
        Optional<Immeuble> immeuble = immeubleService.getImmeubleById(id);
        return immeuble.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // 🟢 Ajouter un immeuble
    @PostMapping
    public ResponseEntity<?> createImmeuble(@RequestBody Immeuble immeuble) {
        if (immeuble.getNom() == null || immeuble.getAdresse() == null) {
            return new ResponseEntity<>("Nom et adresse sont requis.", HttpStatus.BAD_REQUEST);
        }

        try {
            Immeuble savedImmeuble = immeubleService.saveImmeuble(immeuble);
            return new ResponseEntity<>(savedImmeuble, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors de la création de l'immeuble : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 🟡 Modifier un immeuble
    @PutMapping("/{id}")
    public ResponseEntity<?> updateImmeuble(@PathVariable Long id, @RequestBody Immeuble immeuble) {
        if (!immeubleService.existsById(id)) {
            return new ResponseEntity<>("Immeuble non trouvé pour l'ID donné.", HttpStatus.NOT_FOUND);
        }

        try {
            immeuble.setId(id); // On force l'id pour éviter d'en créer un nouveau
            Immeuble updatedImmeuble = immeubleService.saveImmeuble(immeuble);
            return new ResponseEntity<>(updatedImmeuble, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors de la mise à jour de l'immeuble : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 🔴 Supprimer un immeuble
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteImmeuble(@PathVariable Long id) {
        try {
            immeubleService.deleteImmeuble(id);
            return new ResponseEntity<>("Immeuble supprimé avec succès", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors de la suppression de l'immeuble : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 🔵 Récupérer les immeubles par résidence
    @GetMapping("/residence")
    public ResponseEntity<List<Immeuble>> getImmeublesByResidency(@RequestParam Long residencyId) {
        List<Immeuble> immeubles = immeubleService.getImmeublesByResidency(residencyId);
        if (immeubles.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(immeubles, HttpStatus.OK);
    }

    // ⚠️ Gestion globale des erreurs pour tout le controller
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        e.printStackTrace(); // Voir l'erreur dans la console backend
        return new ResponseEntity<>("Erreur backend : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
