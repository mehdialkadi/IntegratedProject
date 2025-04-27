package ma.ac.uir.syndicproject.repository;

import ma.ac.uir.syndicproject.model.Locataire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocataireRepository extends JpaRepository<Locataire, Long> {}
