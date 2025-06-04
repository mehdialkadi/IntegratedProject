package ma.ac.uir.syndicproject.controller;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpSession;
import ma.ac.uir.syndicproject.model.DocumentCommun;
import ma.ac.uir.syndicproject.model.Proprietaire;
import ma.ac.uir.syndicproject.service.DocumentCommunService;
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
@RequestMapping("/api/documents-communs")
@CrossOrigin(origins = "http://localhost:3000")  // adjust to your React dev URL
public class DocumentCommunController {

    @Autowired
    private DocumentCommunService documentCommunService;

    @GetMapping
    public List<DocumentCommun> getAllDocuments() {
        return documentCommunService.getAllDocuments();
    }

    @GetMapping("/{id}")
    public Optional<DocumentCommun> getDocumentById(@PathVariable Long id) {
        return documentCommunService.getDocumentById(id);
    }

    @PostMapping
    public DocumentCommun createDocument(@RequestBody DocumentCommun document) {
        return documentCommunService.saveDocument(document);
    }

    @PutMapping("/{id}")
    public DocumentCommun updateDocument(@PathVariable Long id, @RequestBody DocumentCommun document) {
        document.setId(id);
        return documentCommunService.saveDocument(document);
    }

    @DeleteMapping("/{id}")
    public void deleteDocument(@PathVariable Long id) {
        documentCommunService.deleteDocument(id);
    }

    @GetMapping("/getDocumentsByImmeuble")
    public List<DocumentCommun> getDocumentsByImmeuble(HttpSession session) {
        Proprietaire me = (Proprietaire) session.getAttribute("currentUser");
        return documentCommunService.findByImmeubleId(me.getLogements().get(0).getImmeuble().getId());
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadDocument(@PathVariable Long id) throws IOException {
        DocumentCommun doc = documentCommunService.getDocumentById(id)
                .orElseThrow(() -> new EntityNotFoundException("Document not found with id " + id));

        Resource resource = documentCommunService.loadFileAsResource(doc.getUrlFichier());

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