package ma.ac.uir.syndicproject.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.*;

@Entity
@Table(name = "Syndic")
public class Syndic extends Utilisateur {

    @OneToMany(mappedBy = "syndic", cascade = CascadeType.ALL)
    @JsonManagedReference("syndic-immeuble")
    private List<Immeuble> immeubles = new ArrayList<>();

    // Constructors
    public Syndic() {}

    // Getters and Setters
    public List<Immeuble> getImmeubles() {
        return immeubles;
    }

    public void setImmeubles(List<Immeuble> immeubles) {
        this.immeubles = immeubles;
    }
}
