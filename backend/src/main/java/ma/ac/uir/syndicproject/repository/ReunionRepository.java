package ma.ac.uir.syndicproject.repository;

import ma.ac.uir.syndicproject.model.DocumentCommun;
import ma.ac.uir.syndicproject.model.Reunion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReunionRepository extends JpaRepository<Reunion, Long> {

    @Query(value = """
  SELECT * FROM reunion r
  WHERE
    (r.date > CURDATE())
    OR (r.date = CURDATE() AND STR_TO_DATE(r.heure, '%H:%i') > CURRENT_TIME())
    AND r.id_immeuble = :immeubleId
  ORDER BY r.date ASC, STR_TO_DATE(r.heure, '%H:%i') ASC
""", nativeQuery = true)
    List<Reunion> findUpcomingByImmeubleIdNative(@Param("immeubleId") Long immeubleId);
}
