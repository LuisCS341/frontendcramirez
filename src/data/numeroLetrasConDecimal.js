export function numeroLetrasConDecimal(numero) {
    const unidades = ["", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
    const especiales = ["diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve"];
    const decenas = ["", "", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
    const centenas = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];

    function convertirCientos(n) {
        if (n === 0) return "";
        if (n === 100) return "cien";

        let resultado = "";

        const c = Math.floor(n / 100);
        const d = Math.floor((n % 100) / 10);
        const u = n % 10;
        const dosDigitos = n % 100;

        if (c > 0) resultado += centenas[c] + " ";

        if (dosDigitos >= 10 && dosDigitos <= 19) {
            resultado += especiales[dosDigitos - 10];
        } else if (dosDigitos >= 21 && dosDigitos <= 29) {
            resultado += "veinti" + unidades[u];
        } else {
            if (d > 0) resultado += decenas[d];
            if (d > 2 && u > 0) resultado += " y ";
            if (d !== 1 && u > 0) resultado += unidades[u];
        }

        return resultado.trim();
    }

    function convertirEntero(n) {
        if (n === 0) return "cero";

        let miles = Math.floor(n / 1000);
        let resto = n % 1000;

        let texto = "";

        if (miles === 1) {
            texto += "mil";
        } else if (miles > 1) {
            texto += convertirCientos(miles) + " mil";
        }

        if (resto > 0) {
            texto += " " + convertirCientos(resto);
        }

        return texto.trim();
    }

    function convertirDecimal(decimalStr) {
        const numeroDecimal = parseInt(decimalStr, 10);
        return convertirEntero(numeroDecimal);
    }

    const numeroStr = Number(numero).toFixed(2); // dos decimales
    const [enteroStr, decimalStr] = numeroStr.split('.');

    const parteEntera = parseInt(enteroStr, 10);
    const parteDecimal = decimalStr;

    const parteEnteraLetras = convertirEntero(parteEntera);
    const parteDecimalLetras = convertirDecimal(parteDecimal);

    return `${parteEnteraLetras} punto ${parteDecimalLetras}`.toUpperCase();
}
