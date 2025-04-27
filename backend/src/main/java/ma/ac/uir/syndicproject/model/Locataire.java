package ma.ac.uir.syndicproject.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "Locataire")
public class Locataire extends Utilisateur {

    @OneToOne(mappedBy = "locataire")
    @JsonBackReference
    private Logement logement;

    public Locataire() {}

    public Logement getLogement() {
        return logement;
    }

    public void setLogement(Logement logement) {
        this.logement = logement;
    }
}
