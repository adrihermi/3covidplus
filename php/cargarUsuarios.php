<?php 
    require("conexion.php");
	session_start();
	$consulta = "SELECT permisos FROM usuarios WHERE dni_usuario = '".$_SESSION['usuario']."'";
	$esAdministrador = false;
	$saida = [];
	if ($datos = $conexion->query($consulta)) {   		
		while ($usuario = $datos->fetch_object()) {
			if ($usuario->permisos == "Administrador") {
				$esAdministrador = true;
			}
			break;
		}
	}
	if ($esAdministrador) {
		$consulta = "SELECT * FROM usuarios";	
		if ($datos = $conexion->query($consulta)) {  
			while ($usuario = $datos->fetch_object()) {
				$saida[] = $usuario;
			}
		}
	}
	$conexion->close();
	echo json_encode($saida);
?>