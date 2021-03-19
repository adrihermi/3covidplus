$(function() {
    $("#form-listar").hide();
    $("#listar-aulas").click(function() {
        ocultarFormularios();
        $("#form-listar").show();
        $(".bienvenido").text("Listar alumnos")
    });
    $("#aula-listar").change(function() {
        $.post("php/cargarAlumnosPorAula.php", { aula: this.value })
            .done(function(alumnos) {

            })
            .fail(function() {
                alert("Error en el fichero: cargarAlumnosPorAula.php")
            })
    });

    $("#form-alumno").hide();
    $("#alta-alumno").click(function() {
        ocultarFormularios();
        $("#form-alumno").show();
        $(".bienvenido").text("Dar de alta un alumno");
    });

    $("#form-aula").hide();
    $("#alta-aula").click(function() {
        ocultarFormularios();
        $("#form-aula").show();
        $(".bienvenido").text("Dar de alta un aula")
    });

    $("#form-profesor").hide();
    $("#alta-profesor").click(function() {
        ocultarFormularios();
        $("#form-profesor").show();
        $(".bienvenido").text("Dar de alta un profesor")
    });

    function ocultarFormularios() {
        $(".form").hide();
    }


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
    });
})