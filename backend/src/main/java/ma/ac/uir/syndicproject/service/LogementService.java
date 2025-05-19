package ma.ac.uir.syndicproject.service;

import ma.ac.uir.syndicproject.model.*;
import ma.ac.uir.syndicproject.repository.*;
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

    public Logement findByLocataire(Long locataireId){return logementRepository.findByLocataireId(locataireId);}


    @Autowired
    private ProprietaireRepository proprietaireRepository;

    @Autowired
    private LocataireRepository locataireRepository;

    @Autowired
    private ImmeubleRepository immeubleRepository;

    @Autowired
    private PlaceGarageRepository placeGarageRepository;

    public Logement createLogement(Logement logement) {
        return logementRepository.save(logement);
    }

    public List<Proprietaire> getAllProprietaires() {
        return proprietaireRepository.findAll();
    }

    public List<Locataire> getAllLocataires() {
        return locataireRepository.findAll();
    }

    public List<Immeuble> getAllImmeubles() {
        return immeubleRepository.findAll();
    }

    public List<PlaceGarage> getAllPlacesGarage() {
        return placeGarageRepository.findAll();
    }

    public Optional<Proprietaire> getProprietaireById(Long id) {
        return proprietaireRepository.findById(id);
    }

    public Optional<Locataire> getLocataireById(Long id) {
        return locataireRepository.findById(id);
    }

    public Optional<Immeuble> getImmeubleById(Long id) {
        return immeubleRepository.findById(id);
    }

    public Optional<PlaceGarage> getPlaceGarageById(Long id) {
        return placeGarageRepository.findById(id);
    }
    public List<Logement> getLogementsByImmeuble(Long immeubleId) {
        System.out.println("Appel à la méthode pour récupérer les logements de l'immeuble avec l'ID : " + immeubleId);
        return logementRepository.findByImmeubleId(immeubleId);  // La méthode doit filtrer par l'ID de l'immeuble
    }






}
