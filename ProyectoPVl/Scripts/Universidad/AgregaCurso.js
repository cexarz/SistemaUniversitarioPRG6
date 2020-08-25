$(function () {
	Validaciones()
	CreaEventosAgregaCursos();
});

function CreaEventosAgregaCursos() {
	$("#btnIngresar").on("click", function () {
		var formulario = $("#frmAgregaCurso");

		formulario.validate();

		if (formulario.valid()) {
			var Nombre = $("#Nombre").val();
			var Codigo = $("#Codigo").val();
			IngresarCurso(Nombre, Codigo);
		}	
	})
}

function IngresarCurso(pNombre, pCodigo) {
	//Dirección a donde se enviarán los datos
	var url = '/Universidad/AgregaCurso';
	//Parámetros del método
	var parametros = {
		Nombre: pNombre,
		Codigo: pCodigo
	};
	//Variable que determina el tipo de zona geografica
	var funcion = ResultadoInsertarCurso;
	ejecutaAjax(url, parametros, funcion);
}

function ResultadoInsertarCurso(data) {
	alert(data);
}

function Validaciones() {
	$("#frmAgregaCurso").validate({
		rules: {
			Nombre: {
				required: true,
				maxlength: 30,
				minlength: 5
			},
			Codigo: {
				required: true,
				maxlength: 10
			},
		}
	});
}