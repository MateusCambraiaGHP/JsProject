$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);


var arraydefrases = [];

function fraseAleatoria() {
    $("#spinner").show();
  
    $.get("http://localhost:3000/frases", data => {
        trocaFraseAleatoria(data);
    }).fail(function () {
        $("#erro").show();
        setTimeout(function () {
            $("#erro").toggle();
        }, 2500);
    }).always(function () {
        $("#spinner").toggle()
    });
}


function trocaFraseAleatoria(data) {
    arraydefrases = data;
    let frase = $(".frase");
    let contadorAleatorio = Math.floor(Math.random() * arraydefrases.length); 
    if(arraydefrases[contadorAleatorio].texto === frase.text()){
        trocaFraseAleatoria(data);
    }
    frase.text(arraydefrases[contadorAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(arraydefrases[contadorAleatorio].tempo);
}

function buscaFrase() {
   let fraseId = $("#frase-id").val();
   let dados = { id: fraseId};
    $("#spinner").show();
    $.get("http://localhost:3000/frases", dados, trocaFrase
    ).fail(function () {
        $("#erro").show();
        setTimeout(function () {
            $("#erro").toggle();
        }, 2500);
    }).always(function () {
        $("#spinner").toggle()
    });
}

function trocaFrase(data){
    let frase = $(".frase");
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}