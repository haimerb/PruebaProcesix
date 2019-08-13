/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package jpa.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author PDPARTNER
 */
@Entity
@Table(name = "bodegas")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Bodegas.findAll", query = "SELECT b FROM Bodegas b")
    , @NamedQuery(name = "Bodegas.findByCodigoBodega", query = "SELECT b FROM Bodegas b WHERE b.codigoBodega = :codigoBodega")
    , @NamedQuery(name = "Bodegas.findByNombreBodega", query = "SELECT b FROM Bodegas b WHERE b.nombreBodega = :nombreBodega")
    , @NamedQuery(name = "Bodegas.findByLocalizacionBodega", query = "SELECT b FROM Bodegas b WHERE b.localizacionBodega = :localizacionBodega")})
public class Bodegas implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "codigo_bodega")
    private Integer codigoBodega;
    @Basic(optional = false)
    @Column(name = "nombre_bodega")
    private String nombreBodega;
    @Basic(optional = false)
    @Column(name = "localizacion_bodega")
    private String localizacionBodega;

    public Bodegas() {
    }

    public Bodegas(Integer codigoBodega) {
        this.codigoBodega = codigoBodega;
    }

    public Bodegas(Integer codigoBodega, String nombreBodega, String localizacionBodega) {
        this.codigoBodega = codigoBodega;
        this.nombreBodega = nombreBodega;
        this.localizacionBodega = localizacionBodega;
    }

    public Integer getCodigoBodega() {
        return codigoBodega;
    }

    public void setCodigoBodega(Integer codigoBodega) {
        this.codigoBodega = codigoBodega;
    }

    public String getNombreBodega() {
        return nombreBodega;
    }

    public void setNombreBodega(String nombreBodega) {
        this.nombreBodega = nombreBodega;
    }

    public String getLocalizacionBodega() {
        return localizacionBodega;
    }

    public void setLocalizacionBodega(String localizacionBodega) {
        this.localizacionBodega = localizacionBodega;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (codigoBodega != null ? codigoBodega.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Bodegas)) {
            return false;
        }
        Bodegas other = (Bodegas) object;
        if ((this.codigoBodega == null && other.codigoBodega != null) || (this.codigoBodega != null && !this.codigoBodega.equals(other.codigoBodega))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "{" + "codigoBodega=" + codigoBodega + ", nombreBodega=" + nombreBodega + ", localizacionBodega=" + localizacionBodega + '}';
    }
    
}
