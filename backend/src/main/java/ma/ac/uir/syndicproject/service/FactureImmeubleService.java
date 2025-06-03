package ma.ac.uir.syndicproject.service;

import io.micrometer.core.instrument.Counter;
import ma.ac.uir.syndicproject.model.DocumentCommun;
import ma.ac.uir.syndicproject.model.FactureImmeuble;
import ma.ac.uir.syndicproject.model.Immeuble;
import ma.ac.uir.syndicproject.repository.FactureImmeubleRepository;
import ma.ac.uir.syndicproject.repository.ImmeubleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public Long countFactures() {
        Counter factureImmeubleRepository = null;
        return (long) factureImmeubleRepository.count();
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
    public FactureImmeuble updateFacture(Long id, FactureImmeuble factureDetails) {
        FactureImmeuble facture = factureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Facture non trouvée avec ID: " + id));

        // Met à jour chaque champ nécessaire — adapte selon ta classe
        facture.setDescription(factureDetails.getDescription());
        facture.setDate(factureDetails.getDate());
        facture.setMontant(factureDetails.getMontant());
        facture.setUrlFichier(factureDetails.getUrlFichier());

        // Met à jour l'immeuble si nécessaire
        if (factureDetails.getImmeuble() != null && factureDetails.getImmeuble().getId() != null) {
            Immeuble immeuble = immeubleRepository.findById(factureDetails.getImmeuble().getId())
                    .orElseThrow(() -> new RuntimeException("Immeuble non trouvé avec ID: " + factureDetails.getImmeuble().getId()));
            facture.setImmeuble(immeuble);
        }

        return factureRepository.save(facture);
    }

}