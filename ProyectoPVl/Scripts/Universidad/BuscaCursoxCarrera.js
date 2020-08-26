$(function () {
	cargaDropdownListCarreras();
	CrearEventos();
});

function cargaDropdownListCarreras() {
	var url = '/Universidad/RetornaCarreraNombre';
	//Parámetros del método
	var parametros = {
		nombre: ""
	};
	//Variable que determina el tipo de zona geografica
	var funcion = procesarResultadoCarreras;
	ejecutaAjax(url, parametros, funcion);
}

function procesarResultadoCarreras(data) {
	var Carrera = $("#Carrera");

	var nuevaOpcion = "<option value=''>Seleccione una opción</option>";

	Carrera.empty();
	Carrera.append(nuevaOpcion);

	$(data.resultado).each(function () {

		var objetoActual = this;

		nuevaOpcion = "<option value='" + objetoActual.id_CarreraUniversitaria + "'>" + objetoActual.Nombre + "</option>";

		Carrera.append(nuevaOpcion);
	})
}

function CrearEventos() {
	$("#btnBusqueda").click(function () {
		var Carrera = $("#Carrera").val();
		//Verifica si el radio button de tipoBusqueda esta marcado en nombre o codigo
		cargarCursoxCarrera(Carrera);		
	})
}

function cargarCursoxCarrera(pCarrera) {
	/////construir la dirección del método del servidor
	var url = '/Universidad/RetornaCursoxCarrera'
	var parametros = {
		id_CarreraUniversitaria: pCarrera
	};
	var funcion = creaGridKendoBuscaCursoxcarrera;
	///ejecuta la función $.ajax utilizando un método genérico
	//para no declarar toda la instrucción siempre
	ejecutaAjax(url, parametros, funcion);
}

function creaGridKendoBuscaCursoxcarrera(data) {
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
                field: 'Curso',
                //texto del encabezado
                title: 'Curso'
            },
            {
                //proipiedad de la fuente de datos a mostrar
                field: 'Curso_Requerido',
                //texto del encabezado
                title: 'Curso requerido'
            },
            {
                title: "Acciones",
                template: function (dataItem) {
					return "<a href='/Universidad/ModificaCursoxCarrera?id_CursoPorCarrera=" +
						dataItem.id_CursoPorCarrera + "'>Modificar</a>" +
                        "<br /> <a href='/Universidad/EliminaCursoxCarrera?id_CursoPorCarrera=" +
						dataItem.id_CursoPorCarrera + "'>Eliminar</a>"
                }
            }
        ],
        filterable: true,
    });
}