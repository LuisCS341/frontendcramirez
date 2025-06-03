export function numeroLetrasConNumeros(valor) {
    const UNIDADES = [
        '', 'UNO', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE',
        'DIEZ', 'ONCE', 'DOCE', 'TRECE', 'CATORCE', 'QUINCE', 'DIECISÉIS', 'DIECISIETE', 'DIECIOCHO', 'DIECINUEVE'
    ];

    const DECENAS = [
        '', '', 'VEINTE', 'TREINTA', 'CUARENTA', 'CINCUENTA', 'SESENTA', 'SETENTA', 'OCHENTA', 'NOVENTA'
    ];

    const CENTENAS = [
        '', 'CIENTO', 'DOSCIENTOS', 'TRESCIENTOS', 'CUATROCIENTOS', 'QUINIENTOS', 'SEISCIENTOS', 'SETECIENTOS', 'OCHOCIENTOS', 'NOVECIENTOS'
    ];

    function convertirCentenas(num) {
        if (num === 100) return 'CIEN';
        let centenas = Math.floor(num / 100);
        let decenas = num % 100;
        let resultado = '';
        if (centenas > 0) {
            resultado = CENTENAS[centenas];
        }
        if (decenas > 0) {
            if (decenas < 20) {
                resultado += (resultado ? ' ' : '') + UNIDADES[decenas];
            } else {
                let dec = Math.floor(decenas / 10);
                let uni = decenas % 10;
                if (dec === 2 && uni > 0) {
                    resultado += (resultado ? ' ' : '') + 'VEINTI' + UNIDADES[uni].toLowerCase();
                } else {
                    resultado += (resultado ? ' ' : '') + DECENAS[dec];
                    if (uni > 0) resultado += ' Y ' + UNIDADES[uni];
                }
            }
        }
        return resultado;
    }

    function convertirMiles(num) {
        if (num === 0) return '';
        if (num < 1000) return convertirCentenas(num);
        let miles = Math.floor(num / 1000);
        let resto = num % 1000;
        let resultado = '';

        if (miles === 1) {
            resultado = 'MIL';
        } else {
            resultado = convertirCentenas(miles) + ' MIL';
        }

        if (resto > 0) {
            resultado += ' ' + convertirCentenas(resto);
        }
        return resultado;
    }

    // Validar que sea un número válido y no contenga letras
    if (isNaN(valor) || typeof valor === 'string' && /[^\d.]/.test(valor)) {
        return '-';
    }

    valor = Number(valor).toFixed(2);

    const partes = valor.split('.');

    const entero = parseInt(partes[0], 10);
    const decimal = partes[1];

    const textoEntero = convertirMiles(entero).trim().toUpperCase() || 'CERO';

    return `${textoEntero} CON ${decimal}/100 SOLES`;
}

export function numeroLetrasConNumerosDolares(valor) {
    const UNIDADES = [
        '', 'UNO', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE',
        'DIEZ', 'ONCE', 'DOCE', 'TRECE', 'CATORCE', 'QUINCE', 'DIECISÉIS', 'DIECISIETE', 'DIECIOCHO', 'DIECINUEVE'
    ];

    const DECENAS = [
        '', '', 'VEINTE', 'TREINTA', 'CUARENTA', 'CINCUENTA', 'SESENTA', 'SETENTA', 'OCHENTA', 'NOVENTA'
    ];

    const CENTENAS = [
        '', 'CIENTO', 'DOSCIENTOS', 'TRESCIENTOS', 'CUATROCIENTOS', 'QUINIENTOS', 'SEISCIENTOS', 'SETECIENTOS', 'OCHOCIENTOS', 'NOVECIENTOS'
    ];

    function convertirCentenas(num) {
        if (num === 100) return 'CIEN';
        let centenas = Math.floor(num / 100);
        let decenas = num % 100;
        let resultado = '';
        if (centenas > 0) {
            resultado = CENTENAS[centenas];
        }
        if (decenas > 0) {
            if (decenas < 20) {
                resultado += (resultado ? ' ' : '') + UNIDADES[decenas];
            } else {
                let dec = Math.floor(decenas / 10);
                let uni = decenas % 10;
                if (dec === 2 && uni > 0) {
                    resultado += (resultado ? ' ' : '') + 'VEINTI' + UNIDADES[uni].toLowerCase();
                } else {
                    resultado += (resultado ? ' ' : '') + DECENAS[dec];
                    if (uni > 0) resultado += ' Y ' + UNIDADES[uni];
                }
            }
        }
        return resultado;
    }

    function convertirMiles(num) {
        if (num === 0) return '';
        if (num < 1000) return convertirCentenas(num);
        let miles = Math.floor(num / 1000);
        let resto = num % 1000;
        let resultado = '';

        if (miles === 1) {
            resultado = 'MIL';
        } else {
            resultado = convertirCentenas(miles) + ' MIL';
        }

        if (resto > 0) {
            resultado += ' ' + convertirCentenas(resto);
        }
        return resultado;
    }

    // Validar que sea un número válido y no contenga letras
    if (isNaN(valor) || typeof valor === 'string' && /[^\d.]/.test(valor)) {
        return '-';
    }

    valor = Number(valor).toFixed(2);

    const partes = valor.split('.');

    const entero = parseInt(partes[0], 10);
    const decimal = partes[1];

    const textoEntero = convertirMiles(entero).trim().toUpperCase() || 'CERO';

    return `${textoEntero} CON ${decimal}/100 DOLARES AMERICANOS`;
}

