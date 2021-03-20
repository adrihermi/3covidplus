$(function() {
    $("#form-listar").hide();
    $("#listar-aulas").click(function() {
        $.getJSON('php/cargarAulas.php', function(datos) {
            $("#aula-listar").html("<option selected></option>");
            $(datos).each(function() {
                $("#aula-listar").append("<option value = '" + this.id_aula + "'>" + this.nombre + " (" + this.capacidad + ")" + "</option>");
            });
        });
        ocultarFormularios();
        $("#form-listar").show();
        $(".bienvenido").text("Listar alumnos");
        $("#form-listar table tbody").html("");

    });
    $("#aula-listar").change(function() {
        $.ajax({
                type: "POST",
                url: "php/cargarAlumnosPorAula.php",
                data: { aula: this.value },
                dataType: "JSON"
            })
            .done(function(alumnos) {
                var htmlString = "";
                $("#form-listar table").show();

                $(alumnos).each(function() {
                    htmlString += "<tr>" +
                        "<td>" + this.nombre + " " + (this.apellido1 || "") + " " + (this.apellido2 || "") + "</td>" +
                        "<td>" + this.fecha_nacimiento + "</td>" +
                        "<td>" + this.telefono + "</td>" +
                        "<td>" + this.email + "</td>" +
                        "<td>" +
                        "<button class='asignar_posicion btn' data-value='" + this.id_alumno + "'>Asignar posicion</button>" +
                        "<button class='modificar_alumno btn' data-value='" + this.id_alumno + "'>Modificar</button>" +
                        "</td>";
                });

                $("#form-listar table tbody").html(htmlString);

                $(".asignar_posicion").click(function() {
                    $("#posicion-id-alumno").val($(this).data("value"));
                    ocultarFormularios();
                    // $("#form-asignar-posicion").show();
                    $(".bienvenido").text("Asignar posicion");
                    $.getJSON("php/cargarAlumnoPorId.php?id=" + $(this).data("value"), function(alumno_y_aula) {
                        if (alumno_y_aula) {
                            $(".grid-container" + alumno_y_aula.capacidad_aula).show();
                            // Logica para cargar la grilla
                            $.getJSON("php/cargarGrillaDelAula.php?id=" + alumno_y_aula.id_aula, function(grilla) {
                                // Logica para indicar las posiciones ocupadas
                                var cantidad_total_y;
                                if (alumno_y_aula.capacidad_aula == 32) {
                                    cantidad_total_y = 8;
                                } else if (alumno_y_aula.capacidad_aula == 28) {
                                    cantidad_total_y = 7;
                                } else if (alumno_y_aula.capacidad_aula == 24) {
                                    cantidad_total_y = 6;
                                } else if (alumno_y_aula.capacidad_aula == 20) {
                                    cantidad_total_y = 5;
                                } else {
                                    cantidad_total_y = 4;
                                }
                                for (var y = 0; y < cantidad_total_y; y++) {
                                    for (var x = 0; x < 4; x++) {
                                        var posicion_alumno = grilla.filter(f => f.posicion_x == x && f.posicion_y == y)[0];
                                        var etiqueta = "<label>Posicion libre</label>";
                                        var libre = "posicion_libre";
                                        if (posicion_alumno) {
                                            libre = "";
                                            etiqueta = "<label>" + posicion_alumno.nombre + " " + (posicion_alumno.apellido1 || "") + " " + (posicion_alumno.apellido2 || "") + "</label>";
                                        }
                                        $(".grid-container" + alumno_y_aula.capacidad_aula + " .x" + x + "_y" + y).html(
                                            "<div class='usuarios_grilla'></div>" +
                                            etiqueta).addClass(libre);

                                    }
                                }
                            });
                        }
                    });
                });
                $(".modificar_alumno").click(function() {
                    var id_alumno = $(this).data("value");
                    $("#id-alumno-editar").val(id_alumno);
                    ocultarFormularios();
                    $("#form-editar-alumno").show();
                    $(".bienvenido").text("Modificar alumno");

                    $.getJSON('php/cargarAulas.php', function(datos) {
                        $("#clase-alumno-editar").html("");
                        $(datos).each(function() {
                            $("#clase-alumno-editar").append("<option value = '" + this.id_aula + "'>" + this.nombre + " (" + this.capacidad + ")" + "</option>");
                        });
                        $.getJSON("php/cargarAlumnoPorId.php?id=" + id_alumno, function(alumno) {
                            if (alumno) {
                                $("#nombre-alumno-editar").val(alumno.nombre);
                                $("#apellido1-alumno-editar").val(alumno.apellido1);
                                $("#apellido2-alumno-editar").val(alumno.apellido2);
                                $("#dni-alumno-editar").val(alumno.dni_alumno);
                                $("#fecha-nac-alumno-editar").val(alumno.fecha_nacimiento);
                                $("#genero-alumno-editar").val(alumno.genero);
                                $("#clase-alumno-editar").val(alumno.id_aula);
                                $("#telefono-alumno-editar").val(alumno.telefono);
                                $("#mail-contacto-alumno-editar").val(alumno.email);
                                $("#mail-tutor-alumno-editar").val(alumno.email_tutor_legal);
                                $("#observaciones-alumno-editar").val(alumno.observaciones);
                            }
                        });
                    });
                });

            })
            .fail(function() {
                alert("Error en el fichero: cargarAlumnosPorAula.php")
            });
    });

    $("#alta-alumno").click(function() {
        ocultarFormularios();
        $("#form-alumno").show();
        $(".bienvenido").text("Dar de alta un alumno");
    });

    $("#alta-aula").click(function() {
        ocultarFormularios();
        $("#form-aula").show();
        $(".bienvenido").text("Dar de alta un aula")
    });

    $("#gestion-profesores").click(function() {
        ocultarFormularios();
        $("#form-profesor").show();
        $(".bienvenido").text("Gestión de profesores");

        $.getJSON('php/cargarProfesores.php', function(datos) {
            var htmlString = "";

            $(datos).each(function() {
                htmlString += "<tr>" +
                    "<td>" + this.nombre + " " + (this.apellido1 || "") + " " + (this.apellido2 || "") + "</td>" +
                    "<td>" + this.fecha_nacimiento + "</td>" +
                    "<td>" + this.telefono + "</td>" +
                    "<td>" + this.email_profesor + "</td>" +
                    "<td>" +
                    "<button class='modificar_profesor btn' data-value='" + this.id_profesor + "'>Modificar</button>" +
                    "</td>";
            });

            $("#form-profesor table tbody").html(htmlString);

            $(".modificar_profesor").click(function() {
                var id_profesor = $(this).data("value");
                $("#id-profesor-editar").val(id_profesor);
                ocultarFormularios();
                $("#form-editar-profesor").show();
                $(".bienvenido").text("Modificar profesor");

                $.getJSON("php/cargarProfesorPorId.php?id=" + id_profesor, function(profesor) {
                    if (profesor) {
                        $("#id-profesor-editar").val(id_profesor);
                        $("#nombre-profesor-editar").val(profesor.nombre);
                        $("#apellido1-profesor-editar").val(profesor.apellido1);
                        $("#apellido2-profesor-editar").val(profesor.apellido2);
                        $("#dni-profesor-editar").val(profesor.dni_profesor);
                        $("#fecha-nac-profesor-editar").val(profesor.fecha_nacimiento);
                        $("#genero-profesor-editar").val(profesor.genero);
                        $("#telefono-profesor-editar").val(profesor.telefono);
                        $("#mail-profesor-editar").val(profesor.email_profesor);
                        $("#observaciones-profesor-editar").val(profesor.observaciones);
                    }
                });
            });
        });
    });

    $("#alta-profesor").on('click', function() {
        ocultarFormularios();
        $("#form-alta-profesor").show();
    });

    $("#form-alta-profesor button").on('click', function() {
        if (!$("#mensaje-error").hasClass("ocultar")) {
            $("#mensaje-error").addClass("ocultar");
        }
        var nombre = $("#nombre-profesor").val();
        var apellido1 = $("#apellido1-profesor").val();
        var apellido2 = $("#apellido2-profesor").val();
        var dni_profesor = $("#dni-profesor").val();
        var fecha_nacimiento = $("#fecha-nac-profesor").val();
        var genero = $("#genero-profesor").val();
        var telefono = $("#telefono-profesor").val();
        var email_profesor = $("#mail-profesor").val();
        var observaciones = $("#observaciones-profesor").val();

        if (!nombre || nombre.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el nombre del profesor");
            return;
        }
        if (!apellido1 || apellido1.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el primer apellido del profesor.");
            return;
        }
        if (!apellido2 || apellido2.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el segundo apellido del profesor.");
            return;
        }
        if (!dni_profesor || dni_profesor.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el dni del profesor.");
            return;
        }
        if (!fecha_nacimiento || fecha_nacimiento.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar la fecha de nacimiento del profesor.");
            return;
        }
        if (!genero || genero.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el género del profesor.");
            return;
        }
        if (!telefono || telefono.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el teléfono del profesor.");
            return;
        }
        if (!email_profesor || email_profesor.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el correo del profesor.");
            return;
        }
        $.post("php/inserirProfesor.php", { nombre: nombre, apellido1: apellido1, apellido2: apellido2, fecha_nacimiento: fecha_nacimiento, genero: genero, telefono: telefono, email: email_profesor, observaciones: observaciones, dni_profesor: dni_profesor })
            .done(function(datos) {
                switch (datos) {
                    case "ok":
                        location.href = "./usuario.html";
                        break;
                    case "error":
                        $("#mensaje-error").removeClass("ocultar").html("Error al insertar el profesor.");
                        break;
                }
            })
            .fail(function() {
                $("#mensaje-error").removeClass("ocultar").html("Error al insertar el profesor.");
            });
        return false;
    });

    $("#form-editar-profesor button").on('click', function() {
        if (!$("#mensaje-error").hasClass("ocultar")) {
            $("#mensaje-error").addClass("ocultar");
        }
        var id_profesor = $("#id-profesor-editar").val();
        var nombre = $("#nombre-profesor-editar").val();
        var apellido1 = $("#apellido1-profesor-editar").val();
        var apellido2 = $("#apellido2-profesor-editar").val();
        var dni_profesor = $("#dni-profesor-editar").val();
        var fecha_nacimiento = $("#fecha-nac-profesor-editar").val();
        var genero = $("#genero-profesor-editar").val();
        var telefono = $("#telefono-profesor-editar").val();
        var email_profesor = $("#mail-profesor-editar").val();
        var observaciones = $("#observaciones-profesor-editar").val();

        if (!nombre || nombre.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el nombre del profesor");
            return;
        }
        if (!apellido1 || apellido1.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el primer apellido del profesor.");
            return;
        }
        if (!apellido2 || apellido2.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el segundo apellido del profesor.");
            return;
        }
        if (!dni_profesor || dni_profesor.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el dni del profesor.");
            return;
        }
        if (!fecha_nacimiento || fecha_nacimiento.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar la fecha de nacimiento del profesor.");
            return;
        }
        if (!genero || genero.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el género del profesor.");
            return;
        }
        if (!telefono || telefono.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el teléfono del profesor.");
            return;
        }
        if (!email_profesor || email_profesor.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el correo del profesor.");
            return;
        }
        $.post("php/modificarProfesor.php", { nombre: nombre, apellido1: apellido1, apellido2: apellido2, fecha_nacimiento: fecha_nacimiento, genero: genero, telefono: telefono, email: email_profesor, observaciones: observaciones, dni_profesor: dni_profesor, id_profesor: id_profesor })
            .done(function(datos) {
                switch (datos) {
                    case "ok":
                        location.href = "./usuario.html";
                        break;
                    case "error":
                        $("#mensaje-error").removeClass("ocultar").html("Error al insertar el profesor.");
                        break;
                }
            })
            .fail(function() {
                $("#mensaje-error").removeClass("ocultar").html("Error al insertar el profesor.");
            });
        return false;
    });

    function ocultarFormularios() {
        $(".form").hide();
    }

    ocultarFormularios();

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function(form) {
            form.addEventListener('submit', function(event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                form.classList.add('was-validated');
            }, false)
        });

    $("#form-aula button").on('click', function() {
        if (!$("#mensaje-error").hasClass("ocultar")) {
            $("#mensaje-error").addClass("ocultar");
        }
        var nombre_aula = $("#nombre-aula").val();
        var capacidad = $("#capacidad").val();

        if (!nombre_aula || nombre_aula.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el nombre del aula");
            return;
        }
        if (!capacidad || isNaN(capacidad)) {
            $("#mensaje-error").removeClass("ocultar").html("Debe seleccionar la capacidad del aula");
            return;
        }
        $.post("php/inserirAulas.php", { nombre: nombre_aula, capacidad: capacidad })
            .done(function(datos) {
                switch (datos) {
                    case "ok":
                        location.href = "./usuario.html";
                        break;
                    case "error":
                        $("#mensaje-error").removeClass("ocultar").html("Ocurrió un error al insertar el aula.");
                        break;
                }
            })
            .fail(function() {
                $("#mensaje-error").removeClass("ocultar").html("Ocurrió un error al insertar el aula.");
            });
        return false;
    });
})