<template>
  <div class="container">

    <div class="formulario-edicion">

    <h1 class="tituloformulario">Formulario de Edicion</h1>

      <div v-if="formStep === 1 && form">
        <form @submit.prevent="avanzarPaso">
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
        <form @submit.prevent="avanzarPaso">
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
          <Lote
              :index="0"
              :lote="form.lotes"
              :getUbicacionesFiltradas="getUbicacionesFiltradas"
          />
          <button type="button" @click="retrocederPaso">Atrás</button>
          <button type="submit">Siguiente</button>
        </form>
      </div>

      <div v-if="formStep === 3">
        <form @submit.prevent="avanzarPaso">
            <CuotaExtraordinaria
                v-if="lote.tieneCuotaExtraordinaria === 'si' && lote.cuotaextraordinaria"
                :cuotaextraordinaria="lote.cuotaextraordinaria"
                :lote="lote"
                :index="index"
            />
          <button type="button" @click="retrocederPaso">Atrás</button>
          <button type="submit">Siguiente</button>
        </form>
      </div>

      <div v-if="formStep === 4">
        <form @submit.prevent="avanzarPaso">

            <Lindero
                :lote="form.lotes"
            />
          <button type="button" @click="retrocederPaso">Atrás</button>
          <button type="submit">Siguiente</button>
        </form>
      </div>

      <div v-if="formStep === 5">
        <form @submit.prevent="avanzarPaso">
            <Matriz
                :matriz="form.lotes"
                :numeroALetras="numeroALetras"
            />
          <button type="button" @click="retrocederPaso">Atrás</button>
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
        <button type="button" @click="retrocederPaso">Atrás</button>
        <button type="button" class="btn btn-resumen" @click="cerrarResumen">Cerrar</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, watch} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Cliente from "@/components/formularios/Cliente/Cliente.vue";
import ClienteConyuge from "@/components/formularios/Cliente/ClienteConyuge.vue";
import {numeroALetras} from "@/data/numeroLetrasConNumeros.js";
import {
  obtenerNombreDepartamento, obtenerNombreDistrito,
  obtenerNombrePais,
  obtenerNombreProvincia, obtenerNombreProyecto,
  obtenerNombreResidencia
} from "@/data/utils.js";
import Matriz from "@/components/formularios/Lote/Matriz.vue";
import Lote from "@/components/formularios/Lote/Lote.vue";
import CopropietarioConyuge from "@/components/formularios/Copropietario/CopropietarioConyuge.vue";
import Lindero from "@/components/formularios/Lote/Lindero.vue";
import ResumenRegistro from "@/components/formularios/Resumen/ResumenRegistro.vue";
import CuotaExtraordinaria from "@/components/formularios/Lote/CuotaExtraordinaria.vue";
import Copropietario from "@/components/formularios/Copropietario/Copropietario.vue";
import {ubicaciones} from "@/data/ubicaciones.js";
import {proyectosT3Ids} from "@/data/proyectos.js";
import {departamentos} from "@/data/departamentos.js";
import {provincias} from "@/data/provincias.js";
import {distritos} from "@/data/distritos.js";

const router = useRouter();
const formStep = ref(1);
const route = useRoute();
const idCliente = route.params.idCliente;

const form = ref({
  nombreCliente: '',
  ocupacionCliente: '',
  tipoIdentificacion: '',
  numIdentificacionUsuario: '',
  nacionalidad: '',
  paisdeResidencia: '',
  departamento:'',
  provincia: '',
  distrito: '',
  direccion: '',
  correoUsuario: '',
  prefijoTelefonico: '',
  numTelefonico: '',
  estadoCivil: '',
  descripcionEstadoCivil: '',
  conyuge: {
    nombreClienteConyuge: '',
    ocupacionClienteConyuge: '',
    tipoIdentificacionClienteConyuge: '',
    numIdentificacionClienteConyuge: '',
    paisOrigenClienteConyuge: '',
    paisResidenciaClienteConyuge: '',
    departamentoClienteConyuge: '',
    provinciaClienteConyuge: '',
    distritoClienteConyuge: '',
    direccionClienteConyuge: '',
    correoUsuarioCliente: '',
    prefijoTelefonicoClienteConyuge: '',
    numTelefonicoClienteConyuge: '',
  },
  numCopropietarios: 0,
  copropietarios: [],
  numLotes: 0,
  lotes: []
});

