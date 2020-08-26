$(function () {
	cargaDropdownListCarreras();
	cargaDropdownListCuatrimestre_Ano();
	cargaDropdownListSedes();
	cargaDropdownListCursos();
	Validaciones();
	CreaEventos();
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

function cargaDropdownListCuatrimestre_Ano() {
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

	$("#Ano").datepicker({
		changeYear: true,
		showButtonPanel: true,
		yearRange: "c-10:c+10",
		dateFormat: "yy",
		closeText: "Seleccionar",
		currentText: "Actual",

		onClose: function (dateText, inst) {
			var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
			$(this).datepicker('setDate', new Date(year, 1, 1));
		}
	});
}

function cargaDropdownListSedes() {
	var url = '/Universidad/RetornaSedeNombre';
	//Parámetros del método
	var parametros = {
		nombre: ""
	};
	//Variable que determina el tipo de zona geografica
	var funcion = procesarResultadoSede;
	ejecutaAjax(url, parametros, funcion);
}

function procesarResultadoSede(data) {
	var Sede = $("#Sede");
	var nuevaOpcion = "<option value=''>Seleccione una sede</option>";

	Sede.empty();
	Sede.append(nuevaOpcion);

	$(data.resultado).each(function () {

		var objetoActual = this;

		nuevaOpcion = "<option value='" + objetoActual.id_SedeUniversitaria + "'>" + objetoActual.Nombre + "</option>";

		Sede.append(nuevaOpcion);
	})
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

function Validaciones() {
	$("#frmReporteNotas").validate({
		rules: {
			Sede: {
				required: true
			},
			Cuatrimestre: {
				required: true
			},
			Ano: {
				required: true,
				maxlength: 4
			},
			Curso: {
				required: true
			},
		}
	});
}

function cargarConsultaNotas(pCurso, pSede, pCuatrimestre, pAno) {
	/////construir la dirección del método del servidor
	var url = '/Universidad/ReporteNotasXSedeXAnoXCuatriXCurso'
	var parametros = {
		id_SedeUniversitaria: pSede,
		Ano: pAno,
		cuatrimestre: pCuatrimestre,
		id_Curso: pCurso,
	};
	var funcion = resultadoConsultaNotas;
	///ejecuta la función $.ajax utilizando un método genérico
	//para no declarar toda la instrucción siempre
	ejecutaAjax(url, parametros, funcion);
}

function resultadoConsultaNotas(data) {
	$(data.resultado).each(function () {

		var opcionActual = this;
		var fila = '<tr><td>' + opcionActual.NombreCompleto + '</td><td>' + opcionActual.Nombre +
			'</td><td>' + opcionActual.Nota + '</td><td>' + opcionActual.Estado + '</td></tr > ';
		$("#tblNotas > tbody").append(fila);
	})
}

function CreaEventos() {
	$("#btnConsultar").click(function () {
		$("#tblNotas > tbody").empty();
		var formulario = $("#frmReporteNotas");

		formulario.validate();

		if (formulario.valid()) {
			var Curso = $("#Curso").val();
			var Sede = $("#Sede").val();
			var Cuatrimestre = $("#Cuatrimestre").val();
			var Ano = $("#Ano").val();
			cargarConsultaNotas(Curso, Sede, Cuatrimestre, Ano)
		}
	})
}