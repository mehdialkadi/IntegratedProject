package ma.ac.uir.syndicproject.service;

import ma.ac.uir.syndicproject.model.Syndic;
import ma.ac.uir.syndicproject.repository.SyndicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SyndicService {

    @Autowired
    private SyndicRepository syndicRepository;

    public List<Syndic> getAllSyndics() {
        return syndicRepository.findAll();
    }

    public Optional<Syndic> getSyndicById(Long id) {
        return syndicRepository.findById(id);
    }

    public Syndic saveSyndic(Syndic syndic) {
        return syndicRepository.save(syndic);
    }

    public void deleteSyndic(Long id) {
        syndicRepository.deleteById(id);
    }
    public Syndic authenticateSyndic(String email, String password) {
        // Rechercher un syndic par email
        Syndic syndic = syndicRepository.findByEmail(email);

        // Vérifier si le syndic existe et si le mot de passe est correct
        if (syndic != null && syndic.getPassword().equals(password)) {
            return syndic;  // Connexion réussie
        }

        return null;  // Connexion échouée
    }
}
