package ma.ac.uir.syndicproject.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "facture_immeuble")
public class FactureImmeuble {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;

    @Column(length = 1000)
    private String description;

    @Column(precision = 10, scale = 2)
    private BigDecimal montant;

    @Temporal(TemporalType.DATE)
    private Date date;

    private String urlFichier;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_immeuble", nullable = false)
    @JsonBackReference("factures-immeuble")
    private Immeuble immeuble;

    public FactureImmeuble() {}

    // Getters & Setters
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getType() { return type; }

    public void setType(String type) { this.type = type; }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }

    public BigDecimal getMontant() { return montant; }

    public void setMontant(BigDecimal montant) { this.montant = montant; }

    public Date getDate() { return date; }

    public void setDate(Date date) { this.date = date; }

    public String getUrlFichier() { return urlFichier; }

    public void setUrlFichier(String urlFichier) { this.urlFichier = urlFichier; }

    public Immeuble getImmeuble() { return immeuble; }

    public void setImmeuble(Immeuble immeuble) { this.immeuble = immeuble; }
}
