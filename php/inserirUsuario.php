<?php 
    require("conexion.php");

	$consulta = "INSERT INTO usuarios (contraseña,nombre, apellido1, apellido2, fecha_nacimiento, genero, telefono, email, permisos, dni_usuario) 
                VALUES ('".$_POST['contraseña']."','".$_POST['nombre']."','".$_POST['apellido1']."','".$_POST['apellido2']."','".$_POST['fecha_nacimiento']."','".$_POST['genero']."','".$_POST['telefono']."','".$_POST['email']."','".$_POST['permisos']."', '".$_POST['dni_usuario']."')";
	$saida = '';
	$saida = "error";
	if ($conexion->query($consulta)) {   		
		$saida = "ok";
	}
	$conexion->close();
	echo $saida;
?>