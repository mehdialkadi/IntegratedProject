package ma.ac.uir.syndicproject.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "DocumentCommun")
public class DocumentCommun {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String type;
    private String urlFichier;

    @Temporal(TemporalType.DATE)
    private Date date;

    // 🔗 Linked to one immeuble
    @ManyToOne
    @JsonBackReference("documents-immeuble")
    @JoinColumn(name = "id_immeuble", nullable = false)
    private Immeuble immeuble;

    // Constructors
    public DocumentCommun() {}

    public DocumentCommun(String nom, String type, String urlFichier, Date date, Immeuble immeuble) {
        this.nom = nom;
        this.type = type;
        this.urlFichier = urlFichier;
        this.date = date;
        this.immeuble = immeuble;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUrlFichier() {
        return urlFichier;
    }

    public void setUrlFichier(String urlFichier) {
        this.urlFichier = urlFichier;
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
}

