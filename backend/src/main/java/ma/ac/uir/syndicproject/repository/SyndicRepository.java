package ma.ac.uir.syndicproject.repository;

import ma.ac.uir.syndicproject.model.Syndic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SyndicRepository extends JpaRepository<Syndic, Long> {
    Syndic findByEmail(String email);
}
