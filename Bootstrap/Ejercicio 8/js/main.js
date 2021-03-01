var operador = "";
var resultado = 0;
var neg1 = false;
var neg2 = false;
var position = false;


$(function () {

    $(".num").on("click",
        function (event) {
            agregarNumero(this.id);
        });


    $("#borra").on("click",
        function () {
            retroceder();
        });

    $("#dividir").on("click",
        function () {
            dividir();
        });

    $("#multiplicar").on("click",
        function () {
            multiplicar();
        });

    $("#restar").on("click",
        function () {
            restar();
        });

    $("#coma").on("click",
        function () {
            punto();
        })

    $("#sumar").on("click",
        function () {
            sumar();
        })

    $("#calcular").on("click",
        function () {
            calcular();
        })

});

function agregarNumero(id) {
    var texto = $("#calculo");
    texto.val(texto.val() + id);
}

function punto() {
    var texto = $("#calculo");
    texto.val(texto.val() + ".");
}

function sumar() {
    if (operador == "" && obtenerPrimerValor() != "") {
        var numero = $("#calculo");
        operador = "+";
        numero.val(numero.val() + operador);
    }
}

function restar() {
    var numero = $("#calculo");
    if (operador == "" && obtenerPrimerValor() != "") {
        operador = "-";
        numero.val(numero.val() + operador);
    } else if (operador == "" && !neg1) {
        numero.val("-");
        neg1 = true
    } else if (operador != "" && !neg2) {
        numero.val(numero.val() + "-");
        neg2 = true
    }
}

function dividir() {
    if (operador == "" && obtenerPrimerValor() != "") {
        var numero = $("#calculo");
        operador = "/";
        numero.val(numero.val() + operador);
    }
}

function multiplicar() {
    if (operador == "" && obtenerPrimerValor() != "") {
        var numero = $("#calculo");
        operador = "*";
        numero.val(numero.val() + operador);
    }
}

function calcular() {
    switch (operador) {
        case "+":
            resultado = parseFloat(obtenerPrimerValor()) + parseFloat(obtenerSegundoValor());
            $("#resultado").val($("#calculo").val() + "=" + resultado);
            resetearVariables()
            break;
        case "-":
            resultado = parseFloat(obtenerPrimerValor()) - parseFloat(obtenerSegundoValor());
            $("#resultado").val($("#calculo").val() + "=" + resultado);
            resetearVariables()

            break;
        case "*":
            resultado = parseFloat(obtenerPrimerValor()) * parseFloat(obtenerSegundoValor());
            $("#resultado").val($("#calculo").val() + "=" + resultado);
            resetearVariables()

            break;
        case "/":
            resultado = parseFloat(obtenerPrimerValor()) / parseFloat(obtenerSegundoValor());
            $("#resultado").val($("#calculo").val() + "=" + resultado);
            resetearVariables()

            break;
    }


}

function obtenerPrimerValor() {
    var texto = $("#calculo").val()
    var index = buscarOperador(texto);
    if (index == -1) return texto;
    else return texto.substring(0, index);
}

function obtenerSegundoValor() {
    var texto = $("#calculo").val()
    var index = buscarOperador(texto);
    return texto.substring(index + 1, texto.length)
}

function buscarOperador(texto) {
    for (var i = 0; i < texto.length; i++) {
        if (i != 0 && texto.charAt(i) == operador) {
            return i;
        }
    }
    return -1;
}

function resetearVariables() {
    primerValor = 0;
    operador = "";
    segundoValor = "";
    resultado = 0;
    porTeclado = false;
    $("#calculo").val("")
}


function retroceder() {
    var texto = $("#calculo").val()

    if (texto.length < 1) {
        $("#calculo").val("");
    } else {
        var code = esSignoNegativo(texto)
        if (code == 1) {
            neg1 = false;
        } else if (code == 2) {
            neg2 = false;
        }
        var nuevaCadena = texto.substring(0, texto.length - 1);
        $("#calculo").val(nuevaCadena);
        if (buscarOperador($("#calculo").val()) == -1) {
            operador = ""
        }
    }
}

function esSignoNegativo(texto) {
    if (texto.length == 1 && texto.charAt(texto.length - 1) == "-") {
        return 1;
    } else if (texto.length > 1 && texto.charAt(texto.length - 1) == "-" && texto.charAt(texto.length - 2) == operador) {
        return 2;
    } else {
        return 3;
    }
}


