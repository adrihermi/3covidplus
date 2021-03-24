<?php
    header("Content-type: application/vnd.ms-excel");
    header("Content-Disposition: attachment; filename=nombre_archivo.xls");
    $consulta = "";
?>
<table>
    <caption>Informe de casos.</caption>
    <tr>
        <th>Aula</th>
        <th>Estado normal</th>
        <th>Espera resultados PCR</th>
        <th>Positivo</th>
        <th>En contacto con un positivo</th>
    </tr>
    <?php
        $datos = $conexion->query($consulta); 
        while($fila=mysqli_fetch_assoc($datos)){
    ?>        
    <?php
    } 
    $datos->close();
    $conexion->close();
    ?>   
</table>