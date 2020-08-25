$(function () {
	Validaciones();
	inicializarGeografia();
	inicializarFecha();
});

function inicializarGeografia() {
	var id = $("#identificadorProvincia").val();
	$("#id_Provincia").val(id);
	$("#id_Provincia").change();

	id = $("#identificadorCanton").val();
	$("#id_Canton").val(id);
	$("#id_Canton").change();

	id = $("#identificadorDistrito").val();
	$("#id_Distrito").val(id);
}

function inicializarFecha() {
	var capturarfecha = $("#identificadorFecha").val();
	var formFecha = capturarfecha.substr(0, 9);
	$("#FechaContratacion").val(formFecha)

	$("#FechaContratacion").datepicker({
		changeYear: true,
		changeMonth: true,
		yearRange: "c-10:c+1",
		dateFormat: "dd/mm/yy"
	});
}

function Validaciones() {
	$("#frmModificaFuncionario").validate({
		rules: {
			NombreCompleto: {
				required: true,
				maxlength: 50,
				minlength: 5
			},
			Cedula: {
				required: true,
				number: true,
				maxlength: 15
			},
			id_Provincia: {
				required: true
			},
			id_Canton: {
				required: true
			},
			id_Distrito: {
				required: true
			},
			FechaContratacion: {
				required: true,
				date: true
			},
		}
	});
}