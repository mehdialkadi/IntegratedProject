package ma.ac.uir.syndicproject.repository;

import ma.ac.uir.syndicproject.model.Reclamation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReclamationRepository extends JpaRepository<Reclamation, Long> {
    List<Reclamation> findByUtilisateurId(Long locataireId);
    List<Reclamation> findByLogementIdLogement(Long logementId);
}