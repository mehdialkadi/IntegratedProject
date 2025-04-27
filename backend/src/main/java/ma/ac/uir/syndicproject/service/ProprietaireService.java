package ma.ac.uir.syndicproject.service;

import ma.ac.uir.syndicproject.model.Proprietaire;
import ma.ac.uir.syndicproject.repository.ProprietaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProprietaireService {

    @Autowired
    private ProprietaireRepository proprietaireRepository;

    public List<Proprietaire> getAllProprietaires() {
        return proprietaireRepository.findAll();
    }

    public Optional<Proprietaire> getProprietaireById(Long id) {
        return proprietaireRepository.findById(id);
    }

    public Proprietaire saveProprietaire(Proprietaire proprietaire) {
        return proprietaireRepository.save(proprietaire);
    }

    public void deleteProprietaire(Long id) {
        proprietaireRepository.deleteById(id);
    }
}
