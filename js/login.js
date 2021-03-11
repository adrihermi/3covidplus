$(function () {
    $("#formulario-inicio").submit(function () {
        if (!$("#mensaje-error").hasClass("ocultar")) {
            $("#mensaje-error").addClass("ocultar");
        }
        var usuario = $("#usuario").val();
        if (!usuario || usuario.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el nombre de usuario");
            return;
        }
        var clave = $("#clave").val();
        if (!clave || clave.trim().length < 6) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar una clave, teniendo en cuenta que debe tener 6 caracteres.");
            return;
        }
        $.ajax({
            type: "POST",
            url: "php/login.php",
            data: { usuario: usuario, contraseña: clave },
        })
    });
});