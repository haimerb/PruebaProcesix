<?php


require_once '../config/database.php';
require_once './password.php';

$arrayOut=array();
$dbConfig = new Database();
$db=$dbConfig->getConnection();

$username="";
$password="";

$method = $_SERVER['REQUEST_METHOD'];

if($method=="GET"){
    $username=$_REQUEST['userName'];
    $password=$_REQUEST['password'];
}else{
    print_r (json_encode(array("status"=>"false","error_message"=>"Peticion HTTP no admitida")));
}

if($method=="GET"){
    $stmt = $db->prepare("SELECT * FROM usuario WHERE usuario=? ");
    $stmt->execute([$username]); 
    $usuarioOut = $stmt->fetch();
}else{
    print_r (json_encode(array("status"=>"false","error_message"=>"Peticion HTTP no admitida")));
}

if($usuarioOut!==null&&$usuarioOut!==""){
    $arrayOut=$usuarioOut;
}

$success="False";
$opciones = [
    'cost' => 12,
    'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
];
$hash = Password::hash($password);//password de la peticion
//$hash=$usuarioOut["password"];


/*print_r($hash);
print_r($usuarioOut["password"]);*/


if(($usuarioOut["usuario"]===$username)&&Password::verify($password, $hash)){

    header('Access-Control-Allow-Origin: *');
    print_r (json_encode(array("status"=>"true",
                                 "usuario"=>array("id"=>$usuarioOut["id"],
                                                  "nomUsuario"=>$usuarioOut["usuario"])
                                                )));
}else{
    header('Access-Control-Allow-Origin: *');
    print_r (json_encode(array("status"=>"false","error_message"=>"Contraseña Incorrecta")));
}
?>