<?php 
    require("conexion.php");
	$aula = $_POST['aula'];
	$consulta = "SELECT * 
                 FROM alumnos WHERE id_aula='$aula' ORDER BY nombre";
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