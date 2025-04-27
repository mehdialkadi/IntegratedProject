package ma.ac.uir.syndicproject.service;

import ma.ac.uir.syndicproject.model.Annonce;
import ma.ac.uir.syndicproject.repository.AnnonceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnnonceService {

    @Autowired
    private AnnonceRepository annonceRepository;

    public List<Annonce> getAllAnnonces() {
        return annonceRepository.findAll();
    }

    public Optional<Annonce> getAnnonceById(Long id) {
        return annonceRepository.findById(id);
    }

    public Annonce saveAnnonce(Annonce annonce) {
        return annonceRepository.save(annonce);
    }

    public void deleteAnnonce(Long id) {
        annonceRepository.deleteById(id);
    }

    public List<String> findTodayTitlesByImmeubleId(Long immeubleId){
        Pageable limit3 = PageRequest.of(0, 3);
        return annonceRepository.findTodayTitlesByImmeubleId(immeubleId, limit3);
    }
}
