package ma.ac.uir.syndicproject.repository;

import ma.ac.uir.syndicproject.model.Annonce;
import ma.ac.uir.syndicproject.model.PlaceGarage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceGarageRepository extends JpaRepository<PlaceGarage, Long> {

    @Query("""
    SELECT a
    FROM PlaceGarage a
    WHERE a.statut = :status
      AND a.immeuble.id = :immeubleId
  """)
    List<PlaceGarage> getAllOpenSpaces(@Param("status") String status, @Param("immeubleId") Long immeubleId);
}
