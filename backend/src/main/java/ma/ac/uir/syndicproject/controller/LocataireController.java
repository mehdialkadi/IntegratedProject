package ma.ac.uir.syndicproject.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import ma.ac.uir.syndicproject.model.Locataire;
import ma.ac.uir.syndicproject.service.LocataireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/locataires")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials="true")  // adjust to your React dev URL
public class LocataireController {

    @Autowired
    private LocataireService locataireService;

    @GetMapping
    public List<Locataire> getAllLocataires() {
        return locataireService.getAllLocataires();
    }

    @GetMapping("/{id}")
    public Optional<Locataire> getLocataireById(@PathVariable Long id) {
        return locataireService.getLocataireById(id);
    }

    @PostMapping
    public Locataire createLocataire(@RequestBody Locataire locataire) {
        return locataireService.saveLocataire(locataire);
    }

    @PutMapping("/{id}")
    public Locataire updateLocataire(@PathVariable Long id, @RequestBody Locataire locataire) {
        locataire.setId(id);
        return locataireService.saveLocataire(locataire);
    }

    @DeleteMapping("/{id}")
    public void deleteLocataire(@PathVariable Long id) {
        locataireService.deleteLocataire(id);
    }

    @PostMapping("/findLocataireByEmailAndPassword")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Locataire> findLocataireByEmailAndPassword(@RequestBody Locataire locataire, HttpSession session) {
        Locataire user = locataireService
                .findLocataireByEmailAndPassword(locataire.getEmail(), locataire.getPassword());
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
