$(function() {
    //Cargamos las aulas en el select
    function cargarAulas() {
        $.getJSON('php/cargarAulas.php', function(datos) {
            $("#clase-alumno-editar").html("");
            $(datos).each(function() {
                $("#clase-alumno-editar").append("<option value = '" + this.id_aula + "'>" + this.nombre + " (" + this.capacidad + ")" + "</option>");
            });
        });
    }

    $("#alta-alumno-editar").click(function() {
        cargarAulas();
    });

    $("#form-editar-alumno button").on('click', function() {
        if (!$("#mensaje-error").hasClass("ocultar")) {
            $("#mensaje-error").addClass("ocultar");
        }
        var id_alumno = $("#id-alumno-editar").val();
        var nombre = $("#nombre-alumno-editar").val();
        var apellido1 = $("#apellido1-alumno-editar").val();
        var apellido2 = $("#apellido2-alumno-editar").val();
        var dni_alumno = $("#dni-alumno-editar").val();
        var fecha_nacimiento = $("#fecha-nac-alumno-editar").val();
        var genero = $("#genero-alumno-editar").val();
        var telefono = $("#telefono-alumno-editar").val();
        var email_alumno = $("#mail-contacto-alumno-editar").val();
        var email_tutor = $("#mail-tutor-alumno-editar").val();
        var clase_alumno = $("#clase-alumno-editar").val();
        var observaciones = $("#observaciones-alumno-editar").val();

        if (!nombre || nombre.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el nombre del alumno");
            return;
        }
        if (!apellido1 || apellido1.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el primer apellido del alumno.");
            return;
        }
        if (!apellido2 || apellido2.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el segundo apellido del alumno.");
            return;
        }
        if (!dni_alumno || dni_alumno.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el dni del alumno.");
            return;
        }
        if (!fecha_nacimiento || fecha_nacimiento.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar la fecha de nacimiento del alumno.");
            return;
        }
        if (!genero || genero.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el género del alumno.");
            return;
        }
        if (!telefono || telefono.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el teléfono del alumno.");
            return;
        }
        if (!email_alumno || email_alumno.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el correo del alumno.");
            return;
        }
        if (!email_tutor || email_tutor.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el correo del tutor del alumno.");
            return;
        }
        if (!clase_alumno || clase_alumno.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el aula al cual pertenece el alumno.");
            return;
        }
        $.post("php/modificarAlumnos.php", { nombre: nombre, apellido1: apellido1, apellido2: apellido2, fecha_nacimiento: fecha_nacimiento, genero: genero, telefono: telefono, email: email_alumno, email_tutor_legal: email_tutor, observaciones: observaciones, id_aula: clase_alumno, dni_alumno: dni_alumno, id_alumno: id_alumno })
            .done(function(datos) {
                switch (datos) {
                    case "ok":
                        $("#listar-aulas").data("id_aula", clase_alumno).trigger("listar");
                        break;
                    case "error":
                        $("#mensaje-error").removeClass("ocultar").html("Error al insertar el alumno.");
                        break;
                }
            })
            .fail(function() {
                $("#mensaje-error").removeClass("ocultar").html("Error al insertar el alumno.");
            });
        return false;
    });
});