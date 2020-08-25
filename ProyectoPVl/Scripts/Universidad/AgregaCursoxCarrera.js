$(function () {
	cargaDropdownListCursos();
	cargaDropdownListCarreras();
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
	ejecutaAjax(url, parametros, funcion);
}

function procesarResultadoCursos(data) {
	var Curso = $("#Curso");
	var CursoRequerido = $("#CursoRequerido");

	var nuevaOpcion = "<option value=''>Seleccione una opcion</option>";

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
	ejecutaAjax(url, parametros, funcion);
}

function procesarResultadoCarreras(data) {
	var Carrera = $("#Carrera");

	var nuevaOpcion = "<option value=''>Seleccione una opcion</option>";

	Carrera.empty();
	Carrera.append(nuevaOpcion);

	$(data.resultado).each(function () {

		var objetoActual = this;

		nuevaOpcion = "<option value='" + objetoActual.id_CarreraUniversitaria + "'>" + objetoActual.Nombre + "</option>";

		Carrera.append(nuevaOpcion);
	})
}

function Validaciones() {
	$("#frmAgregaCursoxCarrera").validate({
		rules: {
			Curso: {
				required: true
			},
			Carrera: {
				required: true
			},
			CursoRequerido: {
				required: true
			},
		}
	});
}

function CreaEventos() {
	$("#btnIngresar").on("click", function () {
		var formulario = $("#frmAgregaCursoxCarrera");

		formulario.validate();

		if (formulario.valid()) {
			var Curso = $("#Curso").val();
			var CursoRequerido = $("#CursoRequerido").val();
			if (Curso != CursoRequerido) {
				var Carrera = $("#Carrera").val();
				IngresarCursoxCarrera(Curso, Carrera, CursoRequerido);
			}
			else
				alert("Curso y curso requerido no puede ser el mismo")
		}
	})
}

function IngresarCursoxCarrera(pCurso, pCarrera, pCursoRequerido) {
	//Dirección a donde se enviarán los datos
	var url = '/Universidad/AgregaCursoxCarrera';
	//Parámetros del método
	var parametros = {
		id_Curso: pCurso,
		id_CarreraUniversitaria: pCarrera,
		id_CursoRequerido: pCursoRequerido
	};
	//Variable que determina el tipo de zona geografica
	var funcion = ResultadoInsertarCursoxCarrera;
	ejecutaAjax(url, parametros, funcion);
}

function ResultadoInsertarCursoxCarrera(data) {
	alert(data);
}