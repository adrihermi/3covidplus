$(function() {
    var posicion_x;
    var posicion_y;
    //Cargamos las aulas en el select
    function cargarAulas(id_aula_seleccionado) {
        $.getJSON('php/cargarAulas.php', function(datos) {
            $("#clase-alumno").html("");
            $(datos).each(function() {
                $("#clase-alumno").append("<option value = '" + this.id_aula + "'>" + this.nombre + " (" + this.capacidad + ")" + "</option>");
            });
            if (id_aula_seleccionado) {
                $("#clase-alumno").val(id_aula_seleccionado).attr("disabled", true);
            } else {
                $("#clase-alumno").attr("disabled", false);
            }
        });
    }

    $("#alta-alumno").click(function() {
            $(".form").hide();
            $("#form-alumno").show();
            $(".bienvenido").text("Dar de alta un alumno");
            cargarAulas();
            posicion_x = -1;
            posicion_y = -1;
        })
        .on("alta", function() {
            $(".form").hide();
            $("#form-alumno").show();
            $(".bienvenido").text("Dar de alta un alumno");
            cargarAulas($(this).data("id_aula"));
            posicion_x = $(this).data("posicion_x");
            posicion_y = $(this).data("posicion_y");
        });

    $("#form-alumno button").on('click', function() {
        if (!$("#mensaje-error").hasClass("ocultar")) {
            $("#mensaje-error").addClass("ocultar");
        }
        var nombre = $("#nombre-alumno").val();
        var apellido1 = $("#apellido1-alumno").val();
        var apellido2 = $("#apellido2-alumno").val();
        var dni_alumno = $("#dni-alumno").val();
        var fecha_nacimiento = $("#fecha-nac-alumno").val();
        var genero = $("#genero-alumno option:selected").val();
        var telefono = $("#telefono-alumno").val();
        var email_alumno = $("#mail-contacto-alumno").val();
        var email_tutor = $("#mail-tutor-alumno").val();
        var clase_alumno = $("#clase-alumno").val();
        var observaciones = $("#observaciones-alumno").val();

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
        var url = "";
        var consulta = {
            nombre: nombre,
            apellido1: apellido1,
            apellido2: apellido2,
            fecha_nacimiento: fecha_nacimiento,
            genero: genero,
            telefono: telefono,
            email: email_alumno,
            email_tutor_legal: email_tutor,
            observaciones: observaciones,
            clase: clase_alumno,
            dni_alumno: dni_alumno
        };
        if (posicion_x >= 0 && posicion_y >= 0) {
            url = "php/inserirAlumnoYPosicion.php";
            consulta.posicion_x = posicion_x;
            consulta.posicion_y = posicion_y;
        } else {
            url = "php/inserirAlumnos.php";
        }
        $.ajax({ type: "POST", url: url, dataType: "JSON", data: consulta })
            .done(function(datos) {
                if (datos === "error") {
                    $("#mensaje-error").removeClass("ocultar").html("Error al insertar el alumno.");
                } else {
                    $("#mensaje-exito").show().html("Alta de alumno exitosa.").fadeOut(5000);
                    if (posicion_x >= 0 && posicion_y >= 0) {
                        // Se envia el aula del alumno a la lista de aulas y se activa el evento grilla
                        $("#listar-aulas").data("id_aula", clase_alumno).trigger("grilla");
                    } else {
                        // Se envia el aula del alumno a la lista de aulas y se activa el evento listar
                        $("#listar-aulas").data("id_aula", clase_alumno).data("id_alumno", datos.id).trigger("grilla-lista-asignar");
                    }
                }
            })
            .fail(function() {
                $("#mensaje-error").removeClass("ocultar").html("Error al insertar el alumno.");
            });
        return false;
    });
});