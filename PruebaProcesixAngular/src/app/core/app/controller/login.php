<?php
  
  require_once 'controller/usuario.php';


  class LoginController{


    public function validacion($usuario,$pass){
        $usuario = new Usuario();
        echo $usuario->_where( array("usuario" => $usuario) );
        //$usuario->_where( array("usuario" => $usuario) );

    }

  }

?>