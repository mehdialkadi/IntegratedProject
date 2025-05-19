package ma.ac.uir.syndicproject.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Reunion")
public class Reunion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;

    @Column(length = 1000)
    private String description;

    @Temporal(TemporalType.DATE)
    private Date date;

    private String heure;
    private String lieu;

    // 🔗 Each réunion is linked to one immeuble
    @ManyToOne
    @JoinColumn(name = "id_immeuble", nullable = false)
    @JsonBackReference("reunions-immeuble")
    private Immeuble immeuble;

    // Constructors
    public Reunion() {}

    public Reunion(String titre, String description, Date date, String heure, String lieu, Immeuble immeuble) {
        this.titre = titre;
        this.description = description;
        this.date = date;
        this.heure = heure;
        this.lieu = lieu;
        this.immeuble = immeuble;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getHeure() {
        return heure;
    }

    public void setHeure(String heure) {
        this.heure = heure;
    }

    public String getLieu() {
        return lieu;
    }

    public void setLieu(String lieu) {
        this.lieu = lieu;
    }

    public Immeuble getImmeuble() {
        return immeuble;
    }

    public void setImmeuble(Immeuble immeuble) {
        this.immeuble = immeuble;
    }
}

