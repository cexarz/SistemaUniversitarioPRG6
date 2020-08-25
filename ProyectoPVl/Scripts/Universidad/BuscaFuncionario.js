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
            cargarFuncionariosNombre(txtBusqueda);
        }
        else if ($('input:radio[name=tipoBusqueda]:checked').val() == 'C') {
            cargarFuncionariosCedula(txtBusqueda);
        }
    });
}


function cargarFuncionariosNombre(pTxtBusqueda) {
    ///dirección a donde se enviarán los datos
    var url = '/Universidad/RetornaFuncionariosNombre';
    ///parámetros del método, es CASE-SENSITIVE
    var parametros = {
        nombre: pTxtBusqueda
    };
    var funcion = AgregarFuncionariosTabla;
    ///invocar el método
    ejecutaAjax(url, parametros, funcion);
}

function cargarFuncionariosCedula(pTxtBusqueda) {
    //dirección a donde se enviarán los datos
    var url = '/Universidad/RetornaFuncionariosCedula';
    //parámetros del método, es CASE-SENSITIVE
    var parametros = {
        cedula: pTxtBusqueda
    };
    var funcion = AgregarFuncionariosTabla;
    //invocar el método
    ejecutaAjax(url, parametros, funcion);
}

function AgregarFuncionariosTabla(data) {

    $(data).each(function () {
        var opcionActual = this;
        var fila = '<tr><td>' + opcionActual.NombreCompleto + '</td><td>' + opcionActual.Cedula +
            '</td><td>' + opcionActual.Provincia + '</td><td>' + opcionActual.Canton +
            '</td><td>' + opcionActual.Distrito + 
            '</td><td><a href="ModificaFuncionario?id_Funcionario=' + opcionActual.id_Funcionario + '">Modificar</a><br />' +
            '<a href="EliminaFuncionario?id_Funcionario=' + opcionActual.id_Funcionario + '">Eliminar</a></td></tr > ';
        $("#tblUsuarios > tbody").append(fila);
    })
}