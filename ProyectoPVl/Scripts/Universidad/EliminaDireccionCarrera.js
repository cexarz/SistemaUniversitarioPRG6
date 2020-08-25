$(function () {
	CreaEventos();
});

function CreaEventos() {
	$("#btnEliminar").on("click", function () {
		var id_DireccionCarrera = $("#id_DireccionCarrera").val();
	    EliminarDireccionCarrera(id_DireccionCarrera)
	});
}

function EliminarDireccionCarrera(pId_DireccionCarrera) {
	//Dirección a donde se enviarán los datos
	var url = '/Universidad/EliminaDireccionCarrera';
	//Parámetros del método
	var parametros = {
		id_DireccionCarrera: pId_DireccionCarrera
	};
	//Variable que determina el tipo de zona geografica
	var funcion = ResultadoEliminarDireccionCarrera;
	ejecutaAjax(url, parametros, funcion);
}

function ResultadoEliminarDireccionCarrera(data) {
	alert(data);
}