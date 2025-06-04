package ma.ac.uir.syndicproject.service;

import ma.ac.uir.syndicproject.model.DocumentCommun;
import ma.ac.uir.syndicproject.model.FactureImmeuble;
import ma.ac.uir.syndicproject.model.Immeuble;
import ma.ac.uir.syndicproject.repository.FactureImmeubleRepository;
import ma.ac.uir.syndicproject.repository.ImmeubleRepository;
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

@Service
public class FactureImmeubleService {

    @Autowired
    private FactureImmeubleRepository factureRepository;

    @Autowired
    private ImmeubleRepository immeubleRepository;

    public List<FactureImmeuble> getAllFactures() {
        return factureRepository.findAll();
    }

    public FactureImmeuble getFactureById(Long id) {
        return factureRepository.findById(id).orElse(null);
    }

    public FactureImmeuble createFacturePourImmeuble(Long immeubleId, FactureImmeuble facture) {
        Immeuble immeuble = immeubleRepository.findById(immeubleId)
                .orElseThrow(() -> new RuntimeException("Immeuble non trouvé avec ID: " + immeubleId));
        facture.setImmeuble(immeuble);
        return factureRepository.save(facture);
    }

    public FactureImmeuble saveFacture(FactureImmeuble facture) {
        return factureRepository.save(facture);
    }

    public void deleteFacture(Long id) {
        factureRepository.deleteById(id);
    }

    public List<FactureImmeuble> findByImmeubleId(Long immeubleId) {return factureRepository.findByImmeubleId(immeubleId);}

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
