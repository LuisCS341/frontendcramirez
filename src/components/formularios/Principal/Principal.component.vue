<template>
  <div class="dashboard-container">
    <BarraLateralDashboard />
    <div class="main-content">
      <BarraSuperiorDashboard />
      <div class="container">

        <div class="formulario-all">

          <div v-if="formStep === 1">
            <form @submit.prevent="formularioClientevarios">
              <Cliente
                  :form="form"
              />

              <div v-if="form.estadoCivil === 2">
                <ClienteConyuge
                    :form="form"
                />
              </div>

              <button type="submit">Siguiente</button>
            </form>
          </div>

          <div v-if="formStep === 2">
            <form @submit.prevent="formularioLote">
              <h3>Información de Copropietarios</h3>

              <label>Número de Copropietarios:</label>
              <input v-model.number="form.numCopropietarios" type="number" min="0" max="5"   @input="validateNumCopropietarios"/>

              <div v-for="(copropietario, index) in form.copropietarios" :key="index">
                <Copropietario
                    :index="index"
                    :copropietario="copropietario"
                />

                <div v-if="copropietario.estadoCivilCopropietarios === 2">
                  <CopropietarioConyuge
                      :index="index"
                      :copropietario="copropietario"
                  />
                </div>
              </div>

              <h3>Datos de Lotes</h3>
              <label>Número de Lotes Adquiridos:</label>
              <input v-model.number="form.numLotes" type="number" min="0" @input="validateNumLote"/>

              <div v-for="(lote, index) in form.lotes" :key="index" >

                <Lote
                    :index="index"
                    :lote="lote"
                    :getUbicacionesFiltradas="getUbicacionesFiltradas"
                />

              </div>
              <button type="submit">Siguiente</button>
            </form>
          </div>

          <div v-if="formStep === 3">
            <form @submit.prevent="formularioLinderos" v-if="form.numLotes > 0">
              <div v-for="(lote, index) in form.lotes" :key="index">
                <Lindero
                    :lote="lote"
                    :index="index"
                />
              </div>
              <button type="submit">Siguiente</button>
            </form>
          </div>

          <div v-if="formStep === 4">
            <form @submit.prevent="formularioCuota" v-if="form.numLotes > 0">
              <div v-for="(lote, index) in form.lotes" :key="index">
                <Cuota
                    :lote="lote"
                    :index="index"
                />
              </div>
              <button type="submit">Siguiente</button>
            </form>
          </div>

          <div v-if="formStep === 5">
            <form @submit.prevent="formularioCuotaExtraordinaria">
              <div v-for="(lote, index) in form.lotes" :key="index">
                <CuotaExtraordinaria
                    v-if="lote.tieneCuotaExtraordinaria === 'si' && lote.cuotaextraordinaria"
                    :cuotaextraordinaria="lote.cuotaextraordinaria"
                    :lote="lote"
                    :index="index"
                />

              </div>
              <button type="submit">Siguiente</button>
            </form>
          </div>

          <div v-if="formStep === 6">
            <form @submit.prevent="formularioMatriz" v-if="form.numLotes > 0">
              <div v-for="(lote, index) in form.lotes" :key="index">
                <Matriz
                    :lote="lote"
                    :index="index"
                />
              </div>
              <button type="submit">Siguiente</button>
            </form>
          </div>

          <div v-if="formStep === 7">
            <ResumenRegistro
                :form="form"
                :obtenerNombrePais="obtenerNombrePais"
                :obtenerNombreResidencia="obtenerNombreResidencia"
                :obtenerNombreDepartamento="obtenerNombreDepartamento"
                :obtenerNombreProvincia="obtenerNombreProvincia"
                :obtenerNombreDistrito="obtenerNombreDistrito"
                :obtenerNombreProyecto="obtenerNombreProyecto"
            />
            <button type="button" class="btn btn-resumen" @click="cerrarResumen">Cerrar</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch ,onMounted  } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import BarraSuperiorDashboard from "@/layouts/BarraSuperiorDashboard.vue";
