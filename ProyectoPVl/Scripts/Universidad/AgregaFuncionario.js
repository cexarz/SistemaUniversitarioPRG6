$(function () {
	crearDialog();
	Validaciones();
	CreaEventosAgregaFuncionario();
});

function crearDialog() {
	$("#divDialog").dialog({
		autoOpen: false,
		height: 250,
		width: 350,
		modal: true,
		title: "Asignación de contraseña del usuario",
		resizable: false,
	})
}

function CreaEventosAgregaFuncionario() {
	$("#btnIngresar").on("click", function () {
		var formulario = $("#frmAgregaFuncionario");

		formulario.validate();

		if (formulario.valid()) {
			$("#divDialog").dialog("open");
		}
	});

	$("#btnGuardar").click(function () {
		var contr = $("#Contrasena").val();
		var ConfContr = $("#ConfirmaContrasena").val();

		if (contr != "" && contr == ConfContr) {
			var NombreCompleto = $("#NombreCompleto").val();
			var Cedula = $("#Cedula").val();
			var id_Provincia = $("#id_Provincia").val();
			var id_Canton = $("#id_Canton").val();
			var id_Distrito = $("#id_Distrito").val();
			var FechaContratacion = $("#FechaContratacion").val();
			var tipoUsuario = $('input[name="tipoUsuario"]:checked').val();		
			IngresarFuncionario(NombreCompleto, Cedula, id_Provincia, id_Canton,
				id_Distrito, FechaContratacion, tipoUsuario, contr);
		}
		else
			alert("Contraseña vacía o ambas no coinciden")
	});
}

function IngresarFuncionario(pNombreCompleto, pCedula, pId_Provincia, pId_Canton, pId_Distrito,
											  pFechaContratacion, pTipoUsuario, pContr) {
	//Dirección a donde se enviarán los datos
	var url = '/Universidad/AgregaFuncionario';
	//Parámetros del método
	var parametros = {
		NombreCompleto: pNombreCompleto,
		Cedula: pCedula,
		id_Provincia: pId_Provincia,
		id_Canton: pId_Canton,
		id_Distrito: pId_Distrito,
		FechaContratacion: pFechaContratacion,
		tipoUsuario: pTipoUsuario,
		contrasena: pContr
	};
	//Variable que determina el tipo de zona geografica
	var funcion = ResultadoInsertarFuncionario;
	ejecutaAjax(url, parametros, funcion);
}

function ResultadoInsertarFuncionario(data) {
	alert(data);
	$("#divDialog").dialog("close");
}


function Validaciones() {
	$("#frmAgregaFuncionario").validate({
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
