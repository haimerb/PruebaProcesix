<?php
class Database{
 private $host = "localhost";
 private $db_name = "cali24test";
 private $username = "root";
 private $password = "";
 public $conn;
 /**
  * Conección a Bases de datos
  */
 public function getConnection(){

     $this->conn = null;

     try{
         $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);

         //$this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

         $this->conn->exec("set names utf8");
         $this->conn->query("SELECT * FROM usuario ORDER BY id DESC LIMIT 1")->fetch();

     }catch(PDOException $exception){
         echo "Connection error: " . $exception->getMessage();
     }

     return $this->conn;
 }
}
?>