import BarraLateralDashboard from "@/layouts/BarraLateralDashboard.vue";
import {
  buildClientePayload,
  buildClienteConyugePayload,
  buildCopropietarioPayload,
  buildConyugePayload,
  buildLotePayload,
  buildCuotaExtraordinariaPayload,
  buildLinderoPayload,
  buildCuotaPayload, buildMatrizPayload
} from '@/data/payloadBuilder.js'
import {obtenerNombreResidencia, obtenerNombrePais, obtenerNombreDepartamento, obtenerNombreProvincia, obtenerNombreDistrito, obtenerNombreProyecto} from '@/data/utils.js';
import Cliente from "@/components/formularios/Cliente/Cliente.vue";
import ClienteConyuge from "@/components/formularios/Cliente/ClienteConyuge.vue";
import Copropietario from "@/components/formularios/Copropietario/Copropietario.vue";
import Lindero from "@/components/formularios/Lote/Lindero.vue";
import Lote from "@/components/formularios/Lote/Lote.vue";
import ResumenRegistro from "@/components/formularios/Resumen/ResumenRegistro.vue";
import CuotaExtraordinaria from "@/components/formularios/Lote/CuotaExtraordinaria.vue";
import "@/components/formularios/Cliente/Cliente.css"
import {ubicaciones} from "@/data/ubicaciones.js";
import {proyectos, proyectosT3Ids} from "@/data/proyectos.js";
import CopropietarioConyuge from "@/components/formularios/Copropietario/CopropietarioConyuge.vue";
import Cuota from "@/components/formularios/Lote/Cuota.vue";
import {numeroALetras, numeroLetrasSinDecimal} from "@/data/numeroLetrasConNumeros.js";
import {distritos} from "@/data/distritos.js";
import {provincias} from "@/data/provincias.js";
import {departamentos} from "@/data/departamentos.js";
import Matriz from "@/components/formularios/Lote/Matriz.vue";


const formStep = ref(1);
const router = useRouter();
const formularioActual = ref(1);
const idCliente=ref(null);
const form = ref({
  nombreCliente: '',
  ocupacionCliente: '',
  tipoIdentificacion: 1,
  numIdentificacionUsuario: '',
  nacionalidad: 8,
  paisdeResidencia: 8,
  departamento:'',
  provincia: '',
  distrito: '',
  direccion: '',
  correoUsuario: '',
  prefijoTelefonico: 8,
  numTelefonico: '',
  estadoCivil: 1,
  descripcionEstadoCivil: '',
  conyuge: {
    nombreClienteConyuge: '',
    ocupacionClienteConyuge: '',
    tipoIdentificacionClienteConyuge: 1,
    numIdentificacionClienteConyuge: '',
    paisOrigenClienteConyuge: 8,
    paisResidenciaClienteConyuge: 8,
    departamentoClienteConyuge: '',
    provinciaClienteConyuge: '',
    distritoClienteConyuge: '',
    direccionClienteConyuge: '',
  },
  numCopropietarios: 0,
  copropietarios: [],
  numLotes: 0,
  lotes: []
});

watch(() => form.value.numCopropietarios, (newValue) => {
  if (newValue > 0) {
    form.value.copropietarios = Array.from({ length: newValue }, () => ({
      nombreCopropietarios: '',
      ocupacionCopropietario: '',
      tipoIdentificacionCopropietarios: 1,
      numIdentificacionCopropietarios: '',
      paisOrigenCopropietarios: 8,
      paisResidenciaCopropietarios: 8,
      departamentoCopropietarios: '',
      provinciaCopropietarios: '',
      distritoCopropietarios: '',
      direccionCopropietariosHogar: '',
      estadoCivilCopropietarios: 1,
      descripcionEstadoCivil:"",
      conyugecopropietario: {
        nombreCopropietariosConyuge: '',
        ocupacionCopropietarioConyuge: '',
        tipoIdentificacionCopropietariosConyuge: 1,
        numIdentificacionCopropietariosConyuge: '',
        distritoCopropietariosConyuge: '',
        provinciaCopropietariosConyuge: '',
        departamentoCopropietariosConyuge: '',
        paisOrigenCopropietariosConyuge: 8,
        paisResidenciaCopropietariosConyuge: 8,
        direccionCopropietariosConyuge: '',
      }
    }));
  } else {
    form.value.copropietarios = [];
  }
}, { immediate: true });

