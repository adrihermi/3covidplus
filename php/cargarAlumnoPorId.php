<?php 
    require("conexion.php");
	$consulta = "SELECT al.nombre, al.apellido1, al.apellido2, al.telefono, al.email, al.email_tutor_legal, al.observaciones, al.dni_alumno, al.fecha_nacimiento, al.genero, au.nombre as 'nombre_aula', au.capacidad as 'capacidad_aula', al.id_aula
                 FROM alumnos as al
				 INNER JOIN aulas as au on al.id_aula=au.id_aula WHERE al.id_alumno='".$_GET["id"]."'";
	$saida = "";
	if ($datos = $conexion->query($consulta)) {   		
		while ($alumno = $datos->fetch_object()) {
			$saida = $alumno;
			break;
		}
		$datos->close();
	}
	$conexion->close();
	echo json_encode($saida);
?>