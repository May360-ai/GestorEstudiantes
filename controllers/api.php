<?php
include_once("../models/cruds.php");

$opc=$_SERVER['REQUEST_METHOD'];

switch ($opc) {
    case 'GET':
        Cruds::selectEst();
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