watch(() => form.value.numLotes, (newVal) => {
  form.value.lotes = Array.from({ length: newVal }, () => ({
    proyectolote:'',
    ubicacionLote: '',
    empresa:'',
    empresaVendedora:'',
    ruc:'',
    direccion:'',
    tipoRepresentante:'',
    representanteLegal:'',
    dniVendedor:'',
    partidaPoder:'',
    moneda:'',
    numCuenta:'',
    cci:'',
    fechaSale:'',
    fechaFirma:'',
    areaMatriz:'',
    registrosDe:'',
    partidaMatriz:'',
    ubicacionPredio:'',
    unidadCatastral:'',
    urbanizacionMatriz:'',
    distritoMatriz:'',
    provinciaMatriz:'',
    departamentoMatriz:'',
    compraventaMatriz:'',
    situacionLegalMatriz:'',
    manzanalote: '',
    numerolote: '',
    tipoContratolote: '',
    fechaInicioContrato: '',
    fechaCancelacionContrato: '',
    areaLote: '',
    areaLoteLetras: '',
    costoLote: '',
    costoLoteLetras: '',
    precioMetroCuadrado: '',
    precioMetroCuadradoLetras: '',
    cuotaInicialIncluyeSeparacion: '',
    cuotaInicialIncluyeSeparacionLetras: '',
    fechaPago: '',
    cantidadCuotas: '',
    cantidadCuotaLetras: '',
    cuentaRecaudadora: '',
    montoCuotas: '',
    montoCuotaLetras: '',
    fechaEntrega: '',
    mantenimientoMensual: '',
    mantenimientoMensualLetras: '',
    alicuota:'',
    alicuotaLetras:'',
    cuota:{
      mediosPago: '',
      letrasPendientePago:'',
      cuentaRecaudadora:'',
      cuotaInicialIncluyeSeparacion:'',
      CuotaInicialIncluyeSeparacionLetras:'',
      montoCuotas:'',
      montoCuotaLetras:'',
      fechaPago:'',
      cuotaInicialBanco:'',
      cantidadCuotas:'',
      cantidadCuotaLetras:'',
      cantidadCuotaCuentaRecaudadora:'',
      cantidadCuotaBanco:'',
      cuotaPendientePago: '',
      saldoLote:'',
      saldoLoteLetras:'',
      estadoCuenta: '',
      montoDeudaLetra: '',
    },
    matriz: {
      departamentoMatriz: '',
      provinciaMatriz: '',
      distritoMatriz: '',
      ubicacionMatriz: '',
      areaMatrizHasMatriz: '',
      registroDeMatriz: '',
      partidaMatriz: '',
      unidadCatastralMatriz: '',
      urbanizacionMatriz: '',
      compraventaMatriz: '',
      situacionLegalMatriz: '',
    },
    lindero:{
      porLaDerechaLindero: '',
      porLaIzquierdaLindero: '',
      porElFrenteLindero: '',
      porElFondoLindero: '',
    },
    tieneCuotaExtraordinaria: null,
    cuotaextraordinaria: {
      cantidadCuotaExtraordinaria: '',
      cantidadCuotaExtraordinariaLetras: '',
      montoCuotaExtraordinaria: '',
      montoCuotaExtraordinariaLetras: '',
    }
  }));
});

