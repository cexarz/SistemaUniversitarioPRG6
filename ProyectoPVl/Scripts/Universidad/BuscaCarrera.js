$(function () {
    CreaEventosBuscaCarerra();
});


function CreaEventosBuscaCarerra() {
    $("#btnBusqueda").click(function () {
        var txtBusqueda = $("#txtBusqueda").val();
        //Verifica si el radio button de tipoBusqueda esta marcado en nombre o cedula
        if ($('input:radio[name=tipoBusqueda]:checked').val() == 'N') {
            cargarCarreraNombre(txtBusqueda);
        }
        else if ($('input:radio[name=tipoBusqueda]:checked').val() == 'C') {
            cargarCarreraCodigo(txtBusqueda);
        }
    })
}

function cargarCarreraNombre(pTxtBusqueda) {
    /////construir la dirección del método del servidor
    var url = '/Universidad/RetornaCarreraNombre'
    var parametros = {
        nombre: pTxtBusqueda
    };
    var funcion = creaGridKendoBuscaCarrera;
    ///ejecuta la función $.ajax utilizando un método genérico
    //para no declarar toda la instrucción siempre
    ejecutaAjax(url, parametros, funcion);
}

function cargarCarreraCodigo(pTxtBusqueda) {
    /////construir la dirección del método del servidor
    var url = '/Universidad/RetornanCarreraCodigo'
    var parametros = {
        codigo: pTxtBusqueda
    };
    var funcion = creaGridKendoBuscaCarrera;
    ///ejecuta la función $.ajax utilizando un método genérico
    //para no declarar toda la instrucción siempre
    ejecutaAjax(url, parametros, funcion);
}

function creaGridKendoBuscaCarrera(data) {
    $("#divKendoGrid").kendoGrid({
        //asignar la fuente de datos al objeto kendo grid
        dataSource: {
            data: data.resultado,
            pageSize: 5
        },
        pageable: true,
        columns: [
            {
                //proipiedad de la fuente de datos a mostrar
                field: 'Nombre',
                //texto del encabezado
                title: 'Nombre de la carrera'
            },
            {
                //proipiedad de la fuente de datos a mostrar
                field: 'Codigo',
                //texto del encabezado
                title: 'Código de la carrera'
            },
            {
                //proipiedad de la fuente de datos a mostrar
                field: 'DirecciónCarrera',
                //texto del encabezado
                title: 'Dirección de carrera'
            },
            {
                title: "Acciones",
                template: function (dataItem) {
                    return "<a href='/Universidad/ModificaCarrera?id_CarreraUniversitaria=" + dataItem.id_CarreraUniversitaria +
                        "'>Modificar</a>" + "<br /> <a href='/Universidad/EliminaCarrera?id_CarreraUniversitaria=" +
                        dataItem.id_CarreraUniversitaria + "'>Eliminar</a>"
                }
            }
        ],
        filterable: true,
    });
}