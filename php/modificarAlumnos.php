<?php 
    require("conexion.php");
	$consulta = "UPDATE `alumnos` SET 'nombre'='".$_POST['nombre']."','apellido1'='".$_POST['apellido1']."','apellido2'=[value-3],'fecha_nacimiento'=[value-4],'genero'=[value-5],'telefono'=[value-6],'email'=[value-7],'email_tutor_legal'=[value-8],'observaciones'=[value-9],'id_aula'=[value-10],'dni_alumno'=[value-11],'id_alumno'=0 WHERE 1";
	$saida = '';
	if ($conexion->query($consulta)) {   		
		$saida = 'ok';
	}else{
        $saida = 'erro';
    }
	$conexion->close();
	echo $saida;
?>