const validateNumLote = () =>{
  if (form.value.numLotes === '' || isNaN(form.value.numLotes)) {
    form.value.numLotes = 0;
  }
  if (form.value.numLotes < 0 || isNaN(form.value.numLotes)) {
    form.value.numLotes = 0;
  }
  if (form.value.numLotes > 15) {
    form.value.numLotes = 15;
  }
};

const validateNumCopropietarios = () => {

  if (form.value.numCopropietarios === '' || isNaN(form.value.numCopropietarios)) {
    form.value.numCopropietarios = 0;
  }

  if (form.value.numCopropietarios < 0 || isNaN(form.value.numCopropietarios)) {
    form.value.numCopropietarios = 0;
  }
  if (form.value.numCopropietarios > 5) {
    form.value.numCopropietarios = 5;
  }
};

const formularioClientevarios = async () => {
  const confirmacion = window.confirm("¿Estás seguro de que todos los datos están correctos?");
  if (!confirmacion) return;

  try {
    const userData = JSON.parse(localStorage.getItem("user"));
    const idOperario = userData?.idOperario;

    if (!idOperario) {
      console.error("No se encontró un ID de operario en localStorage.");
      return;
    }

    const clientePayload = buildClientePayload(form.value);


    const idClienteClone = localStorage.getItem("idClienteClone");
    if (idClienteClone) {
      clientePayload.idClienteClone = parseInt(idClienteClone);
      console.log("Incluyendo idClienteClone:", clientePayload.idClienteClone);
    }


    console.log("Datos del Cliente a enviar:", clientePayload);

    const response = await axios.post("https://backendcramirez.onrender.com/api/clientes", clientePayload, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": idOperario
      }
    });

    console.log("Respuesta del backend:", response.data);
    idCliente.value = response.data.idCliente;
    form.value.idCliente = response.data.idCliente;
    console.log("ID del cliente asignado:", form.value.idCliente);

    if (form.value.estadoCivil === 2) {
      const conyugePayload = buildClienteConyugePayload(form.value, idCliente.value);
      console.log("Datos del Cónyuge a enviar:", conyugePayload);

      await axios.post("https://backendcramirez.onrender.com/api/clienteConyuges", conyugePayload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "X-User-ID": idOperario
        }
      });

      console.log("Datos del cónyuge registrados con éxito.");
    }

    formStep.value++;
  } catch (error) {
    console.error("Error al enviar los datos:", error.response?.data || error);
  }
};

const formularioLote = async () => {

  if (form.value.numLotes <= 0) {
    alert("Debe ingresar al menos un lote para continuar.");
    return;
  }

  const confirmacion = window.confirm("¿Estás seguro de que todos los datos están correctos?");
  if (!confirmacion) {
    return;
  }

  try {
    if (!idCliente.value) {
      console.error("Error: ID del cliente no encontrado.");
      return;
    }

    console.log("ID del cliente antes de enviar lotes:", idCliente.value);
    const userData = JSON.parse(localStorage.getItem("user"));
    const idOperario = userData?.idOperario;

    if (!idOperario) {
      console.error("No se encontró un ID de operario en localStorage.");
      return;
    }

    const requests = [];

    if (form.value.numCopropietarios > 0) {
      for (const copropietario of form.value.copropietarios) {
        const copropietarioPayload = buildCopropietarioPayload(idCliente.value, copropietario);
        const { data: nuevoCopropietario } = await axios.post("https://backendcramirez.onrender.com/api/copropietario", copropietarioPayload, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-User-ID": idOperario,
          },
        });

        copropietario.idCopropietario = nuevoCopropietario.idCopropietario;
        console.log("Copropietario guardado con id:", nuevoCopropietario.idCopropietario);
        localStorage.setItem("idCopropietario", nuevoCopropietario.idCopropietario);


        if (copropietario.estadoCivilCopropietarios === 2 && copropietario.conyuge) {
          const conyugePayload = buildConyugePayload(idCliente.value, copropietario.conyuge);
          requests.push(
              axios.post("https://backendcramirez.onrender.com/api/copropietarioconyuge", conyugePayload, {
                withCredentials: true,
                headers: {
                  "Content-Type": "application/json",
                  "X-User-ID": idOperario,
                },
              })
          );
        }
      }
    }

    if (form.value.numLotes > 0) {
      for (const lote of form.value.lotes) {
        const lotePayload = buildLotePayload(idCliente.value, lote);

        const { data: nuevoLote } =await axios.post("https://backendcramirez.onrender.com/api/lotes", lotePayload, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-User-ID": idOperario,
          },
        });

        lote.idLote = nuevoLote.idLote;
        console.log(`Lote guardado con idLote: ${nuevoLote.idLote}`);

        if (nuevoLote.codigoLoteCliente) {
          localStorage.setItem("codigoLoteCliente", nuevoLote.codigoLoteCliente);
          console.log("Código Lote Cliente guardado:", nuevoLote.codigoLoteCliente);
        }
      }
    }

    await Promise.all(requests);

    console.log("Copropietarios y lotes registrados con éxito.");
    formStep.value++;
  } catch (error) {
    console.error("Error al enviar copropietarios y lotes:", error);
  }
};

