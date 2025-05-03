package ma.ac.uir.syndicproject.controller;

import ma.ac.uir.syndicproject.model.Logement;
import ma.ac.uir.syndicproject.model.Proprietaire;
import ma.ac.uir.syndicproject.model.Locataire;
import ma.ac.uir.syndicproject.model.Immeuble;
import ma.ac.uir.syndicproject.model.PlaceGarage;
import ma.ac.uir.syndicproject.service.LogementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/logement")
@CrossOrigin(origins = "http://localhost:3000")
public class LogementController {

    @Autowired
    private LogementService logementService;

    // Endpoint pour créer un logement
    @PostMapping
    public ResponseEntity<Logement> createLogement(@RequestBody Logement logement) {
        Logement savedLogement = logementService.createLogement(logement);
        return new ResponseEntity<>(savedLogement, HttpStatus.CREATED);
    }

    // Endpoint pour obtenir la liste des propriétaires
    @GetMapping("/proprietaires")
    public ResponseEntity<List<Proprietaire>> getAllProprietaires() {
        List<Proprietaire> proprietaires = logementService.getAllProprietaires();
        return new ResponseEntity<>(proprietaires, HttpStatus.OK);
    }

    // Endpoint pour obtenir la liste des locataires
    @GetMapping("/locataires")
    public ResponseEntity<List<Locataire>> getAllLocataires() {
        List<Locataire> locataires = logementService.getAllLocataires();
        return new ResponseEntity<>(locataires, HttpStatus.OK);
    }

    // Endpoint pour obtenir la liste des immeubles
    @GetMapping("/immeubles")
    public ResponseEntity<List<Immeuble>> getAllImmeubles() {
        List<Immeuble> immeubles = logementService.getAllImmeubles();
        return new ResponseEntity<>(immeubles, HttpStatus.OK);
    }

    // Endpoint pour obtenir la liste des places de garage
    @GetMapping("/places-garage")
    public ResponseEntity<List<PlaceGarage>> getAllPlacesGarage() {
        List<PlaceGarage> placesGarage = logementService.getAllPlacesGarage();
        return new ResponseEntity<>(placesGarage, HttpStatus.OK);
    }
    // Endpoint pour obtenir la liste des logements
    @GetMapping
    public ResponseEntity<List<Logement>> getAllLogements() {
        List<Logement> logements = logementService.getAllLogements();
        return new ResponseEntity<>(logements, HttpStatus.OK);
    }




}
