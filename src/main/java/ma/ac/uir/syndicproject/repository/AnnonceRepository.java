package ma.ac.uir.syndicproject.repository;

import ma.ac.uir.syndicproject.model.Annonce;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnnonceRepository extends JpaRepository<Annonce, Long> {
}