const formularioCuotaExtraordinaria = async () => {

  if (!form.value?.lotes?.length) {
    console.log('No hay lotes disponibles para registrar CuotaExtraordinaria.');
    return;
  }

  try {

    const lotesConCuota = form.value.lotes.filter(
        lote => lote.tieneCuotaExtraordinaria === 'si' && lote.cuotaextraordinaria
    );

    const requests = lotesConCuota.map(lote => {
      const payload = buildCuotaExtraordinariaPayload(lote);
      return axios.post('https://backendcramirez.onrender.com/api/cuotaextraordinaria', payload);
    });

    await Promise.all(requests);

    console.log('CuotaExtraordinaria registrados con éxito.');

    formStep.value++;
  } catch (error) {
    console.error('Error al registrar la CuotaExtraordinaria:', error.response?.data || error.message);
  }
};

const formularioCuota = async () => {
  if (!form.value?.lotes?.length) {
    console.warn('No hay lotes disponibles para registrar Cuota.');
    return;
  }

  try {
    const requests = form.value.lotes.map(lote => {
      const payload = buildCuotaPayload(lote);
      return axios.post('https://backendcramirez.onrender.com/api/cuota', payload);
    });

    await Promise.all(requests);

    console.log('Cuota registrados con éxito.');

    formStep.value++;
  } catch (error) {
    console.error('Error al registrar los Cuota:', error.response?.data || error.message);
  }
};

const formularioLinderos = async () => {
  if (!form.value?.lotes?.length) {
    console.warn('No hay lotes disponibles para registrar linderos.');
    return;
  }

  try {
    const requests = form.value.lotes.map(lote => {
      const payload = buildLinderoPayload(lote);
      return axios.post('https://backendcramirez.onrender.com/api/lindero', payload);
    });

    await Promise.all(requests);

    console.log('Linderos registrados con éxito.');

    formStep.value++;
  } catch (error) {
    console.error('Error al registrar los linderos:', error.response?.data || error.message);
  }
};

const formularioMatriz = async () => {
  if (!form.value?.lotes?.length) {
    console.warn('No hay lotes disponibles para registrar matriz.');
    return;
  }

  try {
    const requests = form.value.lotes.map(lote => {
      const payload = buildMatrizPayload(lote);
      return axios.post('https://backendcramirez.onrender.com/api/matriz', payload);
    });

    await Promise.all(requests);

    console.log('Matriz registrados con éxito.');
    formularioActual.value = 2;

    formStep.value++;
  } catch (error) {
    console.error('Error al registrar matriz:', error.response?.data || error.message);
  }
};

let timeoutIdConyuge;

