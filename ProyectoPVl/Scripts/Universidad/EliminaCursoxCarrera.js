$(function () {
	CreaEventosEliminaCursoxCarrera();
});

function CreaEventosEliminaCursoxCarrera() {
	$("#btnEliminar").on("click", function () {

		var id_CursoPorCarrera = $("#id_CursoPorCarrera").val();
		EliminarCursoxCarrera(id_CursoPorCarrera);
	})
}

function EliminarCursoxCarrera(pId_CursoPorCarrera) {
	//Dirección a donde se enviarán los datos
	var url = '/Universidad/EliminaCursoxCarrera';
	//Parámetros del método
	var parametros = {
		id_CursoPorCarrera: pId_CursoPorCarrera
	};
	var funcion = ResultadoEliminarCursoxCarrera;
	ejecutaAjax(url, parametros, funcion);
}

function ResultadoEliminarCursoxCarrera(data) {
	alert(data);
}