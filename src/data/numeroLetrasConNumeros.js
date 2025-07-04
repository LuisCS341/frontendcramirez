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

export function numeroLetrasAreaLote(valor) {
    const UNIDADES = [
        '', 'UNO', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE',
        'DIEZ', 'ONCE', 'DOCE', 'TRECE', 'CATORCE', 'QUINCE', 'DIECISÉIS', 'DIECISIETE', 'DIECIOCHO', 'DIECINUEVE'
    ];

    const DECENAS = [
        '', '', 'VEINTE', 'TREINTA', 'CUARENTA', 'CINCUENTA', 'SESENTA', 'SETENTA', 'OCHENTA', 'NOVENTA'
    ];

    const CENTENAS = [
        '', 'CIENTO', 'DOSCIENTOS', 'TRESCIENTOS', 'CUATROCIENTOS', 'QUINIENTOS',
        'SEISCIENTOS', 'SETECIENTOS', 'OCHOCIENTOS', 'NOVECIENTOS'
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

    function convertirSeccion(num) {
        if (num === 0) return '';
        if (num < 1000) return convertirCentenas(num);

        const miles = Math.floor(num / 1000);
        const resto = num % 1000;
        let resultado = '';

        if (miles === 1) {
            resultado = 'MIL';
        } else if (miles > 1) {
            resultado = convertirCentenas(miles) + ' MIL';
        }

        if (resto > 0) {
            resultado += ' ' + convertirCentenas(resto);
        }

        return resultado;
    }

    function convertirNumero(num) {
        if (num === 0) return 'CERO';

        const millones = Math.floor(num / 1000000);
        const restoMillones = num % 1000000;

        let resultado = '';

        if (millones === 1) {
            resultado = 'UN MILLÓN';
        } else if (millones > 1) {
            resultado = convertirSeccion(millones) + ' MILLONES';
        }

        if (restoMillones > 0) {
            resultado += (resultado ? ' ' : '') + convertirSeccion(restoMillones);
        }

        return resultado;
    }

    // Validar número
    if (isNaN(Number(valor)) || (typeof valor === 'string' && /[^\d.]/.test(valor))) {
        return '-';
    }

    const partes = Number(valor).toFixed(2).split('.');
    const entero = parseInt(partes[0], 10);
    const decimales = parseInt(partes[1], 10);

    let resultado = '';

    if (entero > 0) {
        resultado = convertirNumero(entero).trim().toUpperCase();
    } else if (decimales > 0) {
        resultado = 'CERO';
    } else {
        return 'CERO METROS CUADRADOS';
    }

    if (decimales > 0) {
        const textoDecimal = convertirCentenas(decimales).trim().toUpperCase();
        resultado += ` PUNTO ${textoDecimal}`;
    }

    return `${resultado} METROS CUADRADOS`;
}


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

    return num.toString();
}

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

export function numeroLetrasEntero(numero) {
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
        if (n === 0) return "CERO";

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

        return texto.trim().toUpperCase();
    }

    return convertirEntero(parseInt(numero, 10));
}

export function numeroLetrasSinDecimal(valor) {
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


    valor = Number(valor).toFixed(2);

    const partes = valor.split('.');

    const entero = parseInt(partes[0], 10);
    const decimal = partes[1];

    const textoEntero = convertirMiles(entero).trim().toUpperCase() || 'CERO';

    return `${textoEntero} CON ${decimal}/100 SOLES`;
}

export function numeroLetrascuotaletras(valor) {
    const UNIDADES = [
        '', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve',
        'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'
    ];

    const DECENAS = [
        '', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'
    ];

    const CENTENAS = [
        '', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos',
        'seiscientos', 'setecientos', 'ochocientos', 'novecientos'
    ];

    function convertirCentenas(num) {
        if (num === 100) return 'cien';
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
                resultado += (resultado ? ' ' : '') + DECENAS[dec];
                if (uni > 0) {
                    resultado += ' y ' + UNIDADES[uni]; // ← "veinte y seis"
                }
            }
        }
        return resultado;
    }

    function convertirMiles(num) {
        if (num === 0) return 'cero';
        if (num < 1000) return convertirCentenas(num);
        let miles = Math.floor(num / 1000);
        let resto = num % 1000;
        let resultado = '';

        if (miles === 1) {
            resultado = 'mil';
        } else {
            resultado = convertirCentenas(miles) + ' mil';
        }

        if (resto > 0) {
            resultado += ' ' + convertirCentenas(resto);
        }
        return resultado;
    }

    valor = parseInt(valor, 10); // Solo entero
    const textoEntero = convertirMiles(valor).trim();

    return textoEntero;
}
