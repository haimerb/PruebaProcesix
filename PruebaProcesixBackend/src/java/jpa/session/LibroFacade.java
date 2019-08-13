package jpa.session;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import jpa.entities.Libros;

/**
 *
 * @author Haimer Barbetti
 */
@Stateless
public class LibroFacade {
    @PersistenceContext(unitName = "pruebaPU")
    private EntityManager em;

    public void create(Libros libro) {
        em.persist(libro);
    }

    public void edit(Libros libro) {
        em.merge(libro);
    }

    public void remove(Libros libro) {
        em.remove(em.merge(libro));
    }

    public Libros find(Object id) {
        return em.find(Libros.class, id);
    }

    public List<Libros> findAll() {
        CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
        cq.select(cq.from(Libros.class));
        return em.createQuery(cq).getResultList();
    }

    public List<Libros> findRange(int[] range) {
        CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
        cq.select(cq.from(Libros.class));
        Query q = em.createQuery(cq);
        q.setMaxResults(range[1] - range[0]);
        q.setFirstResult(range[0]);
        return q.getResultList();
    }

    public int count() {
        CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
        Root<Libros> rt = cq.from(Libros.class);
        cq.select(em.getCriteriaBuilder().count(rt));
        Query q = em.createQuery(cq);
        return ((Long) q.getSingleResult()).intValue();
    }

}
