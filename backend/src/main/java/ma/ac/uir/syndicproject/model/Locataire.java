package ma.ac.uir.syndicproject.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "Locataire")
public class Locataire extends Utilisateur {

    @OneToOne(mappedBy = "locataire")
    @JsonManagedReference("logement-locataire")
    private Logement logement;

    public Locataire() {}

    public Logement getLogement() {
        return logement;
    }

    public void setLogement(Logement logement) {
        this.logement = logement;
    }
}
