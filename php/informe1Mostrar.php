<?php
    require("conexion.php");    
    $consulta = "SELECT al.nombre,
    count(CASE WHEN e.id_estado = 1 THEN e.id_estado ELSE null END) AS Normal,
    count(CASE WHEN e.id_estado = 2 THEN e.id_estado ELSE null END) AS EsperaResPCR,
    count(CASE WHEN e.id_estado = 3 THEN e.id_estado ELSE null END) AS Positivo,
    count(CASE WHEN e.id_estado = 4 THEN e.id_estado ELSE null END) AS ContactoPositivo
    FROM alumnos as a join aulas al on (a.id_aula=al.id_aula)
    join estados_alumnos as ea on (ea.id_alumno=a.id_alumno)
    join estados as e on(e.id_estado=ea.id_estado)
    group by al.id_aula";
    
    $tabla = "<h1>Historico de casos por aula</h1><div><table class = 'table'>
                <tr>
                    <th>Aula</th>
                    <th>Estado normal</th>
                    <th>Espera resultados PCR</th>
                    <th>Positivo</th>
                    <th>En contacto con un positivo</th>
                    </tr>";
    if($datos = $conexion->query($consulta)){
        while($fila=mysqli_fetch_assoc($datos)){
            $tabla .= '<tr>
            <td>'.$fila["nombre"].'</td>
            <td>'.$fila["Normal"].'</td>
            <td>'.$fila["EsperaResPCR"].'</td>
            <td>'.$fila["Positivo"].'</td>
            <td>'.$fila["ContactoPositivo"].'</td>
        </tr>';       
        }
    }
    $tabla .= "</div></table><div><a class='btn' href = 'php/informe1Descargar.php'>Descargar Informe</a></div>";
    $datos->close();
    $conexion->close();
    echo $tabla;
?>