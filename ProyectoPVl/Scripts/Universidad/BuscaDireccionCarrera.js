$(function () {
    CreaEventosBuscaDireccionCarrera();
});


function CreaEventosBuscaDireccionCarrera() {
    $("#btnBusqueda").click(function () {
        var txtBusqueda = $("#txtBusqueda").val();
        //Verifica si el radio button de tipoBusqueda esta marcado en nombre o cedula
        if ($('input:radio[name=tipoBusqueda]:checked').val() == 'N') {
            cargarDireccionCarreraNombre(txtBusqueda);
        }
        else if ($('input:radio[name=tipoBusqueda]:checked').val() == 'C') {
            cargarDireccionCarreraCodigo(txtBusqueda);
        }
    })
}

function cargarDireccionCarreraNombre(pTxtBusqueda) {
    /////construir la dirección del método del servidor
    var url = '/Universidad/RetornaDireccionCarreraNombre'
    var parametros = {
        nombre: pTxtBusqueda
    };
    var funcion = creaGridKendoBuscaDireccionCarrera;
    ///ejecuta la función $.ajax utilizando un método genérico
    //para no declarar toda la instrucción siempre
    ejecutaAjax(url, parametros, funcion);
}

function cargarDireccionCarreraCodigo(pTxtBusqueda) {
    /////construir la dirección del método del servidor
    var url = '/Universidad/RetornaDireccionCarreraCodigo'
    var parametros = {
        codigo: pTxtBusqueda
    };
    var funcion = creaGridKendoBuscaDireccionCarrera;
    ///ejecuta la función $.ajax utilizando un método genérico
    //para no declarar toda la instrucción siempre
    ejecutaAjax(url, parametros, funcion);
}

function creaGridKendoBuscaDireccionCarrera(data) {
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
                title: 'Nombre Carrera'
            },
            {
                //proipiedad de la fuente de datos a mostrar
                field: 'Codigo',
                //texto del encabezado
                title: 'Código'
            },
            {
                //proipiedad de la fuente de datos a mostrar
                field: 'Director',
                //texto del encabezado
                title: 'Director'
            },
            {
                //proipiedad de la fuente de datos a mostrar
                field: 'Subdirector',
                //texto del encabezado
                title: 'Subdirector'
            },
            {
                title: "Acciones",
                template: function (dataItem) {
                    return "<a href='/Universidad/ModificaDireccionCarrera?id_DireccionCarrera=" + dataItem.id_DireccionCarrera +
                        "'>Modificar</a>" + "<br /> <a href='/Universidad/EliminaDireccionCarrera?id_DireccionCarrera=" +
                        dataItem.id_DireccionCarrera + "'>Eliminar</a>"
                }
            }
        ],
        filterable: true,
    });
}