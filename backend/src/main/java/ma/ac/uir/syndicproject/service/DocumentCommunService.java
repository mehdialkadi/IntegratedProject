package ma.ac.uir.syndicproject.service;

import ma.ac.uir.syndicproject.model.DocumentCommun;
import ma.ac.uir.syndicproject.repository.DocumentCommunRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
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

    public Resource loadFileAsResource(String fileName) throws IOException {
        final String baseDir = "C:/Codes/S8_PI/IntegratedProject/uploads"; // adjust

        try {
            Path filePath = Paths.get(baseDir).resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                return resource;
            } else {
                throw new FileNotFoundException("File not found " + fileName);
            }
        } catch (MalformedURLException | FileNotFoundException ex) {
            throw new IOException("File not found " + fileName, ex);
        }
    }
}