watch(() => form.value.conyuge.numIdentificacionClienteConyuge, async (documento) => {
  const longitudEsperada = 8;

  if (timeoutIdConyuge) clearTimeout(timeoutIdConyuge);


  if (documento.length !== longitudEsperada) {
    return;
  }

  timeoutIdConyuge = setTimeout(async () => {
    try {
      const response = await fetch(`https://backendcramirez.onrender.com/api/buscarCliente/${documento}`);

      if (!response.ok) throw new Error('Cliente no encontrado');

      const data = await response.json();
      form.value.conyuge.nombreClienteConyuge = data.nombreCompleto || '';
    } catch (error) {
      console.error('Error al buscar cliente:', error);
      form.value.conyuge.nombreClienteConyuge = '';
    }
  }, 600);
});

let timeoutIdCopropietarios;

watch(() => form.value.copropietarios, (copropietarios) => {
  if (timeoutIdCopropietarios) clearTimeout(timeoutIdCopropietarios);

  timeoutIdCopropietarios = setTimeout(async () => {
    for (let i = 0; i < copropietarios.length; i++) {
      const copropietario = copropietarios[i];
      const documento = copropietario.numeroIdentificacionCopropietarios;
      const longitudEsperada = 8;

      if (documento && documento.length === longitudEsperada) {
        try {
          const response = await fetch(`https://backendcramirez.onrender.com/api/buscarCliente/${documento}`);
          if (!response.ok) throw new Error('Cliente no encontrado');
          const data = await response.json();
          copropietario.nombreCopropietarios = data.nombreCompleto || '';
        } catch (error) {
          console.error('Error al buscar cliente:', error);
          copropietario.nombreCopropietarios = '';
        }
      }

      const conyuge = copropietario.conyuge;
      const docConyuge = conyuge?.numeroIdentificacionCopropietariosConyuge;

      if (docConyuge && docConyuge.length === longitudEsperada) {
        try {
          const response = await fetch(`https://backendcramirez.onrender.com/api/buscarCliente/${docConyuge}`);
          if (!response.ok) throw new Error('Cliente no encontrado');
          const data = await response.json();
          conyuge.nombreCopropietariosConyuge = data.nombreCompleto || '';
        } catch (error) {
          console.error('Error al buscar cliente:', error);
          conyuge.nombreCopropietariosConyuge = '';
        }
      }
    }
  }, 600);
}, { deep: true });


onMounted(() => {
  const nombreGuardado = localStorage.getItem('nombreCompleto');
  const numeroDocumentoGuardado = localStorage.getItem('numeroDocumento');
  const clienteCompleto = JSON.parse(localStorage.getItem('clienteCompleto'));

  if (nombreGuardado) {
    form.value.nombreCliente = nombreGuardado;
  }

  if (numeroDocumentoGuardado) {
    form.value.numIdentificacionUsuario = numeroDocumentoGuardado;
  }

  if (clienteCompleto) {
    form.value.nombreCliente = clienteCompleto.nombresApellidos || '';
    form.value.ocupacionCliente = clienteCompleto.ocupacion || '';
    form.value.tipoIdentificacion = clienteCompleto.idIdentificacion || '';
    form.value.paisOrigen = clienteCompleto.idNacionalidad || '';
    form.value.paisdeResidencia = clienteCompleto.idResidencia  || '';
    form.value.departamento = clienteCompleto.idDepartamento || '';
    form.value.provincia = clienteCompleto.idProvincia || '';
    form.value.distrito = clienteCompleto.idDistrito || '';
    form.value.direccion = clienteCompleto.direccion || '';
    form.value.correoUsuario = clienteCompleto.correoElectronico  || '';
    form.value.prefijoTelefonico = clienteCompleto.idPrefijo  || '';
    form.value.numTelefonico = clienteCompleto.celularCliente  || '';
    form.value.estadoCivil = clienteCompleto.idEstadoCivil || '';
    form.value.descripcionEstadoCivil = clienteCompleto.descripcionEstadoCivil || '';

    if (clienteCompleto.conyuge) {
      form.value.conyuge.nombreClienteConyuge = clienteCompleto.conyuge.nombresApellidosConyuge || '';
      form.value.conyuge.ocupacionClienteConyuge = clienteCompleto.conyuge.ocupacionConyuge || '';
      form.value.conyuge.tipoIdentificacionClienteConyuge = clienteCompleto.conyuge.idIdentificacionConyuge || '';
      form.value.conyuge.numIdentificacionClienteConyuge = clienteCompleto.conyuge.numeroIdentificacionConyuge || '';
      form.value.conyuge.paisOrigenClienteConyuge = clienteCompleto.conyuge.idNacionalidadConyuge || '';
      form.value.conyuge.paisResidenciaClienteConyuge = clienteCompleto.conyuge.idResidenciaConyuge || '';
      form.value.conyuge.departamentoClienteConyuge = clienteCompleto.conyuge.idDepartamentoConyuge || '';
      form.value.conyuge.provinciaClienteConyuge = clienteCompleto.conyuge.idProvinciaConyuge || '';
      form.value.conyuge.distritoClienteConyuge = clienteCompleto.conyuge.idDistritoConyuge || '';
      form.value.conyuge.direccionClienteConyuge = clienteCompleto.conyuge.direccionConyuge || '';
      form.value.conyuge.correoUsuarioCliente = clienteCompleto.conyuge.correoElectronicoConyuge || '';
      form.value.conyuge.prefijoTelefonicoClienteConyuge = clienteCompleto.conyuge.idPrefijoConyuge || '';
      form.value.conyuge.numTelefonicoClienteConyuge = clienteCompleto.conyuge.celularConyuge || '';
    }
  }
});


