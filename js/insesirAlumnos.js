$(function () {
    //Cargamos las aulas en el select
    $.getJSON('servidor/cargarAulas.php', function (datos) {
        $.each(datos, function () {
            $("#clase-alumno").append("<option value = '" + this.id_aula + "'>" + this.nombre  + "</option>");
        });
    });

    $("#form-alumno button").on('click', function () {
        if (!$("#mensaje-error").hasClass("ocultar")) {
            $("#mensaje-error").addClass("ocultar");
        }
        var nombre = $("#nombre-alumno").val();
        var apellido1 =  $("#apellido1-alumno").val();
        var apellido2 =  $("#apellido2-alumno").val();
        var dni_alumno =  $("#dn1-alumno").val();
        var fecha_nacimiento =  $("#fecha-nac-alumno").val();
        var genero =  $("#genero-alumno option:selected").val();
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
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el correo del tutor del alumno.");
            return;
        }
        $.post("php/inserirAlumnos.php", { nombre: nombre, apellido1: apellido1, apellido2:apellido2, fecha_nacimiento:fecha_nacimiento,gener:genero, telefono:telefono, email:email_alumno, email_tutor_legal:email_tutor, observaciones:observaciones, clase:clase_alumno, dni_alumno:dni_alumno })
            .done(function (datos) {
                switch (datos) {
                    case "ok":
                        console.log(usuario)
                        $(location).attr('href','./usuario.html')
                        break;
                    case "error":
                        $("#mensaje-error").removeClass("ocultar").html("El usuario o contraseña no existen.");
                        break;
                }
            })
            .fail(function(){
                alert("Error en el fichero: login.php")
            })
    })
});