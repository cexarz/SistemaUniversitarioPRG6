$(function () {
	CreaEventos();
});

function CreaEventos() {
	$("#btnEliminar").on("click", function () {
		var id_SedeUniversitaria = $("#id_SedeUniversitaria").val();
		EliminarSede(id_SedeUniversitaria)
	});
}

function EliminarSede(pId_SedeUniversitaria) {
	//Dirección a donde se enviarán los datos
	var url = '/Universidad/EliminaSede';
	//Parámetros del método
	var parametros = {
		id_SedeUniversitaria: pId_SedeUniversitaria
	};
	//Variable que determina el tipo de zona geografica
	var funcion = ResultadoEliminarSede;
	ejecutaAjax(url, parametros, funcion);
}

function ResultadoEliminarSede(data) {
	alert(data);
}