package ma.ac.uir.syndicproject.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Reclamation")
public class Reclamation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;

    @Column(length = 2000)
    private String description;

    private String etat;

    @Temporal(TemporalType.DATE)
    private Date date;

    // 🔗 Reclamation made by a user (propriétaire or locataire)
    @ManyToOne
    @JoinColumn(name = "id_utilisateur", nullable = false)
    private Utilisateur utilisateur;

    // 🔗 Reclamation is about a logement
    @ManyToOne
    @JoinColumn(name = "id_logement", nullable = false)
    private Logement logement;

    // Constructors
    public Reclamation() {}

    public Reclamation(String titre, String description, String etat, Date date, Utilisateur utilisateur, Logement logement) {
        this.titre = titre;
        this.description = description;
        this.etat = etat;
        this.date = date;
        this.utilisateur = utilisateur;
        this.logement = logement;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

    public Logement getLogement() {
        return logement;
    }

    public void setLogement(Logement logement) {
        this.logement = logement;
    }
}

