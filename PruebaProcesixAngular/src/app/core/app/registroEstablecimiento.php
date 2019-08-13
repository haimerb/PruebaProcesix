<?php
/*** 
 * 
 */
require_once '../config/database.php';

$arrayOut=array();
$dbConfig = new Database();
$db=$dbConfig->getConnection();

$nombresProp="";
$apellidosProp="";
$tipoUsuario="";
$nomEstablecimiento="";
$telefono="";
$movil="";
$email="";
$nit="";
$tipoEstablecimiento="";
$usuarioEdita="";

$out=array();
$method = $_SERVER['REQUEST_METHOD'];

/*registro.php?nombres=Haimer&
apellidos=Barbetti&
nombreEstablecimiento=La Noche&
telefono=5555555&
movil=5555555555&
email=haimer.barbetti@cali.gov.co&
nit=123456789&
tipoEstablecimiento=1&
tipoUsuario=1&
usuario=165*/


if($method=="POST"){
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
    $sql="INSERT INTO regestablecimientos (nombres,apellidos,nomEstablecimiento,
                                           telefono,movil,email,nit,tipoestablecimiento_id, usuario_id) 
          VALUES (:nombres, 
                  :apellidos, 
                  :nomEstablecimiento,  
                  :telefono, 
                  :movil, 
                  :email, :nit, :tipoEstablecimiento, :usuario)";

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
    
}else{
    print_r (json_encode(array("status"=>"false","error_message"=>"Peticion HTTP no admitida")));
}
print_r($out);
if($out==1){
    print_r(json_encode(array("status"=>"true")));
}else{
    print_r(json_encode(array("status"=>"false","error_message"=>"Error de Insercion ".$out)));
}
?>