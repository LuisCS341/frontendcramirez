<template>
  <div class="dashboard-container">
    <BarraLateralDashboard />
    <div class="main-content">
      <BarraSuperiorDashboard />
      <div class="container">

        <h2 class="tituloformulario">Formulario de Registro</h2>

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
            <form @submit.prevent="submitForm2">
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
            <form @submit.prevent="FormCuotaExtraordinaria">
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

          <div v-if="formStep === 4">
            <form @submit.prevent="submitLinderos" v-if="form.numLotes > 0">
              <div v-for="(lote, index) in form.lotes" :key="index">
                <Lindero
                    :lote="lote"
                    :index="index"
                />
              </div>
              <button type="submit">Siguiente</button>
            </form>
          </div>

          <div v-if="formStep === 5">
            <form @submit.prevent="finalizarRegistroMatriz">
                <div v-for="(matriz, index) in form.lotes" :key="index">
                    <Matriz
                        :matriz="matriz"
                        :index="index"
                        :numeroALetras="numeroALetras"
                    />
                </div>
              <button type="submit" class="btn btn-primary">Siguiente</button>
            </form>
          </div>

          <div v-if="formStep === 6">
              <ResumenRegistro
                  :form="form"
                  :obtenerNombrePais="obtenerNombrePais"
                  :obtenerNombreResidencia="obtenerNombreResidencia"
                  :obtenerNombreDepartamento="obtenerNombreDepartamento"
                  :obtenerNombreProvincia="obtenerNombreProvincia"
                  :obtenerNombreDistrito="obtenerNombreDistrito"
                  :obtenerNombreProyecto="obtenerNombreProyecto"
              />
            <button type="button" @click="cerrarResumen">Cerrar</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch ,computed,onMounted ,watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import BarraSuperiorDashboard from "@/layouts/BarraSuperiorDashboard.vue";
import BarraLateralDashboard from "@/layouts/BarraLateralDashboard.vue";
import { numeroALetras } from "@/data/numeroLetrasConNumeros.js";

import { buildClientePayload, buildClienteConyugePayload,buildCopropietarioPayload, buildConyugePayload, buildLotePayload ,buildCuotaExtraordinariaPayload,buildLinderoPayload,buildMatrizLotePayload} from '@/data/payloadBuilder.js'
import {obtenerNombreResidencia, obtenerNombrePais, obtenerNombreDepartamento, obtenerNombreProvincia, obtenerNombreDistrito, obtenerNombreProyecto} from '@/data/utils.js';
import Cliente from "@/components/formularios/Cliente/Cliente.vue";
import ClienteConyuge from "@/components/formularios/Cliente/ClienteConyuge.vue";
import Copropietario from "@/components/formularios/Copropietario/Copropietario.vue";
import Lindero from "@/components/formularios/Lote/Lindero.vue";
import Matriz from "@/components/formularios/Lote/Matriz.vue";
import CopropietarioConyuge from "@/components/formularios/Copropietario/CopropietarioConyuge.vue";
import Lote from "@/components/formularios/Lote/Lote.vue";
import ResumenRegistro from "@/components/formularios/Resumen/ResumenRegistro.vue";
import CuotaExtraordinaria from "@/components/formularios/Lote/CuotaExtraordinaria.vue";

import "@/components/formularios/Cliente/Cliente.css"
import {ubicaciones} from "@/data/ubicaciones.js";
import {distritos} from "@/data/distritos.js";
import {provincias} from "@/data/provincias.js";
import {departamentos} from "@/data/departamentos.js";
import {proyectos, proyectosT3Ids} from "@/data/proyectos.js";


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
    correoUsuarioCliente: '',
    prefijoTelefonicoClienteConyuge: 8,
    numTelefonicoClienteConyuge: '',
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
      correoUsuarioCopropietarios: '',
      prefijoTelefonicoCopropietarios: 8,
      numTelefonicoCopropietarios: '',
      estadoCivilCopropietarios: 1,
      conyuge: {
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
        correoUsuarioCopropietariosConyuge: '',
        prefijoTelefonicoCopropietariosConyuge: 8,
        numTelefonicoCopropietariosConyuge: '',
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
    cuotaInicialBanco: '',
    saldoLote: '',
    saldoLoteLetras: '',
    cantidadCuotas: '',
    cantidadCuotaLetras: '',
    cuentaRecaudadora: '',
    cantidadCuotaBanco: '',
    montoCuotas: '',
    montoCuotaLetras: '',
    matriz:{
      departamentoMatriz: '',
      provinciaMatriz: '',
      distritoMatriz: '',
      ubicacionMatriz: '',
      areaMatrizHas: "",
      registroDeMatriz: "",
      partidaMatriz: "",
      unidadCatastralMatriz: "",
      urbanizacionMatriz: "",
      compraventaMatriz: "",
      situacionLegalMatriz: "",
      alicuotaMatriz: "",
      alicuotaLetrasMatriz: "",
    },
    lindero:{
      porLaDerechaLindero: "",
      porLaIzquierdaLindero: "",
      porElFrenteLindero: "",
      porElFondoLindero: "",
    },
    tieneCuotaExtraordinaria: null,
    cuotaextraordinaria: {
      cantidadCuotaExtraordinaria: "",
      montoCuotaExtraordinaria: "",
      mantenimientoMensual: "",
      mantenimientoMensualLetras: "",
      estadoCuenta: "",
      montoDeudaLetra: "",
      cuotaPendientePago: "",
      letrasPendientePago: "",
      fechaEntrega: "",
      cartaNoAdeudo: "",
      certificadoLote: "",
      mediosPago: "",
      plano1: "",
      plano2: "",
      envioMinuta: "",
      fechaCita: "",
      horaCita: "",
      modificarMinuta: "",
      minutaEscaneada: "",
      expNotaria: "",
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

const submitForm2 = async () => {

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
      form.value.copropietarios.forEach((copropietario) => {
        const copropietarioPayload = buildCopropietarioPayload(idCliente.value, copropietario);
        requests.push(
            axios.post("https://backendcramirez.onrender.com/api/copropietario", copropietarioPayload, {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
                "X-User-ID": idOperario,
              },
            })
        );

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
      });
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
      }
    }

    await Promise.all(requests);

    console.log("Copropietarios y lotes registrados con éxito.");
    formStep.value++;
  } catch (error) {
    console.error("Error al enviar copropietarios y lotes:", error);
  }
};

