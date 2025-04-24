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
              <FormularioCliente
                  :form="form"
                  :paises="paises"
                  :residencias="residencias"
                  :prefijos="prefijos"
                  :estadoCivil="estadoCivil"
                  :tipoIdentificacion="tipoIdentificacion"
                  :departamentos="departamentos"
                  :provincias="provincias"
                  :distritos="distritos"
              />

              <div v-if="form.estadoCivil === 2">
                <FormularioClienteConyuge
                    :form="form"
                    :tipoIdentificacion="tipoIdentificacion"
                    :paises="paises"
                    :residencias="residencias"
                    :departamentos="departamentos"
                    :provincias="provincias"
                    :distritos="distritos"
                    :prefijos="prefijos"
                />
              </div>

              <button type="submit">Siguiente</button>
            </form>
          </div>

          <div v-if="formStep === 2">
            <form @submit.prevent="submitForm2">
              <h3>Información de Copropietarios</h3>

              <label>Número de Copropietarios:</label>
              <input v-model.number="form.numCopropietarios" type="number" min="0" />

              <div v-for="(copropietario, index) in form.copropietarios" :key="index">
                <FormularioCopropietario
                    :index="index"
                    :copropietario="copropietario"
                    :tipoIdentificacion="tipoIdentificacion"
                    :paises="paises"
                    :residencias="residencias"
                    :departamentos="departamentos"
                    :prefijos="prefijos"
                    :estadoCivil="estadoCivil"
                    :provincias="provincias"
                    :distritos="distritos"
                />

                <div v-if="copropietario.estadoCivilCopropietarios === 2">
                  <FormularioCopropietarioConyuge
                      :index="index"
                      :copropietario="copropietario"
                      :tipoIdentificacion="tipoIdentificacion"
                      :paises="paises"
                      :residencias="residencias"
                      :departamentos="departamentos"
                      :provincias="provincias"
                      :distritos="distritos"
                      :prefijos="prefijos"
                  />
                </div>
              </div>

              <h3>Datos de Lotes</h3>
              <label>Número de Lotes Adquiridos:</label>
              <input v-model.number="form.numLotes" type="number" min="0" />

              <div v-for="(lote, index) in form.lotes" :key="index">
                <FormularioLotes
                    :index="index"
                    :lote="lote"
                    :proyectos="proyectos"
                    :tiposContrato="tiposContrato"
                    :getUbicacionesFiltradas="getUbicacionesFiltradas"
                />
              </div>
              <button type="submit">Siguiente</button>
            </form>
          </div>

          <div v-if="formStep === 3">
            <form @submit.prevent="FormCuotaExtraordinaria">
              <div v-for="(lote, index) in form.lotes" :key="index">
                <CuotaExtraordinariaLote
                    :cuotaextraordinaria="cuotaextraordinaria"
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
                <FormularioLindero
                    :lote="lote"
                    :index="index"
                />
              </div>
              <button type="submit">Siguiente</button>
            </form>
          </div>

          <div v-if="formStep === 5">
              <FormularioMatriz
                  :form="form"
                  :departamentos="departamentos"
                  :provincias="provincias"
                  :distritos="distritos"
                  :ubicaciones="ubicaciones"
                  :numeroALetras="numeroALetras"
                  :finalizarRegistroMatriz="finalizarRegistroMatriz"
              />
          </div>

          <div v-if="formStep === 6">
              <ResumenRegistro
                  :form="form"
                  :proyectos="proyectos"
                  :paises="paises"
                  :residencias="residencias"
                  :departamentos="departamentos"
                  :provincias="provincias"
                  :distritos="distritos"
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
import { ref, watch ,computed ,onMounted ,watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import BarraSuperiorDashboard from "@/components/dashboard/BarraSuperiorDashboard.vue";
import BarraLateralDashboard from "@/components/dashboard/BarraLateralDashboard.vue";
import { paises } from '@/data/paises.js';
import { residencias } from '@/data/residencias'
import {prefijos} from "@/data/prefijos.js";
import { estadoCivil } from '@/data/estadoCivil.js';
import { tipoIdentificacion } from '@/data/tipoIdentificacion.js';
import { proyectos } from '@/data/proyectos.js';
import { tiposContrato } from '@/data/tiposContrato.js';
import { ubicaciones } from '@/data/ubicaciones.js'
import{provincias} from "@/data/provincias.js";
import {departamentos} from "@/data/departamentos.js";
import {distritos} from "@/data/distritos.js";
import { numeroALetras } from "@/data/numeroALetras.js";

import { buildClientePayload, buildClienteConyugePayload,buildCopropietarioPayload, buildConyugePayload, buildLotePayload ,buildCuotaExtraordinariaPayload,buildLinderoPayload,buildMatrizLotePayload} from '@/data/payloadBuilder.js'
import {obtenerNombreResidencia, obtenerNombrePais, obtenerNombreDepartamento, obtenerNombreProvincia, obtenerNombreDistrito, obtenerNombreProyecto} from '@/data/utils.js';
import FormularioCliente from "@/components/formularios/FormularioCliente.vue";
import FormularioClienteConyuge from "@/components/formularios/FormularioClienteConyuge.vue";
import FormularioCopropietario from "@/components/formularios/FormularioCopropietario.vue";
import FormularioLindero from "@/components/formularios/FormularioLindero.vue";
import FormularioMatriz from "@/components/formularios/FormularioMatriz.vue";
import FormularioCopropietarioConyuge from "@/components/formularios/FormularioCopropietarioConyuge.vue";
import FormularioLotes from "@/components/formularios/FormularioLotes.vue";
import ResumenRegistro from "@/components/formularios/ResumenRegistro.vue";
import CuotaExtraordinariaLote from "@/components/formularios/CuotaExtraordinariaLote.vue";

import "@/assets/formulario/FormularioCliente.css"

const formStep = ref(1);
const router = useRouter();
const formularioActual = ref(1);
const idCliente=ref(null);
const form = ref({
  nombreCliente: '',
  ocupacionCliente: '',
  tipoIdentificacion: 1,
  numIdentificacionUsuario: '',
  paisOrigen: 8,
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

    // Crear payload del cliente
    const clientePayload = buildClientePayload(form.value);
    console.log("Datos del Cliente a enviar:", clientePayload);

    const response = await axios.post("https://backendcramirez.onrender.com/api/clientes", clientePayload, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": idOperario
      }
    });

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

  const confirmacion = window.confirm("¿Estás seguro de que todos los datos están correctos?");
  if (!confirmacion) {
    return;
  }

  try {
    if (!idCliente.value) {
      console.error("Error: ID del cliente no encontrado.");
      return;
    }

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
        await axios.post("https://backendcramirez.onrender.com/api/lotes", lotePayload, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-User-ID": idOperario,
          },
        });

        const { data: idLote } = await axios.get("https://backendcramirez.onrender.com/api/lotes/ultimo");
        lote.idLote = idLote;
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
    const requests = form.value.lotes.map(lote => {
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
    ubicacionLote: 1,
    manzanalote: '',
    numerolote: '',
    tipoContratolote: 1,
    areaLote: "",
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
    linderos:{
      porLaDerechaLindero: "",
      porLaIzquierdaLindero: "",
      porElFrenteLindero: "",
      porElFondoLindero: "",
    },
    cuotaextraordinaria: {
      cuotaExtraordinariaLote: 0,
      mantenimientoMensual: 0,
      mantenimientoMensualLetras: "",
      estadoCuenta: "",
      montoDeudaLetra: "",
      cuotaPendientePago: 0
    }
  }));
});

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