watch(() => form.value.lotes, (lotes) => {
      lotes.forEach(lote => {
        const ubicacion = ubicaciones.find(u => u.id === lote.ubicacionLote);
        if (ubicacion) {
          lote.empresa = ubicacion.nombre;
          lote.empresaVendedora = ubicacion.EmpresaVende;
          lote.ruc = ubicacion.RUCVendedor;
          lote.direccion = ubicacion.DireccionVendedor;
          lote.tipoRepresentante=ubicacion.TipoRepresentante;
          lote.representanteLegal = ubicacion.RepresentanteLegalVendedor;
          lote.dniVendedor = ubicacion.DNIVendedor;
          lote.partidaPoder = ubicacion.NPartidaPoderVendedor;
          lote.moneda = ubicacion.Moneda;
          lote.numCuenta = ubicacion.NumCuenta;
          lote.cci = ubicacion.CCI;
          lote.fechaSale = ubicacion.FechaSale;
          lote.fechaFirma = ubicacion.FechaFirmaContratoDefinitivo;
          lote.areaMatriz = ubicacion.AreaMatrizHas;
          lote.registrosDe = ubicacion.RegistroDE;
          lote.partidaMatriz = ubicacion.PartidaMatriz;
          lote.ubicacionPredio = ubicacion.UbicacionLote;
          lote.unidadCatastral = ubicacion.UnidadCatastralMatriz;
          lote.urbanizacionMatriz = ubicacion.UrbanizacionMatriz;
          lote.distritoMatriz = ubicacion.DistritoMatriz;
          lote.provinciaMatriz = ubicacion.ProvinciaMatriz;
          lote.departamentoMatriz = ubicacion.DepartamentoMatriz;
          lote.compraventaMatriz = ubicacion.CompraVentaMatriz;
          lote.situacionLegalMatriz = ubicacion.SituacionLegalMatriz;

          const departamento = departamentos.find(d => d.nombre === ubicacion.DepartamentoMatriz);
          const provincia = provincias.find(p => p.nombre === ubicacion.ProvinciaMatriz);
          const distrito = distritos.find(d => d.nombre === ubicacion.DistritoMatriz);
          const ubicacionLote = ubicaciones.find(u => u.UbicacionLote === ubicacion.UbicacionLote);

          lote.matriz.departamentoMatriz = departamento ? departamento.id : null;
          lote.matriz.provinciaMatriz = provincia ? provincia.id : null;
          lote.matriz.distritoMatriz = distrito ? distrito.id : null;
          lote.matriz.ubicacionMatriz = ubicacionLote ? ubicacionLote.id:null  ;
          lote.matriz.areaMatrizHasMatriz = ubicacion.AreaMatrizHas;
          lote.matriz.registroDeMatriz = ubicacion.RegistroDE;
          lote.matriz.partidaMatriz = ubicacion.PartidaMatriz;
          lote.matriz.unidadCatastralMatriz = ubicacion.UnidadCatastralMatriz;
          lote.matriz.urbanizacionMatriz = ubicacion.UrbanizacionMatriz;
          lote.matriz.compraventaMatriz = ubicacion.CompraVentaMatriz;
          lote.matriz.situacionLegalMatriz = ubicacion.SituacionLegalMatriz;
        }
      });
    },
    { deep: true }
);



