<?php
    require("conexion.php");
    header("Content-type: application/vnd.ms-excel");
    header("Content-Disposition: attachment; filename=informe_casos.xls");
    $consulta = "SELECT * FROM usuarios";
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
        if($datos = $conexion->query($consulta)){
            while($fila=mysqli_fetch_assoc($datos)){
        
        
    ?>        
    <?php
    }
    } 
    
    ?>   
</table>