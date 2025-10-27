let valor1 = 0;
let operacion = "";
const botonera = document.getElementById("botonera");
const operacionespanel = document.getElementById("operaciones");
const visor = document.getElementById("visor");

for (let index = 0; index < 10; index++) {
    const boton = document.createElement("button");
    boton.className = "calculator__button";
    boton.textContent = index;
    boton.addEventListener("click", mostrarNumero);
    botonera.appendChild(boton);
}

const operaciones = ["+", "-", "/", "*", "^"];
operaciones.forEach(simbolo => {
    const btnOp = document.createElement("button");
    btnOp.className = "calculator__button calculator__button--operator";
    btnOp.textContent = simbolo;
    btnOp.addEventListener("click", seleccionarOperacion);
    operacionespanel.appendChild(btnOp);
});

const igual = document.createElement("button");
igual.className = "calculator__button calculator__button--equal";
igual.textContent = "=";
igual.addEventListener("click", calcularResultado);
operacionespanel.appendChild(igual);

function mostrarNumero(event) {
    visor.value += event.target.textContent;
}

function seleccionarOperacion(event) {
    valor1 = Number(visor.value);
    operacion = event.target.textContent;
    visor.value = "";
}

function calcularResultado() {
    const valor2 = Number(visor.value);
    let resultado = 0;

    switch (operacion) {
        case "+": resultado = valor1 + valor2; break;
        case "-": resultado = valor1 - valor2; break;
        case "/": resultado = valor1 / valor2; break;
        case "*": resultado = valor1 * valor2; break;
        case "^": resultado = valor1 ** valor2; break;
    }

    visor.value = resultado;
}
