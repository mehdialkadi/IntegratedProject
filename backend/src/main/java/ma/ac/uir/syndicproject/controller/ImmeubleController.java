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
@CrossOrigin(origins = "http://localhost:3000") // Pour autoriser React à appeler cette API
public class ImmeubleController {

    private final ImmeubleService immeubleService;

    @Autowired
    public ImmeubleController(ImmeubleService immeubleService) {
        this.immeubleService = immeubleService;
    }

    // 🔵 Récupérer tous les immeubles
    @GetMapping
    public ResponseEntity<List<Immeuble>> getAllImmeubles() {
        List<Immeuble> immeubles = immeubleService.getAllImmeubles();
        return ResponseEntity.ok(immeubles);
    }

    // 🔵 Récupérer un immeuble par ID
    @GetMapping("/{id}")
    public ResponseEntity<Immeuble> getImmeubleById(@PathVariable Long id) {
        return immeubleService.getImmeubleById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 🟢 Ajouter un immeuble
    @PostMapping
    public ResponseEntity<?> createImmeuble(@RequestBody Immeuble immeuble) {
        if (immeuble.getNom() == null || immeuble.getAdresse() == null) {
            return ResponseEntity.badRequest().body("Nom et adresse sont requis.");
        }
        try {
            Immeuble saved = immeubleService.saveImmeuble(immeuble);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la création de l'immeuble : " + e.getMessage());
        }
    }

    // 🟡 Modifier un immeuble
    @PutMapping("/{id}")
    public ResponseEntity<?> updateImmeuble(@PathVariable Long id, @RequestBody Immeuble immeuble) {
        if (!immeubleService.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Immeuble non trouvé pour l'ID : " + id);
        }
        try {
            immeuble.setId(id); // Forcer l'ID pour update
            Immeuble updated = immeubleService.saveImmeuble(immeuble);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la mise à jour : " + e.getMessage());
        }
    }

    // 🔴 Supprimer un immeuble
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteImmeuble(@PathVariable Long id) {
        try {
            immeubleService.deleteImmeuble(id);
            return ResponseEntity.ok("Immeuble supprimé avec succès");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la suppression : " + e.getMessage());
        }
    }

    // 🔵 Récupérer les immeubles par résidence
    @GetMapping("/residence")
    public ResponseEntity<List<Immeuble>> getImmeublesByResidency(@RequestParam Long residencyId) {
        List<Immeuble> immeubles = immeubleService.getImmeublesByResidency(residencyId);
        if (immeubles.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(immeubles);
    }

    // ⚠️ Gestion globale des erreurs
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        e.printStackTrace(); // Log console
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Erreur backend : " + e.getMessage());
    }
}
