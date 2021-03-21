<?php 
    require("conexion.php");
	$consulta = "INSERT INTO estados_alumnos (fecha, id_alumno, id_estado) VALUES (".$_POST['fecha'].", ".$_POST['id_alumno'].", ".$_POST['id_estado'].")";
	$saida = '';
	if ($conexion->query($consulta)) {   		
		$saida = 'ok';
	}else{
        $saida = 'erro';
    }
	$conexion->close();
	echo $saida;
?>