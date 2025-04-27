package ma.ac.uir.syndicproject.repository;

import ma.ac.uir.syndicproject.model.Immeuble;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImmeubleRepository extends JpaRepository<Immeuble, Long> {}
