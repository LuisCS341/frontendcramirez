export function numeroLetrasSinDecimal(valor) {
    const unidades = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];

    const numeroStr = valor.toString(); // aquí garantizamos que sea string
    let resultado = '';

    for (const caracter of numeroStr) {
        if (caracter === '.') {
            resultado += 'punto ';
        } else if (caracter >= '0' && caracter <= '9') {
            resultado += unidades[parseInt(caracter)] + ' ';
        }
    }

    return resultado.trim();
}
