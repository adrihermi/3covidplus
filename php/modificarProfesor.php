<?php 
    require("conexion.php");
	$consulta = "UPDATE profesores SET nombre='".$_POST['nombre']."', apellido1='".$_POST['apellido1']."', apellido2='".$_POST['apellido2']."', fecha_nacimiento='".$_POST['fecha_nacimiento']."', genero='".$_POST['genero']."', telefono='".$_POST['telefono']."', email_profesor='".$_POST['email']."', observaciones='".$_POST['observaciones']."', dni_profesor='".$_POST['dni_profesor'].", id_aula=".$_POST['dni_profesor']."'
		WHERE id_profesor='".$_POST['id_profesor']."'";
	$saida = '';
	if ($conexion->query($consulta)) {   		
		$saida = 'ok';
	}else{
        $saida = 'erro';
    }
	$conexion->close();
	echo $saida;
?>