watch(() => form.value.numCopropietarios, (newValue) => {
  if (newValue > 0) {
    form.value.copropietarios = {
      nombreCopropietarios: '',
      ocupacionCopropietario: '',
      tipoIdentificacionCopropietarios: '',
      numIdentificacionCopropietarios: '',
      paisOrigenCopropietarios: '',
      paisResidenciaCopropietarios: '',
      departamentoCopropietarios: '',
      provinciaCopropietarios: '',
      distritoCopropietarios: '',
      direccionCopropietariosHogar: '',
      correoUsuarioCopropietarios: '',
      prefijoTelefonicoCopropietarios: '',
      numTelefonicoCopropietarios: '',
      estadoCivilCopropietarios: '',
      conyuge: {
        nombreCopropietariosConyuge: '',
        ocupacionCopropietarioConyuge: '',
        tipoIdentificacionCopropietariosConyuge: '',
        numIdentificacionCopropietariosConyuge: '',
        distritoCopropietariosConyuge: '',
        provinciaCopropietariosConyuge: '',
        departamentoCopropietariosConyuge: '',
        paisOrigenCopropietariosConyuge: '',
        paisResidenciaCopropietariosConyuge: '',
        direccionCopropietariosConyuge: '',
        correoUsuarioCopropietariosConyuge: '',
        prefijoTelefonicoCopropietariosConyuge: '',
        numTelefonicoCopropietariosConyuge: '',
      }
    };
  } else {
    form.value.copropietarios = [];
  }
}, { immediate: true });

watch(() => form.value.numLotes, (newVal) => {
  form.value.lotes = {
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
  };
}, { immediate: true });

onMounted(async () => {
  try {
    const { data } = await axios.get(`http://localhost:8080/api/clientes/${idCliente}`);
    console.log('Respuesta del backend:', data); // 👈 AGREGA ESTO


    form.value = {
      ...form.value,

      nombreCliente: data.cliente.nombresApellidos,
      ocupacionCliente: data.cliente.ocupacion,
      tipoIdentificacion: data.cliente.idIdentificacion,
      numIdentificacionUsuario: data.cliente.numeroIdentificacion,
      nacionalidad: data.cliente.idNacionalidad,
      paisdeResidencia: data.cliente.idResidencia,
      departamento: data.cliente.idDepartamento,
      provincia: data.cliente.idProvincia,
      distrito: data.cliente.idDistrito,
      direccion: data.cliente.direccion,
      correoUsuario: data.cliente.correoElectronico,
      prefijoTelefonico: data.cliente.idPrefijo,
      numTelefonico: data.cliente.celularCliente,
      estadoCivil: data.cliente.idEstadoCivil,
      descripcionEstadoCivil: data.cliente.descripcionEstadoCivil,
      lotes: data.lotes ?? {} // si viene null, pon objeto vacío
    };
  } catch (err) {
    console.error("Error al cargar cliente", err);
    alert("Error al cargar los datos del cliente.");
  }
});


const guardarCambios = async () => {
  try {

    const payload = {
      ...form.value,
      lotes: [form.value.lotes] // 👈 convertir el objeto a array
    };
    console.log("Payload que se enviará al backend:", form.value);
    await axios.put(`http://localhost:8080/api/clientes/${idCliente}`, payload);
    alert("Cambios guardados exitosamente.");
    router.push('/dashboard/clientes');
  } catch (err) {
    console.error("Error al guardar cambios", err);
    alert("Error al guardar los cambios.");
  }
};


