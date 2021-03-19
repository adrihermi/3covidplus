$(function() {
    $("#form-listar").hide();
    $("#listar-aulas").click(function() {
        ocultarFormularios();
        $("#form-listar").show();
        $(".bienvenido").text("Listar alumnos")
    });
    $("#aula-listar").change(function() {


    });
    $("#form-alumno").hide();
    $("#alta-alumno").click(function() {
        ocultarFormularios();
        $("#form-alumno").show();
        $(".bienvenido").text("Dar de alta un alumno")
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
        $("form").hide();
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
})