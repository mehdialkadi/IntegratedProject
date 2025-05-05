package ma.ac.uir.syndicproject.repository;

import ma.ac.uir.syndicproject.model.Paiement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaiementRepository extends JpaRepository<Paiement, Long> {
    List<Paiement> findByLogementIdLogement(Long logementId);
}
