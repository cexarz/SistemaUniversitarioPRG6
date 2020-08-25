$(function () {
    CrearDialog();
    cargaKendo();
    cargaDropdownListCuatrimestre_Ano();
    cargaDropdownListSedes();
    Validaciones();
    EventoClick();
});

function CrearDialog() {
    $("#divDialog").dialog({
        autoOpen: false,
        height: 350,
        width: 500,
        modal: true,
        title: "Agregar un nuevo cuatrimestre, por año y por sede",
        resizable: false,
    })
}

function cargaKendo() {
	var url = '/Universidad/RetornaCuatrimestrexSede';
	//Parámetros del método
	var parametros = {
	};
	//Variable que determina el tipo de zona geografica
	var funcion = procesarResultadoCargaKendo;
	ejecutaAjax(url, parametros, funcion);
}

function procesarResultadoCargaKendo(data){
    $("#divKendoGrid").kendoGrid({
        //asignar la fuente de datos al objeto kendo grid
        dataSource: {
            data: data.resultado,
            pageSize: 5
        },
        pageable: true,
        columns: [
            {
                //proipiedad de la fuente de datos a mostrar
                field: 'SedeUniversitaria',
                //texto del encabezado
                title: 'Sede Universitaria'
            },
            {
                //proipiedad de la fuente de datos a mostrar
                field: 'Ano',
                //texto del encabezado
                title: 'Año'
            },
            {
                //proipiedad de la fuente de datos a mostrar
                field: 'PeriodoLectivo',
                //texto del encabezado
                title: 'Cuatrimestre'
            },
            {
                title: "Acciones",
                template: function (dataItem) {
                    return "<a href='/Universidad/AgregaOfertaCursoxSede?id_CuatrimestreXSede=" +
                        dataItem.id_CuatrimestreXSede + "'>Ingresar oferta</a>" 
                }
            }
        ],
        filterable: true,
    });
}

function cargaDropdownListCuatrimestre_Ano() {
	var Cuatrimestre = $("#Cuatrimestre");
	Cuatrimestre.empty();

	var nuevaOpcion = "<option value=''>Seleccione el cuatrimestre</option>";
	Cuatrimestre.append(nuevaOpcion);
	nuevaOpcion = "<option value='I Cuatrimestre'>I Cuatrimestre</option>"
	Cuatrimestre.append(nuevaOpcion);
	nuevaOpcion = "<option value='II Cuatrimestre'>II Cuatrimestre</option>"
	Cuatrimestre.append(nuevaOpcion);
	nuevaOpcion = "<option value='III Cuatrimestre'>III Cuatrimestre</option>"
	Cuatrimestre.append(nuevaOpcion);

	$("#Ano").datepicker({
		changeYear: true,
		showButtonPanel: true,
		yearRange: "c-10:c+10",
		dateFormat: "yy",
		closeText: "Seleccionar",
		currentText: "Actual",

		onClose: function (dateText, inst) {
			var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
			$(this).datepicker('setDate', new Date(year, 1, 1));
		}
	});
}

function cargaDropdownListSedes() {
	var url = '/Universidad/RetornaSedeNombre';
	//Parámetros del método
	var parametros = {
		nombre: ""
	};
	//Variable que determina el tipo de zona geografica
	var funcion = procesarResultadoSede;
	ejecutaAjax(url, parametros, funcion);
}

function procesarResultadoSede(data) {
	var Sede = $("#Sede");
	var nuevaOpcion = "<option value=''>Seleccione una sede</option>";

	Sede.empty();
	Sede.append(nuevaOpcion);

	$(data.resultado).each(function () {

		var objetoActual = this;

		nuevaOpcion = "<option value='" + objetoActual.id_SedeUniversitaria + "'>" + objetoActual.Nombre + "</option>";

		Sede.append(nuevaOpcion);
	})
}

function Validaciones() {
	$("#frmAgregaCuatrimestreXSede").validate({
		rules: {
			Sede: {
				required: true
			},
			Ano: {
				required: true,
				maxlength: 4
			},
			Cuatrimestre: {
				required: true,
				maxlength: 25
			},
		}

	});
}

function EventoClick() {
	$("#btnIngresar").on("click", function () {
		RetornaCuatrimestrexSede();
	})

	$("#btnAgregar").on("click", function () {
		$("#divDialog").dialog("open");
	})
}

function RetornaCuatrimestrexSede() {
	//Dirección a donde se enviarán los datos
	var url = '/Universidad/RetornaCuatrimestrexSede';
	//Parámetros del método
	var parametros = {
	};
	//Variable que determina el tipo de zona geografica
	var funcion = ResultadoRetornaCuatrimestrexSede;
	ejecutaAjax(url, parametros, funcion);
}

function ResultadoRetornaCuatrimestrexSede(data) {
	var formulario = $("#frmAgregaCuatrimestreXSede");

	formulario.validate();

	if (formulario.valid()) {
		var verificaCuatrixSedNoExiste = true;
		var Ano = $("#Ano").val();
		var Sede = $("#Sede").val();
		var Cuatrimestre = $("#Cuatrimestre").val();
		$(data.resultado).each(function () {
			var objActual = this;
			if (objActual.id_SedeUniversitaria == Sede && objActual.PeriodoLectivo == Cuatrimestre && objActual.Ano == Ano) {
				verificaCuatrixSedNoExiste = false;
			}
		})

		if (verificaCuatrixSedNoExiste) {
			IngresarCuatrimestrexSede(Ano, Sede, Cuatrimestre);
		}
		else {
			alert("Ya existe un mismo cuatrimetre por sede ingresado")
		}
	}
}

function IngresarCuatrimestrexSede(pAno, pSede, pCuatrimestre) {
	//Dirección a donde se enviarán los datos
	var url = '/Universidad/AgregaCuatrimestreXSede';
	//Parámetros del método
	var parametros = {
		Ano: pAno,
		Sede: pSede,
		Cuatrimestre: pCuatrimestre
	};
	//Variable que determina el tipo de zona geografica
	var funcion = ResultadoInsertarCuatrimestrexSede;
	ejecutaAjax(url, parametros, funcion);
}

function ResultadoInsertarCuatrimestrexSede(data) {
	alert(data);
	$("#divDialog").dialog("close");
	cargaDropdownListCuatrimestre_Ano();
	cargaDropdownListSedes();
	cargaKendo();
	$('#divKendoGrid').data('kendoGrid').dataSource.read(); 
	$('#divKendoGrid').data('kendoGrid').refresh();
	
}