watch(() => form.value.copropietarios, async (copropietarios) => {
  for (let i = 0; i < copropietarios.length; i++) {
    const copropietario = copropietarios[i];
    const documento = copropietario.numIdentificacionCopropietarios;
    const longitudEsperada = 8;

    if (documento && documento.length === longitudEsperada) {
      try {
        const response = await fetch(`https://backendcramirez.onrender.com/api/buscarCliente/${documento}`);
        if (!response.ok) {
          throw new Error('Cliente no encontrado');
        }

        const data = await response.json();

        copropietario.nombreCopropietarios = data.nombreCompleto || '';
      } catch (error) {
        console.error('Error al buscar cliente:', error);

        copropietario.nombreCopropietarios = '';
      }
    }
  }
}, { deep: true });

watch(() => form.value.conyuge.numIdentificacionClienteConyuge, async (documento) => {
  const longitudEsperada = 8;

  if (documento.length !== longitudEsperada) {
    return;
  }

  try {
    const response = await fetch(`https://backendcramirez.onrender.com/api/buscarCliente/${documento}`);

    if (!response.ok) {
      throw new Error('Cliente no encontrado');
    }

    const data = await response.json();
    form.value.conyuge.nombreClienteConyuge = data.nombreCompleto || '';
  } catch (error) {
    console.error('Error al buscar cliente:', error);
    form.value.conyuge.nombreClienteConyuge = '';
  }
});

