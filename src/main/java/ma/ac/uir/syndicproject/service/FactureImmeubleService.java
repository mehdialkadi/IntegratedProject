package ma.ac.uir.syndicproject.service;

import ma.ac.uir.syndicproject.model.FactureImmeuble;
import ma.ac.uir.syndicproject.repository.FactureImmeubleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FactureImmeubleService {

    @Autowired
    private FactureImmeubleRepository factureImmeubleRepository;

    public List<FactureImmeuble> getAllFactures() {
        return factureImmeubleRepository.findAll();
    }

    public Optional<FactureImmeuble> getFactureById(Long id) {
        return factureImmeubleRepository.findById(id);
    }

    public FactureImmeuble saveFacture(FactureImmeuble facture) {
        return factureImmeubleRepository.save(facture);
    }

    public void deleteFacture(Long id) {
        factureImmeubleRepository.deleteById(id);
    }
}
