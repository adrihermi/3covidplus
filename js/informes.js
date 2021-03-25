$(function() {
    cargarInforme1();
    function cargarInforme1(){
        $.ajax({ url: "php/informe1Mostrar.php" }).done(function(datos) {
            console.log(datos)
            $("div .cuerpo").html(datos);
        });
    }
})