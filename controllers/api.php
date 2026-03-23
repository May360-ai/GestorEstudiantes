<?php
include_once("../models/cruds.php");

$opc=$_SERVER['REQUEST_METHOD'];

switch ($opc) {
    case 'GET':
        if(isset($_GET['cedula'])){
            Cruds::selectEstByCedula($_GET['cedula']);
        } else {
            Cruds::selectEst();
        }
        break;
    case 'POST':
        Cruds::insertEst();
        break;
    case 'PUT':
        Cruds::updateEst();
        break;
    case 'DELETE':
        Cruds::deleteEst();
        break;
}
?>