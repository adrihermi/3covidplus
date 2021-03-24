<?php 
    require("conexion.php");
	$consulta = "SELECT * FROM aulas 
        where id_aula ='".$_GET["id"]."'";
	$saida = "";
	if ($datos = $conexion->query($consulta)) {   		
		while ($aula = $datos->fetch_object()) {
			$saida = $aula;
			break;
		}
		$datos->close();
	}
	$conexion->close();
	echo json_encode($saida);
?>