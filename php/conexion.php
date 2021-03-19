<?php
	$servidor="localhost";
	$usuario="root";
	$contrasinal="";
	$baseDatos="covid_plus";

	// Creamos a conexión
	$conexion = new mysqli($servidor, $usuario, $contrasinal, $baseDatos);
	$conexion->query("SET NAMES 'utf8'");
?>