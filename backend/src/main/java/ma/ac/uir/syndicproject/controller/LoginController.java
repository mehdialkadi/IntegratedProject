package ma.ac.uir.syndicproject.controller;

import ma.ac.uir.syndicproject.model.Syndic;
import ma.ac.uir.syndicproject.service.SyndicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class LoginController {

    @Autowired
    private SyndicService syndicService;

    @PostMapping("/login")
    public String login(@RequestParam String email, @RequestParam String password) {
        // Appeler le service pour vérifier l'authentification
        Syndic syndic = syndicService.authenticateSyndic(email, password);
        if (syndic != null) {
            // Connexion réussie
            return "Connexion réussie pour: " + syndic.getNom();
        } else {
            // Connexion échouée
            return "Email ou mot de passe incorrect";
        }
    }
}
