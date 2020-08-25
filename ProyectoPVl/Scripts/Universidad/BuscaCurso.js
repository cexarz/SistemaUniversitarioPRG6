$(function () {
    CreaEventosBuscaCurso();
});


function CreaEventosBuscaCurso() {
    $("#btnBusqueda").click(function () {
        var txtBusqueda = $("#txtBusqueda").val();
        //Verifica si el radio button de tipoBusqueda esta marcado en nombre o cedula
        if ($('input:radio[name=tipoBusqueda]:checked').val() == 'N') {
            cargarCursoNombre(txtBusqueda);
        }
        else if ($('input:radio[name=tipoBusqueda]:checked').val() == 'C') {
            cargarCursoCodigo(txtBusqueda);
        } 
    })
}

function cargarCursoNombre(pTxtBusqueda) {
    /////construir la dirección del método del servidor
    var url = '/Universidad/RetornaCursoNombre'
    var parametros = {
        nombre: pTxtBusqueda
    };
    var funcion = creaGridKendoBuscaCurso;
    ///ejecuta la función $.ajax utilizando un método genérico
    //para no declarar toda la instrucción siempre
    ejecutaAjax(url, parametros, funcion);
}

function cargarCursoCodigo(pTxtBusqueda) {
    /////construir la dirección del método del servidor
    var url = '/Universidad/RetornaCursoCodigo'
    var parametros = {
        codigo: pTxtBusqueda
    };
    var funcion = creaGridKendoBuscaCurso;
    ///ejecuta la función $.ajax utilizando un método genérico
    //para no declarar toda la instrucción siempre
    ejecutaAjax(url, parametros, funcion);
}

function creaGridKendoBuscaCurso(data) {
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
                title: 'Nombre del curso'
            },
            {
                //proipiedad de la fuente de datos a mostrar
                field: 'Codigo',
                //texto del encabezado
                title: 'Código del curso'
            },
            {
                title: "Acciones",
                template: function (dataItem) {
                    return "<a href='/Universidad/ModificaCurso?id_Curso=" + dataItem.id_Curso +
                        "'>Modificar</a>" + "<br /> <a href='/Universidad/EliminaCurso?id_Curso=" + dataItem.id_Curso +
                        "'>Eliminar</a>"
                }
            }
        ],
        filterable: true,
    });
}