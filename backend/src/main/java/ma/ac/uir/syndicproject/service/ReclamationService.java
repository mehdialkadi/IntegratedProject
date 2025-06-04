package ma.ac.uir.syndicproject.service;

import ma.ac.uir.syndicproject.model.Reclamation;
import ma.ac.uir.syndicproject.repository.ReclamationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReclamationService {

    @Autowired
    private ReclamationRepository reclamationRepository;

    public List<Reclamation> getAllReclamations() {
        return reclamationRepository.findAll();
    }

    public Optional<Reclamation> getReclamationById(Long id) {
        return reclamationRepository.findById(id);
    }

    public Reclamation saveReclamation(Reclamation reclamation) {
        return reclamationRepository.save(reclamation);
    }

    public void deleteReclamation(Long id) {
        reclamationRepository.deleteById(id);
    }

    public List<Reclamation> findByUtilisateur(Long locataireId) {return reclamationRepository.findByUtilisateurId(locataireId);}

    public List<Reclamation> findByLogement(Long logementId) {return reclamationRepository.findByLogementIdLogement(logementId);}
}
