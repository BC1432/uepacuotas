function deleteVault(userVaultId) {
    alertify.confirm('Verificacion', 'Estas seguro que quieres eliminar esta tarjeta',
        function () { window.location = "/UepaPayPaymentMethod.aspx?delete=" + userVaultId; }
        , function () { });
}

$(document).ready(function () {
    if ($('#ContentPlaceHolder1_ContentPlaceHolder2_errores') != null) {
        var mensaje = $('#ContentPlaceHolder1_ContentPlaceHolder2_errores').text();
        if (mensaje != "") {
            alertify.warning(mensaje);
        }
    }
    buscarNumeroTarjetas();
});

function buscarNumeroTarjetas() {
    if ($('.card-numbers') != null) {
        $('.card-numbers').each(function () {
            var arrayResultado = obtenerTextos(this.firstChild.data);
            var imagenTarjeta = arrayResultado.imagenTarjeta;
            var numeracionTarjeta = arrayResultado.enumeracion;
            this.firstChild.remove(this.firstChild);

            var EnumeracionTarjetaSpan = document.createElement("span");
            $(EnumeracionTarjetaSpan).text(numeracionTarjeta);
            this.append(EnumeracionTarjetaSpan);
            var imagenEncontrada = obtenerImagen(imagenTarjeta);


            var elementoImg = $(this.parentElement).find(".card-icon");
            elementoImg[0].src = imagenEncontrada;
        });
    }
}

function buscarNumeroTarjetasDefault() {
    $('.card-numbers').each(function () {
        var arrayResultado = obtenerTextos($(this).text());
        var imagenTarjeta = arrayResultado.imagenTarjeta;
        var numeracionTarjeta = arrayResultado.enumeracion;

        $(this).text(numeracionTarjeta);
        var imagenEncontrada = obtenerImagen(imagenTarjeta);
        var elementoImg = $(this.parentElement).find(".card-icon");
        if (imagenEncontrada != "")
            elementoImg[0].src = imagenEncontrada;
    });
}

function createCard() {
    $('#create-card-modal').modal('show');
}

function obtenerImagen(nombreTarjeta) {
    Imagenes = {};
    Imagenes["visa"] = "visa.svg";
    Imagenes["mastercard"] = "mastercard.svg";
    Imagenes["amex"] = "americanexpress.svg";
    Imagenes["otra"] = "card.svg"

    nombreTarjeta = nombreTarjeta.replace(" ", "");
    nombreTarjeta = nombreTarjeta.toLowerCase();
    var url = "/images/tarjetasIconos/";
    var nombreicon = Imagenes[nombreTarjeta];
    if (nombreicon == null)
        nombreicon = Imagenes["otra"];
    url = url + nombreicon;
    return url;
}

function obtenerTextos(elstring) {
    var imagenTarjeta = "";
    var enumeracion = "";
    var indice = 0;
    if (elstring) {
        for (var i = 0; i < elstring.length; i++) {
            if (elstring[i] == "*") {
                enumeracion = elstring.substring(indice, elstring.length);
                break;
            }
            imagenTarjeta += elstring[i];
            indice++;
        }
    }
    var textosObtenidos = {imagenTarjeta, enumeracion };
    return textosObtenidos;
}
