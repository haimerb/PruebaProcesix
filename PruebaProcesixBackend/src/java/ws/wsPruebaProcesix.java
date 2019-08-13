/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright 1997-2010 Oracle and/or its affiliates. All rights reserved.
 *
 * Oracle and Java are registered trademarks of Oracle and/or its affiliates.
 * Other names may be trademarks of their respective owners.
 *
 * The contents of this file are subject to the terms of either the GNU
 * General Public License Version 2 only ("GPL") or the Common
 * Development and Distribution License("CDDL") (collectively, the
 * "License"). You may not use this file except in compliance with the
 * License. You can obtain a copy of the License at
 * http://www.netbeans.org/cddl-gplv2.html
 * or nbbuild/licenses/CDDL-GPL-2-CP. See the License for the
 * specific language governing permissions and limitations under the
 * License.  When distributing the software, include this License Header
 * Notice in each file and include the License file at
 * nbbuild/licenses/CDDL-GPL-2-CP.  Oracle designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Oracle in the GPL Version 2 section of the License file that
 * accompanied this code. If applicable, add the following below the
 * License Header, with the fields enclosed by brackets [] replaced by
 * your own identifying information:
 * "Portions Copyrighted [year] [name of copyright owner]"
 * 
 * Contributor(s):
 * 
 * The Original Software is NetBeans. The Initial Developer of the Original
 * Software is Sun Microsystems, Inc. Portions Copyright 1997-2007 Sun
 * Microsystems, Inc. All Rights Reserved.
 * 
 * If you wish your version of this file to be governed by only the CDDL
 * or only the GPL Version 2, indicate your decision by adding
 * "[Contributor] elects to include this software in this distribution
 * under the [CDDL or GPL Version 2] license." If you do not indicate a
 * single choice of license, a recipient has the option to distribute
 * your version of this file under either the CDDL, the GPL Version 2 or
 * to extend the choice of license to its licensees as provided above.
 * However, if you add GPL Version 2 code and therefore, elected the GPL
 * Version 2 license, then the option applies only if the new code is
 * made subject to such option by the copyright holder.
 */
package ws;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
//import com.rtm.connector.Connector;
import jsf.util.JSONResultado;
import com.sun.tools.ws.wsdl.document.http.HTTPOperation;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.servlet.http.HttpServletRequest;

import javax.ws.rs.Path;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import jpa.entities.Bodegas;
import jpa.entities.Productos;
import jsf.BodegaController;
import jsf.util.JsfUtil;

/**
 * REST Web Service
 *
 * @author Haimer Barbetti
 */
@Stateless
@Path("wsPruebaProcesix")
public class wsPruebaProcesix {

    @EJB
    private NameStorageBean nameStorage;

    @EJB
    private jpa.session.BodegaFacade ejbBodegaFacade;
    
    @EJB
    private jpa.session.ProductoFacade ejbProductoFacade;

    

    /**
     * Retrieves representation of an instance of
     * com.pdpartner.cenal.service.WsbiometricoResource
     *
     * @return an instance of java.lang.String
     */
//    @GET
//    @Produces(MediaType.APPLICATION_JSON)
//    public String getJson() {
//        //TODO return proper representation object
//        return "";
//    }

    /**
     * PUT method for updating or creating an instance of WsbiometricoResource
     *
     * @param content representation for the resource
     */
//    @PUT
//    @Consumes(MediaType.APPLICATION_JSON)
//    public void putJson(String content) {
//    }

    /**
     * Retrieves representation of an instance of helloworld.HelloWorldResource
     *
     * @return an instance of java.lang.String
     */
//    @GET
//    @Produces("text/html")
//    public String getGreeting() {
//        return "<html><body><h1>Hello " + nameStorage.getName() + " " + ejbBodegaFacade.findAll().toString() + "! </h1></body></html>";
//    }

