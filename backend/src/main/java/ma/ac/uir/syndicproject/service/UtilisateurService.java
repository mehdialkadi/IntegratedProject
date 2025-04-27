package ma.ac.uir.syndicproject.service;

import ma.ac.uir.syndicproject.model.Utilisateur;
import ma.ac.uir.syndicproject.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    // 🔹 Get all users
    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    // 🔹 Get user by ID
    public Optional<Utilisateur> getUtilisateurById(Long id) {
        return utilisateurRepository.findById(id);
    }

    // 🔹 Create or update a user
    public Utilisateur saveUtilisateur(Utilisateur utilisateur) {
        return utilisateurRepository.save(utilisateur);
    }

    // 🔹 Delete a user
    public void deleteUtilisateur(Long id) {
        utilisateurRepository.deleteById(id);
    }
}
