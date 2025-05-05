package ma.ac.uir.syndicproject.service;

import ma.ac.uir.syndicproject.model.DocumentCommun;
import ma.ac.uir.syndicproject.repository.DocumentCommunRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DocumentCommunService {

    @Autowired
    private DocumentCommunRepository documentCommunRepository;

    public List<DocumentCommun> getAllDocuments() {
        return documentCommunRepository.findAll();
    }

    public Optional<DocumentCommun> getDocumentById(Long id) {
        return documentCommunRepository.findById(id);
    }

    public DocumentCommun saveDocument(DocumentCommun document) {
        return documentCommunRepository.save(document);
    }

    public void deleteDocument(Long id) {
        documentCommunRepository.deleteById(id);
    }

    public List<DocumentCommun> findByImmeubleId(Long immeubleId) {return documentCommunRepository.findByImmeubleId(immeubleId);}
}
