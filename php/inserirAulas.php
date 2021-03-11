<?php 
    require("conexion.php");
	$consulta = "INSERT INTO aulas (nombre, capacidad, id_aula) VALUES ('".$_POST['nombre']."','".$_POST['capacidad']."','')";
	$saida = '';
	if ($conexion->query($consulta)) {   		
		$saida = 'ok';
	}else{
        $saida = 'erro';
    }
	$conexion->close();
	echo $saida;
?>