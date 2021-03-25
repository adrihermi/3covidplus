<?php 
    require("conexion.php");

	$consulta = "INSERT INTO alumnos (nombre, apellido1, apellido2, fecha_nacimiento, genero, telefono, email, email_tutor_legal, observaciones, id_aula, dni_alumno) 
                VALUES ('".$_POST['nombre']."','".$_POST['apellido1']."','".$_POST['apellido2']."','".$_POST['fecha_nacimiento']."','".$_POST['genero']."','".$_POST['telefono']."','".$_POST['email']."','".$_POST['email_tutor_legal']."','".$_POST['observaciones']."','".$_POST['clase']."','".$_POST['dni_alumno']."')";
	$saida = 'erro';
	if ($conexion->query($consulta)) {
		$id_alumno = $conexion->insert_id;
		$hoy = date('Y-m-d');
		$consulta = "INSERT INTO estados_alumnos (fecha, id_alumno, id_estado)
					 VALUES ('$hoy', '$id_alumno', '1')";
		if ($conexion->query($consulta)) {
			$consulta = "INSERT INTO posicion_alumnos (id_aula, id_alumno, posicion_x, posicion_y)
						 VALUES ('".$_POST['clase']."', '$id_alumno', '".$_POST['posicion_x']."', '".$_POST['posicion_y']."')";
			if ($conexion->query($consulta)) {
				$saida = json_encode(["id"=> $id_alumno]);
			}
		}
	}
	$conexion->close();
	echo $saida;
?>