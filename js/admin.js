$(function() {
    $.ajax({ url: "php/validarAdministrador.php" }).done(function(datos) {
        if (datos != "ok") {
            window.location.href = "usuario.html";
        } else {
            cargarUsuarios();
        }
    });

    function cargarUsuarios() {
        $.ajax({ url: "php/cargarUsuarios.php" }).done(function(datos) {
            var htmlString = "";
            $(datos).each(function() {
                htmlString += "<tr>" +
                    "<td>" + this.nombre + " " + this.apellido1 + " " + this.apellido2 + "</td>" +
                    "<td>" + this.fecha_nacimiento + "</td>" +
                    "<td>" + this.telefono + "</td>" +
                    "<td>" + this.email + "</td>" +
                    "<td><button class='btn' data-role='modificar-usuario' data-value='" + this.id_usuario + "'>Modificar</button></td>" +
                    "</tr>";
            });
            $("#form-listar table tbody").html(htmlString);
            $("[data-role='modificar-usuario']").click(function() {
                var idUsuario = $(this).data("value");
                $.ajax({ url: "php/cargarUsuarioPorId.php?id=" + idUsuario }).done(function(usuario) {

                });
            });
        });

    }

    function ocultarFormularios() {
        $(".form").hide();
    }

    ocultarFormularios();
});