const getUbicacionesFiltradas = (proyectoId) => {
  return ubicaciones.filter(u => String(u.proyectoId) === String(proyectoId));
};

watch(() => form.value.lotes.map(l => l.proyectolote), (newValues, oldValues) => {
  form.value.lotes.forEach((lote, index) => {
    if (newValues[index] !== oldValues[index]) {
      const ubicacionesFiltradas = getUbicacionesFiltradas(lote.proyectolote);
      lote.ubicacionLote = ubicacionesFiltradas.length > 0 ? ubicacionesFiltradas[0].id : '';
    }
  });
});

const cerrarResumen = async () => {

  /*
  try {
    await axios.post(`https://backendcramirez.onrender.com/api/email/enviar-cliente/${idCliente.value}`);
    console.log("Correo enviado con éxito");
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    alert("No se pudo enviar el correo al cliente.");
    return;
  }

   */

  router.push("/dashboard/formularios/registro-cliente");
};

watch(() => form.value.lotes.map(l => l.proyectolote), (nuevosIds) => {
  nuevosIds.forEach((idProyecto, index) => {
    form.value.lotes[index].tipoContratolote = proyectosT3Ids.includes(idProyecto) ? 3 : 1;
  });
}, { deep: true });

watch(form, (newForm) => {
  newForm.lotes.forEach((lote) => {
    const areaLote = parseFloat(lote.areaLote);
    const areaMatriz = parseFloat(lote.areaMatriz);
    const alicuota =
        !isNaN(areaLote) && !isNaN(areaMatriz) && areaMatriz !== 0
            ? ((areaLote * 100) / 10000) / areaMatriz
            : 0;

    lote.alicuota = alicuota.toFixed(4);
    lote.alicuotaLetras =
        alicuota > 0 ? numeroALetras(alicuota) : '';
  });
});


watch(form, (newForm) => {
  newForm.lotes.forEach((lote) => {

    const costoLote = parseFloat(lote.costoLote);
    const cuotaInicial = parseFloat(lote.cuota?.cuotaInicialIncluyeSeparacion);


    // 2. Precio por m²
    if (!isNaN(costoLote) && !isNaN(areaLote) && areaLote !== 0) {
      const precioMetroCuadrado = costoLote / areaLote;
      lote.precioMetroCuadrado = precioMetroCuadrado.toFixed(2);
      lote.precioMetroCuadradoLetras = numeroLetrasSinDecimal(lote.precioMetroCuadrado).toUpperCase();
    } else {
      lote.precioMetroCuadrado = 0;
      lote.precioMetroCuadradoLetras = '';
    }

    // 3. Saldo de lote
    if (!isNaN(costoLote) && !isNaN(cuotaInicial)) {
      const saldo = costoLote - cuotaInicial;
      lote.cuota.saldoLote = saldo.toFixed(2);
      lote.cuota.saldoLoteLetras = numeroLetrasSinDecimal(lote.cuota.saldoLote).toUpperCase();
    } else {
      lote.cuota.saldoLote = 0;
      lote.cuota.saldoLoteLetras = '';
    }
  });
});

</script>