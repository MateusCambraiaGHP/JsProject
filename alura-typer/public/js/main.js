var tempoInicial = $("#tempo-digitacao").text();

atualizaTamanhoDaFrase();
const campoDigitacao = $(".campo-digitacao");
inicializaContador();
let tempoRestante = $("#tempo-digitacao").text();
calculaTempoRestante(tempoRestante);
reiniciaJogo();



function validaResposta() {
    var frase = $(".frase").text();
    campoDigitacao.on("input", function () {
        var digitado = campoDigitacao.val();
        var comparavel = frase.substr(0, digitado.length);

        if (digitado == comparavel) {
            campoDigitacao.addClass("borda-verde");
            campoDigitacao.removeClass("borda-vermelha");
        } else {
            campoDigitacao.addClass("borda-vermelha");
            campoDigitacao.removeClass("borda-verde");
        }
    });
}
function atualizaTamanhoDaFrase() {
    let frase = $(".frase").text();
    let numPalavras = frase.split(" ").length;
    let tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}
function reiniciaJogo() {
    $("#botao-reinicia").click(function () {
        campoDigitacao.attr("disabled", false);
        campoDigitacao.css("background-color", "white")
        campoDigitacao.val("");
        contadorCaracteres.text("0");
        contadorPalavras.text("0");
        $("#tempo-digitacao").text(tempoInicial);
        calculaTempoRestante(tempoRestante);
        campoDigitacao.removeClass("borda-vermelha");
        campoDigitacao.removeClass("borda-verde");
    });
}
function inicializaContador() {
    campoDigitacao.on("input", function () {

        numcaracteres = this.value.length;
        numPalavras = this.value.split(/\S+/).length - 1;

        contadorCaracteres = $("#contador-caracteres")
        contadorPalavras = $("#contador-palavras")
        contadorCaracteres.text(numcaracteres);
        contadorPalavras.text(numPalavras);
        validaResposta();
    });
}
function calculaTempoRestante(tempoRestante) {
    campoDigitacao.one("focus", function () {
        var cronometroID = setInterval(function () {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante == 0) {
                campoDigitacao.attr("disabled", true);
                clearInterval(cronometroID);
                campoDigitacao.css("background-color", "lightgray")
            }
        }, 1000);
    });
}
