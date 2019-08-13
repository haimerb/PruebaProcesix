<?php
/**
 * 
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
    $sql=" SELECT t1.id as id , 
            CONCAT(t1.nombres, 
            ' ', 
            t1.apellidos ) as 'responsable', 
            t1.nomEstablecimiento as 'establecimiento', 
            t1.telefono, 
            t1.movil, 
            t1.email, 
            t1.nit, 
            t2.tipoestablecimiento   
    FROM establecimientos t1
    INNER JOIN tipoestablecimiento t2 ON t1.tipoestablecimiento_id= t2.id";
    //$sql="SELECT * FROM establecimientos";
    $stmt=$db->prepare($sql);
    $stmt->execute();
    $arrayOut=$stmt->fetchAll();
    
}else{
    print_r (json_encode(array("status"=>"false","error_message"=>"Peticion HTTP no admitida")));
}
header('Access-Control-Allow-Origin: *');
print_r(json_encode($arrayOut));

?>