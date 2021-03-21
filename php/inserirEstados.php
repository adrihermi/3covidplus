<?php 
    require("conexion.php");
	$consulta = "INSERT INTO estados (descripcion, id_estado) VALUES ('Normal', 1);"+
                "INSERT INTO estados (descripcion, id_estado) VALUES ('Espera resultados PCR', 2);"+
                "INSERT INTO estados (descripcion, id_estado) VALUES ('Positivo', 3);"+
                "INSERT INTO estados (descripcion, id_estado) VALUES ('En contacto con un positivo', 4);";
                
	$saida = '';
	if ($conexion->query($consulta)) {   		
		$saida = 'ok';
	}else{
        $saida = 'erro';
    }
	$conexion->close();
	echo $saida;
?>