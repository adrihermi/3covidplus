<?php 
    require("conexion.php");
	$consulta = "SELECT * 
                 FROM aulas";
	$saida = array();
	if ($datos = $conexion->query($consulta)) {   		
		while ($aula = $datos->fetch_object()) {
			$saida[] = $aula;
		}
		$datos->close();
	}
	$conexion->close();
	echo json_encode($saida);
?>