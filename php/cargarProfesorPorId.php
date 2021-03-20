<?php 
    require("conexion.php");
	$consulta = "SELECT * 
                 FROM profesores WHERE id_profesor='".$_GET["id"]."'";
	$saida = "";
	if ($datos = $conexion->query($consulta)) {   		
		while ($profesor = $datos->fetch_object()) {
			$saida = $profesor;
			break;
		}
		$datos->close();
	}
	$conexion->close();
	echo json_encode($saida);
?>