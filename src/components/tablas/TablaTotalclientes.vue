<template>
  <div class="primary-container">
    <div class="secundary-container">
      <div class="items">
        <input class="buscador" type="text" v-model="busquedaGlobal" placeholder="Buscar cliente..."/>

        <button @click="exportarClientesXLSX" class="btn-accion btn-exportar">Exportar Clientes</button>
      </div>

      <div class="table-container">
        <table class="table">
          <thead>
          <tr>
            <th>TIPO DE CONTRATO</th>
            <th>CLIENTE Nº</th>
            <th>CONTRATO Nº</th>
            <th>PROYECTO</th>
            <th>EMPRESA QUE VENDE</th>
            <th>RUC VENDEDOR</th>
            <th>DIRECCION VENDEDOR</th>
            <th>REPRESENTANTE LEGAL - VENDEDOR</th>
            <th>DNI VENDEDOR</th>
            <th>Nº PARTIDA (PODER VENDEDOR)</th>
            <th>MONEDA</th>
            <th>NUM. CUENTA</th>
            <th>CCI</th>
            <th>FECHA DE ENTREGA DE PROYECTO</th>
            <th>FECHA DE FIRMA DE CONTRATO DEFINITIVO</th>
            <th>AREA MATRIZ HAS.</th>
            <th>REGISTROS DE PARTIDA MATRIZ</th>
            <th>UBICACION DEL LOTE (PREDIO MATRIZ)</th>
            <th>UNIDAD CATASTRAL DE MATRIZ</th>
            <th>URBANIZACION DE MATRIZ</th>
            <th>DISTRITO DE MATRIZ</th>
            <th>PROVINCIA DE MATRIZ</th>
            <th>DEPARTAMENTO DE MATRIZ</th>
            <th>COMPRAVENTA DE MATRIZ</th>
            <th>SITUACION LEGAL DE MATRIZ</th>
            <th>CONSTANCIA DE NO ADEUDO MUNICIPAL Y MÁS(MATRIZ)</th>
            <th>AVANCE DE PROYECTO DE MATRIZ</th>
            <th>CRONOGRAMA DE MATRIZ</th>
            <th>FECHA DE INICIO DE CONTRARO</th>
            <th>FECHA DE CANCELACIÓN DE CONTRATO</th>
            <th>MZ-LT(CLIENTE)</th>
            <th>MZ(CLIENTE)</th>
            <th>LT(CLIENTE) </th>
            <th>ÁREA DE LETRAS(CLIENTE)</th>
            <th>ÁREA DEL LOTE (CLIENTE)</th>
            <th>CUOTA IDEAL EN LETRAS</th>
            <th>CUOTA IDEAL(CLIENTE)</th>
            <th>POR EL FRENTE</th>
            <th>POR LA DERECHA</th>
            <th>POR LA IZQUIERDA</th>
            <th>POR EL FONDO</th>
            <th>N°IDENTIFICACIÓN(CLIENTE)</th>
            <th>TIPO DE DOCUMENTO(CLIENTE)</th>
            <th>NOMBRES Y APELLIDOS(CLIENTE)</th>
            <th>NACIONALIDAD(CLIENTE)</th>
            <th>ESTADO CIVIL (CLIENTE)</th>
            <th>ESTADO CIVIL (COMPRADORES)</th>
            <th>DIRECCIÓN-COMPRADOR (CLIENTE)</th>
            <th>DISTRITO(CLIENTE)</th>
            <th>PROVINCIA(CLIENTE)</th>
            <th>DEPARTAMENTO (CLIENTE)</th>
            <th>OCUPACIÓN</th>
            <th>NÚMERO DE DOCUMENTO(CÓNYUGE)(CLIENTE)</th>
            <th>TIPO DE DOCUMENTO(CÓNYUGE)(CLIENTE)</th>
            <th>NOMBRE COMPLETO(CÓNYUGE)(CLIENTE)</th>
            <th>OCUPACION(CÓNYUGE)</th>
            <th>DOMICILIO(CÓNYUGE)</th>
            <th>DISTRITO(CÓNYUGE)</th>
            <th>PROVINCIA(CÓNYUGE)</th>
            <th>DEPARTAMENTO (CÓNYUGE)</th>
            <th>COSTO DEL LOTE(CLIENTE) EN NÚMERO</th>
            <th>COSTO DEL LOTE(CLIENTE) EN LETRAS</th>
            <th>PAGO INICIAL(CLIENTE)INCLUIDO SEPARACION</th>
            <th>SEPARACIÓN(CLIENTE)</th>
            <th>CANTIDAD DE CUOTAS(CLIENTE)</th>
            <th>MONTO DE CUOTAS(CLIENTE)</th>
            <th>CANTIDAD CUOTA EXTRAORDINARIA(CLIENTE)</th>
            <th>MONTO DE CUOTA EXTRAORDINARIA (CLIENTE)</th>
            <th>MANTENIMIENTO MENSUAL EN NÚMERO(CLIENTE)</th>
            <th>MANTENIMIENTO MENSUAL EN LETRAS(CLIENTE)</th>
            <th>ESTADO DE CUENTA(CLIENTE)(DE TENER DEUDA PONER MONTO)</th>
            <th>MONTO DE DEUDA EN LETRAS(CLIENTE)</th>
            <th>CUOTAS PENDIENTES DE PAGO</th>
            <th>DIA DE PAGO EN NÚMERO Y LETRAS</th>
            <th>CARTA DE NO ADEUDO(CLIENTE)</th>
            <th>CERTIFICADO DE LOTE(CLIENTE)</th>
            <th>MEDIOS DE PAGO(CLIENTE)</th>
            <th>PLANOS 1(CLIENTE)</th>
            <th>PLANOS 2(CLIENTE)</th>
            <th>ENVIO DE MINUTA(CLIENTE)</th>
            <th>CORREO ELECTRONICO(CLIENTE)</th>
            <th>CELULAR(CLIENTE)</th>
            <th>FECHA DE CITA(CLIENTE)</th>
            <th>HORA DE CITA(CLIENTE)</th>
            <th>N°ATENCIÓN INTRANET(CLIENTE)</th>
            <th>MODIFICACIÓN DE MINUTA(CLIENTE)</th>
            <th>MINUTA ESCANEADA(CLIENTE)FIRMADA</th>
            <th>EXPEDIENTE NOTARIA</th>
            <th>LLENÓ INFORMACIÓN</th>
            <th>PERSONA QUE SACÓ CITA</th>
            <th>PERSONA QUE ATIENDE</th>
            <th>FIRMÓ</th>
            <th></th>

          </tr>
          </thead>
          <tbody>
          <tr v-for="(cliente) in clientes" :key="cliente.idCliente">
            <td>
              <template v-if="cliente.editando">
                <select v-model="getLote(cliente).tipoContratolote">
                  <option v-for="tipo in tiposContrato()" :key="tipo.id" :value="tipo.id">
                    {{ tipo.nombre }}
                  </option>
                </select>
              </template>
              <template v-else>
                {{ getLote(cliente)?.contrato ?? '-' }}
              </template>
            </td>
            <td>{{ cliente.cliente.idCliente.toString().padStart(5, '0') }}</td>
            <td>{{ getLote(cliente)?.idLote ?? '-'}}</td>
            <td>{{ getLote(cliente)?.tipoProyecto ?? '-' }}</td>

            <td>
              <div v-if="!cliente.editando">{{ getLote(cliente)?.empresaVende ?? '-' }}</div>
              <div v-else>
                <input v-model="getLote(cliente).empresaVende" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getLote(cliente)?.rucVendedor ?? '-' }}</div>
              <div v-else>
                <input v-model="getLote(cliente).rucVendedor" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getLote(cliente)?.direccionVendedor ?? '-' }}</div>
              <div v-else>
                <input v-model="getLote(cliente).direccionVendedor" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getLote(cliente)?.representanteLegalVendedor ?? '-' }}</div>
              <div v-else>
                <input v-model="getLote(cliente).representanteLegalVendedor" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getLote(cliente)?.dniVendedor ?? '-' }}</div>
              <div v-else>
                <input v-model="getLote(cliente).dniVendedor" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getLote(cliente)?.numeroPartidaPoderVendedor ?? '-' }}</div>
              <div v-else>
                <input v-model="getLote(cliente).numeroPartidaPoderVendedor" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getLote(cliente)?.moneda ?? '-' }}</div>
              <div v-else>
                <input v-model="getLote(cliente).moneda" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getLote(cliente)?.numCuenta ?? '-' }}</div>
              <div v-else>
                <input v-model="getLote(cliente).numCuenta" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getLote(cliente)?.cci ?? '-' }}</div>
              <div v-else>
                <input v-model="getLote(cliente).cci" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getLote(cliente)?.fechaSale ?? '-' }}</div>
              <div v-else>
                <input v-model="getLote(cliente).fechaSale" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getLote(cliente)?.fechaFirmaContratoDefinitivo ?? '-' }}</div>
              <div v-else>
                <input v-model="getLote(cliente).fechaFirmaContratoDefinitivo" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getMatriz(getLote(cliente))?.areaMatrizHas ?? '-' }}</div>
              <div v-else>
                <input v-model="getMatriz(getLote(cliente)).areaMatrizHas" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getMatriz(getLote(cliente))?.registrosDE ?? '-' }}</div>
              <div v-else>
                <input v-model="getMatriz(getLote(cliente)).registrosDE" />
              </div>
            </td>

            <td>{{ getMatriz(getLote(cliente))?.ubicacion ?? '-' }}</td>
            <td>
              <div v-if="!cliente.editando">{{ getLote(cliente)?.unidadCatastralMatriz ?? '-' }}</div>
              <div v-else>
                <input v-model="getLote(cliente).unidadCatastralMatriz" />
              </div>
            </td>

            <td>{{ getMatriz(getLote(cliente))?.urbanizacionMatriz ?? '-' }}</td>
            <td>{{ getMatriz(getLote(cliente))?.distrito ?? '-' }}</td>
            <td>{{ getMatriz(getLote(cliente))?.provincia ?? '-' }}</td>
            <td>{{ getMatriz(getLote(cliente))?.departamento ?? '-' }}</td>
            <td>
              <div v-if="!cliente.editando">{{ getMatriz(getLote(cliente))?.compraventaMatriz ?? '-' }}</div>
              <div v-else>
                <input v-model="getMatriz(getLote(cliente)).compraventaMatriz" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getMatriz(getLote(cliente))?.situacionLegal ?? '-' }}</div>
              <div v-else>
                <input v-model="getMatriz(getLote(cliente)).situacionLegal" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getMatriz(getLote(cliente))?.constancianoadeudo ?? '-' }}</div>
              <div v-else>
                <input v-model="getMatriz(getLote(cliente)).constancianoadeudo" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getMatriz(getLote(cliente))?.avanceproyectomatriz ?? '-' }}</div>
              <div v-else>
                <input v-model="getMatriz(getLote(cliente)).avanceproyectomatriz" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getMatriz(getLote(cliente))?.cronogramamatriz ?? '-' }}</div>
              <div v-else>
                <input v-model="getMatriz(getLote(cliente)).cronogramamatriz" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">
                {{ getLote(cliente)?.fechaInicioContrato ?? '-' }}
              </div>
              <div v-else>
                <input
                    type="text"
                    v-model="getLote(cliente).fechaInicioContrato"
                    @input="formatearFecha($event, 'inicio', getLote(cliente))"
                    placeholder="dd/mm/aaaa"
                    maxlength="10"
                />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">
                {{ getLote(cliente)?.fechaCancelacionContrato ?? '-' }}
              </div>
              <div v-else>
                <input
                    type="text"
                    v-model="getLote(cliente).fechaCancelacionContrato"
                    @input="formatearFecha($event, 'cancelacion', getLote(cliente))"
                    placeholder="dd/mm/aaaa"
                    maxlength="10"
                />
              </div>
            </td>

            <td>{{ getLote(cliente)?.manzana && getLote(cliente)?.numeroLote ? `MZ ${getLote(cliente).manzana} - LT ${getLote(cliente).numeroLote}` : '-' }}</td>
            <td>
              <div v-if="!cliente.editando">{{ getLote(cliente)?.manzana ?? '-' }}</div>
              <div v-else>
                <input v-model="getLote(cliente).manzana" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getLote(cliente)?.numeroLote ?? '-' }}</div>
              <div v-else>
                <input v-model="getLote(cliente).numeroLote" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getLote(cliente)?.areaLoteLetras ?? '-' }}</div>
              <div v-else>
                <input v-model="getLote(cliente).areaLoteLetras" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getLote(cliente)?.areaLote ?? '-' }}</div>
              <div v-else>
                <input v-model="getLote(cliente).areaLote" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getMatriz(getLote(cliente))?.alicuotaLetras ?? '-' }}</div>
              <div v-else>
                <input v-model="getMatriz(getLote(cliente)).alicuotaLetras" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getMatriz(getLote(cliente))?.alicuota ?? '-' }}</div>
              <div v-else>
                <input v-model="getMatriz(getLote(cliente)).alicuota" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getLindero(getLote(cliente))?.porElFrente ?? '-' }}</div>
              <div v-else>
                <input v-model="getLindero(getLote(cliente)).porElFrente" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getLindero(getLote(cliente))?.porLaDerecha ?? '-' }}</div>
              <div v-else>
                <input v-model="getLindero(getLote(cliente)).porLaDerecha" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getLindero(getLote(cliente))?.porLaIzquierda ?? '-' }}</div>
              <div v-else>
                <input v-model="getLindero(getLote(cliente)).porLaIzquierda" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getLindero(getLote(cliente))?.porElFondo ?? '-' }}</div>
              <div v-else>
                <input v-model="getLindero(getLote(cliente)).porElFondo" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ cliente.cliente.numeroIdentificacion ?? '-' }}</div>
              <div v-else>
                <input v-model="cliente.cliente.numeroIdentificacion" />
              </div>
            </td>

            <td>{{ cliente.cliente.documentoIdentificacion ?? '-'}}</td>

            <td>
              <div v-if="!cliente.editando">{{ cliente.cliente.nombresApellidos ?? '-' }}</div>
              <div v-else>
                <input v-model="cliente.cliente.nombresApellidos" />
              </div>
            </td>
            <td>{{ cliente.cliente.residencia ?? '-'}}</td>
            <td>{{ cliente.cliente.estadoCivil ?? '-'}}</td>
            <td>{{ getCopropietario(cliente.cliente).estadoCivilCopropietarios ?? '-'}}</td>
            <td>
              <div v-if="!cliente.editando">{{ cliente.cliente.direccion ?? '-' }}</div>
              <div v-else>
                <input v-model="cliente.cliente.direccion" />
              </div>
            </td>
            <td>{{ cliente.cliente.distrito ?? '-' }}</td>
            <td>{{ cliente.cliente.provincia ?? '-'}}</td>
            <td>{{ cliente.cliente.departamento ?? '-'}}</td>
            <td>
              <div v-if="!cliente.editando">{{ cliente.cliente.ocupacion ?? '-' }}</div>
              <div v-else>
                <input v-model="cliente.cliente.ocupacion" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getConyuge(cliente.cliente).numeroIdentificacionConyuge ?? '-' }}</div>
              <div v-else>
                <input v-model="getConyuge(cliente.cliente).numeroIdentificacionConyuge" />
              </div>
            </td>

            <td>{{ getConyuge(cliente.cliente).documentoIdentificacionConyuge ?? '-' }}</td>
            <td>
              <div v-if="!cliente.editando">{{ getConyuge(cliente.cliente).nombresApellidosConyuge ?? '-' }}</div>
              <div v-else>
                <input v-model="getConyuge(cliente.cliente).nombresApellidosConyuge" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getConyuge(cliente.cliente).ocupacionConyuge ?? '-' }}</div>
              <div v-else>
                <input v-model="getConyuge(cliente.cliente).ocupacionConyuge" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getConyuge(cliente.cliente).direccionConyuge ?? '-' }}</div>
              <div v-else>
                <input v-model="getConyuge(cliente.cliente).direccionConyuge" />
              </div>
            </td>

            <td>{{ getConyuge(cliente.cliente).distritoConyuge ?? '-' }}</td>
            <td>{{ getConyuge(cliente.cliente).provinciaConyuge ?? '-' }}</td>
            <td>{{ getConyuge(cliente.cliente).departamentoConyuge ?? '-' }}</td>
            <td>
              <div v-if="!cliente.editando">{{ getLote(cliente).costoLote ?? '-' }}</div>
              <div v-else>
                <input v-model="getLote(cliente).costoLote" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getLote(cliente).montoLetras ?? '-' }}</div>
              <div v-else>
                <input v-model="getLote(cliente).montoLetras" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getLote(cliente).pagoInicial ?? '-' }}</div>
              <div v-else>
                <input v-model="getLote(cliente).pagoInicial" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getLote(cliente).separacion ?? '-' }}</div>
              <div v-else>
                <input v-model="getLote(cliente).separacion" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getLote(cliente).cantidadCuotas ?? '-' }}</div>
              <div v-else>
                <input v-model="getLote(cliente).cantidadCuotas" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getLote(cliente).montoCuotas ?? '-' }}</div>
              <div v-else>
                <input v-model="getLote(cliente).montoCuotas" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getCuotaExtraordinaria(getLote(cliente))?.cantidadCuotaExtraordinaria ?? '-' }}</div>
              <div v-else>
                <input v-model="getCuotaExtraordinaria(getLote(cliente)).cantidadCuotaExtraordinaria" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getCuotaExtraordinaria(getLote(cliente))?.montoCuotaExtraordinaria ?? '-' }}</div>
              <div v-else>
                <input v-model="getCuotaExtraordinaria(getLote(cliente)).montoCuotaExtraordinaria" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getCuotaExtraordinaria(getLote(cliente))?.mantenimientoMensual ?? '-' }}</div>
              <div v-else>
                <input v-model="getCuotaExtraordinaria(getLote(cliente)).mantenimientoMensual" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getCuotaExtraordinaria(getLote(cliente))?.mantenimientoMensualLetras ?? '-' }}</div>
              <div v-else>
                <input v-model="getCuotaExtraordinaria(getLote(cliente)).mantenimientoMensualLetras" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getCuotaExtraordinaria(getLote(cliente))?.estadoCuenta ?? '-' }}</div>
              <div v-else>
                <input v-model="getCuotaExtraordinaria(getLote(cliente)).estadoCuenta" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getCuotaExtraordinaria(getLote(cliente))?.montoDeudaLetra ?? '-' }}</div>
              <div v-else>
                <input v-model="getCuotaExtraordinaria(getLote(cliente)).montoDeudaLetra" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ getCuotaExtraordinaria(getLote(cliente))?.cuotaPendientePago ?? '-' }}</div>
              <div v-else>
                <input v-model="getCuotaExtraordinaria(getLote(cliente)).cuotaPendientePago" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ cliente.cliente.diaPagoNumero ?? '-' }}</div>
              <div v-else>
                <input v-model="cliente.cliente.diaPagoNumero" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ cliente.cliente.cartaNoAdeudo ?? '-' }}</div>
              <div v-else>
                <input v-model="cliente.cliente.cartaNoAdeudo" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ cliente.cliente.certificadolote ?? '-' }}</div>
              <div v-else>
                <input v-model="cliente.cliente.certificadolote" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ cliente.cliente.mediospago ?? '-' }}</div>
              <div v-else>
                <input v-model="cliente.cliente.mediospago" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ cliente.cliente.planos1 ?? '-' }}</div>
              <div v-else>
                <input v-model="cliente.cliente.planos1" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ cliente.cliente.planos2 ?? '-' }}</div>
              <div v-else>
                <input v-model="cliente.cliente.planos2" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ cliente.cliente.envioMinuta ?? '-' }}</div>
              <div v-else>
                <input v-model="cliente.cliente.envioMinuta" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ cliente.cliente.correoElectronico ?? '-' }}</div>
              <div v-else>
                <input v-model="cliente.cliente.correoElectronico" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ cliente.cliente.celularCliente ?? '-' }}</div>
              <div v-else>
                <input v-model="cliente.cliente.celularCliente" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ cliente.cliente.fechaCita ?? '-' }}</div>
              <div v-else>
                <input v-model="cliente.cliente.fechaCita" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ cliente.cliente.horaCita ?? '-' }}</div>
              <div v-else>
                <input v-model="cliente.cliente.horaCita" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ cliente.cliente.atencionIntranet ?? '-' }}</div>
              <div v-else>
                <input v-model="cliente.cliente.atencionIntranet" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ cliente.cliente.modificacionMinuta ?? '-' }}</div>
              <div v-else>
                <input v-model="cliente.cliente.modificacionMinuta" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ cliente.cliente.minutaEscaneada ?? '-' }}</div>
              <div v-else>
                <input v-model="cliente.cliente.minutaEscaneada" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ cliente.cliente.expedienteNotaria ?? '-' }}</div>
              <div v-else>
                <input v-model="cliente.cliente.expedienteNotaria" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ cliente.cliente.llenoInformacion ?? '-' }}</div>
              <div v-else>
                <input v-model="cliente.cliente.llenoInformacion" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ cliente.cliente.personaSacoCita ?? '-' }}</div>
              <div v-else>
                <input v-model="cliente.cliente.personaSacoCita" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ cliente.cliente.personaAtiende ?? '-' }}</div>
              <div v-else>
                <input v-model="cliente.cliente.personaAtiende" />
              </div>
            </td>

            <td>
              <div v-if="!cliente.editando">{{ cliente.cliente.firmo ?? '-' }}</div>
              <div v-else>
                <input v-model="cliente.cliente.firmo" />
              </div>
            </td>

            <td>
              <button v-if="!cliente.editando" @click="activarEdicion(cliente)">Editar</button>
              <button v-else @click="guardarEdicion(cliente)">Guardar</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script >
