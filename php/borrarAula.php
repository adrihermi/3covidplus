<?php 
    require("conexion.php");
	$consulta = "DELETE FROM aulas WHERE id_aula = '".$_GET['id_aula']."'";
	$saida = '';
	if ($conexion->query($consulta)) {   		
		$saida = 'ok';
	}else{
        $saida = 'erro';
    }
	$conexion->close();
	echo $saida;
?>