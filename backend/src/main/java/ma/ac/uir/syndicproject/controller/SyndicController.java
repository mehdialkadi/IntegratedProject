package ma.ac.uir.syndicproject.controller;

import ma.ac.uir.syndicproject.model.Syndic;
import ma.ac.uir.syndicproject.service.SyndicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/syndics")
public class SyndicController {

    @Autowired
    private SyndicService syndicService;

    @GetMapping
    public List<Syndic> getAllSyndics() {
        return syndicService.getAllSyndics();
    }

    @GetMapping("/{id}")
    public Optional<Syndic> getSyndicById(@PathVariable Long id) {
        return syndicService.getSyndicById(id);
    }

    @PostMapping
    public Syndic createSyndic(@RequestBody Syndic syndic) {
        return syndicService.saveSyndic(syndic);
    }

    @PutMapping("/{id}")
    public Syndic updateSyndic(@PathVariable Long id, @RequestBody Syndic syndic) {
        syndic.setId(id);
        return syndicService.saveSyndic(syndic);
    }

    @DeleteMapping("/{id}")
    public void deleteSyndic(@PathVariable Long id) {
        syndicService.deleteSyndic(id);
    }
}
