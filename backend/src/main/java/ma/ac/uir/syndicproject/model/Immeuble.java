package ma.ac.uir.syndicproject.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.*;

@Entity
@Table(name = "Immeuble")
public class Immeuble {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String adresse;
    private int nombreAppart;
    private boolean garage;
    private int nombrePlaceGarage;
    private boolean aAscenceur;
    private boolean aConcierge;

    // 🔗 Syndic (many immeubles can belong to one syndic)
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "id_syndic", nullable = false)
    private Syndic syndic;

    // 🔗 Composition: 1 Immeuble owns 1..* Logements
    @OneToMany(mappedBy = "immeuble", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Logement> logements = new ArrayList<>();

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "id_residency", nullable = false)
    private Residency residency;

    @OneToMany(mappedBy="immeuble")
    @JsonManagedReference
    private List<Annonce> annonces = new ArrayList<>();

    @OneToMany(mappedBy="immeuble")
    @JsonManagedReference
    private List<DocumentCommun> documents = new ArrayList<>();

    @OneToMany(mappedBy="immeuble")
    @JsonManagedReference
    private List<FactureImmeuble> factures = new ArrayList<>();

    @OneToMany(mappedBy="immeuble")
    @JsonManagedReference
    private List<PlaceGarage> placesGarage = new ArrayList<>();

    @OneToMany(mappedBy="immeuble")
    @JsonManagedReference
    private List<Reunion> reunions = new ArrayList<>();

    // Constructors
    public Immeuble() {}

    public Immeuble(String nom, String adresse, int nombreAppart, boolean garage,
                    int nombrePlaceGarage, boolean aAscenceur, boolean aConcierge, Syndic syndic) {
        this.nom = nom;
        this.adresse = adresse;
        this.nombreAppart = nombreAppart;
        this.garage = garage;
        this.nombrePlaceGarage = nombrePlaceGarage;
        this.aAscenceur = aAscenceur;
        this.aConcierge = aConcierge;
        this.syndic = syndic;
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

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public int getNombreAppart() {
        return nombreAppart;
    }

    public void setNombreAppart(int nombreAppart) {
        this.nombreAppart = nombreAppart;
    }

    public boolean isGarage() {
        return garage;
    }

    public void setGarage(boolean garage) {
        this.garage = garage;
    }

    public int getNombrePlaceGarage() {
        return nombrePlaceGarage;
    }

    public void setNombrePlaceGarage(int nombrePlaceGarage) {
        this.nombrePlaceGarage = nombrePlaceGarage;
    }

    public boolean isaAscenceur() {
        return aAscenceur;
    }

    public void setaAscenceur(boolean aAscenceur) {
        this.aAscenceur = aAscenceur;
    }

    public boolean isaConcierge() {
        return aConcierge;
    }

    public void setaConcierge(boolean aConcierge) {
        this.aConcierge = aConcierge;
    }

    public Syndic getSyndic() {
        return syndic;
    }

    public void setSyndic(Syndic syndic) {
        this.syndic = syndic;
    }

    public List<Logement> getLogements() {
        return logements;
    }

    public void setLogements(List<Logement> logements) {
        this.logements = logements;
    }

    public Residency getResidency() {
        return residency;
    }

    public void setResidency(Residency residency) {
        this.residency = residency;
    }

    public List<Annonce> getAnnonces() {return annonces;}

    public void setAnnonces(List<Annonce> annonces) {this.annonces = annonces;}

    public List<DocumentCommun> getDocuments() {return documents;}

    public void setDocuments(List<DocumentCommun> documents) {this.documents = documents;}

    public List<FactureImmeuble> getFactures() {return factures;}

    public void setFactures(List<FactureImmeuble> factures) {this.factures = factures;}

    public List<PlaceGarage> getPlacesGarage() {return placesGarage;}

    public void setPlacesGarage(List<PlaceGarage> placesGarage) {this.placesGarage = placesGarage;}

    public List<Reunion> getReunions() {return reunions;}

    public void setReunions(List<Reunion> reunions) {this.reunions = reunions;}
}

