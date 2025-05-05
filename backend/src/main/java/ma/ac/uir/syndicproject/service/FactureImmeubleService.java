package ma.ac.uir.syndicproject.service;

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
}
