package ma.ac.uir.syndicproject.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import ma.ac.uir.syndicproject.model.Locataire;
import ma.ac.uir.syndicproject.model.Proprietaire;
import ma.ac.uir.syndicproject.service.ProprietaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/proprietaires")
@CrossOrigin(origins = "http://localhost:3000")  // adjust to your React dev URL
public class ProprietaireController {

    @Autowired
    private ProprietaireService proprietaireService;

    @GetMapping
    public List<Proprietaire> getAllProprietaires() {
        return proprietaireService.getAllProprietaires();
    }

    @GetMapping("/{id}")
    public Optional<Proprietaire> getProprietaireById(@PathVariable Long id) {
        return proprietaireService.getProprietaireById(id);
    }

    @PostMapping
    public Proprietaire createProprietaire(@RequestBody Proprietaire proprietaire) {
        return proprietaireService.saveProprietaire(proprietaire);
    }

    @PutMapping("/{id}")
    public Proprietaire updateProprietaire(@PathVariable Long id, @RequestBody Proprietaire proprietaire) {
        proprietaire.setId(id);
        return proprietaireService.saveProprietaire(proprietaire);
    }

    @DeleteMapping("/{id}")
    public void deleteProprietaire(@PathVariable Long id) {
        proprietaireService.deleteProprietaire(id);
    }

    @PostMapping("/findProprioByEmailAndPassword")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Proprietaire> findProprioByEmailAndPassword(@RequestBody Proprietaire proprio, HttpSession session) {
        Proprietaire user = proprietaireService.findProprioByEmailAndPassword(proprio.getEmail(), proprio.getPassword());
        if (user != null) {
            session.setAttribute("currentUser", user);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void logout(HttpSession session, HttpServletResponse response) {
        // 1) Invalidate the session on the server
        session.invalidate();
        // 2) Instruct the browser (or Postman) to delete the cookie
        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }
}
