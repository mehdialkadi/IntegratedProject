package ma.ac.uir.syndicproject.repository;

import ma.ac.uir.syndicproject.model.Proprietaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProprietaireRepository extends JpaRepository<Proprietaire, Long> {
    Proprietaire findByEmailAndPassword(String email, String password);
}
