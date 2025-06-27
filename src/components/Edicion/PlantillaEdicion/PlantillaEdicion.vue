<template>
  <div class="container">

    <div class="formulario-edicion">

    <h1 class="tituloformulario">Formulario de Edicion</h1>

      <div v-if="formStep === 1 && form">
        <form @submit.prevent="avanzarPaso">
          <ClienteEdicion
              :form="form"
          />

          <div v-if="form.estadoCivil === 2">
            <ClienteConyugeEdicion
                :form="form"
            />
          </div>

          <button type="submit">Siguiente</button>
        </form>
      </div>


      <div v-if="formStep === 2">
        <form @submit.prevent="avanzarPaso">
          <h3>Información de Copropietarios</h3>

          <div v-for="(copropietario) in form.copropietarios" >
            <CopropietarioEdicion
                :copropietario="copropietario"
            />

            <div v-if="copropietario.estadoCivilCopropietarios === 2">
              <CopropietarioConyugeEdicion
                  :copropietario="copropietario"
              />
            </div>
          </div>

          <h3>Datos de Lote</h3>
          <LoteEdicion
              :lote="form.lotes"
              :getUbicacionesFiltradas="getUbicacionesFiltradas"
          />
          <button type="button" @click="retrocederPaso">Atrás</button>
          <button type="submit">Siguiente</button>
        </form>
      </div>

      <div v-if="formStep === 3">
        <form @submit.prevent="avanzarPaso">
          <CuotaExtraordinariaEdicion
              v-if="form.lotes && form.lotes.length && form.lotes[0]?.cantidadCuotaExtraordinaria != null"
              :lote="form.lotes"
          />
          <button type="button" @click="retrocederPaso">Atrás</button>
          <button type="submit">Siguiente</button>
        </form>
      </div>

      <div v-if="formStep === 4">
        <form @submit.prevent="avanzarPaso">
          <CuotaEdicion
              :lote="form.lotes[0]"
          />
          <button type="button" @click="retrocederPaso">Atrás</button>
          <button type="submit">Siguiente</button>
        </form>
      </div>

      <div v-if="formStep === 5">
        <form @submit.prevent="avanzarPaso">

            <LinderoEdicion
                :lote="form.lotes[0]"
            />
          <button type="button" @click="retrocederPaso">Atrás</button>
          <button type="submit">Siguiente</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, watch} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import {ubicaciones} from "@/data/ubicaciones.js";
import {proyectosT3Ids} from "@/data/proyectos.js";
import ClienteEdicion from "@/components/Edicion/ClienteEdicion/ClienteEdicion.vue";
import ClienteConyugeEdicion from "@/components/Edicion/ClienteEdicion/ClienteConyugeEdicion.vue";
import CopropietarioEdicion from "@/components/Edicion/CopropietarioEdicion/CopropietarioEdicion.vue";
import CopropietarioConyugeEdicion from "@/components/Edicion/CopropietarioEdicion/CopropietarioConyugeEdicion.vue";
import LoteEdicion from "@/components/Edicion/LoteEdicion/LoteEdicion.vue";
import CuotaExtraordinariaEdicion from "@/components/Edicion/LoteEdicion/CuotaExtraordinariaEdicion.vue";
import LinderoEdicion from "@/components/Edicion/LoteEdicion/LinderoEdicion.vue";
import CuotaEdicion from "@/components/Edicion/LoteEdicion/CuotaEdicion.vue";

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
      descripcionEstadoCivil:"",
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
    fechaEntrega: "",
    mantenimientoMensual: "",
    mantenimientoMensualLetras: "",
    estadoCuenta: "",
    montoDeudaLetra: "",
    lindero:{
      porLaDerechaLindero: "",
      porLaIzquierdaLindero: "",
      porElFrenteLindero: "",
      porElFondoLindero: "",
    },
    cuota:{
      letrasPendientePago:"",
      cuentaRecaudadora:"",
      cuotaInicialIncluyeSeparacion:"",
      CuotaInicialIncluyeSeparacionLetras:"",
      montoCuotas:"",
      montoCuotaLetras:"",
      fechaPago:"",
      cuotaInicialBanco:"",
      saldoLote:"",
      saldoLoteLetras:"",
      cantidadCuotas:"",
      cantidadCuotaLetras:"",
      cantidadCuotaCuentaRecaudadora:"",
      cantidadCuotaBanco:"",
      cuotaPendientePago: "",
    },
    tieneCuotaExtraordinaria: null,
    cuotaextraordinaria: {
      montoCuotaExtraordinaria: "",
      mediosPago: "",
      cantidadCuotaExtraordinaria: "",
    }
  }));
});

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
      lotes: [form.value.lotes]
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

watch(() => form.value.lotes, (lotes) => {
  if (!lotes) return;

  // Asegurar que sea un array
  const lotesArray = Array.isArray(lotes) ? lotes : [lotes];

  lotesArray.forEach(lote => {
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
    }
  });
}, { deep: true });


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

watch(() => form.value.lotes.proyectolote, (idProyecto) => {
  form.value.lotes.tipoContratolote = proyectosT3Ids.includes(idProyecto) ? 3 : 1;
}, { immediate: true });

function validarPasoActual(paso) {
  switch (paso) {
    case 1:
      return form.value.nombreCliente !== null;
    case 2:
      return form.value.copropietarios?.length > 0 || form.value.lotes?.length > 0;
    case 3:
      return form.value.lotes?.[0]?.cantidadCuotaExtraordinaria != null;
    case 4:
      return form.value.lotes?.[0]?.lindero != null;
    case 5:
      return form.value.lotes?.[0]?.cuota != null;
    default:
      return true;
  }
}


function retrocederPaso() {
  let pasoAnterior = formStep.value - 1;

  while (pasoAnterior >= 1 && !validarPasoActual(pasoAnterior)) {
    pasoAnterior--;
  }

  formStep.value = pasoAnterior;
}


function avanzarPaso() {
  let siguientePaso = formStep.value + 1;

  while (siguientePaso <= 5 && !validarPasoActual(siguientePaso)) {
    siguientePaso++;
  }

  formStep.value = siguientePaso;
}



</script>

