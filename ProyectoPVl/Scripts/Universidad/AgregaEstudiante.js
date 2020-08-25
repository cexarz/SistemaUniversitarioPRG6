$(function () {
	Validaciones();
});

function Validaciones() {
	$("#frmAgregaEstudiante").validate({
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
			Fecha_Inicio: {
				required: true,
				date: true
			},
		}
	});
}