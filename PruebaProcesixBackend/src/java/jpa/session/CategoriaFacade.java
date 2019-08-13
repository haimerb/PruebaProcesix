package jpa.session;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import jpa.entities.Categorias;

/**
 *
 * @author Haimer Barbetti
 */
@Stateless
public class CategoriaFacade {
    @PersistenceContext(unitName = "pruebaPU")
    private EntityManager em;

    public void create(Categorias  categorias) {
        em.persist(categorias);
    }

    public void edit(Categorias categorias) {
        em.merge(categorias);
    }

    public void remove(Categorias categorias) {
        em.remove(em.merge(categorias));
    }

    public Categorias find(Object id) {
        return em.find( Categorias.class, id);
    }

    public List<Categorias> findAll() {
        CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
        cq.select(cq.from(Categorias.class));
        return em.createQuery(cq).getResultList();
    }

    public List<Categorias> findRange(int[] range) {
        CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
        cq.select(cq.from(Categorias.class));
        Query q = em.createQuery(cq);
        q.setMaxResults(range[1] - range[0]);
        q.setFirstResult(range[0]);
        return q.getResultList();
    }

    public int count() {
        CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
        Root<Categorias> rt = cq.from(Categorias.class);
        cq.select(em.getCriteriaBuilder().count(rt));
        Query q = em.createQuery(cq);
        return ((Long) q.getSingleResult()).intValue();
    }

}
