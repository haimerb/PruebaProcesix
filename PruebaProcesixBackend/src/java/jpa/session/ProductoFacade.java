package jpa.session;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import jpa.entities.Productos;

/**
 *
 * @author Haimer Barbetti
 */
@Stateless
public class ProductoFacade {
    @PersistenceContext(unitName = "pruebaPU")
    private EntityManager em;

    public void create(Productos  producto) {
        em.persist(producto);
    }

    public void edit(Productos producto) {
        em.merge(producto);
    }

    public void remove(Productos producto) {
        em.remove(em.merge(producto));
    }

    public Productos find(Object id) {
        return em.find( Productos.class, id);
    }

    public List<Productos> findAll() {
        CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
        cq.select(cq.from(Productos.class));
        return em.createQuery(cq).getResultList();
    }

    public List<Productos> findRange(int[] range) {
        CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
        cq.select(cq.from(Productos.class));
        Query q = em.createQuery(cq);
        q.setMaxResults(range[1] - range[0]);
        q.setFirstResult(range[0]);
        return q.getResultList();
    }

    public int count() {
        CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
        Root<Productos> rt = cq.from(Productos.class);
        cq.select(em.getCriteriaBuilder().count(rt));
        Query q = em.createQuery(cq);
        return ((Long) q.getSingleResult()).intValue();
    }

}
