let frase = $(".frase").text();
let numPalavras = frase.split(" ").length;
let tamanhoFrase = $("#tamanho-frase");
tamanhoFrase.text(numPalavras);

// tamanhoFrase.text("aa");
const campoDigitacao = $(".campo-digitacao");
campoDigitacao.on("input", function () {

    numcaracteres = this.value.length;
    numPalavras = this.value.split(/\S+/).length - 1;

    contadorCaracteres = $("#contador-caracteres")
    contadorPalavras = $("#contador-palavras")

    contadorCaracteres.text(numcaracteres - numPalavras);
    contadorPalavras.text(numPalavras);
});

let tempoRestante = $("#tempo-digitacao").text();

campoDigitacao.one("focus", function () {
    var cronometroID = setInterval(function () {
        tempoRestante--;
        $("#tempo-digitacao").text(tempoRestante);
        console.log(tempoRestante);
        if (tempoRestante == 0) {
            campoDigitacao.attr("disabled", true);
            clearInterval(cronometroID);
        }
    }, 1000);
})