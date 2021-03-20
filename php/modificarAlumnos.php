<?php 
    require("conexion.php");
	$consulta = "UPDATE alumnos SET nombre='".$_POST['nombre']."', apellido1='".$_POST['apellido1']."', apellido2='".$_POST['apellido2']."', fecha_nacimiento='".$_POST['fecha_nacimiento']."', genero='".$_POST['genero']."', telefono='".$_POST['telefono']."', email='".$_POST['email']."', email_tutor_legal='".$_POST['email_tutor_legal']."', observaciones='".$_POST['observaciones']."', id_aula='".$_POST['id_aula']."', dni_alumno='".$_POST['dni_alumno']."'
		WHERE id_alumno='".$_POST['id_alumno']."'";
	$saida = '';
	if ($conexion->query($consulta)) {   		
		$saida = 'ok';
	}else{
        $saida = 'erro';
    }
	$conexion->close();
	echo $saida;
?>