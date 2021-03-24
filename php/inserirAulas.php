<?php 
    require("conexion.php");
	$consulta = "INSERT INTO aulas (nombre, capacidad) VALUES ('".$_POST['nombre']."','".$_POST['capacidad']."')";
	$saida = '';
	if ($conexion->query($consulta)) {   	
		$saida = json_encode(["id" => $conexion->insert_id]);
	}else{
        $saida = 'erro';
    }
	$conexion->close();
	echo $saida;
?>