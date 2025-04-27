package ma.ac.uir.syndicproject.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
@Table(name = "PlaceGarage")
public class PlaceGarage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String numero;
    private String statut;  // <- back to String

    @ManyToOne
    @JoinColumn(name = "id_immeuble", nullable = false)
    @JsonBackReference("garage-immeuble")
    private Immeuble immeuble;

    @OneToOne(mappedBy = "placeGarage")
    @JsonManagedReference("garage-logement")
    private Logement logement;

    // Constructors
    public PlaceGarage() {}

    public PlaceGarage(String numero, String statut, Immeuble immeuble) {
        this.numero = numero;
        this.statut = statut;
        this.immeuble = immeuble;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public Immeuble getImmeuble() {
        return immeuble;
    }

    public void setImmeuble(Immeuble immeuble) {
        this.immeuble = immeuble;
    }

    public Logement getLogement() {
        return logement;
    }

    public void setLogement(Logement logement) {
        this.logement = logement;
    }
}
