package ma.ac.uir.syndicproject.repository;

import ma.ac.uir.syndicproject.model.Administrateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdministrateurRepository extends JpaRepository<Administrateur, Long> {}