onMounted(() => {
  const nombreGuardado = localStorage.getItem('nombreCompleto');
  const numeroDocumentoGuardado = localStorage.getItem('numeroDocumento');

  if (nombreGuardado) {
    form.value.nombreCliente = nombreGuardado;
  }

  if (numeroDocumentoGuardado) {
    form.value.numIdentificacionUsuario = numeroDocumentoGuardado;
  }
});

watch(() => form.value.copropietarios, async (copropietarios) => {

  for (let i = 0; i < copropietarios.length; i++) {
    const copropietario = copropietarios[i];
    const conyuge = copropietario.conyuge;
    const documento = conyuge?.numIdentificacionCopropietariosConyuge;
    const longitudEsperada = 8; // Ajusta la longitud según la identificación

    // Verificar si el número de identificación del cónyuge tiene la longitud esperada
    if (documento && documento.length === longitudEsperada) {
      try {
        // Hacer la consulta a la API para obtener datos del cónyuge
        const response = await fetch(`https://backendcramirez.onrender.com/api/buscarCliente/${documento}`);

        if (!response.ok) {
          throw new Error('Cliente no encontrado');
        }

        const data = await response.json();

        // Verificar si la respuesta contiene 'nombreCompleto'
        if (data && data.nombreCompleto) {
          // Asignar el nombre completo del cónyuge
          conyuge.nombreCopropietariosConyuge = data.nombreCompleto || '';
        } else {
          console.error('No se encontró el nombre completo en la respuesta');
        }
      } catch (error) {
        // Manejo de errores
        console.error('Error al buscar cliente:', error);

        // Limpiar el nombre en caso de error
        conyuge.nombreCopropietariosConyuge = '';
      }
    }
  }
}, { deep: true });

watch(() => form.value.lotes, (lotes) => {
      lotes.forEach(lote => {
        const ubicacion = ubicaciones.find(u => u.id === lote.ubicacionLote);
        if (ubicacion) {
          lote.empresa = ubicacion.nombre;
          lote.empresaVendedora = ubicacion.EmpresaVende;
          lote.ruc = ubicacion.RUCVendedor;
          lote.direccion = ubicacion.DireccionVendedor;
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

watch(() => form.value.lotes, (lotes) => {
  lotes.forEach((lote) => {
    const ubicacionesFiltradas = getUbicacionesFiltradas(lote.proyectolote);
    if (ubicacionesFiltradas.length > 0) {
      lote.ubicacionLote = ubicacionesFiltradas[0].id;
    } else {
      lote.ubicacionLote = '';
    }
  });
}, { deep: true });

const cerrarResumen = () => {
  router.push("/dashboard/formularios/registro-cliente");
};


</script>
