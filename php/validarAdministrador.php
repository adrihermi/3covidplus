<?php 
    require("conexion.php");
	session_start();
	$consulta = "SELECT permisos FROM usuarios WHERE dni_usuario = '".$_SESSION['usuario']."'";
	$saida = 'erro';
	if ($datos = $conexion->query($consulta)) {   		
		while ($usuario = $datos->fetch_object()) {
			if ($usuario->permisos == "Administrador") {
				$saida = "ok";
			}
			break;
		}
	}
	$conexion->close();
	echo $saida;
?>