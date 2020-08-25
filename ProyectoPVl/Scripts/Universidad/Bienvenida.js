$(function () {
    iniciafecha();
  
});


function iniciafecha() {
    var capturarfecha = $("#FechaUlIngreso").val();
    var formFecha = capturarfecha.substr(0, 9);
    $("#Fecha_Inicio").text(formFecha)
}
