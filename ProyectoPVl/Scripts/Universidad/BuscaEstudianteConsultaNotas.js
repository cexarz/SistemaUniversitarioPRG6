$(function () {
    estableceEventosChange();
});

function estableceEventosChange() {
    $("#btnBusqueda").click(function () {
        //Vacia tbody de la tabla estudiantes
        $("#tblUsuarios > tbody").empty();
        //Variable que contiene el texto de busqueda
        var txtBusqueda = $("#txtBusqueda").val();
        //Verifica si el radio button de tipoBusqueda esta marcado en nombre o cedula
        if ($('input:radio[name=tipoBusqueda]:checked').val() == 'N') {
            cargarEstudiantesNombre(txtBusqueda);
        }
        else if ($('input:radio[name=tipoBusqueda]:checked').val() == 'C') {
            cargarEstudiantesCedula(txtBusqueda);
        }
    });
}

function cargarEstudiantesNombre(pTxtBusqueda) {
    ///dirección a donde se enviarán los datos
    var url = '/Universidad/RetornaEstudiantesNombre';
    ///parámetros del método, es CASE-SENSITIVE
    var parametros = {
        nombre: pTxtBusqueda
    };

    var funcion = AgregarEstudiantesTabla;
    ///invocar el método
    ejecutaAjax(url, parametros, funcion);
}

function cargarEstudiantesCedula(pTxtBusqueda) {
    ///dirección a donde se enviarán los datos
    var url = '/Universidad/RetornaEstudiantesCedula';
    ///parámetros del método, es CASE-SENSITIVE
    var parametros = {
        cedula: pTxtBusqueda
    };

    var funcion = AgregarEstudiantesTabla;
    ///invocar el método
    ejecutaAjax(url, parametros, funcion);
}

function AgregarEstudiantesTabla(data) {

    $(data).each(function () {
        var opcionActual = this;
        var fila = '<tr><td>' + opcionActual.NombreCompleto + '</td><td>' + opcionActual.Cedula +
            '</td><td>' + opcionActual.Carne + '</td><td>' + opcionActual.Provincia +
            '</td><td>' + opcionActual.Canton + '</td><td>' + opcionActual.Distrito +
            '</td><td><a href="ReporteNotasEstudiante?id_Estudiante=' + opcionActual.id_Estudiante +
            '">Consultar notas</a></td></tr > ';
        $("#tblUsuarios > tbody").append(fila);
    })
}
