$(function () {
	cargaDropdownListFuncionarios();
	inicializarFuncionarios();
	Validaciones();
	CreaEventos();
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
	var subDirector = $("#subDirector");

	var nuevaOpcion = "<option value=''>Seleccione una opción</option>";

	Director.empty();
	subDirector.empty();
	Director.append(nuevaOpcion);
	subDirector.append(nuevaOpcion);

	$(data).each(function () {

		var objetoActual = this;

		nuevaOpcion = "<option value='" + objetoActual.id_Funcionario + "'>" + objetoActual.NombreCompleto + "</option>";

		Director.append(nuevaOpcion);
		subDirector.append(nuevaOpcion);
	})
}

function inicializarFuncionarios() {
	var id = $("#id_Director").val();
	$("#Director").val(id);
	$("#Director").change();

	id = $("#id_Subdirector").val();
	$("#subDirector").val(id);
	$("#subDirector").change();
}

function Validaciones() {
	$("#frmModificarDireccionCarrera").validate({
		rules: {
			Nombre: {
				required: true,
				maxlength: 50,
				minlength: 5
			},
			Codigo: {
				required: true,
				maxlength: 10
			},
			Director: {
				required: true
			},
			subDirector: {
				required: true
			}
		}
	});
}

function CreaEventos() {
	$("#btnModificar").on("click", function () {
		var formulario = $("#frmModificarDireccionCarrera");

		formulario.validate();

		if (formulario.valid()) {
			var director = $("#Director").val();
			var subDirector = $("#subDirector").val();

			if (director != subDirector) {
				var id_DireccionCarrera = $("#id_DireccionCarrera").val();
				var nombre = $("#Nombre").val();
				var codigo = $("#Codigo").val();
				ModificarDireccionCarrera(id_DireccionCarrera, nombre, codigo, director, subDirector)
			}
			else
				alert("Error: El director y subdirector no pueden ser la misma persona")
		}
	});
}

function ModificarDireccionCarrera(pId_DireccionCarrera, pNombre, pCodigo, pDirector, pSubDirector) {
	//Dirección a donde se enviarán los datos
	var url = '/Universidad/ModificaDireccionCarrera';
	//Parámetros del método
	var parametros = {
		id_DireccionCarrera: pId_DireccionCarrera,
		Nombre: pNombre,
		Codigo: pCodigo,
		id_Director: pDirector,
		id_Subdirector: pSubDirector,
	};
	//Variable que determina el tipo de zona geografica
	var funcion = ResultadoModificarDireccionCarrera;
	ejecutaAjax(url, parametros, funcion);
}

function ResultadoModificarDireccionCarrera(data) {
	alert(data);
}