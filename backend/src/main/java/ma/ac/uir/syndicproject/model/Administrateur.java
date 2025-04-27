package ma.ac.uir.syndicproject.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "Administrateur")
public class Administrateur extends Utilisateur {

    public Administrateur() {}
}

