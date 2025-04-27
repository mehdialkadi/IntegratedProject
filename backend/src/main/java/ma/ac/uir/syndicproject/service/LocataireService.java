package ma.ac.uir.syndicproject.service;

import ma.ac.uir.syndicproject.model.Locataire;
import ma.ac.uir.syndicproject.repository.LocataireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LocataireService {

    @Autowired
    private LocataireRepository locataireRepository;

    public List<Locataire> getAllLocataires() {
        return locataireRepository.findAll();
    }

    public Optional<Locataire> getLocataireById(Long id) {
        return locataireRepository.findById(id);
    }

    public Locataire saveLocataire(Locataire locataire) {
        return locataireRepository.save(locataire);
    }

    public void deleteLocataire(Long id) {
        locataireRepository.deleteById(id);
    }

    public Locataire findLocataireByEmailAndPassword(String email, String password){return locataireRepository.findByEmailAndPassword(email, password);}
}
