package ma.ac.uir.syndicproject.service;

import ma.ac.uir.syndicproject.model.Immeuble;
import ma.ac.uir.syndicproject.repository.ImmeubleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImmeubleService {

    @Autowired
    private ImmeubleRepository immeubleRepository;

    public List<Immeuble> getAllImmeubles() {
        return immeubleRepository.findAll();
    }

    public Optional<Immeuble> getImmeubleById(Long id) {
        return immeubleRepository.findById(id);
    }

    public Immeuble saveImmeuble(Immeuble immeuble) {
        return immeubleRepository.save(immeuble);
    }

    public void deleteImmeuble(Long id) {
        immeubleRepository.deleteById(id);
    }
}
