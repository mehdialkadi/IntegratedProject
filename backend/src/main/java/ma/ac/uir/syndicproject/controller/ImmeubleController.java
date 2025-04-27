package ma.ac.uir.syndicproject.controller;

import ma.ac.uir.syndicproject.model.Immeuble;
import ma.ac.uir.syndicproject.service.ImmeubleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/immeubles")
@CrossOrigin(origins = "http://localhost:3000")  // adjust to your React dev URL
public class ImmeubleController {

    @Autowired
    private ImmeubleService immeubleService;

    @GetMapping
    public List<Immeuble> getAllImmeubles() {
        return immeubleService.getAllImmeubles();
    }

    @GetMapping("/{id}")
    public Optional<Immeuble> getImmeubleById(@PathVariable Long id) {
        return immeubleService.getImmeubleById(id);
    }

    @PostMapping
    public Immeuble createImmeuble(@RequestBody Immeuble immeuble) {
        return immeubleService.saveImmeuble(immeuble);
    }

    @PutMapping("/{id}")
    public Immeuble updateImmeuble(@PathVariable Long id, @RequestBody Immeuble immeuble) {
        immeuble.setId(id);
        return immeubleService.saveImmeuble(immeuble);
    }

    @DeleteMapping("/{id}")
    public void deleteImmeuble(@PathVariable Long id) {
        immeubleService.deleteImmeuble(id);
    }
}
