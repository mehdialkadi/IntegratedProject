package ma.ac.uir.syndicproject.repository;

import ma.ac.uir.syndicproject.model.Logement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogementRepository extends JpaRepository<Logement, Long> {
    Logement findByLocataireId(Long locataireId);

    List<Logement> findByImmeubleId(Long immeubleId);

}