import "@/assets/tablas/Tablas.css";
import axios from "axios";
import * as XLSX from "xlsx";
import {ubicaciones} from "@/data/ubicaciones.js";
import {tiposContrato} from "@/data/tiposContrato.js";

export default {
  data() {
    return {
      clientes: [],
      lotes: [],
      ubicaciones: [],
      busquedaGlobal: "",
      filtros: {
        nombresApellidos: "",
        direccion: "",
        correoElectronico: "",
        celularCliente: "",
        documentoIdentificacion: "",
        numeroIdentificacion: "",
        estadoCivil: "",
        ocupacion: "",
        residencia: "",
        prefijoPais: "",
        idTipoContrato: "",
      },
    };
  },
  mounted() {
    this.obtenerDatosCombinados();
  },

  methods: {
    tiposContrato() {
      return tiposContrato
    },

    async obtenerDatosCombinados() {
      try {
        const response = await axios.get("https://backendcramirez.onrender.com/api/clientes/conlotes", {
          headers: {"Content-Type": "application/json"},
          withCredentials: true,
        });

        console.log(response.data);

        this.clientes = response.data.map(cliente => ({
          ...cliente,
          editando: false
        }));
      } catch (error) {
        console.error("Error al obtener datos combinados:", error);
        alert("Error al obtener datos de clientes y lotes.");
      }
    },

    // Método para obtener el primer lote o un objeto vacío si no existe
    getLote(cliente) {
      return Array.isArray(cliente.lotes) ? cliente.lotes[0] || {} : {};
    },
    // Método para obtener el primer elemento de la matriz o un objeto vacío
    getMatriz(lote) {
      return Array.isArray(lote.matriz) ? lote.matriz[0] || {} : {};
    },
    // Método para obtener el primer lindero o un objeto vacío
    getLindero(lote) {
      return lote && lote.lindero ? lote.lindero : null;
    },

    getCuotaExtraordinaria(lote) {
      return Array.isArray(lote.cuotasExtraordinarias) && lote.cuotasExtraordinarias.length > 0
          ? lote.cuotasExtraordinarias[0]
          : null;
    },

    // Método para obtener el cónyuge o un objeto vacío si no existe
    getConyuge(cliente) {
      return cliente && cliente.conyuge ? cliente.conyuge : {};
    },

    getCopropietario(cliente) {
      return Array.isArray(cliente.copropietarios) ? cliente.copropietarios[0] || {} : {};
    },


    activarEdicion(cliente) {
      if (cliente) {
        cliente.editando = true;
        const lote = this.getLote(cliente);

        if (!lote.tipoContratolote) {

          lote.tipoContratolote = lote.contratoId || (this.tiposContrato()[0] && this.tiposContrato()[0].id) || null;
        }
      }
    },
    guardarEdicion(cliente) {
      if (cliente) {
        cliente.editando = false;
      }
    },


    formatearFecha(event, tipo) {

      let input = event.target.value;
      input = input.replace(/[^0-9]/g, '');

      if (input.length > 2) input = input.slice(0, 2) + '/' + input.slice(2);
      if (input.length > 5) input = input.slice(0, 5) + '/' + input.slice(5);
      if (input.length > 10) input = input.slice(0, 10);

      event.target.value = input;

      if (tipo === 'inicio') {
        let fechaInicioContrato;
        fechaInicioContrato = input;
      } else if (tipo === 'cancelacion') {
        let fechaCancelacionContrato;
        fechaCancelacionContrato = input;
      }
    },



    exportarClientesXLSX() {
      const encabezados = [
        "TIPO DE CONTRATO",
        "CLIENTE Nº",
        "CONTRATO Nº",
        "PROYECTO",
        "EMPRESA QUE VENDE",
        "RUC VENDEDOR",
        "DIRECCION VENDEDOR",
        "REPRESENTANTE LEGAL - VENDEDOR",
        "DNI VENDEDOR",
        "Nº PARTIDA (PODER VENDEDOR)",
        "MONEDA",
        "NUM. CUENTA",
        "CCI",
        "FECHA DE ENTREGA DE PROYECTO",
        "FECHA DE FIRMA DE CONTRATO DEFINITIVO",
        "AREA MATRIZ HAS.",
        "REGISTROS DE PARTIDA MATRIZ",
        "UBICACION DEL LOTE (PREDIO MATRIZ)",
        "UNIDAD CATASTRAL DE MATRIZ",
        "URBANIZACION DE MATRIZ",
        "DISTRITO DE MATRIZ",
        "PROVINCIA DE MATRIZ",
        "DEPARTAMENTO DE MATRIZ",
        "COMPRAVENTA DE MATRIZ",
        "SITUACION LEGAL DE MATRIZ",
        "CONSTANCIA DE NO ADEUDO MUNICIPAL Y MÁS(MATRIZ)",
        "AVANCE DE PROYECTO DE MATRIZ",
        "CRONOGRAMA DE MATRIZ",
        "FECHA DE INICIO DE CONTRARO",
        "FECHA DE CANCELACIÓN DE CONTRATO",
        "MZ-LT(CLIENTE)",
        "MZ(CLIENTE)",
        "LT(CLIENTE)",
        "ÁREA DE LETRAS(CLIENTE)",
        "ÁREA DEL LOTE (CLIENTE)",
        "CUOTA IDEAL EN LETRAS",
        "CUOTA IDEAL(CLIENTE)",
        "POR EL FRENTE",
        "POR LA DERECHA",
        "POR LA IZQUIERDA",
        "POR EL FONDO",
        "N°IDENTIFICACIÓN(CLIENTE)",
        "TIPO DE DOCUMENTO(CLIENTE)",
        "NOMBRES Y APELLIDOS(CLIENTE)",
        "NACIONALIDAD(CLIENTE)",
        "ESTADO CIVIL (CLIENTE)",
        "ESTADO CIVIL (COMPRADORES)",
        "DIRECCIÓN-COMPRADOR (CLIENTE)",
        "DISTRITO(CLIENTE)",
        "PROVINCIA(CLIENTE)",
        "DEPARTAMENTO (CLIENTE)",
        "OCUPACIÓN",
        "NÚMERO DE DOCUMENTO(CÓNYUGE)(CLIENTE)",
        "TIPO DE DOCUMENTO(CÓNYUGE)(CLIENTE)",
        "NOMBRE COMPLETO(CÓNYUGE)(CLIENTE)",
        "OCUPACION(CÓNYUGE)",
        "DOMICILIO(CÓNYUGE)",
        "DISTRITO(CÓNYUGE)",
        "PROVINCIA(CÓNYUGE)",
        "DEPARTAMENTO (CÓNYUGE)",
        "COSTO DEL LOTE(CLIENTE) EN NÚMERO",
        "COSTO DEL LOTE(CLIENTE) EN LETRAS",
        "PAGO INICIAL(CLIENTE)INCLUIDO SEPARACION",
        "SEPARACIÓN(CLIENTE)",
        "CANTIDAD DE CUOTAS(CLIENTE)",
        "MONTO DE CUOTAS(CLIENTE)",
        "CANTIDAD CUOTA EXTRAORDINARIA(CLIENTE)",
        "MONTO DE CUOTA EXTRAORDINARIA (CLIENTE)",
        "MANTENIMIENTO MENSUAL EN NÚMERO(CLIENTE)",
        "MANTENIMIENTO MENSUAL EN LETRAS(CLIENTE)",
        "ESTADO DE CUENTA(CLIENTE)(DE TENER DEUDA PONER MONTO)",
        "MONTO DE DEUDA EN LETRAS(CLIENTE)",
        "CUOTAS PENDIENTES DE PAGO",
        "DIA DE PAGO EN NÚMERO Y LETRAS",
        "CARTA DE NO ADEUDO(CLIENTE)",
        "CERTIFICADO DE LOTE(CLIENTE)",
        "MEDIOS DE PAGO(CLIENTE)",
        "PLANOS 1(CLIENTE)",
        "PLANOS 2(CLIENTE)",
        "ENVIO DE MINUTA(CLIENTE)",
        "CORREO ELECTRONICO(CLIENTE)",
        "CELULAR(CLIENTE)",
        "FECHA DE CITA(CLIENTE)",
        "HORA DE CITA(CLIENTE)",
        "N°ATENCIÓN INTRANET(CLIENTE)",
        "MODIFICACIÓN DE MINUTA(CLIENTE)",
        "MINUTA ESCANEADA(CLIENTE)FIRMADA",
        "EXPEDIENTE NOTARIA",
        "LLENÓ INFORMACIÓN",
        "PERSONA QUE SACÓ CITA",
        "PERSONA QUE ATIENDE",
        "FIRMÓ"
      ];

      const filas = this.clientes.map((item) => {
        const cliente = item.cliente ?? {};
        const lote = item.lotes?.[0] ?? {};
        const matriz = lote.matriz?.[0] ?? {};
        const lindero = lote.lindero ?? {};
        const copropietario = cliente.copropietarios?.[0] ?? {};
        const conyuge = cliente.conyuge ?? {};
        const cuotaExtra = lote.cuotasExtraordinarias?.[0] ?? {};


        return [
          lote?.contrato ?? '-',
          cliente.idCliente?.toString().padStart(5, '0') ?? '-',
          lote?.idLote ?? '-',
          lote?.tipoProyecto ?? '-',
          lote?.empresaVende ?? '-',
          lote?.rucVendedor ?? '-',
          lote?.direccionVendedor ?? '-',
          lote?.representanteLegalVendedor ?? '-',
          lote?.dniVendedor ?? '-',
          lote?.numeroPartidaPoderVendedor ?? '-',
          lote?.moneda ?? '-',
          lote?.numCuenta ?? '-',
          lote?.cci ?? '-',
          lote?.fechaSale ?? '-',
          lote?.fechaFirmaContratoDefinitivo ?? '-',
          matriz?.areaMatrizHas ?? '-',
          matriz?.registrosDE ?? '-',
          matriz?.ubicacion ?? '-',
          lote?.unidadCatastralMatriz ?? '-',
          matriz?.urbanizacionMatriz ?? '-',
          matriz?.distrito ?? '-',
          matriz?.provincia ?? '-',
          matriz?.departamento ?? '-',
          matriz?.situacionLegal ?? '-',
          matriz?.compraventaMatriz ?? '-',
          matriz?.constancianoadeudo ?? '-',
          matriz?.avanceproyectomatriz ?? '-',
          matriz?.cronogramamatriz ?? '-',
          lote?.fechaInicioContrato ?? '-',
          lote?.fechaCancelacionContrato ?? '-',
          lote?.manzana && lote?.numeroLote ? `MZ ${lote.manzana} - LT ${lote.numeroLote}` : '-',
          lote?.manzana ?? '-',
          lote?.numeroLote ?? '-',
          lote?.areaLoteLetras ?? '-',
          lote?.areaLote ?? '-',
          matriz?.alicuotaLetras ?? '-',
          matriz?.alicuota ?? '-',
          lindero?.porElFrente ?? '-',
          lindero?.porLaDerecha ?? '-',
          lindero?.porLaIzquierda ?? '-',
          lindero?.porElFondo ?? '-',
          cliente.numeroIdentificacion ?? '-',
          cliente.documentoIdentificacion ?? '-',
          cliente.nombresApellidos ?? '-',
          cliente.residencia ?? '-',
          cliente.estadoCivil ?? '-',
          copropietario?.estadoCivilCopropietarios ?? '-',
          cliente.direccion ?? '-',
          cliente.distrito ?? '-',
          cliente.provincia ?? '-',
          cliente.departamento ?? '-',
          cliente.ocupacion ?? '-',
          conyuge?.numeroIdentificacionConyuge ?? '-',
          conyuge?.documentoIdentificacionConyuge ?? '-',
          conyuge?.nombresApellidosConyuge ?? '-',
          conyuge?.ocupacionConyuge ?? '-',
          conyuge?.direccionConyuge ?? '-',
          conyuge?.distritoConyuge ?? '-',
          conyuge?.provinciaConyuge ?? '-',
          conyuge?.departamentoConyuge ?? '-',
          lote?.costoLote ?? '-',
          lote?.montoLetras ?? '-',
          lote?.pagoInicial ?? '-',
          lote?.separacion ?? '-',
          lote?.cantidadCuotas ?? '-',
          lote?.montoCuotas ?? '-',
          cuotaExtra?.cantidadCuotaExtraordinaria ?? '-',
          cuotaExtra?.montoCuotaExtraordinaria ?? '-',
          cuotaExtra?.mantenimientoMensual ?? '-',
          cuotaExtra?.mantenimientoMensualLetras ?? '-',
          cuotaExtra?.estadoCuenta ?? '-',
          cuotaExtra?.montoDeudaLetra ?? '-',
          cuotaExtra?.cuotaPendientePago ?? '-',
          cliente.diaPagoNumero ?? '-',
          cliente.cartaNoAdeudo ?? '-',
          cliente.certificadolote ?? '-',
          cliente.mediospago ?? '-',
          cliente.planos1 ?? '-',
          cliente.planos2 ?? '-',
          cliente.envioMinuta ?? '-',
          cliente.correoElectronico ?? '-',
          cliente.celularCliente ?? '-',
          cliente.fechaCita ?? '-',
          cliente.horaCita ?? '-',
          cliente.atencionIntranet ?? '-',
          cliente.modificacionMinuta ?? '-',
          cliente.minutaEscaneada ?? '-',
          cliente.expedienteNotaria ?? '-',
          cliente.llenoInformacion ?? '-',
          cliente.personaSacoCita ?? '-',
          cliente.personaAtiende ?? '-',
          cliente.firmonofirmo ?? '-',
        ];
      });

      const hoja = XLSX.utils.aoa_to_sheet([encabezados, ...filas]);
      const libro = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(libro, hoja, "Clientes");
      XLSX.writeFile(libro, "clientes.xlsx");
    },
  },
};
</script>
