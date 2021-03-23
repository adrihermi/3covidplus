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
	$consulta = "SELECT COUNT(*) as total FROM posicion_alumnos WHERE id_alumno='".$_POST['id_alumno']."'";
	$tiene_datos = false;
	if ($datos = $conexion->query($consulta)) {
		while ($posicion = $datos->fetch_object()) {
			$tiene_datos = $posicion->total > 0;
			break;
		}
	}
	if ($tiene_datos) {
		$consulta = "UPDATE posicion_alumnos SET posicion_x='".$_POST['posicion_x']."', posicion_y='".$_POST['posicion_y']."'
			WHERE id_alumno='".$_POST['id_alumno']."'";
	}
	else {
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