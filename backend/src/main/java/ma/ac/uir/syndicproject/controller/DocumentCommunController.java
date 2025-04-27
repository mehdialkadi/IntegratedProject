package ma.ac.uir.syndicproject.controller;

import ma.ac.uir.syndicproject.model.DocumentCommun;
import ma.ac.uir.syndicproject.service.DocumentCommunService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
}
