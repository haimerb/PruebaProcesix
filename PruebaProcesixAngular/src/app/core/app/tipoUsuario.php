<?php
/**
 * logica registro servicio web rest
 */
require_once '../config/database.php';

$arrayOut=array();
$dbConfig = new Database();
$db=$dbConfig->getConnection();

$rawdata = array();
$i=0;

$listOut=array();
$method = $_SERVER['REQUEST_METHOD'];

if($method=="GET"){
    $sql="SELECT * FROM tipousuario";
    $stmt=$db->prepare($sql);
    $stmt->execute();
    $arrayOut=$stmt->fetchAll();
    
    /*foreach($arrayOut as $row){
        $lisOut[$i]=$row;
        //echo "<li>{$row['nomtipousuario']}</li>";
    }*/
}else{
    print_r (json_encode(array("status"=>"false","error_message"=>"Peticion HTTP no admitida")));
}
header('Access-Control-Allow-Origin: *');
print_r(json_encode($arrayOut));

?>