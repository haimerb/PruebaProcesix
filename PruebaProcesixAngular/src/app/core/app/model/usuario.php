<?php
class Usuario{
 
 // database connection and table name
 private $conn;
 private $table_name = "usuario";

 // object properties
 public $id;
 public $nit;
 public $usuario;
 public $description;
 public $email;
 public $password;


 // constructor with $db as database connection
 public function __construct($db){
     $this->conn = $db;
 }
 ?>