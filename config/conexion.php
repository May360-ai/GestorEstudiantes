<?php
class Conexion{
    public function Conectar(){
        $host='localhost';
        $user='root';
        $pass='';
        $dbname='soa';
        try {
            $conn = new PDO("mysql:host=$host;dbname=$dbname;", $user, $pass);
            return $conn;
        } catch (Exception $e) {
            die("Error de conexión: " . $e->getMessage());
        }
    }
}
?>