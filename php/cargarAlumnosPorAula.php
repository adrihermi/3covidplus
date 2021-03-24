<?php 
    require("conexion.php");
	$aula = $_POST['aula'];
	$consulta = "SELECT al.id_alumno, al.nombre, al.apellido1, al.apellido2, al.fecha_nacimiento, al.telefono, al.email, b.id_estado, b.fecha
                 FROM alumnos AS al
				 JOIN 
				 (
					SELECT id_estado, id_alumno, fecha
					FROM estados_alumnos
					GROUP BY id_alumno, fecha
					ORDER BY fecha DESC
				 ) b ON al.id_alumno = b.id_alumno
				 WHERE al.id_aula='$aula' ORDER BY al.nombre, b.fecha DESC";
	$saida = array();
	if ($datos = $conexion->query($consulta)) {   		
		while ($alumno = $datos->fetch_object()) {
			$existe = false;
			foreach ($saida as $s) {
				if ($s->id_alumno == $alumno->id_alumno) {
					$existe = true;
					break;
				}
			}
			if (!$existe) {
				$saida[] = $alumno;
			}
		}
		$datos->close();
	}
	$conexion->close();
	echo json_encode($saida);
?>