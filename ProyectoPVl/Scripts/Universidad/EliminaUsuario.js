$(function () {
	inicializarFecha()
});

function inicializarFecha() {
	var capturarfecha = $("#identificadorFecha").val();
	var formFecha = capturarfecha.substr(0, 9);
	$("#Fecha_Inicio").val(formFecha)
}
