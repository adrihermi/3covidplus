<?php 
    require("conexion.php");
	$consulta = "INSERT INTO profesores (nombre, apellido1, apellido2, fecha_nacimiento, genero, telefono, email_profesor, observaciones, dni_profesor, id_aula)
		VALUES('".$_POST['nombre']."', '".$_POST['apellido1']."', '".$_POST['apellido2']."', '".$_POST['fecha_nacimiento']."', '".$_POST['genero']."', '".$_POST['telefono']."', '".$_POST['email']."', '".$_POST['observaciones']."', '".$_POST['dni_profesor']."', ".$_POST['id_aula'].")";
	$saida = '';
	if ($conexion->query($consulta)) {   		
		$saida = 'ok';
	}else{
        $saida = 'erro';
    }
	$conexion->close();
	echo $saida;
?>