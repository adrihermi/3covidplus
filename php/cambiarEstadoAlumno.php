<?php 
    require("conexion.php");
	require ("correo.php");
	$consulta = "INSERT INTO estados_alumnos (fecha, id_alumno, id_estado) VALUES ('".$_POST['fecha']."', ".$_POST['id_alumno'].", ".$_POST['id_estado'].")";
	$saida = array();
	if ($conexion->query($consulta)) {   		
		if($_POST['id_estado'] == 3){
			// El alumno dio positivo, se deben buscar los colindantes
			$consulta = "SELECT pos.posicion_x, pos.posicion_y, au.capacidad, au.id_aula
						 FROM posicion_alumnos as pos
						 JOIN aulas as au on pos.id_aula=au.id_aula
						 WHERE pos.id_alumno = ".$_POST['id_alumno'];
			$posicion_alumno_contagiado = null;
			if ($datos = $conexion->query($consulta)) {   		
				while ($posicion = $datos->fetch_object()) {
					$posicion_alumno_contagiado = $posicion;
					break;
				}
				$datos->close();
			}

			if ($posicion_alumno_contagiado != null) {
				// Buscando los posibles colindantes
				$colindantes = posibles_colindantes($posicion_alumno_contagiado->posicion_x, $posicion_alumno_contagiado->posicion_y, $posicion_alumno_contagiado->capacidad);
				foreach ($colindantes as $colindante) {
					$consulta = "INSERT INTO estados_alumnos (fecha, id_alumno, id_estado)
								 SELECT '".$_POST["fecha"]."', al.id_alumno, '4' FROM alumnos as al
								 INNER JOIN posicion_alumnos as pos on al.id_alumno=pos.id_alumno
								 WHERE pos.id_aula='".$posicion_alumno_contagiado->id_aula."' AND pos.posicion_x='".$colindante["x"]."' AND pos.posicion_y='".$colindante["y"]."'";
					$conexion->query($consulta);
					$consulta = "SELECT al.email_tutor_legal
								 FROM alumnos as al 
								 JOIN posicion_alumnos as pos on al.id_alumno = pos.id_alumno 
								 WHERE pos.posicion_x='".$colindante["x"]."' AND pos.posicion_y='".$colindante["y"]."' AND pos.id_aula='".$posicion_alumno_contagiado->id_aula."'";
					$correo_tutor_legal = "";
					$datos = $conexion->query($consulta);
					while ($dato_alumno = $datos->fetch_object()) {
						$correo_tutor_legal = $dato_alumno->email_tutor_legal;
						break;
					}
					$datos->close();
					echo "Correo: " .$correo_tutor_legal;
					if ($correo_tutor_legal != "") {
						echo json_encode(enviar_correos($correo_tutor_legal));
					}
				}
			}
		}
	}
	$conexion->close();
	echo "ok";

	function posibles_colindantes($x, $y, $capacidad_aula) {
        $posibilidades = [];
		if ($capacidad_aula == 32) {
			$total_y = 8;
		} else if ($capacidad_aula == 28) { 
			$total_y = 7;
		} else if ($capacidad_aula == 24) { 
			$total_y = 6;
		} else if ($capacidad_aula == 20) { 
			$total_y = 5;
		} else if ($capacidad_aula == 16) { 
			$total_y = 4;
		}
        if ($y - 1 >= 0) {
            if ($x - 1 >= 0) {
                $posibilidades[] = ["x" => strval($x - 1), "y" => strval($y - 1)];
            }
            $posibilidades[] = ["x" => strval($x), "y" => strval($y - 1)];
            if ($x + 1 <= 3) {
                $posibilidades[] = ["x" => strval($x + 1), "y" => strval($y - 1)];
            }
        }
        if ($x - 1 >= 0) {
            $posibilidades[] = ["x" => strval($x - 1), "y" => strval($y)];
        }
        if ($x + 1 <= 3) {
            $posibilidades[] = ["x" => strval($x + 1), "y" => strval($y)];
        }
        if ($y + 1 < $total_y) {
            if ($x - 1 >= 0) {
                $posibilidades[] = ["x" => strval($x - 1), "y" => strval($y + 1)];
            }
            $posibilidades[] = ["x" => strval($x), "y" => strval($y + 1)];
            if ($x + 1 <= 3) {
                $posibilidades[] = ["x" => strval($x + 1), "y" => strval($y + 1)];
            }
        }
        return $posibilidades;
	}
?>