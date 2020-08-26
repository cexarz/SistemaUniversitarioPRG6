$(function () {
	cargaDropdownListCursos();
	Validaciones();
	CreaEventos();
});

function cargaDropdownListCursos() {
	var url = '/Universidad/RetornaCursoNombre';
	//Parámetros del método
	var parametros = {
		nombre: ""
	};
	//Variable que determina el tipo de zona geografica
	var funcion = procesarResultadoCursos;
	ejecutaAjax(url, parametros, funcion);
}

function procesarResultadoCursos(data) {
	var Curso = $("#Curso");
	var CursoRequerido = $("#CursoRequisito");

	var nuevaOpcion = "<option value=''>Seleccione una opción</option>";

	Curso.empty();
	CursoRequerido.empty();
	Curso.append(nuevaOpcion);
	CursoRequerido.append(nuevaOpcion);

	$(data.resultado).each(function () {

		var objetoActual = this;

		nuevaOpcion = "<option value='" + objetoActual.id_Curso + "'>" + objetoActual.Nombre + "</option>";

		Curso.append(nuevaOpcion);
		CursoRequerido.append(nuevaOpcion);
	})
}

function Validaciones() {
	$("#frmAgregaOfertaCursoxSede").validate({
		rules: {
			Curso: {
				required: true
			},
			Cupos: {
				required: true
			}
		}
	});
}

function CreaEventos() {
	$("#btnIngresar").on("click", function () {
		retornaOfertaAcademica();
	})
}

function retornaOfertaAcademica() {
	//Dirección a donde se enviarán los datos
	var url = '/Universidad/RetornaOfertaAcademica';
	//Parámetros del método
	var parametros = {
	};
	//Variable que determina el tipo de zona geografica
	var funcion = ResultadoRetornaOfertaAcademica;
	ejecutaAjax(url, parametros, funcion);
}

function ResultadoRetornaOfertaAcademica(data) {
	var formulario = $("#frmAgregaOfertaCursoxSede");

	formulario.validate();

	if (formulario.valid()) {
		var verificaOfertaNoExiste = true;
		var Id_CuatrimestreXSede = $("#id_CuatrimestreXSede").val();
		var Curso = $("#Curso").val();
		var Cupos = $("#Cupos").val();
		$(data.resultado).each(function () {
			var objActual = this;
			if (objActual.id_CuatrimestreXSede == Id_CuatrimestreXSede && objActual.id_Curso == Curso) {
				verificaOfertaNoExiste = false;
			}
		})

		if (verificaOfertaNoExiste) {
			IngresarOferta(Id_CuatrimestreXSede, Curso, Cupos);
		}
		else {
			alert("Ya existe una misma oferta académica")
		}
	}
}

function IngresarOferta(pId_CuatrimestreXSede, pCurso, pCupos) {
	//Dirección a donde se enviarán los datos
	var url = '/Universidad/AgregaOfertaCursoxSede';
	//Parámetros del método
	var parametros = {
		Id_CuatrimestreXSede: pId_CuatrimestreXSede,
		Curso: pCurso,
		Cupos: pCupos
	};
	//Variable que determina el tipo de zona geografica
	var funcion = ResultadoInsertarOferta;
	ejecutaAjax(url, parametros, funcion);
}

function ResultadoInsertarOferta(data) {
	alert(data);
	cargaDropdownListCursos();
	$("#Cupos").val("");
}