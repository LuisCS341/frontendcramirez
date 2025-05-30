export function numeroATexto(num) {
    const unidades = ["", "UNO", "DOS", "TRES", "CUATRO", "CINCO", "SEIS", "SIETE", "OCHO", "NUEVE"];
    const especiales = ["DIEZ", "ONCE", "DOCE", "TRECE", "CATORCE", "QUINCE"];
    const decenas = ["", "", "VEINTE", "TREINTA", "CUARENTA", "CINCUENTA", "SESENTA", "SETENTA", "OCHENTA", "NOVENTA"];
    const centenas = ["", "CIENTO", "DOSCIENTOS", "TRESCIENTOS", "CUATROCIENTOS", "QUINIENTOS", "SEISCIENTOS", "SETECIENTOS", "OCHOCIENTOS", "NOVECIENTOS"];

    if (num === 0) return "CERO";
    if (num === 100) return "CIEN";

    if (num < 10) return unidades[num];
    if (num >= 10 && num < 16) return especiales[num - 10];
    if (num < 100) {
        const d = Math.floor(num / 10);
        const u = num % 10;
        if (d === 2 && u !== 0) return "VEINTI" + unidades[u].toLowerCase();
        return decenas[d] + (u ? " Y " + unidades[u] : "");
    }
    if (num < 1000) {
        const c = Math.floor(num / 100);
        return centenas[c] + (num % 100 !== 0 ? " " + numeroATexto(num % 100) : "");
    }
    if (num < 10000) {
        const m = Math.floor(num / 1000);
        const resto = num % 1000;
        const mil = m === 1 ? "MIL" : unidades[m] + " MIL";
        return mil + (resto !== 0 ? " " + numeroATexto(resto) : "");
    }

    return num.toString(); // Para números mayores a 9999, si lo necesitas
}