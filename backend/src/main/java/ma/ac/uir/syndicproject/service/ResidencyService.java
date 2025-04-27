package ma.ac.uir.syndicproject.service;

import ma.ac.uir.syndicproject.model.Residency;
import ma.ac.uir.syndicproject.repository.ResidencyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResidencyService {

    @Autowired
    private ResidencyRepository residencyRepository;

    public List<Residency> getAllResidencies() {
        return residencyRepository.findAll();
    }

    public Optional<Residency> getResidencyById(Long id) {
        return residencyRepository.findById(id);
    }

    public Residency saveResidency(Residency residency) {
        return residencyRepository.save(residency);
    }

    public void deleteResidency(Long id) {
        residencyRepository.deleteById(id);
    }
}
