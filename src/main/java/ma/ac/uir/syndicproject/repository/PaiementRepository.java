package ma.ac.uir.syndicproject.repository;

import ma.ac.uir.syndicproject.model.Paiement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaiementRepository extends JpaRepository<Paiement, Long> {}
