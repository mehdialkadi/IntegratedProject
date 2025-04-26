package ma.ac.uir.syndicproject.repository;

import ma.ac.uir.syndicproject.model.FactureImmeuble;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FactureImmeubleRepository extends JpaRepository<FactureImmeuble, Long> {}
