package ma.ac.uir.syndicproject.controller;

import ma.ac.uir.syndicproject.model.Logement;
import ma.ac.uir.syndicproject.service.LogementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/logements")
@CrossOrigin(origins = "http://localhost:3000")  // adjust to your React dev URL
public class LogementController {

    @Autowired
    private LogementService logementService;

    @GetMapping
    public List<Logement> getAllLogements() {
        return logementService.getAllLogements();
    }

    @GetMapping("/{id}")
    public Optional<Logement> getLogementById(@PathVariable Long id) {
        return logementService.getLogementById(id);
    }

    @PostMapping
    public Logement createLogement(@RequestBody Logement logement) {
        return logementService.saveLogement(logement);
    }

    @PutMapping("/{id}")
    public Logement updateLogement(@PathVariable Long id, @RequestBody Logement logement) {
        logement.setIdLogement(id);
        return logementService.saveLogement(logement);
    }

    @DeleteMapping("/{id}")
    public void deleteLogement(@PathVariable Long id) {
        logementService.deleteLogement(id);
    }
}
