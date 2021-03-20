<?php 
    require("conexion.php");
	$consulta = "SELECT * 
                 FROM profesores ORDER BY nombre";
	$saida = array();
	if ($datos = $conexion->query($consulta)) {   		
		while ($profesor = $datos->fetch_object()) {
			$saida[] = $profesor;
		}
		$datos->close();
	}
	$conexion->close();
	echo json_encode($saida);
?>