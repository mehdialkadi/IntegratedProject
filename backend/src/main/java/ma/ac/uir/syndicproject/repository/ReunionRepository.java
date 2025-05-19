package ma.ac.uir.syndicproject.repository;

import ma.ac.uir.syndicproject.model.Reunion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReunionRepository extends JpaRepository<Reunion, Long> {}
