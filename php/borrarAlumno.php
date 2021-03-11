<?php 
    require("conexion.php");
	$consulta = "DELETE FROM alumnos WHERE dni_alumno = '".$_GET['id_alumno']."'";
	$saida = '';
	if ($conexion->query($consulta)) {   		
		$saida = 'ok';
	}else{
        $saida = 'erro';
    }
	$conexion->close();
	echo $saida;
?>