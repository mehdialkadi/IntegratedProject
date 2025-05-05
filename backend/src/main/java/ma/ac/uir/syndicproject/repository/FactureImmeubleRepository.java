package ma.ac.uir.syndicproject.repository;

import ma.ac.uir.syndicproject.model.DocumentCommun;
import ma.ac.uir.syndicproject.model.FactureImmeuble;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FactureImmeubleRepository extends JpaRepository<FactureImmeuble, Long> {
    List<FactureImmeuble> findByImmeubleId(Long immeubleId);
}
