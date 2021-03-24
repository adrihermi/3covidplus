<?php
require("conexion.php");
$consulta = "SELECT *
	FROM posicion_alumnos as pos
	INNER JOIN alumnos as al on pos.id_alumno=al.id_alumno
	JOIN 
	(
		SELECT id_estado, id_alumno, fecha
		FROM estados_alumnos
		GROUP BY id_alumno, fecha
		ORDER BY fecha DESC
	) b ON al.id_alumno = b.id_alumno
	WHERE pos.id_aula='" . $_GET["id"] . "'";
$grilla = array();
if ($datos = $conexion->query($consulta)) {
	while ($dato = $datos->fetch_object()) {
		$existe = false;
		foreach ($grilla as $s) {
			if ($s->id_alumno == $dato->id_alumno) {
				$existe = true;
				break;
			}
		}
		if (!$existe) {
			$grilla[] = $dato;
		}
	}
	$datos->close();
}
$conexion->close();
echo json_encode($grilla);