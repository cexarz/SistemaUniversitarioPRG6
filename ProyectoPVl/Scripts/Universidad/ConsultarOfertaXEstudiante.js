$(function () {
	crearDialog();
	cargaDropdownListCarreras();
	cargaDropdownListCuatrimestre_Ano();
	cargaDropdownListSedes();
	Validaciones();
	CreaEventos();
});

function crearDialog() {
	$("#divDialog").dialog({
		autoOpen: false,
		height: 250,
		width: 350,
		modal: true,
		title: "Agregar curso a matricula",
		resizable: false,
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

function Validaciones() {
	$("#frmConsultaOferta").validate({
		rules: {
			nombreEstudiante: {
				required: true
			},
			Carrera: {
				required: true
			},
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
		}
	});

	$("#frmMatricular").validate({
		rules: {
			Curso: {
				required: true
			},
		}
	});
}

function cargarConsultaOferta(pCarrera, pSede, pCuatrimestre, pAno) {
	/////construir la dirección del método del servidor
	var url = '/Universidad/ConsultaOfertaAcademica'
	var parametros = {
		ind_Carrera: pCarrera,
		id_SedeUniversitaria: pSede,
		ano: pAno,
		cuatrimestre: pCuatrimestre
	};
	var funcion = creaGridKendoConsultarOferta;
	///ejecuta la función $.ajax utilizando un método genérico
	//para no declarar toda la instrucción siempre
	ejecutaAjax(url, parametros, funcion);
}

function creaGridKendoConsultarOferta(data) {

	if (data.resultado != "") {
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
					field: 'id_OfertaAcademica',
					//texto del encabezado
					title: 'id_OfertaAcademica',
					hidden: true,
				},
				{
					//proipiedad de la fuente de datos a mostrar
					field: 'Nombre',
					//texto del encabezado
					title: 'Nombre del curso'
				},
				{
					//proipiedad de la fuente de datos a mostrar
					field: 'CuposDisponibles',
					//texto del encabezado
					title: 'Cupos disponibles'
				},
			],
			filterable: true,
		});

		$("#Carrera").attr("disabled", true);
		$("#btnMatricular").removeAttr("disabled");

		var Curso = $("#Curso");
		var nuevaOpcion = "<option value=''>Seleccione el curso</option>";

		Curso.empty();
		Curso.append(nuevaOpcion);

		$(data.resultado).each(function () {

			var objetoActual = this;

			nuevaOpcion = "<option value='" + objetoActual.id_OfertaAcademica + "'>" + objetoActual.Nombre + "</option>";

			Curso.append(nuevaOpcion);
		})
	}
	else
		alert("No existe una oferta academica")
}

function matricularEstudiante(pId_Estudiante, pId_OfertaAcademica, pId_Carrera) {
	/////construir la dirección del método del servidor
	var url = '/Universidad/AgregaMatricula'
	var parametros = {
		id_Estudiante: pId_Estudiante,
		id_CarreraUniversitaria: pId_Carrera,
		id_OfertaAcademica: pId_OfertaAcademica
	};
	var funcion = resultadoMatricula;
	///ejecuta la función $.ajax utilizando un método genérico
	//para no declarar toda la instrucción siempre
	ejecutaAjax(url, parametros, funcion);
}

function resultadoMatricula(data) {
	alert(data);
	$("#divDialog").dialog("close");
}

function CreaEventos() {
	$("#btnConsultar").click(function () {
		var formulario = $("#frmConsultaOferta");

		formulario.validate();

		if (formulario.valid()) {
			var Carrera = $("#Carrera").val();
			var Sede = $("#Sede").val();
			var Cuatrimestre = $("#Cuatrimestre").val();
			var Ano = $("#Ano").val();
			cargarConsultaOferta(Carrera, Sede, Cuatrimestre, Ano)
		}
	})

	$("#btnMatricular").click(function () {
		$("#divDialog").dialog("open");
	})

	$("#btnAgregar").click(function () {
		var Id_Estudiante = $("#idEstudiante").val();
		obtenerMatriculasXEstudiante(Id_Estudiante);
	})
}

function obtenerMatriculasXEstudiante(pId_Estudiante) {
	/////construir la dirección del método del servidor
	var url = '/Universidad/RetornaMatriculaIdEstudiante'
	var parametros = {
		id_Estudiante: pId_Estudiante
	};
	var funcion = resultadoMatriculasXEstudiante;
	///ejecuta la función $.ajax utilizando un método genérico
	//para no declarar toda la instrucción siempre
	ejecutaAjax(url, parametros, funcion);
}

function resultadoMatriculasXEstudiante(data) {
	var formulario = $("#frmMatricular");

	formulario.validate();

	if (formulario.valid()) {
		var verificaMatriculaNoExiste = true;
		var Id_Estudiante = $("#idEstudiante").val();
		var Id_OfertaAcademica = $("#Curso").val();
		var Id_Carrera = $("#Carrera").val();
		$(data.resultado).each(function () {
			var objActual = this;
			if (objActual.id_Estudiante == Id_Estudiante && objActual.id_OFertaAcademica == Id_OfertaAcademica) {
				verificaMatriculaNoExiste = false;
			}
		})

		if (verificaMatriculaNoExiste) {
			matricularEstudiante(Id_Estudiante, Id_OfertaAcademica, Id_Carrera);
		}
		else {
			alert("Ya existe una misma matricula")
		}
		$("#divDialog").dialog("close");
	}
}