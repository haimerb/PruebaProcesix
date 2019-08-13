/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package jsf.util;

import java.io.Serializable;

/**
 *
 * @author PC
 */
public class JSONResultado implements Serializable {

    private String mensaje;
    private String error;
    private String resultado;

    public JSONResultado(String mensaje, String error, String resultado) {
        this.mensaje = mensaje;
        this.error = error;
        this.resultado = resultado;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getResultado() {
        return resultado;
    }

    public void setResultado(String resultado) {
        this.resultado = resultado;
    }

    @Override
    public String toString() {
        return "AjaxResultado{"
                + "mensaje='" + mensaje + '\''
                + ", error='" + error + '\''
                + ", resultado='" + resultado + '\''
                + '}';
    }
}
