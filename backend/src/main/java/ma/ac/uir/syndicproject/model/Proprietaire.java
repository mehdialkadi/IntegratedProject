package ma.ac.uir.syndicproject.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.*;

@Entity
@Table(name = "Proprietaire")
public class Proprietaire extends Utilisateur {

    @OneToMany(mappedBy = "proprietaire", cascade = CascadeType.ALL)
    @JsonManagedReference("proprio-logement")
    private List<Logement> logements = new ArrayList<>();

    // Constructors
    public Proprietaire() {}

    // Getters and Setters
    public List<Logement> getLogements() {
        return logements;
    }

    public void setLogements(List<Logement> logements) {
        this.logements = logements;
    }
}
