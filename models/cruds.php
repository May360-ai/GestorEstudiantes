<?php
include_once("../config/conexion.php");

class Cruds {
    public static function selectEst(){
        $objConn= new Conexion();
        $conn=$objConn->Conectar();
        $sql="select * from estudiante";
        $res=$conn->prepare($sql);
        $res->execute();
        $data=$res->fetchAll(PDO::FETCH_ASSOC); 
        echo json_encode($data);
    }

    public static function selectEstByCedula($cedula){
        $objConn= new Conexion();
        $conn=$objConn->Conectar();
        $sql="select * from estudiante where cedula = :cedula";
        $res=$conn->prepare($sql);
        $res->bindParam(':cedula', $cedula);
        $res->execute();
        $data=$res->fetchAll(PDO::FETCH_ASSOC); 
        echo json_encode($data);
    }
    
    public static function insertEst(){
        $objConn= new Conexion();
        $conn=$objConn->Conectar();
        $cedula=$_POST['txtCedula'];
        $nombre=$_POST['txtNombre'];
        $apellido=$_POST['txtApellido'];
        $telefono=$_POST['txtTelefono'];
        $direccion=$_POST['txtDireccion'];
        $sql="insert into estudiante values('$cedula', '$nombre', '$apellido', '$telefono', '$direccion')";
        $res=$conn->prepare($sql);
        $res->execute();
        echo json_encode("exito");
    }    
    public static function updateEst(){
        $objConn= new Conexion();
        $conn=$objConn->Conectar();
        $conn=$objConn->Conectar();
        $cedula=$_GET['txtCedula'];
        $nombre=$_GET['txtNombre'];
        $apellido=$_GET['txtApellido'];
        $telefono=$_GET['txtTelefono'];
        $direccion=$_GET['txtDireccion'];
        $sql="update estudiante set nombre='$nombre', apellido='$apellido', telefono='$telefono', direccion='$direccion' where cedula='$cedula'";
        $res=$conn->prepare($sql);
        $res->execute();
        echo json_encode("exito");
    }    
    
    public static function deleteEst(){
        $objConn= new Conexion();
        $conn=$objConn->Conectar();
        $cedula=$_GET['txtCedula'];
        $sql="delete from estudiante where cedula='$cedula'";
        $res=$conn->prepare($sql);
        $res->execute();
        echo json_encode("exito");
    }
}
?>