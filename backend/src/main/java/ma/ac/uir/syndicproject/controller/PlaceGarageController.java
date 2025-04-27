package ma.ac.uir.syndicproject.controller;

import ma.ac.uir.syndicproject.model.PlaceGarage;
import ma.ac.uir.syndicproject.service.PlaceGarageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/places-garage")
public class PlaceGarageController {

    @Autowired
    private PlaceGarageService placeGarageService;

    @GetMapping
    public List<PlaceGarage> getAllPlacesGarage() {
        return placeGarageService.getAllPlacesGarage();
    }

    @GetMapping("/{id}")
    public Optional<PlaceGarage> getPlaceGarageById(@PathVariable Long id) {
        return placeGarageService.getPlaceGarageById(id);
    }

    @PostMapping
    public PlaceGarage createPlaceGarage(@RequestBody PlaceGarage placeGarage) {
        return placeGarageService.savePlaceGarage(placeGarage);
    }

    @PutMapping("/{id}")
    public PlaceGarage updatePlaceGarage(@PathVariable Long id, @RequestBody PlaceGarage placeGarage) {
        placeGarage.setId(id);
        return placeGarageService.savePlaceGarage(placeGarage);
    }

    @DeleteMapping("/{id}")
    public void deletePlaceGarage(@PathVariable Long id) {
        placeGarageService.deletePlaceGarage(id);
    }
}
