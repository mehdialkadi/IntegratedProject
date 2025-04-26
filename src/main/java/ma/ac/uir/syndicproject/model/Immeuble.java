package ma.ac.uir.syndicproject.model;

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
    @JoinColumn(name = "id_syndic", nullable = false)
    private Syndic syndic;

    // 🔗 Composition: 1 Immeuble owns 1..* Logements
    @OneToMany(mappedBy = "immeuble", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Logement> logements = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "id_residency", nullable = false)
    private Residency residency;


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

}

