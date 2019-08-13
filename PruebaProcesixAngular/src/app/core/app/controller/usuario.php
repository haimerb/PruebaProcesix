<?php
require_once '../lib/model.php';


	class Usuario extends Model{
		function __construct()
		{
			$this->link('usuario');
			//$this->belongs_to('teacher', 'teacher_id');
			$this->publics_variables(array('usuario'));
        }
        
       function getUsuario($usuario){
        return $this->_where( array("usuario" => $usuario) );
       }
	}


?>