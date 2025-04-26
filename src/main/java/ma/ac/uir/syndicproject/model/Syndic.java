package ma.ac.uir.syndicproject.model;

import jakarta.persistence.*;
import java.util.*;

@Entity
@Table(name = "Syndic")
public class Syndic extends Utilisateur {

    @OneToMany(mappedBy = "syndic", cascade = CascadeType.ALL)
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
