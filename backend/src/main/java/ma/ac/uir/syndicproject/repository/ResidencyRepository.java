package ma.ac.uir.syndicproject.repository;

import ma.ac.uir.syndicproject.model.Residency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResidencyRepository extends JpaRepository<Residency, Long> {}