const FormCuotaExtraordinaria = async () => {

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

const submitLinderos = async () => {
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
    formularioActual.value = 2;

    formStep.value++;
  } catch (error) {
    console.error('Error al registrar los linderos:', error.response?.data || error.message);
  }
};

const finalizarRegistroMatriz = async () => {
  if (!window.confirm("¿Estás seguro de que todos los datos están correctos?")) {
    return;
  }

  try {
    const payloads = form.value.lotes.map(buildMatrizLotePayload);
    const requests = payloads.map(payload => axios.post('https://backendcramirez.onrender.com/api/matrices', payload));

    await Promise.all(requests);

    alert('Registro completado exitosamente');
    console.log('Matriz registrada con éxito.');

    formularioActual.value = 3;

    formStep.value++;
  } catch (error) {
    console.error('Error en el registro:', error);
    alert('Ocurrió un error al enviar los detalles del lote.');
  }
};

//calcula la alicuota con un campo del componente lote y matriz
watch(form, (newForm) => {newForm.lotes.forEach((lote) => {
      if (!lote.matriz) {
        lote.matriz = {};
      }

      const areaLote = parseFloat(lote.areaLote);
      const areaMatriz = parseFloat(lote.matriz.areaMatrizHasMatriz);

      if (!isNaN(areaLote) && !isNaN(areaMatriz) && areaMatriz !== 0) {
        const alicuota = ((areaLote * 100) / 10000) / areaMatriz;
        lote.matriz.alicuotaMatriz = alicuota.toFixed(4);
        lote.matriz.alicuotaLetrasMatriz = numeroALetras(parseFloat(lote.matriz.alicuotaMatriz));
      } else {
        lote.matriz.alicuotaMatriz = 0;
        lote.matriz.alicuotaLetrasMatriz = '';
      }
    });
    },
    { deep: true, immediate: true }
);

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


//guarda los datos de verificacion y los jala al formulario princilap
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
    form.value.nombreCliente = clienteCompleto.nombresApellidos || clienteCompleto.ocupacionCliente || '';
    form.value.ocupacionCliente = clienteCompleto.ocupacion || clienteCompleto.ocupacionCliente || '';
    form.value.tipoIdentificacion = clienteCompleto.idIdentificacion || '';
    form.value.paisOrigen = clienteCompleto.idNacionalidad || clienteCompleto.paisOrigen || '';
    form.value.paisdeResidencia = clienteCompleto.idResidencia || clienteCompleto.paisdeResidencia || '';
    form.value.departamento = clienteCompleto.idDepartamento || clienteCompleto.departamento || '';
    form.value.provincia = clienteCompleto.idProvincia || clienteCompleto.provincia || '';
    form.value.distrito = clienteCompleto.idDistrito || clienteCompleto.distrito || '';
    form.value.direccion = clienteCompleto.direccion || '';
    form.value.correoUsuario = clienteCompleto.correoElectronico || clienteCompleto.correoUsuario || '';
    form.value.prefijoTelefonico = clienteCompleto.idPrefijo || clienteCompleto.prefijoTelefonico || '';
    form.value.numTelefonico = clienteCompleto.celularCliente || clienteCompleto.numTelefonico || '';
    form.value.estadoCivil = clienteCompleto.idEstadoCivil || '';
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

//filtra la ubicacion de lote en los campos proyecto y ubicacion
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

const cerrarResumen = () => {
  router.push("/dashboard/formularios/registro-cliente");
};

watch(() => form.value.lotes.map(l => l.proyectolote), (nuevosIds) => {
      nuevosIds.forEach((idProyecto, index) => {
        if (proyectosT3Ids.includes(idProyecto)) {
          form.value.lotes[index].tipoContratolote = 3;
        } else {
          form.value.lotes[index].tipoContratolote = 1;
        }
      });
    },
    { deep: true }
);


</script>
