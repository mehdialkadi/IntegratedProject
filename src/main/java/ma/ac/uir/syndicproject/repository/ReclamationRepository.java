package ma.ac.uir.syndicproject.repository;

import ma.ac.uir.syndicproject.model.Reclamation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReclamationRepository extends JpaRepository<Reclamation, Long> {}
