$(function () {
    //Funcion encargada de crear los eventos
    estableceEventosChange();
    //Funcion que carga las provincias
    cargaDropdownListProvincias();
});

//Funcion que controla los eventos cuando se ejecuta el método change
function estableceEventosChange() {
    //Evento change de la lista provincias
    $("#id_Provincia").change(function () {
        //obtenemos el id
        var provincia = $("#id_Provincia").val();
        //Llamamos la funcion para cargar los cantones
        cargaDropdownListCantones(provincia);
    });

    //Evento change de la lista cantones
    $("#id_Canton").change(function () {
        //obtenemos el id
        var canton = $("#id_Canton").val();
        //Llamamos la funcion para cargar los distritos
        cargaDropdownListDistritos(canton);
    });
}

function cargaDropdownListProvincias() {
    //Dirección a donde se enviarán los datos
    var url = '/Universidad/RetornaProvincias';
    //Parámetros del método
    var parametros = {
    };
    //Variable que determina el tipo de zona geografica
    var funcion = procesarResultadoProvincias;
    ejecutaAjaxSincronico(url, parametros, funcion);
}

function cargaDropdownListCantones(pIdProvincia) {
    //Dirección a donde se enviarán los datos
    var url = '/Universidad/RetornaCantones';
    //Parámetros del método
    var parametros = {
        id_Provincia: pIdProvincia
    };
    //Variable que determina el tipo de zona geografica
    var funcion = procesarResultadoCantones;
    ejecutaAjaxSincronico(url, parametros, funcion);
}

function cargaDropdownListDistritos(pIdCanton) {
    //Dirección a donde se enviarán los datos
    var url = '/Universidad/RetornaDistritos';
    //arámetros del método
    var parametros = {
        id_Canton: pIdCanton
    };
    //Variable que determina el tipo de zona geografica
    var funcion = procesarResultadoDistritos;
    ejecutaAjaxSincronico(url, parametros, funcion);
}


function procesarResultadoProvincias(data){
    var ddlProvincia = $("#id_Provincia");
    var nuevaOpcion = "<option value=''>Seleccione una opcion</option>";
    ddlProvincia.empty();
    ddlProvincia.append(nuevaOpcion);

    $(data).each(function () {

        var objetoActual = this;

        nuevaOpcion = "<option value='" + objetoActual.id_Provincia + "'>" + objetoActual.nombre + "</option>";

        ddlProvincia.append(nuevaOpcion);
    })
}

function procesarResultadoCantones(data) {
    var ddlCanton = $("#id_Canton");
    var nuevaOpcion = "<option value=''>Seleccione una opcion</option>";
    ddlCanton.empty();
    $("#id_Distrito").empty();

    ddlCanton.append(nuevaOpcion);

    $(data).each(function () {

        var objetoActual = this;

        nuevaOpcion = "<option value='" + objetoActual.id_Canton + "'>" + objetoActual.nombre + "</option>";

        ddlCanton.append(nuevaOpcion);
    })

}

function procesarResultadoDistritos(data) {
    var ddlDistrito = $("#id_Distrito");
    var nuevaOpcion = "<option value=''>Seleccione una opcion</option>";
    ddlDistrito.empty();
    ddlDistrito.append(nuevaOpcion);

    $(data).each(function () {

        var objetoActual = this;

        nuevaOpcion = "<option value='" + objetoActual.id_Distrito + "'>" + objetoActual.nombre + "</option>";

        ddlDistrito.append(nuevaOpcion);
    })
}