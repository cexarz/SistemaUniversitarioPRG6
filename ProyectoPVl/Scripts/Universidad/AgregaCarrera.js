$(function () {
	cargaDropdownListDireccionesCarreras();
	Validaciones();
	CreaEventos();
});

function cargaDropdownListDireccionesCarreras() {
	var url = '/Universidad/RetornaDireccionCarreraNombre';
	//Parámetros del método
	var parametros = {
		nombre: ""
	};
	//Variable que determina el tipo de zona geografica
	var funcion = procesarResultadoDireccionCarrera;
	ejecutaAjax(url, parametros, funcion);
}

function procesarResultadoDireccionCarrera(data) {
	var direccionCarrera = $("#DireccionCarrera");
	var nuevaOpcion = "<option value=''>Seleccione una opción</option>";

	direccionCarrera.empty();
	direccionCarrera.append(nuevaOpcion);

	$(data.resultado).each(function () {

		var objetoActual = this;

		nuevaOpcion = "<option value='" + objetoActual.id_DireccionCarrera + "'>" + objetoActual.Nombre + "</option>";

		direccionCarrera.append(nuevaOpcion);
	})
}

function Validaciones() {
	$("#frmCarrera").validate({
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
	$("#btnIngresar").on("click", function () {
		var formulario = $("#frmCarrera");

		formulario.validate();

		if (formulario.valid()) {
			var direccionCarrera = $("#DireccionCarrera").val();
			var nombre = $("#nombre").val();
			var codigo = $("#codigo").val();
			IngresarCarrera(nombre, codigo, direccionCarrera)
		}
	});
}

function IngresarCarrera(pNombre, pCodigo, pDireccionCarrera) {
	//Dirección a donde se enviarán los datos
	var url = '/Universidad/AgregaCarrera';
	//Parámetros del método
	var parametros = {
		nombre: pNombre,
		codigo: pCodigo,
		id_DireccionCarrera: pDireccionCarrera
	};
	//Variable que determina el tipo de zona geografica
	var funcion = ResultadoInsertarCarrera;
	ejecutaAjax(url, parametros, funcion);
}

function ResultadoInsertarCarrera(data) {
	alert(data);
}