$(function() {
    var eventoAula;
    $("#panel-administrador").parent().hide();
    $.ajax({ url: "php/validarAdministrador.php" }).done(function(datos) {
        if (datos == "ok") {
            $("#panel-administrador").parent().show();
        }
    });
    $("#panel-administrador").click(function() {
        $.ajax({ url: "php/validarAdministrador.php" }).done(function(datos) {
            if (datos == "ok") {
                window.location.href = "admin.html";
            }
        });
    });
    $("#form-listar").hide();
    $("#listar-aulas").click(function() {
            eventoAula = "listarAulas";
            $.getJSON('php/cargarAulas.php', function(datos) {
                $("#aula-listar").html("<option selected></option>");
                $(datos).each(function() {
                    $("#aula-listar").append("<option value = '" + this.id_aula + "'>" + this.nombre + " (" + this.capacidad + ")" + "</option>");
                });
            });
            ocultarFormularios();
            $("#form-listar").show();
            $(".bienvenido").text("Gestionar alumnos");
            $("#form-listar table tbody").html("");

        })
        // Evento listar cuando se da de alta a un alumno
        .on("listar", function() {
            eventoAula = "listarAulas";
            // Se obtiene el id del aula seleccionado
            var aula_seleccionada = $(this).data("id_aula");
            $.getJSON('php/cargarAulas.php', function(datos) {
                $("#aula-listar").html("<option selected></option>");
                $(datos).each(function() {
                    $("#aula-listar").append("<option value = '" + this.id_aula + "'>" + this.nombre + " (" + this.capacidad + ")" + "</option>");
                });
                // Ya cargados los datos se selecciona el valor del select en #aula-listar y se activa el evento change
                $("#aula-listar").val(aula_seleccionada).trigger("change");
            });
            ocultarFormularios();
            $("#form-listar").show();
            $(".bienvenido").text("Gestionar alumnos");
            $("#form-listar table tbody").html("");
        })
        // Evento de mostrar la grilla
        .on("grilla", function() {
            eventoAula = "grilla-aula";
            // Se obtiene el id del aula seleccionado
            var aula_seleccionada = $(this).data("id_aula");
            $.getJSON('php/cargarAulas.php', function(datos) {
                $("#aula-listar").html("<option selected></option>");
                $(datos).each(function() {
                    $("#aula-listar").append("<option value = '" + this.id_aula + "'>" + this.nombre + " (" + this.capacidad + ")" + "</option>");
                });
                // Ya cargados los datos se selecciona el valor del select en #aula-listar y se activa el evento change
                $("#aula-listar").val(aula_seleccionada).trigger("change");
            });
            ocultarFormularios();
            $("#form-listar").show();
            $(".bienvenido").text("Gestionar alumnos");
            $("#form-listar table tbody").html("");
            $("#posicion-id-alumno").val("");
        })
        // Evento de mostrar la grilla desde la lista
        .on("grilla-lista", function() {
            eventoAula = "grilla-lista-aula";
            // Se obtiene el id del aula seleccionado
            var aula_seleccionada = $(this).data("id_aula");
            $.getJSON('php/cargarAulas.php', function(datos) {
                $("#aula-listar").html("<option selected></option>");
                $(datos).each(function() {
                    $("#aula-listar").append("<option value = '" + this.id_aula + "'>" + this.nombre + " (" + this.capacidad + ")" + "</option>");
                });
                // Ya cargados los datos se selecciona el valor del select en #aula-listar y se activa el evento change
                $("#aula-listar").val(aula_seleccionada).trigger("change");
            });
            ocultarFormularios();
            $("#form-listar").show();
            $(".bienvenido").text("Gestionar alumnos");
            $("#form-listar table tbody").html("");
        })
        // Evento de mostrar la grilla desde la lista para asignar la posicion del alumno
        .on("grilla-lista-asignar", function() {
            eventoAula = "grilla-lista-aula";
            // Se obtiene el id del aula seleccionado
            var aula_seleccionada = $(this).data("id_aula");
            $("#posicion-id-alumno").val($(this).data("id_alumno"));
            $.getJSON('php/cargarAulas.php', function(datos) {
                $("#aula-listar").html("<option selected></option>");
                $(datos).each(function() {
                    $("#aula-listar").append("<option value = '" + this.id_aula + "'>" + this.nombre + " (" + this.capacidad + ")" + "</option>");
                });
                // Ya cargados los datos se selecciona el valor del select en #aula-listar y se activa el evento change
                $("#aula-listar").val(aula_seleccionada).trigger("change");
            });
            ocultarFormularios();
            $("#form-listar").show();
            $(".bienvenido").text("Gestionar alumnos");
            $("#form-listar table tbody").html("");
        });

    $("#aula-listar").change(function() {
        if (eventoAula == "listarAulas") {
            listarAulas(this.value);
        } else if (eventoAula == "grilla-aula") {
            grillaAula(this.value);
        } else if (eventoAula == "grilla-lista-aula") {
            eventoAula = "listarAulas";
            grillaAula(this.value);
        }

    });

    var listarAulas = function(idAula) {
        $.ajax({
                type: "POST",
                url: "php/cargarAlumnosPorAula.php",
                data: { aula: idAula },
                dataType: "JSON"
            })
            .done(function(alumnos) {
                var htmlString = "";
                $("#form-listar table").show();

                $(alumnos).each(function() {
                    htmlString += "<tr>" +
                        "<td><img class='estado' src='estilos/img/" + (this.id_estado === "1" ? "usuario.png" : this.id_estado === "2" ? "usuarioespera.png" : this.id_estado === "3" ? "usercovid.png" : "usuarioespera.png") + "' alt='' title='" + (this.id_estado === "1" ? "Normal" : this.id_estado === "2" ? "En espera" : this.id_estado === "3" ? "Positivo" : "En contacto con un positivo") + "' /></td>" +
                        "<td>" + this.nombre + " " + (this.apellido1 || "") + " " + (this.apellido2 || "") + "</td>" +
                        "<td>" + this.fecha_nacimiento + "</td>" +
                        "<td>" + this.telefono + "</td>" +
                        "<td>" + this.email + "</td>" +
                        "<td>" + (this.id_estado === "1" ? "Normal" : this.id_estado === "2" ? "En espera" : this.id_estado === "3" ? "Positivo" : "En contacto con un positivo") + "</td>" +
                        "<td>" +
                        "<a href='#' class='asignar_posicion' data-value='" + this.id_alumno + "'><img src='estilos/img/posicion.png' title='Asignar posicion del alumno' class='gestionAlumno' alt='Asignar posicion del alumno'/></a>" +
                        "<a href='#' class='modificar_alumno' data-value='" + this.id_alumno + "'><img src='estilos/img/edit.png' title='Editar alumno' class='gestionAlumno' alt='Editar alumno'/></a>" +
                        "<a href='#' class='cambiar_estado' data-value='" + this.id_alumno + "'><img src='estilos/img/userCovid.png' title='Cambiar estado del alumno' class='gestionAlumno' alt='Cambiar estado del alumno'/></a>" +
                        "</td>";
                });

                $("#form-listar table tbody").html(htmlString);
                $("#form-listar button[data-role='volver']").data("id_aula", idAula);

                $(".asignar_posicion").click(function() {
                    $("#posicion-id-alumno").val($(this).data("value"));
                    $("#posicion-id-aula").val(idAula);
                    ocultarFormularios();
                    // $("#form-asignar-posicion").show();
                    $(".bienvenido").text("Asignar posicion");


                    $.getJSON("php/cargarAlumnoPorId.php?id=" + $(this).data("value"), function(alumno_y_aula) {
                        if (alumno_y_aula) {
                            $(".grid-container" + alumno_y_aula.capacidad_aula).show();
                            $(".leyenda-grilla").show();
                            $(".grid-container" + alumno_y_aula.capacidad_aula + " button[data-role='volver-aula']").data("id_aula", alumno_y_aula.id_aula);
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
                                        var titulo = "";
                                        if (posicion_alumno) {
                                            libre = posicion_alumno.id_alumno == $("#posicion-id-alumno").val() ? "seleccionado" :
                                                posicion_alumno.id_estado === "1" ? "normal" :
                                                posicion_alumno.id_estado === "2" ? "enespera" :
                                                posicion_alumno.id_estado === "3" ? "positivo" :
                                                "encontacto";
                                            titulo = posicion_alumno.id_estado === "1" ? "" :
                                                posicion_alumno.id_estado === "2" ? "En espera de PCR" :
                                                posicion_alumno.id_estado === "3" ? "Positivo" :
                                                "En contacto con un positivo";
                                            etiqueta = "<label>" + posicion_alumno.nombre + " " + (posicion_alumno.apellido1 || "") + " " + (posicion_alumno.apellido2 || "") + "</label>";
                                        }
                                        $(".grid-container" + alumno_y_aula.capacidad_aula + " .x" + x + "_y" + y).html(
                                            "<div class='usuarios_grilla'></div>" +
                                            etiqueta).removeClass(["posicion_libre", "normal", "enespera", "positivo", "encontacto", "seleccionado"]).addClass(libre).attr("title", titulo);

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
                $(".cambiar_estado").click(function() {
                    var id_alumno = $(this).data("value");
                    $("#id-alumno-cambiar-estado").val(id_alumno);
                    $("#enviarCorreo").hide();
                    ocultarFormularios();
                    $("#form-cambiar-estado-alumno").data("id_aula", idAula).show();
                    $(".bienvenido").text("Modificar alumno");
                    $('#fecha-cambio-estado').val(new Date().toDateInputValue());
                    $.getJSON('php/cargarEstados.php', function(datos) {
                        var htmlString = "";
                        $(datos).each(function() {
                            htmlString += "<option value='" + this.id_estado + "'>" + this.descripcion + "</option>";
                        });
                        $("#estado-alumno").html(htmlString);
                    });
                });

            })
            .fail(function() {
                alert("Error en el fichero: cargarAlumnosPorAula.php")
            });
    };

    var grillaAula = function(idAula) {
        $(".grid-container16, .grid-container20, .grid-container24,  .grid-container28,  .grid-container32").hide();
        $.getJSON("php/cargarAulaPorId.php?id=" + idAula, function(aula) {
            if (aula) {
                $(".grid-container" + aula.capacidad).show();
                $(".leyenda-grilla").show();
                // Logica para cargar la grilla
                $.getJSON("php/cargarGrillaDelAula.php?id=" + aula.id_aula, function(grilla) {
                    // Logica para indicar las posiciones ocupadas
                    var cantidad_total_y;
                    if (aula.capacidad == 32) {
                        cantidad_total_y = 8;
                    } else if (aula.capacidad == 28) {
                        cantidad_total_y = 7;
                    } else if (aula.capacidad == 24) {
                        cantidad_total_y = 6;
                    } else if (aula.capacidad == 20) {
                        cantidad_total_y = 5;
                    } else {
                        cantidad_total_y = 4;
                    }
                    for (var y = 0; y < cantidad_total_y; y++) {
                        for (var x = 0; x < 4; x++) {
                            var posicion_alumno = grilla.filter(f => f.posicion_x == x && f.posicion_y == y)[0];
                            var etiqueta = "<label>Posicion libre</label>";
                            var libre = "posicion_libre";
                            var titulo = "";
                            if (posicion_alumno) {
                                libre = posicion_alumno.id_alumno == $("#posicion-id-alumno").val() ? "seleccionado" :
                                    posicion_alumno.id_estado === "1" ? "normal" :
                                    posicion_alumno.id_estado === "2" ? "enespera" :
                                    posicion_alumno.id_estado === "3" ? "positivo" :
                                    "encontacto";
                                titulo = posicion_alumno.id_estado === "1" ? "" :
                                    posicion_alumno.id_estado === "2" ? "En espera de PCR" :
                                    posicion_alumno.id_estado === "3" ? "Positivo" :
                                    "En contacto con un positivo";
                                etiqueta = "<label>" + posicion_alumno.nombre + " " + (posicion_alumno.apellido1 || "") + " " + (posicion_alumno.apellido2 || "") + "</label>";
                            }
                            $(".grid-container" + aula.capacidad + " .x" + x + "_y" + y).html(
                                "<div class='usuarios_grilla'></div>" +
                                etiqueta).removeClass("posicion_libre normal enespera positivo encontacto seleccionado").addClass(libre).attr("title", titulo);
                        }
                    }
                    $("#posicion-id-aula").val(idAula);
                });
            }
        });
    }

    $("button[data-role='volver-aula']").click(function() {
        // Se envia el aula del alumno a la lista de aulas y se activa el evento listar
        $("#listar-aulas").data("id_aula", $(this).data("id_aula")).trigger("listar");
    });

    $("#alta-alumno").click(function() {
        ocultarFormularios();
        $("#form-alumno").show();
        $(".bienvenido").text("Dar de alta un alumno");
    });

    $("#alta-usuario").click(function() {
        ocultarFormularios();
        $("#form-usuario").show();
        $(".bienvenido").text("Dar de alta un usuario");
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
                $.getJSON('php/cargarAulas.php', function(datos) {
                    $("#clase-profesor-editar").html("");
                    $(datos).each(function() {
                        $("#clase-profesor-editar").append("<option value = '" + this.id_aula + "'>" + this.nombre + " (" + this.capacidad + ")" + "</option>");
                    });
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
                            $("#clase-profesor-editar").val(profesor.id_aula);
                        }
                    });
                });
            });
        });
    });

    $("#alta-profesor").on('click', function() {
        ocultarFormularios();
        cargarAulasProfesor();
        $("#form-alta-profesor").show();
    });

    function cargarAulasProfesor() {
        $.getJSON('php/cargarAulas.php', function(datos) {
            $("#clase-profesor").html("");
            $(datos).each(function() {
                $("#clase-profesor").append("<option value = '" + this.id_aula + "'>" + this.nombre + " (" + this.capacidad + ")" + "</option>");
            });
        });
    }

    $("#alta-profesor").click(function() {
        cargarAulasProfesor();
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
        var clase_profesor = $("#clase-profesor").val();
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
        if (!clase_profesor || clase_profesor.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el aula al cual pertenece el profesor como tutor.");
            return;
        }
        $.post("php/inserirProfesor.php", { nombre: nombre, apellido1: apellido1, apellido2: apellido2, fecha_nacimiento: fecha_nacimiento, genero: genero, telefono: telefono, email: email_profesor, observaciones: observaciones, dni_profesor: dni_profesor, id_aula: clase_profesor })
            .done(function(datos) {
                switch (datos) {
                    case "ok":
                        $("#gestion-profesores").click();
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
        var clase_profesor = $("#clase-profesor-editar").val();

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
        if (!clase_profesor || clase_profesor.trim().length === 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar el aula al cual pertenece el profesor como tutor.");
            return;
        }
        $.post("php/modificarProfesor.php", { nombre: nombre, apellido1: apellido1, apellido2: apellido2, fecha_nacimiento: fecha_nacimiento, genero: genero, telefono: telefono, email: email_profesor, observaciones: observaciones, dni_profesor: dni_profesor, id_profesor: id_profesor, id_aula: clase_profesor })
            .done(function(datos) {
                switch (datos) {
                    case "ok":
                        $("#gestion-profesores").click();
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

    $("#confirmar").on('click', function() {
        var id_alumno = $("#id-alumno-cambiar-estado").val();
        var id_estado = $("#estado-alumno").val();
        var fecha = $("#fecha-cambio-estado").val();
        if (!id_alumno) {
            $("#mensaje-error").removeClass("ocultar").html("Debe seleccionar al usuario.");
            return false;
        }
        if (!fecha || fecha.trim().length == 0) {
            $("#mensaje-error").removeClass("ocultar").html("Debe ingresar la fecha del cambio de estado.");
            return false;
        }

        $.post("php/cambiarEstadoAlumno.php", { fecha: fecha, id_alumno: id_alumno, id_estado: id_estado })
            .done(function(datos) {
                switch (datos) {
                    case "ok":
                        if (id_estado == "3") {
                            $("#enviarCorreo").show();
                        }
                        break;
                    case "error":
                        $("#mensaje-error").removeClass("ocultar").html("Error al cambiar el estado del alumno.");
                        break;
                }
            })
            .fail(function() {
                $("#mensaje-error").removeClass("ocultar").html("Error al cambiar el estado del alumno.");
            });
        return false;
    });

    $("#enviarCorreo").on('click', function() {
        var id_aula = $(this).parent().parent().parent().data("id_aula");
        var id_alumno = $("#id-alumno-cambiar-estado").val();
        var id_estado = $("#estado-alumno").val();
        if (!id_alumno) {
            $("#mensaje-error").removeClass("ocultar").html("Debe seleccionar al usuario.");
            return false;
        }

        $.post("php/enviarCorreo.php", { id_alumno: id_alumno, id_estado: id_estado })
            .done(function(datos) {
                switch (datos) {
                    case "ok":
                        $("#mensaje-exito").show().html("Correo enviado con éxito").fadeOut(5000);
                        $("#listar-aulas").data("id_aula", id_aula).trigger("grilla-lista");
                        break;
                    case "error":
                        $("#mensaje-error").removeClass("ocultar").html("Error al cambiar el estado del alumno.");
                        break;
                }
            })
            .fail(function() {
                $("#mensaje-error").removeClass("ocultar").html("Error al cambiar el estado del alumno.");
            });
        return false;
    });

    $("#volverEstado").click(function() {
        var id_aula = $(this).parent().parent().parent().data("id_aula");
        $("#listar-aulas").data("id_aula", id_aula).trigger("listar");
        return false;
    });

    $(".grid-container16 > div,.grid-container20 > div,.grid-container24 > div,.grid-container28 > div,.grid-container32 > div").click(function() {
        var id_alumno = $("#posicion-id-alumno").val();
        var id_aula = $("#posicion-id-aula").val();
        if (id_alumno && id_alumno > 0) {
            var posicion = this.classList[0].split("_");
            $.post("php/inserirPosicionAlumno.php", { id_alumno: id_alumno, posicion_x: posicion[0].replace("x", ""), posicion_y: posicion[1].replace("y", "") })
                .done(function(datos) {
                    switch (datos) {
                        case "ok":
                            $("#listar-aulas").data("id_aula", id_aula).trigger("grilla-lista");
                            break;
                        case "error":
                            $("#mensaje-error").removeClass("ocultar").html("Ocurrió un error al insertar el aula.");
                            break;
                    }
                })
                .fail(function() {
                    $("#mensaje-error").removeClass("ocultar").html("Ocurrió un error al insertar el aula.");
                });
        }
        if (eventoAula == "grilla-aula" && $(this).hasClass("posicion_libre")) {
            $("#clase-alumno").val(id_aula);
            var posicion = this.classList[0].split("_");
            $("#alta-alumno").data("id_aula", id_aula).data("posicion_x", posicion[0].replace("x", "")).data("posicion_y", posicion[1].replace("y", "")).trigger("alta");
        }
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

    Date.prototype.toDateInputValue = (function() {
        var local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
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
                if (datos === "erro") {
                    $("#mensaje-error").removeClass("ocultar").html("Ocurrió un error al insertar el aula.");
                } else {
                    // Se obtiene el id del aula insertada en la base de datos
                    var aula = JSON.parse(datos);
                    // Se muestra el mensaje de exito
                    $("#mensaje-exito").show().fadeOut(5000).html("Aula ingresada con éxito.");
                    //Se agrega el id del aula al select de listar aulas y se activa el evento grilla
                    $("#listar-aulas").data("id_aula", aula.id).trigger("grilla");
                }
            })
            .fail(function() {
                $("#mensaje-error").removeClass("ocultar").html("Ocurrió un error al insertar el aula.");
            });
        return false;
    });

    //Eliminamos $_SESSION["usuario"] y $_SESSION["contraseña"]
    $("#cerrarSesion").on("click", function() {
        $.ajax({
                url: 'php/logout.php',
            })
            .done(function() {
                location.href = "./index.html";
            })
            .fail(function() {
                alert("Error en el fichero: logout.php");
            })
    });

    $("#grilla-aula").click(function() {
        eventoAula = "grilla-aula";
        $.getJSON('php/cargarAulas.php', function(datos) {
            $("#aula-listar").html("<option selected></option>");
            $(datos).each(function() {
                $("#aula-listar").append("<option value = '" + this.id_aula + "'>" + this.nombre + " (" + this.capacidad + ")" + "</option>");
            });
        });
        ocultarFormularios();
        $("#form-listar").show();
        $(".bienvenido").text("Mostrar Aula");
        $("#form-listar table tbody").html("");
        $("#posicion-id-alumno").val("");
    });
})