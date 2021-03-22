<?php
require("conexion.php");
$consulta = "SELECT * 
                 FROM alumnos as al JOIN estados_alumnos as ea JOIN estados as es ON (al.id_alumno = ea.id_alumno AND ea.id_estado = es.id_estado)
                 WHERE id_aula = " . $_POST["id_aula"];
$saida = array();
if ($datos = $conexion->query($consulta)) {
	while ($alumno = $datos->fetch_object()) {
		$saida[] = $alumno;	
	}
	$datos->close();
}
$conexion->close();
echo json_encode($saida);
?>