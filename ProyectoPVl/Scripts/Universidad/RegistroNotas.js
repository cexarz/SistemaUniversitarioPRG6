$(function () {
	crearDialog();
	cargaDropdownListCarreras();
	cargaDropdownListCuatrimestre_Ano();
	cargaDropdownListSedes();
	cargaDropdownListCursos();
	Validaciones();
	CreaEventos();
});

function crearDialog() {
	$("#divDialog").dialog({
		autoOpen: false,
		height: 400,
		width: 500,
		modal: true,
		title: "Modificar nota a estudiante",
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
	$("#frmConsultaNotas").validate({
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

	$("#frmModificaNota").validate({
		rules: {
			Estudiante: {
				required: true
			},
			Nota: {
				required: true,
				number: true,
				range: [0, 10]
			},
		}
	});
}

function cargarConsultaNotas(pCurso, pSede, pCuatrimestre, pAno) {
	/////construir la dirección del método del servidor
	var url = '/Universidad/RetornaNotas'
	var parametros = {
		id_SedeUniversitaria: pSede,
		Ano: pAno,
		cuatrimestre: pCuatrimestre,
		id_Curso: pCurso,
	};
	var funcion = creaGridKendoNotas;
	///ejecuta la función $.ajax utilizando un método genérico
	//para no declarar toda la instrucción siempre
	ejecutaAjax(url, parametros, funcion);
}

function creaGridKendoNotas(data) {

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
					field: 'id_Matricula',
					//texto del encabezado
					title: 'id_Matricula',
					hidden: true,
				},
				{
					//proipiedad de la fuente de datos a mostrar
					field: 'NombreCompleto',
					//texto del encabezado
					title: 'Nombre del estudiante'
				},
				{
					//proipiedad de la fuente de datos a mostrar
					field: 'Nombre',
					//texto del encabezado
					title: 'Curso'
				},
				{
					//proipiedad de la fuente de datos a mostrar
					field: 'Nota',
					//texto del encabezado
					title: 'Nota'
				},
				{
					//proipiedad de la fuente de datos a mostrar
					field: 'Estado',
					//texto del encabezado
					title: 'Estado'
				},
			],
			filterable: true,
		});

		$("#btnModificarNota").removeAttr("disabled");

		var Estudiante = $("#Estudiante");
		var nuevaOpcion = "<option value=''>Seleccione el estudiante</option>";

		Estudiante.empty();
		Estudiante.append(nuevaOpcion);

		$(data.resultado).each(function () {

			var objetoActual = this;

			nuevaOpcion = "<option value='" + objetoActual.id_Matricula + "'>" + objetoActual.NombreCompleto + "</option>";

			Estudiante.append(nuevaOpcion);
		})
	}
	else
		alert("No existen notas a modificar segun lo consultado")
}

function modificaNota(Id_Matricula, Nota) {
	{
		/////construir la dirección del método del servidor
		var url = '/Universidad/ModificaNota'
		var parametros = {
			id_Matricula: Id_Matricula,
			Nota: Nota
		};
		var funcion = resultadoModificaNota;
		///ejecuta la función $.ajax utilizando un método genérico
		//para no declarar toda la instrucción siempre
		ejecutaAjax(url, parametros, funcion);
	}
}

function resultadoModificaNota(data) {
	alert(data);
	$("#divDialog").dialog("close");

	$("#btnConsultar").click();
	$('#divKendoGrid').data('kendoGrid').dataSource.read();
	$('#divKendoGrid').data('kendoGrid').refresh();
}

function CreaEventos() {
	$("#btnConsultar").click(function () {
		var formulario = $("#frmConsultaNotas");

		formulario.validate();

		if (formulario.valid()) {
			var Curso = $("#Curso").val();
			var Sede = $("#Sede").val();
			var Cuatrimestre = $("#Cuatrimestre").val();
			var Ano = $("#Ano").val();
			cargarConsultaNotas(Curso, Sede, Cuatrimestre, Ano)
		}
	})

	$("#btnModificarNota").click(function () {
		$("#divDialog").dialog("open");
	})

	$("#btnModificar").click(function () {
		var formulario = $("#frmModificaNota");

		formulario.validate();

		if (formulario.valid()) {
			var Id_Matricula = $("#Estudiante").val();
			var Nota = $("#Nota").val();
			modificaNota(Id_Matricula, Nota)
		}
	})
}