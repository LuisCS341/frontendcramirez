export function numeroALetras(numero) {
    const unidades = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];

    // Aseguramos que el número tenga 4 decimales
    const numeroStr = Number(numero).toFixed(4);
    const [parteEnteraStr, parteDecimalStr] = numeroStr.split('.');

    // Convertimos la parte entera dígito por dígito
    const parteEnteraLetras = parteEnteraStr.split('').map(d => unidades[parseInt(d)]).join(' ');

    // Convertimos la parte decimal dígito por dígito
    const parteDecimalLetras = parteDecimalStr.split('').map(d => unidades[parseInt(d)]).join(' ');

    return `${parteEnteraLetras} punto ${parteDecimalLetras}`.trim();
}
