$(function () {
    CreaEventosBuscaSede();
});


function CreaEventosBuscaSede() {
    $("#btnBusqueda").click(function () {
        var txtBusqueda = $("#txtBusqueda").val();
        //Verifica si el radio button de tipoBusqueda esta marcado en nombre o codigo
        if ($('input:radio[name=tipoBusqueda]:checked').val() == 'N') {
            cargarSedeNombre(txtBusqueda);
        }
        else if ($('input:radio[name=tipoBusqueda]:checked').val() == 'C') {
            cargarSedeCodigo(txtBusqueda);
        }
    })
}

function cargarSedeNombre(pTxtBusqueda) {
    /////construir la dirección del método del servidor
    var url = '/Universidad/RetornaSedeNombre'
    var parametros = {
        nombre: pTxtBusqueda
    };
    var funcion = creaGridKendoBuscaSede;
    ///ejecuta la función $.ajax utilizando un método genérico
    //para no declarar toda la instrucción siempre
    ejecutaAjax(url, parametros, funcion);
}

function cargarSedeCodigo(pTxtBusqueda) {
    /////construir la dirección del método del servidor
    var url = '/Universidad/RetornanSedeCodigo'
    var parametros = {
        codigo: pTxtBusqueda
    };
    var funcion = creaGridKendoBuscaSede;
    ///ejecuta la función $.ajax utilizando un método genérico
    //para no declarar toda la instrucción siempre
    ejecutaAjax(url, parametros, funcion);
}

function creaGridKendoBuscaSede(data) {
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
                title: 'Nombre de la sede'
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
                field: 'Provincia',
                //texto del encabezado
                title: 'Provincia'
            },
            {
                //proipiedad de la fuente de datos a mostrar
                field: 'Canton',
                //texto del encabezado
                title: 'Cantón'
            },
            {
                //proipiedad de la fuente de datos a mostrar
                field: 'Distrito',
                //texto del encabezado
                title: 'Distrito'
            },
            {
                //proipiedad de la fuente de datos a mostrar
                field: 'DireccionFisica',
                //texto del encabezado
                title: 'Dirección'
            },
            {
                title: "Acciones",
                template: function (dataItem) {
                    return "<a href='/Universidad/ModificaSede?id_SedeUniversitaria=" +
                        dataItem.id_SedeUniversitaria + "'>Modificar</a>" +
                        "<br /> <a href='/Universidad/EliminaSede?id_SedeUniversitaria=" +
                        dataItem.id_SedeUniversitaria + "'>Eliminar</a>"
                }
            }
        ],
        filterable: true,
    });
}