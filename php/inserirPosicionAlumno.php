<?php 
    require("conexion.php");
	$consulta = "SELECT id_aula FROM alumnos WHERE id_alumno='".$_POST["id_alumno"]."'";
	$id_aula = 0;
	if ($datos = $conexion->query($consulta)) {
		while ($alumno = $datos->fetch_object()) {
			$id_aula = $alumno->id_aula;
			break;
		}
	}
	$consulta = "SELECT posicion_x, posicion_y FROM posicion_alumnos WHERE id_alumno='".$_POST['id_alumno']."'";
	$posicion_alumno_actual = null;
	if ($datos = $conexion->query($consulta)) {
		while ($posicion = $datos->fetch_object()) {
			$posicion_alumno_actual = $posicion;
			break;
		}
	}
	if ($posicion_alumno_actual != null) {
		$consulta = "SELECT id_posicion FROM posicion_alumnos WHERE posicion_x='".$_POST['posicion_x']."' AND posicion_y='".$_POST['posicion_y']."' AND id_aula='$id_aula'";
		$posicion_alumno_remplazo = null;
		if ($datos = $conexion->query($consulta)) {
			while ($posicion = $datos->fetch_object()) {
				$posicion_alumno_remplazo = $posicion;
				break;
			}
		}
		if ($posicion_alumno_remplazo != null) {
			
			$consulta = "UPDATE posicion_alumnos SET posicion_x='".$posicion_alumno_actual->posicion_x."', posicion_y='".$posicion_alumno_actual->posicion_y."' WHERE id_posicion='".$posicion_alumno_remplazo->id_posicion."'";
			$conexion->query($consulta);
		}
		$consulta = "UPDATE posicion_alumnos SET posicion_x='".$_POST['posicion_x']."', posicion_y='".$_POST['posicion_y']."' WHERE id_alumno='".$_POST['id_alumno']."'";
	}
	else {
		$consulta = "SELECT id_posicion FROM posicion_alumnos WHERE posicion_x='".$_POST['posicion_x']."' AND posicion_y='".$_POST['posicion_y']."' AND id_aula='".$id_aula."'";
		$posicion_alumno_quitar = null;
		if ($datos = $conexion->query($consulta)) {
			while ($posicion = $datos->fetch_object()) {
				$posicion_alumno_quitar = $posicion;
				break;
			}
		}
		if ($posicion_alumno_quitar != null) {
			
			$consulta = "DELETE FROM posicion_alumnos WHERE id_posicion='".$posicion_alumno_quitar->id_posicion."'";
			$conexion->query($consulta);
		}
		$consulta = "INSERT INTO posicion_alumnos (id_aula, id_alumno, posicion_x, posicion_y)
					 VALUES('$id_aula', '".$_POST['id_alumno']."', '".$_POST['posicion_x']."', '".$_POST['posicion_y']."')";
	}
	$saida = '';
	if ($conexion->query($consulta)) {   		
		$saida = 'ok';
	}else{
        $saida = 'erro';
    }
	$conexion->close();
	echo $saida;
?>