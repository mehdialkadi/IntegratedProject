package ma.ac.uir.syndicproject.repository;

import ma.ac.uir.syndicproject.model.DocumentCommun;
import ma.ac.uir.syndicproject.model.Logement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentCommunRepository extends JpaRepository<DocumentCommun, Long> {
    List<DocumentCommun> findByImmeubleId(Long immeubleId);
}