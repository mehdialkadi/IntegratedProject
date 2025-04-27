package ma.ac.uir.syndicproject.service;

import ma.ac.uir.syndicproject.model.Logement;
import ma.ac.uir.syndicproject.repository.LogementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LogementService {

    @Autowired
    private LogementRepository logementRepository;

    public List<Logement> getAllLogements() {
        return logementRepository.findAll();
    }

    public Optional<Logement> getLogementById(Long id) {
        return logementRepository.findById(id);
    }

    public Logement saveLogement(Logement logement) {
        return logementRepository.save(logement);
    }

    public void deleteLogement(Long id) {
        logementRepository.deleteById(id);
    }
}
