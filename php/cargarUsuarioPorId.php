<?php 
    require("conexion.php");
	$consulta = "SELECT *
                 FROM usuarios
				 WHERE id_usuario='".$_GET["id"]."'";
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