package ma.ac.uir.syndicproject.controller;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpSession;
import ma.ac.uir.syndicproject.model.FactureImmeuble;
import ma.ac.uir.syndicproject.model.Proprietaire;
import ma.ac.uir.syndicproject.service.FactureImmeubleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

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

    @GetMapping("/getFactureByImmeuble")
    public List<FactureImmeuble> getFactureByImmeuble(HttpSession session) {
        Proprietaire me = (Proprietaire) session.getAttribute("currentUser");
        return factureService.findByImmeubleId(me.getLogements().get(0).getImmeuble().getId());
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadDocument(@PathVariable Long id) throws IOException {
        FactureImmeuble doc = factureService.getFactureById(id);

        Resource resource = factureService.loadFileAsResource(doc.getUrlFichier());

        String contentType = switch (doc.getType().toLowerCase()) {
            case "pdf" -> MediaType.APPLICATION_PDF_VALUE;
            case "excel" -> "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            case "docx" -> "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            default -> MediaType.APPLICATION_OCTET_STREAM_VALUE;
        };
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + doc.getUrlFichier() + "\"")
                .body(resource);
    }
}
