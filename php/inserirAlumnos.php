<?php 
    require("conexion.php");

	$consulta = "INSERT INTO alumnos (nombre, apellido1, apellido2, fecha_nacimiento, genero, telefono, email, email_tutor_legal, observaciones, id_aula, dni_alumno, id_alumno) 
                VALUES ('".$_POST['nombre']."','".$_POST['apellido1']."','".$_POST['apellido2']."',".$_POST['fecha_nacimiento'].",'".$_POST['genero']."','".$_POST['telefono']."','".$_POST['email']."','".$_POST['email_tutor_legal']."','".$_POST['observaciones']."','".$_POST['clase']."','".$_POST['dni_alumno']."','')";
	$saida = '';
	if ($conexion->query($consulta)) {   		
		$saida = 'ok';
	}else{
        $saida = 'erro';
    }
	$conexion->close();
	echo $saida;
?>