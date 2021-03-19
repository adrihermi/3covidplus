<?php
// Comprovamos si existe usuario con contraseña y nos logeamos
require("conexion.php");
$saida = '';
$saida = 'error';
$consulta = "SELECT *
			     FROM usuarios
				 WHERE dni_usuario = '" . $_POST["usuario"] . "' AND contraseña = '" . $_POST["contraseña"] . "'";
if ($datos = $conexion->query($consulta)) {
	if ($datos->num_rows > 0) {
		session_start();
		$_SESSION["usuario"] = $_POST["usuario"];
		$_SESSION["contraseña"] = $_POST["contraseña"];
		$saida = 'ok';
	}
	$datos->close();
} 
$conexion->close();
echo $saida;
?>