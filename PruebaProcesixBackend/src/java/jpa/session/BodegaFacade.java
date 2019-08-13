package jpa.session;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import jpa.entities.Bodegas;

/**
 *
 * @author Haimer Barbetti
 */
@Stateless
public class BodegaFacade {
    @PersistenceContext(unitName = "pruebaPU")
    private EntityManager em;

    public void create(Bodegas  bodega) {
        //em.persist(bodega);
        Query query = em.createNativeQuery("INSERT INTO bodegas (nombre_bodega,localizacion_bodega) " +
            " VALUES(?,?)");
        query.setParameter(1, bodega.getNombreBodega().toString());
        query.setParameter(2, bodega.getLocalizacionBodega().toString());
        
        query.executeUpdate();
    }

    public void edit(Bodegas bodega) {
        em.merge(bodega);
    }

    public void remove(Bodegas bodega) {
        em.remove(em.merge(bodega));
    }

    public Bodegas find(Object id) {
        return em.find( Bodegas.class, id);
    }

    public List<Bodegas> findAll() {
        CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
        cq.select(cq.from(Bodegas.class));
        return em.createQuery(cq).getResultList();
    }

    public List<Bodegas> findRange(int[] range) {
        CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
        cq.select(cq.from(Bodegas.class));
        Query q = em.createQuery(cq);
        q.setMaxResults(range[1] - range[0]);
        q.setFirstResult(range[0]);
        return q.getResultList();
    }

    public int count() {
        CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
        Root<Bodegas> rt = cq.from(Bodegas.class);
        cq.select(em.getCriteriaBuilder().count(rt));
        Query q = em.createQuery(cq);
        return ((Long) q.getSingleResult()).intValue();
    }

}

