<?php 
    require("conexion.php");
	$consulta = "SELECT *
                 FROM posicion_alumnos as pos
				 INNER JOIN aula as au ON pos.id_aula=au.id_aula
				 WHERE au.id_aula='".$_GET["id"]."'";
	$grilla = array();
	if ($datos = $conexion->query($consulta)) {   		
		while ($dato = $datos->fetch_object()) {
			$grilla[] = $dato;
		}
		$datos->close();
	}
	$conexion->close();
	echo json_encode($grilla);
?>