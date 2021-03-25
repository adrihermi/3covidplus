<?php 
    require("conexion.php");
	$consulta = "UPDATE usuarios SET 
	nombre='".$_POST['nombre']."', 
	apellido1='".$_POST['apellido1']."', 
	apellido2='".$_POST['apellido2']."', 
	fecha_nacimiento='".$_POST['fecha_nacimiento']."', 
	genero='".$_POST['genero']."', 
	telefono='".$_POST['telefono']."', 
	email='".$_POST['email']."', 
	permisos='".$_POST['permisos']."', 
	dni_usuario='".$_POST['dni_usuario']."', 
	contraseña= '".$_POST['contraseña']."' 
		WHERE id_usuario=".$_POST['id_usuario'];
	$saida = '';
	if ($conexion->query($consulta)) {   		
		$saida = 'ok';
	}else{
        $saida = 'erro';
    }
	$conexion->close();
	echo $saida;
?>