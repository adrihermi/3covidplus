<?php 
    require("conexion.php");
	$consulta = "INSERT INTO estados_alumnos (fecha, id_alumno, id_estado) VALUES (".$_POST['fecha'].", ".$_POST['id_alumno'].", ".$_POST['id_estado'].")";
	$saida = array();
	if ($conexion->query($consulta)) {   		
		if($_POST['id_estado'] == 3){
			$consulta = "SELECT posicion_x, posicion_y 
						 FROM posicion_alumnos 
						 WHERE id_alumno = ".$_POST['id_alumno']."";
			if ($datos = $conexion->query($consulta)) {   		
				while ($alumno = $datos->fetch_object()) {
					$saida[] = $alumno;
				}
				$datos->close();
			}
		}
	}
	$conexion->close();
	echo json_encode($saida);
?>