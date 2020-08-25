$(function () {
	cargaDropdownListFuncionarios();
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
	ejecutaAjax(url, parametros, funcion);
}

function procesarResultadoFuncionarios(data) {
	var Director = $("#Director");
	var subDirector = $("#subDirector");

	var nuevaOpcion = "<option value=''>Seleccione una opcion</option>";

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

function Validaciones() {
	$("#frmDireccionCarrera").validate({
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
	$("#btnIngresar").on("click", function () {
		var formulario = $("#frmDireccionCarrera");

		formulario.validate();

		if (formulario.valid()) {
			var director = $("#Director").val();
			var subDirector = $("#subDirector").val();

			if (director != subDirector) {
				var nombre = $("#Nombre").val();
				var codigo = $("#Codigo").val();
				IngresarDireccionCarrera(nombre, codigo, director, subDirector)
			}
			else
				alert("Error: El director y subdirector no pueden ser la misma persona")
		}
	});
}

function IngresarDireccionCarrera(pNombre, pCodigo, pDirector, pSubDirector) {
	//Dirección a donde se enviarán los datos
	var url = '/Universidad/AgregaDireccionCarrera';
	//Parámetros del método
	var parametros = {
		Nombre: pNombre,
		Codigo: pCodigo,
		id_Director: pDirector,
		id_Subdirector: pSubDirector,
	};
	//Variable que determina el tipo de zona geografica
	var funcion = ResultadoInsertarDireccionCarrera;
	ejecutaAjax(url, parametros, funcion);
}

function ResultadoInsertarDireccionCarrera(data) {
	alert(data);
}