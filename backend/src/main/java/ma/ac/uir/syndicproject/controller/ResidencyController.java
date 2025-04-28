package ma.ac.uir.syndicproject.controller;

import ma.ac.uir.syndicproject.model.Residency;
import ma.ac.uir.syndicproject.service.ResidencyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/residencies")
@CrossOrigin(origins = "http://localhost:3000")  // adjust to your React dev URL
public class ResidencyController {

    @Autowired
    private ResidencyService residencyService;

    @GetMapping
    public List<Residency> getAllResidencies() {
        return residencyService.getAllResidencies();
    }

    @GetMapping("/{id}")
    public Optional<Residency> getResidencyById(@PathVariable Long id) {
        return residencyService.getResidencyById(id);
    }

    @PostMapping
    public Residency createResidency(@RequestBody Residency residency) {
        return residencyService.saveResidency(residency);
    }

    @PutMapping("/{id}")
    public Residency updateResidency(@PathVariable Long id, @RequestBody Residency residency) {
        residency.setId(id);
        return residencyService.saveResidency(residency);
    }

    @DeleteMapping("/{id}")
    public void deleteResidency(@PathVariable Long id) {
        residencyService.deleteResidency(id);
    }


}
