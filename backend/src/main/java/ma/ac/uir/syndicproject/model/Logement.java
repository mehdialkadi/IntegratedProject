package ma.ac.uir.syndicproject.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "Logement")
public class Logement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idLogement;

    private int numero;
    private int etage;

    @Column(precision = 10, scale = 2)
    private BigDecimal montantChargeMensuelle;

    // 🔗 Relationships

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "id_proprio")
    private Proprietaire proprietaire;

    @OneToOne
    @JoinColumn(name = "id_locataire", unique = true)
    @JsonManagedReference
    private Locataire locataire;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "id_immeuble")
    private Immeuble immeuble;

    @OneToOne
    @JoinColumn(name = "id_place_garage", unique = true)
    private PlaceGarage placeGarage;

    @OneToMany(mappedBy = "logement", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Paiement> paiements = new ArrayList<>();


    // Constructors
    public Logement() {}

    // Getters and Setters
    public Long getIdLogement() {
        return idLogement;
    }

    public void setIdLogement(Long idLogement) {
        this.idLogement = idLogement;
    }

    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public int getEtage() {
        return etage;
    }

    public void setEtage(int etage) {
        this.etage = etage;
    }

    public BigDecimal getMontantChargeMensuelle() {
        return montantChargeMensuelle;
    }

    public void setMontantChargeMensuelle(BigDecimal montantChargeMensuelle) {
        this.montantChargeMensuelle = montantChargeMensuelle;
    }

    public Proprietaire getProprietaire() {
        return proprietaire;
    }

    public void setProprietaire(Proprietaire proprietaire) {
        this.proprietaire = proprietaire;
    }

    public Locataire getLocataire() {
        return locataire;
    }

    public void setLocataire(Locataire locataire) {
        this.locataire = locataire;
    }

    public Immeuble getImmeuble() {
        return immeuble;
    }

    public void setImmeuble(Immeuble immeuble) {
        this.immeuble = immeuble;
    }

    public PlaceGarage getPlaceGarage() {
        return placeGarage;
    }

    public void setPlaceGarage(PlaceGarage placeGarage) {
        this.placeGarage = placeGarage;
    }

    public List<Paiement> getPaiements() {
        return paiements;
    }

    public void setPaiements(List<Paiement> paiements) {
        this.paiements = paiements;
    }

}
