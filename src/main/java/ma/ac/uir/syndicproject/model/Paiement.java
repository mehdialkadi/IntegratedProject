package ma.ac.uir.syndicproject.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "Paiement")
public class Paiement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(precision = 10, scale = 2)
    private BigDecimal montant;

    @Temporal(TemporalType.DATE)
    private Date date;

    private boolean factureEnvoye;

    // 🔗 Many paiements belong to one logement
    @ManyToOne
    @JoinColumn(name = "id_logement", nullable = false)
    private Logement logement;

    // Constructors
    public Paiement() {}

    public Paiement(BigDecimal montant, Date date, boolean factureEnvoye, Logement logement) {
        this.montant = montant;
        this.date = date;
        this.factureEnvoye = factureEnvoye;
        this.logement = logement;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getMontant() {
        return montant;
    }

    public void setMontant(BigDecimal montant) {
        this.montant = montant;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public boolean isFactureEnvoye() {
        return factureEnvoye;
    }

    public void setFactureEnvoye(boolean factureEnvoye) {
        this.factureEnvoye = factureEnvoye;
    }

    public Logement getLogement() {
        return logement;
    }

    public void setLogement(Logement logement) {
        this.logement = logement;
    }
}