watch(form, (newForm) => {
  if (newForm.lotes && typeof newForm.lotes === 'object') {
    const lotes = Object.values(newForm.lotes);

    lotes.forEach((lote) => {
      if (!lote || typeof lote !== 'object') return;

      if (!lote.matriz || typeof lote.matriz !== 'object') {
        lote.matriz = {};
      }

      const areaLote = parseFloat(lote.areaLote ?? 0);
      const areaMatriz = parseFloat(lote.matriz.areaMatrizHasMatriz ?? 0);

      if (!isNaN(areaLote) && !isNaN(areaMatriz) && areaMatriz !== 0) {
        const alicuota = ((areaLote * 100) / 10000) / areaMatriz;
        lote.matriz.alicuotaMatriz = alicuota.toFixed(4);
        lote.matriz.alicuotaLetrasMatriz = numeroALetras(parseFloat(lote.matriz.alicuotaMatriz));
      } else {
        lote.matriz.alicuotaMatriz = 0;
        lote.matriz.alicuotaLetrasMatriz = '';
      }
    });
  }
}, { deep: true, immediate: true });

let timeoutIdConyuge;

watch(() => form.value.conyuge.numIdentificacionClienteConyuge, async (documento) => {
  const longitudEsperada = 8;

  if (timeoutIdConyuge) clearTimeout(timeoutIdConyuge);


  if (documento.length !== longitudEsperada) {
    return;
  }

  timeoutIdConyuge = setTimeout(async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/buscarCliente/${documento}`);

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
          const response = await fetch(`http://localhost:8080/api/buscarCliente/${documento}`);
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
          const response = await fetch(`http://localhost:8080/api/buscarCliente/${docConyuge}`);
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

watch(() => form.value.lotes, (lotesObj) => {
      const lotes = Object.values(lotesObj); // Convertimos el objeto a array

      lotes.forEach((lote) => {
        if (!lote || typeof lote !== 'object') return;

        const ubicacion = ubicaciones.find(u => u.id === lote.ubicacionLote);
        if (ubicacion) {
          lote.empresa = ubicacion.nombre;
          lote.empresaVendedora = ubicacion.EmpresaVende;
          lote.ruc = ubicacion.RUCVendedor;
          lote.direccion = ubicacion.DireccionVendedor;
          lote.tipoRepresentante = ubicacion.TipoRepresentante;
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

          if (!lote.matriz) lote.matriz = {};

          const departamento = departamentos.find(d => d.nombre === ubicacion.DepartamentoMatriz);
          const provincia = provincias.find(p => p.nombre === ubicacion.ProvinciaMatriz);
          const distrito = distritos.find(d => d.nombre === ubicacion.DistritoMatriz);
          const ubicacionLote = ubicaciones.find(u => u.UbicacionLote === ubicacion.UbicacionLote);

          lote.matriz.departamentoMatriz = departamento ? departamento.id : null;
          lote.matriz.provinciaMatriz = provincia ? provincia.id : null;
          lote.matriz.distritoMatriz = distrito ? distrito.id : null;
          lote.matriz.ubicacionMatriz = ubicacionLote ? ubicacionLote.id : null;
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

watch(() => form.value.lotes.proyectolote, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    const ubicacionesFiltradas = getUbicacionesFiltradas(newValue);
    form.value.lotes.ubicacionLote = ubicacionesFiltradas.length > 0 ? ubicacionesFiltradas[0].id : '';
  }
});

const cerrarResumen = () => {
  router.push("/dashboard/formularios/registro-cliente");
};

watch(() => form.value.lotes.proyectolote, (idProyecto) => {
  form.value.lotes.tipoContratolote = proyectosT3Ids.includes(idProyecto) ? 3 : 1;
}, { immediate: true });

const retrocederPaso = () => {
  if (formStep.value > 1) {
    formStep.value--;
  }
};

const avanzarPaso = () => {
  formStep.value++;
};


</script>

