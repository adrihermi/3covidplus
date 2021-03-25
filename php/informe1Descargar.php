<?php
    require("conexion.php");
    header("Content-type: application/vnd.ms-excel");
    header("Content-Disposition: attachment; filename=informe_casos.xls");
    $consulta = "SELECT al.nombre,
                 count(CASE WHEN e.id_estado = 1 THEN e.id_estado ELSE null END) AS Normal,
                 count(CASE WHEN e.id_estado = 2 THEN e.id_estado ELSE null END) AS EsperaResPCR,
                 count(CASE WHEN e.id_estado = 3 THEN e.id_estado ELSE null END) AS Positivo,
                 count(CASE WHEN e.id_estado = 4 THEN e.id_estado ELSE null END) AS ContactoPositivo
                FROM alumnos as a join aulas al on (a.id_aula=al.id_aula)
                join estados_alumnos as ea on (ea.id_alumno=a.id_alumno)
                join estados as e on(e.id_estado=ea.id_estado)
                group by al.id_aula";
?>
<table>
    <caption>Historico de casos por aula.</caption>
    <tr>
        <th>Aula</th>
        <th>Estado normal</th>
        <th>Espera resultados PCR</th>
        <th>Positivo</th>
        <th>En contacto con un positivo</th>
    </tr>
    <?php
        if($datos = $conexion->query($consulta)){
            while($fila=mysqli_fetch_assoc($datos)){
    ?>
    <tr>
        <td><?php echo $fila["nombre"]?></td>
        <td><?php echo $fila["Normal"]?></td>
        <td><?php echo $fila["EsperaResPCR"]?></td>
        <td><?php echo $fila["Positivo"]?></td>
        <td><?php echo $fila["ContactoPositivo"]?></td>
    </tr>        
    <?php
    }
    } 
    $datos->close();
    $conexion->close();
    ?>   
</table>