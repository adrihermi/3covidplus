<?php
	// Comprovamos si existe usuario con contraseña y nos logeamos
	require("conexion.php");
	$saida = '';
	$consulta = "SELECT *
			     FROM usuarios
				 WHERE dni_usuario = '".$_POST["usuario"]."' AND contraseña = '".$_POST["contraseña"]."'";
	if($conexion->query($consulta)){
        session_start();
        $_SESSION["usuario"] =$_POST["usuario"];
		$_SESSION["contraseña"] = $_POST["contraseña"];
		$saida = 'ok';
    }else{
        $saida = 'error';
    }
	$conexion->close();
    echo $saida;
?>