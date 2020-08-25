$(function () {
	CreaEventosEliminaCurso();
});

function CreaEventosEliminaCurso() {
	$("#btnEliminar").on("click", function () {

		var id_Curso = $("#id_Curso").val();
		EliminarCurso(id_Curso);
	})
}

function EliminarCurso(pId_Curso) {
	//Dirección a donde se enviarán los datos
	var url = '/Universidad/EliminaCurso';
	//Parámetros del método
	var parametros = {
		id_Curso: pId_Curso
	};
	var funcion = ResultadoEliminarCurso;
	ejecutaAjax(url, parametros, funcion);
}

function ResultadoEliminarCurso(data) {
	alert(data);
}