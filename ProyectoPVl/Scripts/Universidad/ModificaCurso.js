$(function () {
	Validaciones()
	CreaEventosModificaCurso();
});

function CreaEventosModificaCurso() {
	$("#btnModificar").on("click", function () {
		var formulario = $("#frmModificarCurso");

		formulario.validate();

		if (formulario.valid()) {
			var id_Curso = $("#id_Curso").val();
			var Nombre = $("#Nombre").val();
			var Codigo = $("#Codigo").val();
			ModificarCurso(id_Curso, Nombre, Codigo);
		}
	})
}

function ModificarCurso(pId_Curso, pNombre, pCodigo) {
	//Dirección a donde se enviarán los datos
	var url = '/Universidad/ModificaCurso';
	//Parámetros del método
	var parametros = {
		id_Curso: pId_Curso,
		Nombre: pNombre,
		Codigo: pCodigo
	};
	var funcion = ResultadoModificarCurso;
	ejecutaAjax(url, parametros, funcion);
}

function ResultadoModificarCurso(data) {
	alert(data);
}

function Validaciones() {
	$("#frmModificarCurso").validate({
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