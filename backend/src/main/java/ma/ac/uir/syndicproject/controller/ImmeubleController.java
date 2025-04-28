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
    public Optional<Immeuble> getImmeubleById(@PathVariable Long id) {
        return immeubleService.getImmeubleById(id);
    }

    // 🟢 Ajouter un immeuble
    @PostMapping
    public Immeuble createImmeuble(@RequestBody Immeuble immeuble) {
        return immeubleService.saveImmeuble(immeuble);
    }

    // 🟡 Modifier un immeuble
    @PutMapping("/{id}")
    public Immeuble updateImmeuble(@PathVariable Long id, @RequestBody Immeuble immeuble) {
        immeuble.setId(id); // On force l'id pour éviter d'en créer un nouveau
        return immeubleService.saveImmeuble(immeuble);
    }

    // 🔴 Supprimer un immeuble
    @DeleteMapping("/{id}")
    public void deleteImmeuble(@PathVariable Long id) {
        immeubleService.deleteImmeuble(id);
    }

    // ⚠️ Gestion globale des erreurs pour tout le controller
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        e.printStackTrace(); // Voir l'erreur dans la console backend
        return new ResponseEntity<>("Erreur backend : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
