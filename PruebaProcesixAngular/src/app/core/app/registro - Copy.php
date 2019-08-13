<?php
/*** 
 * logica registro servicio web rest
 */
require_once '../config/database.php';

$arrayOut=array();
$dbConfig = new Database();
$db=$dbConfig->getConnection();

$id="";
$nombresProp="";
$apellidosProp=""; 
$nomEstablecimiento="";
$telefono="";
$direccion="";
$movil="";
$email="";
$nit="";
$tipoEstablecimiento="";
$tipoUsuario="";
$usuarioEdita="";



$out=array();
$method = $_SERVER['REQUEST_METHOD'];

if($method=="POST"){

    header('Access-Control-Allow-Origin: *');/*
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');*/

    $nombresProp=$_REQUEST['nombres'];
    $apellidosProp=$_REQUEST['apellidos'];
    $tipoUsuario=$_REQUEST['tipoUsuario'];
    $nomEstablecimiento=$_REQUEST['nombreEstablecimiento'];
    $telefono=$_REQUEST['telefono'];
    $movil=$_REQUEST['movil'];
    $email=$_REQUEST['email'];
    $nit=$_REQUEST['nit'];
    $usuarioEdita=$_REQUEST['usuario'];
    $tipoEstablecimiento=$_REQUEST['tipoEstablecimiento'];
    
}else{
    print_r (json_encode(array("status"=>"false","error_message"=>"Peticion HTTP no admitida")));
}

if($method=="POST"){
    $sql="INSERT INTO establecimientos (nombres,
                                        apellidos,
                                        nomEstablecimiento,
                                        telefono,
                                        movil,
                                        email,
                                        nit,
                                        tipoestablecimiento_id, 
                                        usuario_id) 
          VALUES (:nombres, 
                  :apellidos, 
                  :nomEstablecimiento,  
                  :telefono, 
                  :movil, 
                  :email, 
                  :nit, 
                  :tipoEstablecimiento, 
                  :usuario)";

    $stmt=$db->prepare($sql);

    $out=array();

    $out=$stmt->execute(
        array("nombres" => $nombresProp,
              "apellidos" => $apellidosProp,
              "nomEstablecimiento" => $nomEstablecimiento,
              "telefono"=>$telefono,
              "movil"=>$movil,
              "email"=>$email,
              "nit"=>$nit,
              "tipoEstablecimiento"=>$tipoEstablecimiento,
              "usuario"=>$usuarioEdita
            )
    );  

    header('Access-Control-Allow-Origin: *');
    /*header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');*/
    
    print_r(" nombres" . $nombresProp .
            " apellidos" . $apellidosProp,
            " nomEstablecimiento" .$nomEstablecimiento.
            " telefono"=>$telefono.
            " movil".$movil.
            " email".$email.
            " nit".$nit.
            " tipoEstablecimiento".$tipoEstablecimiento.
            " usuario". $usuarioEdita );

}else{
    header('Access-Control-Allow-Origin: *');
    /*header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');*/
    print_r (json_encode(array("status"=>"false","error_message"=>"Peticion HTTP no admitida")));
}
//print_r($out);
if($out==1){
    
    header('Access-Control-Allow-Origin: *');/*
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');*/
    print_r(json_encode(array("status"=>"true")));
}else{
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    print_r(json_encode(array("status"=>"false","error_message"=>"Error de Insercion ".$out)));
}
?>