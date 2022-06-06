var tempoInicial = $("#tempo-digitacao").text();

atualizaTamanhoDaFrase();
const campoDigitacao = $(".campo-digitacao");
inicializaContador();
let tempoRestante = $("#tempo-digitacao").text();
calculaTempoRestante(tempoRestante);
reiniciaJogo();


function inserePlacar() {
   let corpotabela = $(".placar").find("tbody");
   let numPalavras = $("#contador-palavras").text();
   let user = "Mateus";
   let linha = novaLinha(user, numPalavras);
   linha.find(".botao-remover").click(removeLinha());
   corpotabela.append(linha);
}
function novaLinha(user, numPalavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(user);
    var colunaPalavras = $("<td>").text(numPalavras);
    var colunaRemover = $("<td>");
    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");
    link.append(icone);
    colunaRemover.append(link);
    linha.append(colunaUsuario).append(colunaPalavras).append(colunaRemover);
    return linha;
}
function removeLinha() {
    $(".botao-remover").click(function (event) {
        $(this).parent().parent().remove();
    });    
}


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
function inicializaContador() {
    campoDigitacao.on("input", function () {

        numcaracteres = this.value.length;
        numPalavras = this.value.split(/\S+/).length - 1;

        let contadorCaracteres = $("#contador-caracteres")
        let contadorPalavras = $("#contador-palavras")
        contadorCaracteres.text(numcaracteres);
        contadorPalavras.text(numPalavras);
        validaResposta();
    });
}
function reiniciaJogo() {
    $("#botao-reinicia").click(function () {
        let contadorCaracteres = $("#contador-caracteres")
        let contadorPalavras = $("#contador-palavras")
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
function calculaTempoRestante(tempoRestante) {
    campoDigitacao.one("focus", function () {
        var cronometroID = setInterval(function () {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante == 0) {
                finalizaJogo();
                clearInterval(cronometroID);
            }
        }, 1000);
    });
}
function finalizaJogo() {
    campoDigitacao.attr("disabled", true);
    campoDigitacao.css("background-color", "lightgray")
    inserePlacar();
}
