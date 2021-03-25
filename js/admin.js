$(function() {
    $.ajax({ url: "php/validarAdministrador.php" }).done(function(datos) {
        if (datos != "ok") {
            window.location.href = "usuario.html";
        } else {
            cargarUsuarios();
        }
    });

    function cargarUsuarios() {
        $.ajax({ url: "php/cargarUsuarios.php", dataType: "JSON" }).done(function(datos) {
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
            $("#form-listar").show();
            $("#form-editar-usuario").hide();
            $(".bienvenido").text("Gestionar usuarios");
            $("#form-listar table tbody").html(htmlString);
            $("[data-role='modificar-usuario']").click(function() {
                var idUsuario = $(this).data("value");
                $.getJSON({ url: "php/cargarUsuarioPorId.php?id=" + idUsuario }).done(function(usuario) {
                    ocultarFormularios();
                    $("#form-editar-usuario").show();
                    $("#id-usuario-editar").val(idUsuario);
                    $("#nombre-usuario-editar").val(usuario.nombre);
                    $("#apellido1-usuario-editar").val(usuario.apellido1);
                    $("#apellido2-usuario-editar").val(usuario.apellido2);
                    $("#dni-usuario-editar").val(usuario.dni_usuario);
                    $("#fecha-nac-usuario-editar").val(usuario.fecha_nacimiento);
                    $("#genero-usuario-editar").val(usuario.genero);
                    $("#telefono-usuario-editar").val(usuario.telefono);
                    $("#mail-usuario-editar").val(usuario.email);
                    $("#permisos-usuario-editar").val(usuario.permisos);
                    $("#contraseña-usuario-editar").val(usuario.contrase\u00f1a);
                    $("#confirmar-contraseña-usuario-editar").val(usuario.contrase\u00f1a);
                });
            });
        });

    }

    $("#alta-usuario").click(function() {
        ocultarFormularios();
        $("#form-usuario").show();
    });

    $("#form-usuario button").click(function() {
        if (!$("#mensaje-error").hasClass("ocultar")) {
            $("#mensaje-error").addClass("ocultar");
        }
        var nombre = $("#nombre-usuario").val();
        var apellido1 = $("#apellido1-usuario").val();
        var apellido2 = $("#apellido2-usuario").val();
        var dni_usuario = $("#dni-usuario").val();
        var fecha_nacimiento = $("#fecha-nac-usuario").val();
        var genero = $("#genero-usuario").val();
        var telefono = $("#telefono-usuario").val();
        var email_usuario = $("#mail-usuario").val();
        var permisos_usuario = $("#permisos-usuario").val();
        var contraseña_usuario = $("#contraseña-usuario").val();
        var confirmar_contraseña_usuario = $("#confirmar-contraseña-usuario").val();

        if (!nombre || nombre.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el nombre del usuario");
            return false;
        }
        if (!apellido1 || apellido1.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el primer apellido del usuario.");
            return false;
        }
        if (!apellido2 || apellido2.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el segundo apellido del usuario.");
            return false;
        }
        if (!dni_usuario || dni_usuario.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el dni del usuario.");
            return false;
        }
        if (!fecha_nacimiento || fecha_nacimiento.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar la fecha de nacimiento del usuario.");
            return false;
        }
        if (!genero || genero.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el género del usuario.");
            return false;
        }
        if (!telefono || telefono.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el teléfono del usuario.");
            return false;
        }
        if (!email_usuario || email_usuario.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el correo del usuario.");
            return false;
        }
        if (!contraseña_usuario || !confirmar_contraseña_usuario ||
            contraseña_usuario.trim().length === 0 || confirmar_contraseña_usuario.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("La contraseña no puede estar vacía.");
            return false;
        }
        if (contraseña_usuario !== confirmar_contraseña_usuario) {
            $("#mensaje-error").removeClass("ocultar").html("Las contraseñas deben coincidir.");
            return false;
        }
        var url = "";
        var consulta = {
            nombre: nombre,
            apellido1: apellido1,
            apellido2: apellido2,
            fecha_nacimiento: fecha_nacimiento,
            genero: genero,
            telefono: telefono,
            email: email_usuario,
            dni_usuario: dni_usuario,
            permisos: permisos_usuario,
            contraseña: contraseña_usuario
        };
        $.post("php/inserirUsuario.php", consulta)
            .done(function(datos) {
                console.log(consulta)
                switch (datos) {
                    case "ok":
                       cargarUsuarios();
                    case "error":
                        $("#mensaje-error").removeClass("ocultar").html("Error al insertar el usuario.");
                        break;
                }
            })
            .fail(function() {
                $("#mensaje-error").removeClass("ocultar").html("Error al insertar el usuario.");
            });
        return false;
    });

    $("#form-editar-usuario button").click(function() {
        if (!$("#mensaje-error").hasClass("ocultar")) {
            $("#mensaje-error").addClass("ocultar");
        }
        var id_usuario = $("#id-usuario-editar").val();
        var nombre = $("#nombre-usuario-editar").val();
        var apellido1 = $("#apellido1-usuario-editar").val();
        var apellido2 = $("#apellido2-usuario-editar").val();
        var dni_usuario = $("#dni-usuario-editar").val();
        var fecha_nacimiento = $("#fecha-nac-usuario-editar").val();
        var genero = $("#genero-usuario-editar").val();
        var telefono = $("#telefono-usuario-editar").val();
        var email_usuario = $("#mail-usuario-editar").val();
        var permisos_usuario = $("#permisos-usuario-editar").val();
        var contraseña_usuario = $("#contraseña-usuario-editar").val();
        var confirmar_contraseña_usuario = $("#confirmar-contraseña-usuario-editar").val();
        if (!nombre || nombre.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el nombre del usuario");
            return false;
        }
        if (!apellido1 || apellido1.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el primer apellido del usuario.");
            return false;
        }
        if (!apellido2 || apellido2.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el segundo apellido del usuario.");
            return false;
        }
        if (!dni_usuario || dni_usuario.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el dni del usuario.");
            return false;
        }
        if (!fecha_nacimiento || fecha_nacimiento.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar la fecha de nacimiento del usuario.");
            return false;
        }
        if (!genero || genero.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el género del usuario.");
            return false;
        }
        if (!telefono || telefono.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el teléfono del usuario.");
            return false;
        }
        if (!email_usuario || email_usuario.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el correo del usuario.");
            return false;
        }
        if (!contraseña_usuario || !confirmar_contraseña_usuario ||
            contraseña_usuario.trim().length === 0 || confirmar_contraseña_usuario.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("La contraseña no puede estar vacía.");
            return false;
        }
        if (contraseña_usuario !== confirmar_contraseña_usuario) {
            $("#mensaje-error").removeClass("ocultar").html("Las contraseñas deben coincidir.");
            return false;
        }
        var consulta = {
            id_usuario: id_usuario,
            nombre: nombre,
            apellido1: apellido1,
            apellido2: apellido2,
            fecha_nacimiento: fecha_nacimiento,
            genero: genero,
            telefono: telefono,
            email: email_usuario,
            dni_usuario: dni_usuario,
            permisos: permisos_usuario,
            contraseña: contraseña_usuario
        };
        $.post("php/modificarUsuario.php", consulta)
            .done(function(datos) {
                switch (datos) {
                    case "ok":
                       cargarUsuarios();
                       break;
                    case "error":
                        $("#mensaje-error").removeClass("ocultar").html("Error al insertar el usuario.");
                        break;
                }
            })
            .fail(function() {
                $("#mensaje-error").removeClass("ocultar").html("Error al insertar el usuario.");
            });
        return false;
    });

    function ocultarFormularios() {
        $(".form").hide();
    }

    ocultarFormularios();
});