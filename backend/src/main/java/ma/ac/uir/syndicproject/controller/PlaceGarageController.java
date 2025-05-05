package ma.ac.uir.syndicproject.controller;

import jakarta.servlet.http.HttpSession;
import ma.ac.uir.syndicproject.model.*;
import ma.ac.uir.syndicproject.service.LogementService;
import ma.ac.uir.syndicproject.service.PlaceGarageService;
import ma.ac.uir.syndicproject.service.ReclamationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/places-garage")
@CrossOrigin(origins = "http://localhost:3000")  // adjust to your React dev URL
public class PlaceGarageController {
    private PlaceGarageService placeGarageService;
    private ReclamationService reclamationService;

    @Autowired
    public PlaceGarageController(PlaceGarageService placeGarageService, ReclamationService reclamationService) {
        this.placeGarageService = placeGarageService;
        this.reclamationService = reclamationService;
    }

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

    @GetMapping("/getAllOpenSpaces")
    public List<PlaceGarage> getAllOpenSpaces(HttpSession session) {
        Logement log = (Logement) session.getAttribute("currentLogement");
        return placeGarageService.getAllOpenSpaces("libre", log.getImmeuble().getId());
    }

    @PostMapping("/RequestGarageSpot")
    public Reclamation RequestGarageSpot(@RequestBody PlaceGarage placeGarage, HttpSession session) {
        Reclamation reclamation = new Reclamation();
        Proprietaire currentUser = (Proprietaire) session.getAttribute("currentUser");
        Logement currentLogement = (Logement) session.getAttribute("currentLogement");
        reclamation.setTitre("Demande d'une place de garage");
        reclamation.setDescription("Demande de réservation de la place de garage numéro " + placeGarage.getNumero());
        reclamation.setUtilisateur(currentUser);
        reclamation.setLogement(currentLogement);
        reclamation.setEtat("en attente");
        return reclamationService.saveReclamation(reclamation);
    }
}