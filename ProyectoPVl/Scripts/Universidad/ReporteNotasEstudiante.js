$(function () {
	crearDialog();
	cargaDropdownListCuatrimestre();
	cargaDropdownListCursos();
	cargarNotas()
	Validaciones();
	CreaEventos();
});

function crearDialog() {
	$("#divDialog").dialog({
		autoOpen: false,
		height: 350,
		width: 500,
		modal: true,
		title: "Filtrar busqueda de notas",
		resizable: false,
	})
}

function cargaDropdownListCuatrimestre() {
	var Cuatrimestre = $("#Cuatrimestre");
	Cuatrimestre.empty();

	var nuevaOpcion = "<option value=''>Seleccione el cuatrimestre</option>";
	Cuatrimestre.append(nuevaOpcion);
	nuevaOpcion = "<option value='I Cuatrimestre'>I Cuatrimestre</option>"
	Cuatrimestre.append(nuevaOpcion);
	nuevaOpcion = "<option value='II Cuatrimestre'>II Cuatrimestre</option>"
	Cuatrimestre.append(nuevaOpcion);
	nuevaOpcion = "<option value='III Cuatrimestre'>III Cuatrimestre</option>"
	Cuatrimestre.append(nuevaOpcion);
}

function cargaDropdownListCursos() {
	var url = '/Universidad/RetornaCursoNombre';
	//Parámetros del método
	var parametros = {
		nombre: ""
	};
	//Variable que determina el tipo de zona geografica
	var funcion = procesarResultadoCursos;
	ejecutaAjax(url, parametros, funcion);
}

function procesarResultadoCursos(data) {
	var Curso = $("#Curso");

	var nuevaOpcion = "<option value=''>Seleccione una opción</option>";

	Curso.empty();
	Curso.append(nuevaOpcion);

	$(data.resultado).each(function () {

		var objetoActual = this;

		nuevaOpcion = "<option value='" + objetoActual.id_Curso + "'>" + objetoActual.Nombre + "</option>";

		Curso.append(nuevaOpcion);
	})
}

function cargarNotas() {
	var Id_Estudiante = $("#id_Estudiante").val();
	consultarNotasEstudiante(Id_Estudiante);
}

function consultarNotasEstudiante(pId_Estudiante) {
	/////construir la dirección del método del servidor
	var url = '/Universidad/RetornaNotasIdEstudiante'
	var parametros = {
		id_Estudiante: pId_Estudiante
	};
	var funcion = resultadoCargarNotas;
	///ejecuta la función $.ajax utilizando un método genérico
	//para no declarar toda la instrucción siempre
	ejecutaAjax(url, parametros, funcion);
}

function consultarNotasEstudianteFiltro(pId_Estudiante, pCurso, pCuatrimestre) {
	/////construir la dirección del método del servidor
	var url = '/Universidad/RetornaNotasIdEstudianteFiltro'
	var parametros = {
		cuatrimestre: pCuatrimestre,
		id_Curso: pCurso,
		id_Estudiante: pId_Estudiante
	};
	var funcion = resultadoCargarNotas;
	$("#divDialog").dialog("close");
	///ejecuta la función $.ajax utilizando un método genérico
	//para no declarar toda la instrucción siempre
	ejecutaAjax(url, parametros, funcion);
}

function resultadoCargarNotas(data) {
	if (data.resultado != "") {

		$(data.resultado).each(function () {
			var opcionActual = this;
			var fila = '<tr><td>' + opcionActual.NombreCompleto + '</td><td>' + opcionActual.Nombre +
				'</td><td>' + opcionActual.Nota + '</td><td>' + opcionActual.Estado + '</td><td>' + opcionActual.Sede +
				'</td><td>' + opcionActual.Ano + '</td><td>' + opcionActual.PeriodoLectivo + '</td></tr>';
			$("#tblNotas > tbody").append(fila);
		})
	}
	else
		alert("Estudiante no registra notas")
}

function Validaciones() {
	$("#frmBusqueda").validate({
		rules: {
			Cuatrimestre: {
				required: true
			},
			Curso: {
				required: true
			},
		}
	});
}

function CreaEventos() {
	$("#btnFiltrarBusqueda").click(function () {
		$("#divDialog").dialog("open");
	})


	$("#btnBuscar").click(function () {
		$("#tblNotas > tbody").empty();
		var formulario = $("#frmBusqueda");

		formulario.validate();

		if (formulario.valid()) {
			var Id_Estudiante = $("#id_Estudiante").val();
			var Curso = $("#Curso").val();
			var Cuatrimestre = $("#Cuatrimestre").val();
			consultarNotasEstudianteFiltro(Id_Estudiante, Curso, Cuatrimestre)
		}
	})
}