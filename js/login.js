$(function() {
    $("#iniciar").on('click', function() {
        if (!$("#mensaje-error").hasClass("ocultar")) {
            $("#mensaje-error").addClass("ocultar");
        }
        var usuario = ($("#usuario").val()).toUpperCase();
        if (!usuario || usuario.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el nombre de usuario");
            return;
        }
        var clave = $("#clave").val();
        if (!clave || clave.trim().length < 6) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar una clave, teniendo en cuenta que debe tener 6 caracteres.");
            return;
        }
        $.post("php/login.php", { usuario: usuario, contraseña: clave })
            .done(function(datos) {
                switch (datos) {
                    case "ok":
                        location.href = "./usuario.html";
                        break;
                    case "error":
                        $("#mensaje-error").removeClass("ocultar").html("El usuario o contraseña no existen.");
                        break;
                }
            })
            .fail(function() {
                alert("Error en el fichero: login.php")
            })
    })
});