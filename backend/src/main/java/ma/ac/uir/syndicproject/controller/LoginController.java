package ma.ac.uir.syndicproject.controller;

import jakarta.servlet.http.HttpSession;
import ma.ac.uir.syndicproject.model.Locataire;
import ma.ac.uir.syndicproject.model.Syndic;
import ma.ac.uir.syndicproject.service.SyndicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")  // adjust to your React dev URL
public class LoginController {

    @Autowired
    private SyndicService syndicService;

    @PostMapping("/login")
    public String login(@RequestBody Syndic syndic, HttpSession session) {
        // Appeler le service pour vérifier l'authentification
        Syndic login = syndicService.authenticateSyndic(syndic.getEmail(), syndic.getPassword());
        if (login != null) {
            // Connexion réussie
            session.setAttribute("currentUser", login);
            return "Connexion réussie pour: " + login.getNom();
        } else {
            // Connexion échouée
            return "Email ou mot de passe incorrect";
        }
    }
}