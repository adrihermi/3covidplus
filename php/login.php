<?php
	// Comprovamos si existe usuario con contraseña y nos logeamos
	require("conexion.php");
	$saida = '';
	$consulta = "SELECT *
				 WHERE dni_usuario = '".$_POST["usuario"]."' AND contraseña = '".$_POST["contraseña"]."'";
	if($conexion->query($consulta)){
        session_start();
        /*Aquí irían las cookies pero no entiendo lo que se pide*/
    }else{
        $saida = 'error';
    }
	$conexion->close();
    echo $saida;
?>