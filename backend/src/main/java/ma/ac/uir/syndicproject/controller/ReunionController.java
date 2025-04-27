package ma.ac.uir.syndicproject.controller;

import ma.ac.uir.syndicproject.model.Reunion;
import ma.ac.uir.syndicproject.service.ReunionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reunions")
@CrossOrigin(origins = "http://localhost:3000")  // adjust to your React dev URL
public class ReunionController {

    @Autowired
    private ReunionService reunionService;

    @GetMapping
    public List<Reunion> getAllReunions() {
        return reunionService.getAllReunions();
    }

    @GetMapping("/{id}")
    public Optional<Reunion> getReunionById(@PathVariable Long id) {
        return reunionService.getReunionById(id);
    }

    @PostMapping
    public Reunion createReunion(@RequestBody Reunion reunion) {
        return reunionService.saveReunion(reunion);
    }

    @PutMapping("/{id}")
    public Reunion updateReunion(@PathVariable Long id, @RequestBody Reunion reunion) {
        reunion.setId(id);
        return reunionService.saveReunion(reunion);
    }

    @DeleteMapping("/{id}")
    public void deleteReunion(@PathVariable Long id) {
        reunionService.deleteReunion(id);
    }
}
