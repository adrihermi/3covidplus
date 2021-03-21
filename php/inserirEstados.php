<?php 
    require("conexion.php");
	$consulta = "INSERT INTO `estados`(`descripcion`) VALUES ('Positivo');"+
                "INSERT INTO `estados`(`descripcion`) VALUES ('Espera resultados PCR');"+
                "INSERT INTO `estados`(`descripcion`) VALUES ('En contacto con un positivo');"+
                "INSERT INTO `estados`(`descripcion`) VALUES ('Normal');";+
	$saida = '';
	if ($conexion->query($consulta)) {   		
		$saida = 'ok';
	}else{
        $saida = 'erro';
    }
	$conexion->close();
	echo $saida;
?>