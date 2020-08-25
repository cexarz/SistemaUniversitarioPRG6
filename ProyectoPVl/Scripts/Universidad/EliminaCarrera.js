$(function () {
	CreaEventos();
});

function CreaEventos() {
	$("#btnEliminar").on("click", function () {
		var id_Carrera = $("#id_Carrera").val();
		EliminarCarrera(id_Carrera)
	});
}

function EliminarCarrera(pId_Carrera) {
	//Dirección a donde se enviarán los datos
	var url = '/Universidad/EliminaCarrera';
	//Parámetros del método
	var parametros = {
		id_CarreraUniversitaria: pId_Carrera
	};
	//Variable que determina el tipo de zona geografica
	var funcion = ResultadoEliminarCarrera;
	ejecutaAjax(url, parametros, funcion);
}

function ResultadoEliminarCarrera(data) {
	alert(data);
}