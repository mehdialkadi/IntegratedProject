package ma.ac.uir.syndicproject.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Annonce")
public class Annonce {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;

    @Column(length = 2000)
    private String contenu;

    @Temporal(TemporalType.DATE)
    private Date date;

    // 🔗 Each annonce is for one immeuble
    @ManyToOne
    @JoinColumn(name = "id_immeuble", nullable = false)
    private Immeuble immeuble;

    // 🔗 Each annonce is created by one utilisateur (admin/syndic)
    @ManyToOne
    @JoinColumn(name = "id_utilisateur", nullable = false)
    private Utilisateur utilisateur;

    // Constructors
    public Annonce() {}

    public Annonce(String titre, String contenu, Date date, Immeuble immeuble, Utilisateur utilisateur) {
        this.titre = titre;
        this.contenu = contenu;
        this.date = date;
        this.immeuble = immeuble;
        this.utilisateur = utilisateur;
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

    public String getContenu() {
        return contenu;
    }

    public void setContenu(String contenu) {
        this.contenu = contenu;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Immeuble getImmeuble() {
        return immeuble;
    }

    public void setImmeuble(Immeuble immeuble) {
        this.immeuble = immeuble;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }
}