    /**
     * PUT method for updating an instance of HelloWorldResource
     *
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
//    @PUT
//    @Consumes("text/plain")
//    public void setName(String content) {
//        nameStorage.setName(content);
//    }


    @GET
    @Path("/productos")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProductos() {

        ArrayList<Productos> productoList = new ArrayList<Productos>();
        JSONResultado j = new JSONResultado(null, null, null);
        Gson gson = new Gson();
        Gson g = new Gson();
        String json = "";
        String out = "";
        try {

            Iterator<Productos> productosIterator = ejbProductoFacade.findAll().iterator();
            Productos producto;
            while (productosIterator.hasNext()) {
                producto = new Productos();
                producto = (Productos) productosIterator.next();
                productoList.add(producto);
            }
            System.out.println(productoList);
            out = g.toJson(productoList);
        } catch (Exception e) {
            Logger.getLogger(wsPruebaProcesix.class.getName()).log(Level.SEVERE, null, e);
        }
        return Response.ok().entity(out).build();
    }
    
    @GET
    @Path("/bodegas")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getBodegas() {
        
        ArrayList<Bodegas> bodegaList = new ArrayList<Bodegas>();
        JSONResultado j = new JSONResultado(null, null, null);
        Gson gson = new Gson();
        Gson g = new Gson();
        String json = "";
        String out = "";
        try {

            Iterator<Bodegas> bodegasIterator = ejbBodegaFacade.findAll().iterator();
            Bodegas bodega;
            while (bodegasIterator.hasNext()) {
                bodega = new Bodegas();
                bodega = (Bodegas) bodegasIterator.next();
                bodegaList.add(bodega);
            }
            System.out.println(bodegaList);
            out = g.toJson(bodegaList);
        } catch (Exception e) {
            Logger.getLogger(wsPruebaProcesix.class.getName()).log(Level.SEVERE, null, e);
        }
        return Response.ok().entity(out).build();
    }
    
    @POST
    @Path("/crearProducto")
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response crearProducto(@FormParam("nombreProducto") String nombreProducto,
            @FormParam("codigoBodega") int codigoBodega,
            @FormParam("precioProducto") float precioProducto,
            @FormParam("unidadesDisponibles") int unidadesDisponibles,
            @FormParam("tipoProducto") String tipoProducto,
            @Context HttpServletRequest request) {

        Bodegas bodegaRelacion=ejbBodegaFacade.find(codigoBodega);
        
        Productos productoInput=new Productos();
        List<Productos> prodList = ejbProductoFacade.findAll();
        
        productoInput.setCodigoProducto(ejbProductoFacade.find(prodList.size()).getCodigoProducto() + 1);
        productoInput.setNombreProducto(nombreProducto);
        productoInput.setCodigoBodega(bodegaRelacion);
        productoInput.setPrecioProducto( precioProducto );
        productoInput.setUnidadesDisponibles(codigoBodega);
        productoInput.setTipoProducto(tipoProducto);
        
        ejbProductoFacade.create(productoInput);
        
        Gson x = new Gson();
        return Response.ok().entity(x.toJson("Creado")).build();
    }
    
    @POST
    @Path("/crearBodega")
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response crearBodega(@FormParam("nombreBodega") String nombreBodega,
            @FormParam("localizacionBodega") String localizacionBodega,
            @Context HttpServletRequest request) {

        Bodegas bodegaInput = new Bodegas();
        List<Bodegas> bodList = ejbBodegaFacade.findAll();
        System.out.println("Size "+bodList.size());
        
        //bodegaInput.setCodigoBodega(ejbBodegaFacade.find(bodList.size()).getCodigoBodega() + 1);
        bodegaInput.setNombreBodega(nombreBodega);
        bodegaInput.setLocalizacionBodega(localizacionBodega);
        
        System.out.println("RR" +bodegaInput.toString());
        ejbBodegaFacade.create(bodegaInput);
        
        Gson x = new Gson();
        return Response.ok().entity(x.toJson("Creado")).build();
    }

    @POST
    @Path("/editarBodega")
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response editarBodega(@FormParam("codigoBodega") String codigoBodega,
            @FormParam("nombreBodega") String nombreBodega,
            @FormParam("localizacionBodega") String localizacionBodega,
            @Context HttpServletRequest request) {

        Bodegas bodegaInput = new Bodegas();
        bodegaInput.setCodigoBodega(Integer.parseInt(codigoBodega));
        bodegaInput.setNombreBodega(nombreBodega);
        bodegaInput.setLocalizacionBodega(localizacionBodega);

        ejbBodegaFacade.edit(bodegaInput);
        Gson x = new Gson();
        return Response.ok().entity(x.toJson("Editado")).build();
    }
    
    
    @POST
    @Path("/eliminarProducto")
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response eliminarProducto(@FormParam("codigoBodega") String codigoBodega,
            @FormParam("nombreBodega") String nombreBodega,
            @FormParam("localizacionBodega") String localizacionBodega,
            @Context HttpServletRequest request) {

        Bodegas bodegaInput = new Bodegas();
        bodegaInput.setCodigoBodega(Integer.parseInt(codigoBodega));
        bodegaInput.setNombreBodega(nombreBodega);
        bodegaInput.setLocalizacionBodega(localizacionBodega);
        ejbBodegaFacade.remove(bodegaInput);
        Gson x = new Gson();
        return Response.ok().entity(x.toJson("Eliminado")).build();
    }
    
    @POST
    @Path("/eliminarBodega")
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response eliminarBodega(@FormParam("codigoBodega") String codigoBodega,
            @FormParam("nombreBodega") String nombreBodega,
            @FormParam("localizacionBodega") String localizacionBodega,
            @Context HttpServletRequest request) {

        Bodegas bodegaInput = new Bodegas();
        bodegaInput.setCodigoBodega(Integer.parseInt(codigoBodega));
        bodegaInput.setNombreBodega(nombreBodega);
        bodegaInput.setLocalizacionBodega(localizacionBodega);
        ejbBodegaFacade.remove(bodegaInput);
        Gson x = new Gson();
        return Response.ok().entity(x.toJson("Eliminado")).build();
    }

//    @GET
//    @Path("/consultarelementosnecesarios")
//    @Produces("application/json")
//    public Response consultarElementosNece() {
//        //Connector con = new Connector();
//        //JSONResultado j = con.consultarElementosNecesarios();
//        Gson x = new Gson();
//        //String resul = x.toJson(j);
//        //return Response.status(200).entity(resul).build();
//        return null;
//    }
}
