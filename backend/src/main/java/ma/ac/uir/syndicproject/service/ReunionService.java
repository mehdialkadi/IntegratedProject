package ma.ac.uir.syndicproject.service;

import ma.ac.uir.syndicproject.model.Reunion;
import ma.ac.uir.syndicproject.repository.ReunionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReunionService {

    @Autowired
    private ReunionRepository reunionRepository;

    public List<Reunion> getAllReunions() {
        return reunionRepository.findAll();
    }

    public Optional<Reunion> getReunionById(Long id) {
        return reunionRepository.findById(id);
    }

    public Reunion saveReunion(Reunion reunion) {
        return reunionRepository.save(reunion);
    }

    public void deleteReunion(Long id) {
        reunionRepository.deleteById(id);
    }
}
