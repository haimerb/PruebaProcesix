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


//print_r( json_encode(array("OK"=>isset($_POST['nombres'])?1:0) )  );

//print_r("\n ");


$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata);
    //print_r($request);

    $nombresProp=$request->nombres;
    $apellidosProp=$request->apellidos;
    $tipoUsuario=$request->tipoUsuario;
    $nomEstablecimiento=$request->nomEstablecimiento;
    $telefono=$request->telefono;
    $direccion="CC";
    $movil=$request->movil;
    $email=$request->email;
    $nit=$request->nit;
    $usuarioEdita=$request->usuario;
    $tipoEstablecimiento=$request->tipoEstablecimiento;

}
if($method=="POST"){
    //$out=array();
    //$out=0;
    /*$sql="INSERT INTO establecimientos (nombres,apellidos,nomEstablecimiento,
                                        telefono,movil,email,nit,tipoestablecimiento_id, 
                                        usuario_id) 
          VALUES (:nombres, 
                  :apellidos, 
                  :nomEstablecimiento,  
                  :telefono, 
                  :movil, 
                  :email, 
                  :nit, 
                  :tipoEstablecimiento, 
                  :usuario)";*/
    
    $sql="INSERT INTO establecimientos   VALUES (null,:nombres,
                                                 :apellidos,
                                                 :nomEstablecimiento,
                                                 :telefono,
                                                 :direccion,
                                                 :movil,
                                                 :email,
                                                 :nit,
                                                 :tipoestablecimiento_id,
                                                 :usuario_id)";
    $params=array(
                ':nombres' => $nombresProp,
                ':apellidos' => $apellidosProp,
                ':nomEstablecimiento' => $nomEstablecimiento,
                ':telefono'=>$telefono,
                ':direccion'=>$direccion,
                ':movil'=>$movil,
                ':email'=>$email,
                ':nit'=>$nit,
                ':tipoestablecimiento_id'=>$tipoEstablecimiento,
                ':usuario_id'=>$usuarioEdita
    );



          

    //$stmt=$db->prepare($sql);
    $stmt=$db->prepare($sql);
    //$salida=$stmt->execute(['nombres' => $nombresProp,
    //$stmt->execute($params);

    if($stmt->execute($params)){
        header('Access-Control-Allow-Origin: *');
            header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
            header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
            print_r(json_encode(array("status"=>"true")));
    }else{
        header('Access-Control-Allow-Origin: *');
            header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
            header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
            
            print_r(json_encode(array("status"=>"false","error_message"=>"Error de Inserción ")).json_encode($stmt->errorInfo()) );
    }

    /*$arrayExecute=array("nombres" => $nombresProp,
                        "apellidos" => $apellidosProp,
                        "nomEstablecimiento" => $nomEstablecimiento,
                        "telefono"=>$telefono,
                        "movil"=>$movil,
                        "email"=>$email,
                        "nit"=>$nit,
                        "tipoestablecimiento_id"=>$tipoEstablecimiento,
                        "usuario_id"=>$usuarioEdita
    );*/
    /*$out=$stmt->execute(
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
    );   */ 
       
        /*if( $stmt->execute(array(   "nombres" => $nombresProp,
                                    "apellidos" => $apellidosProp,
                                    "nomEstablecimiento" => $nomEstablecimiento,
                                    "telefono"=>$telefono,
                                    "movil"=>$movil,
                                    "email"=>$email,
                                    "nit"=>$nit,
                                    "tipoestablecimiento_id"=>$tipoEstablecimiento,
                                    "usuario_id"=>$usuarioEdita ))   ){
            
            header('Access-Control-Allow-Origin: *');
            header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
            header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
            print_r(json_encode(array("status"=>"true")));
        }else{
            header('Access-Control-Allow-Origin: *');
            header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
            header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
            print_r(json_encode(array("status"=>"false","error_message"=>"Error de Inserción ")));
        }*/

        /*if(false===$salida){
            header('Access-Control-Allow-Origin: *');
            header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
            header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
            print_r(json_encode(array("status"=>"false","error_message"=>"Error de Inserción ")));
        }else if(true===$salida){
            header('Access-Control-Allow-Origin: *');
            header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
            header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
            print_r(json_encode(array("status"=>"true")));
        }*/
    
        //header('Access-Control-Allow-Origin: *');
        //header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
        //header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
}else{
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    print_r (json_encode(array("status"=>"false","error_message"=>"Peticion HTTP no admitida")));
}
/*if($out==1){
    
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

    print_r(json_encode(array("status"=>"true")));
}else{
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

    print_r(json_encode(array("status"=>"false","error_message"=>"Error de Inserción ".$out)));
}*/
?>