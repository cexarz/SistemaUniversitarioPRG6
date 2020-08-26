$(function () {
	cargaDropdownListCursos();
	cargaDropdownListCarreras();
	inicializarCursos();
	inicializarCarrera();
	Validaciones();
	CreaEventos();
});

function cargaDropdownListCursos() {
	var url = '/Universidad/RetornaCursoNombre';
	//Parámetros del método
	var parametros = {
		nombre: ""
	};
	//Variable que determina el tipo de zona geografica
	var funcion = procesarResultadoCursos;
	ejecutaAjaxSincronico(url, parametros, funcion);
}

function procesarResultadoCursos(data) {
	var Curso = $("#Curso");
	var CursoRequerido = $("#CursoRequisito");

	var nuevaOpcion = "<option value=''>Seleccione una opción</option>";

	Curso.empty();
	CursoRequerido.empty();
	Curso.append(nuevaOpcion);
	CursoRequerido.append(nuevaOpcion);

	$(data.resultado).each(function () {

		var objetoActual = this;

		nuevaOpcion = "<option value='" + objetoActual.id_Curso + "'>" + objetoActual.Nombre + "</option>";

		Curso.append(nuevaOpcion);
		CursoRequerido.append(nuevaOpcion);
	})
}

function cargaDropdownListCarreras() {
	var url = '/Universidad/RetornaCarreraNombre';
	//Parámetros del método
	var parametros = {
		nombre: ""
	};
	//Variable que determina el tipo de zona geografica
	var funcion = procesarResultadoCarreras;
	ejecutaAjaxSincronico(url, parametros, funcion);
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

function Validaciones() {
	$("#frmModificaCursoxCarrera").validate({
		rules: {
			Curso: {
				required: true
			},
			Carrera: {
				required: true
			},
			CursoRequisito: {
				required: true
			},
		}
	});
}

function inicializarCursos() {
	var id = $("#id_CursoRequisito").val();
	$("#CursoRequisito").val(id);
	$("#CursoRequisito").change();

	id = $("#id_Curso").val();
	$("#Curso").val(id);
	$("#Curso").change();
}

function inicializarCarrera() {
	var id = $("#id_CarreraUniversitaria").val();
	$("#Carrera").val(id);
	$("#Carrera").change();
}

function CreaEventos() {
	$("#btnModificar").on("click", function () {
		var formulario = $("#frmModificaCursoxCarrera");

		formulario.validate();

		if (formulario.valid()) {
			var id_CursoPorCarrera = $("#id_CursoPorCarrera").val();
			var Curso = $("#Curso").val();
			var Carrera = $("#Carrera").val();
			var CursoRequisito = $("#CursoRequisito").val();
			IngresarCursoxCarrera(id_CursoPorCarrera, CursoRequisito, Carrera, Curso);
		}
	})
}

function IngresarCursoxCarrera(pId_CursoPorCarrera, pCursoRequisito, pCarrera, pCurso) {
	//Dirección a donde se enviarán los datos
	var url = '/Universidad/ModificaCursoxCarrera';
	//Parámetros del método
	var parametros = {
		id_CursoPorCarrera: pId_CursoPorCarrera,
		id_CursoRequisito: pCursoRequisito,
		id_CarreraUniversitaria: pCarrera,
		id_Curso: pCurso
	};
	//Variable que determina el tipo de zona geografica
	var funcion = ResultadoModificarCursoxCarrera;
	ejecutaAjax(url, parametros, funcion);
}

function ResultadoModificarCursoxCarrera(data) {
	alert(data);
}