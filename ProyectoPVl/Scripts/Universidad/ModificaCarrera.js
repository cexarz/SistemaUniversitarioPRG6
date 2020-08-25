$(function () {
	cargaDropdownListDireccionCarrera();
	inicializarDireccionCarrera();
	Validaciones();
	CreaEventos();
});

function cargaDropdownListDireccionCarrera() {
	var url = '/Universidad/RetornaDireccionCarreraNombre';
	//Parámetros del método
	var parametros = {
		nombre: ""
	};
	//Variable que determina el tipo de zona geografica
	var funcion = procesarResultadoDireccionCarrera;
	ejecutaAjaxSincronico(url, parametros, funcion);
}

function procesarResultadoDireccionCarrera(data) {
	var direccionCarrera = $("#DireccionCarrera");

	var nuevaOpcion = "<option value=''>Seleccione una opcion</option>";

	direccionCarrera.empty();
	direccionCarrera.append(nuevaOpcion);

	$(data.resultado).each(function () {

		var objetoActual = this;

		nuevaOpcion = "<option value='" + objetoActual.id_DireccionCarrera + "'>" + objetoActual.Nombre + "</option>";

		direccionCarrera.append(nuevaOpcion);
	})
}

function inicializarDireccionCarrera() {
	var id = $("#id_DireccionCarrera").val();
	$("#DireccionCarrera").val(id);
	$("#DireccionCarrera").change();
}

function Validaciones() {
	$("#frmModificarCarrera").validate({
		rules: {
			nombre: {
				required: true,
				maxlength: 50,
				minlength: 5
			},
			codigo: {
				required: true,
				maxlength: 10
			},
			DireccionCarrera: {
				required: true
			}
		}
	});
}

function CreaEventos() {
	$("#btnModificar").on("click", function () {
		var formulario = $("#frmModificarCarrera");

		formulario.validate();

		if (formulario.valid()) {
			var id_Carrera = $("#id_Carrera").val();
			var nombre = $("#Nombre").val();
			var codigo = $("#Codigo").val();
			var id_DireccionCarrera = $("#DireccionCarrera").val();
			ModificarCarrera(id_Carrera, nombre, codigo, id_DireccionCarrera)

		}
	});
}

function ModificarCarrera(pId_Carrera, pNombre, pCodigo, pDireccionCarrera) {
	//Dirección a donde se enviarán los datos
	var url = '/Universidad/ModificaCarrera';
	//Parámetros del método
	var parametros = {
		id_Carrera: pId_Carrera,
		Nombre: pNombre,
		Codigo: pCodigo,
		id_DireccionCarrera: pDireccionCarrera,
	};
	//Variable que determina el tipo de zona geografica
	var funcion = ResultadoModificarCarrera;
	ejecutaAjax(url, parametros, funcion);
}

function ResultadoModificarCarrera(data) {
	alert(data);
}