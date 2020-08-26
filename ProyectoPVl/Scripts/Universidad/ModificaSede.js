$(function () {
	cargaDropdownListFuncionarios();
	inicializarFuncionario();
	inicializarGeografia();
	Validaciones()
	CreaEventos()
});

function cargaDropdownListFuncionarios() {
	var url = '/Universidad/RetornaFuncionariosNombre';
	//Parámetros del método
	var parametros = {
		nombre: ""
	};
	//Variable que determina el tipo de zona geografica
	var funcion = procesarResultadoFuncionarios;
	ejecutaAjaxSincronico(url, parametros, funcion);
}

function procesarResultadoFuncionarios(data) {
	var Director = $("#Director");

	var nuevaOpcion = "<option value=''>Seleccione una opción</option>";

	Director.empty();
	Director.append(nuevaOpcion);

	$(data).each(function () {

		var objetoActual = this;

		nuevaOpcion = "<option value='" + objetoActual.id_Funcionario + "'>" + objetoActual.NombreCompleto + "</option>";

		Director.append(nuevaOpcion);
	})
}

function inicializarFuncionario() {
	var id = $("#id_Director").val();
	$("#Director").val(id);
	$("#Director").change();
}

function inicializarGeografia() {
	var id = $("#identificadorProvincia").val();
	$("#id_Provincia").val(id);
	$("#id_Provincia").change();

	id = $("#identificadorCanton").val();
	$("#id_Canton").val(id);
	$("#id_Canton").change();

	id = $("#identificadorDistrito").val();
	$("#id_Distrito").val(id);
}

function Validaciones() {
	$("#frmModificarSede").validate({
		rules: {
			nombre: {
				required: true,
				maxlength: 20,
				minlength: 4
			},
			codigo: {
				required: true,
				maxlength: 10
			},
			Director: {
				required: true
			},
			id_Provincia: {
				required: true
			},
			id_Canton: {
				required: true
			},
			id_Distrito: {
				required: true
			},
			direccionFisica: {
				required: true,
				maxlength: 250,
				minlength: 10
			}
		}
	});
}

function CreaEventos() {
	$("#btnModificar").on("click", function () {
		var formulario = $("#frmModificarSede");

		formulario.validate();

		if (formulario.valid()) {
			var id_SedeUniversitaria = $("#id_SedeUniversitaria").val();
			var nombre = $("#nombre").val();
			var codigo = $("#codigo").val();
			var director = $("#Director").val();
			var id_Provincia = $("#id_Provincia").val();
			var id_Canton = $("#id_Canton").val();
			var id_Distrito = $("#id_Distrito").val();
			var direccionFisica = $("#direccionFisica").val();
			ModificarSede(id_SedeUniversitaria, nombre, codigo, director, id_Provincia,
				id_Canton, id_Distrito, direccionFisica);
		}
	});
}

function ModificarSede(pId_SedeUniversitaria, pNombre, pCodigo, pDirector, pId_Provincia,
								   pId_Canton, pId_Distrito, pDireccionFisica) {
	//Dirección a donde se enviarán los datos
	var url = '/Universidad/ModificaSede';
	//Parámetros del método
	var parametros = {
		id_SedeUniversitaria: pId_SedeUniversitaria,
		Nombre: pNombre,
		Codigo: pCodigo,
		id_Director: pDirector,
		id_Provincia: pId_Provincia,
		id_Canton: pId_Canton,
		id_Distrito: pId_Distrito,
		direccionFisica: pDireccionFisica
	};
	//Variable que determina el tipo de zona geografica
	var funcion = ResultadoModificarSede;
	ejecutaAjax(url, parametros, funcion);
}

function ResultadoModificarSede(data) {
	alert(data);
}