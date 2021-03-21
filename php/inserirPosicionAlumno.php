<?php 
    require("conexion.php");
	$consulta = "INSERT INTO estados_alumnos (id_aula, id_alumno, posicion_x, posicion_y) VALUES (".$_POST['id_aula'].", ".$_POST['id_alumno'].", '".$_POST['posicion_x']."', '".$_POST['posicion_y']."')";
	$saida = '';
	if ($conexion->query($consulta)) {   		
		$saida = 'ok';
	}else{
        $saida = 'erro';
    }
	$conexion->close();
	echo $saida;
?>