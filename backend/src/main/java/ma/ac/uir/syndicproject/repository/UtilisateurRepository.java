package ma.ac.uir.syndicproject.repository;

import ma.ac.uir.syndicproject.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {}

