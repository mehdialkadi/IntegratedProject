package ma.ac.uir.syndicproject.repository;

import ma.ac.uir.syndicproject.model.Annonce;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnonceRepository extends JpaRepository<Annonce, Long> {

    @Query("""
    SELECT a.titre
    FROM Annonce a
    WHERE a.date = CURRENT_DATE
      AND a.immeuble.id = :immeubleId
  """)
    List<String> findTodayTitlesByImmeubleId(
            @Param("immeubleId") Long immeubleId,
            Pageable pageable
    );
}
