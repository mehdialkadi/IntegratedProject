package ma.ac.uir.syndicproject.service;

import ma.ac.uir.syndicproject.model.PlaceGarage;
import ma.ac.uir.syndicproject.repository.PlaceGarageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlaceGarageService {

    @Autowired
    private PlaceGarageRepository placeGarageRepository;

    public List<PlaceGarage> getAllPlacesGarage() {
        return placeGarageRepository.findAll();
    }

    public Optional<PlaceGarage> getPlaceGarageById(Long id) {
        return placeGarageRepository.findById(id);
    }

    public PlaceGarage savePlaceGarage(PlaceGarage placeGarage) {
        return placeGarageRepository.save(placeGarage);
    }

    public void deletePlaceGarage(Long id) {
        placeGarageRepository.deleteById(id);
    }
}
