<template>
  <div class="dashboard-container">
    <BarraLateralDashboard />
    <div class="main-content">
      <BarraSuperiorDashboard />
      <div class="form-verificacion">
        <div class="switch-container">
          <div class="switch-option" :class="{ active: !isEmpresa }">
            <img src="@/assets/iconos/persona-sencilla.png" alt="Persona" />
            <span>PERSONA</span>
          </div>

          <label class="switch">
            <input type="checkbox" v-model="isEmpresa" />
            <span class="slider"></span>
          </label>

          <div class="switch-option" :class="{ active: isEmpresa }">
            <img src="@/assets/iconos/edificio.png" alt="Empresa" />
            <span>EMPRESA</span>
          </div>
        </div>


        <div class="content-formulario">
          <div class="formulario">
            <h2>{{ isEmpresa ? 'REGISTRO EMPRESA' : 'REGISTRO CLIENTE' }}</h2>

            <!-- EMPRESA -->
            <RegistroEmpresa
                v-if="isEmpresa"
                :nacionalidad="nacionalidad"
                :carnetExtranjeria="carnetExtranjeria"
                :estadoCliente="estadoCliente"
                :cliente="cliente"
                :form="form"
                @update:dni="dni = $event"
                @update:carnetExtranjeria="carnetExtranjeria = $event"
                @buscar-cliente="buscarCliente"
                @cambiar-nacionalidad="(valor) => { nacionalidad = valor; limpiarDatos() }"
                @continuar="irFormulario"
            />

            <!-- CLIENTE -->
            <RegistroCliente
                v-else
                :nacionalidad="nacionalidad"
                :dni="dni"
                :carnetExtranjeria="carnetExtranjeria"
                :estadoCliente="estadoCliente"
                :cliente="cliente"
                :form="form"
                @update:dni="dni = $event"
                @update:carnetExtranjeria="carnetExtranjeria = $event"
                @buscar-cliente="buscarCliente"
                @cambiar-nacionalidad="(valor) => { nacionalidad = valor; limpiarDatos() }"
                @continuar="irFormulario"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import BarraSuperiorDashboard from "@/layouts/BarraSuperiorDashboard.vue";
import BarraLateralDashboard from "@/layouts/BarraLateralDashboard.vue";
import "@/components/formularios/Verificacion/Verificacion.css";
import RegistroEmpresa from "@/components/formularios/Verificacion/RegistroEmpresa.vue";
import RegistroCliente from "@/components/formularios/Verificacion/RegistroCliente.vue";

const router = useRouter();
const isEmpresa = ref(false);
const ruc = ref("");
const empresa = reactive({});
const nacionalidad = ref("");
const dni = ref("");
const carnetExtranjeria = ref("");
const cliente = reactive({});
const estadoCliente = ref("");
let timeoutId = null;

const form = reactive({
  ocupacion: '',
  tipoIdentificacion: '',
  paisOrigen: '',
  paisdeResidencia: '',
  departamento: '',
  provincia: '',
  distrito: '',
  direccion: '',
  correoUsuario: '',
  prefijoTelefonico: '',
  celularCliente: '',
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
  }
});

localStorage.removeItem("clienteCompleto");


const limpiarDatos = () => {
  cliente.value = {}
  estadoCliente.value = ''
  dni.value = ''
  carnetExtranjeria.value = ''
}

const buscarEmpresa = () => {

};

const buscarCliente = () => {

      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(async () => {
        const documento = nacionalidad.value === "peruano" ? dni.value : carnetExtranjeria.value;
        const tipoDocumento = nacionalidad.value === "peruano" ? "DNI" : "CE";

      if (
          (tipoDocumento === "DNI" && documento.length !== 8) ||
          (tipoDocumento === "CE" && documento.length !== 11)
      ) {
        Object.assign(cliente, {});
        estadoCliente.value = "";
        return;
      }

      try {

        if (tipoDocumento === "DNI") {
          const response = await fetch(`https://backendcramirez.onrender.com/api/buscarCliente/${documento}`);
          const data = await response.json();

        if (data && data.nombres) {
          const existeRes = await fetch(`https://backendcramirez.onrender.com/api/clientes/existe?numeroIdentificacion=${documento}`);
          const existe = await existeRes.json();

          Object.assign(cliente, {
            nombres: data.nombres,
            apellidoPaterno: data.apellidoPaterno,
            apellidoMaterno: data.apellidoMaterno,
            nombreCompleto: data.nombreCompleto,
            tipoDocumento: data.tipoDocumento,
            numeroDocumento: data.numeroDocumento,
            digitoVerificador: data.digitoVerificador,
          });

          estadoCliente.value = existe ? "Cliente registrado - ya existe en el sistema" : "Cliente nuevo";

          localStorage.setItem("numeroDocumento", documento);

          if (cliente.nombreCompleto) localStorage.setItem("nombreCompleto", cliente.nombreCompleto);

          if (existe) {
            const clienteRes = await fetch(`https://backendcramirez.onrender.com/api/clientes/buscar?numeroIdentificacion=${documento}`);
            const clienteBD = await clienteRes.json();
            Object.assign(form, {
              ocupacion: clienteBD.ocupacion || '',
              tipoIdentificacion: clienteBD.idIdentificacion || '',
              paisOrigen: clienteBD.idNacionalidad || '',
              paisdeResidencia: clienteBD.idResidencia || '',
              departamento: clienteBD.idDepartamento || '',
              provincia: clienteBD.idProvincia || '',
              distrito: clienteBD.idDistrito || '',
              direccion: clienteBD.direccion || '',
              correoUsuario: clienteBD.correoElectronico || '',
              prefijoTelefonico: clienteBD.idPrefijo || '',
              celularCliente: clienteBD.celularCliente || '',
              estadoCivil: clienteBD.estadoCivil || '',
              descripcionEstadoCivil: clienteBD.descripcionEstadoCivil || '',
              conyuge: {
                nombreClienteConyuge: clienteBD.conyuge?.nombresApellidosConyuge || '',
                ocupacionClienteConyuge: clienteBD.conyuge?.ocupacionConyuge || '',
                tipoIdentificacionClienteConyuge: clienteBD.conyuge?.idIdentificacionConyuge || '',
                numIdentificacionClienteConyuge: clienteBD.conyuge?.numeroIdentificacionConyuge || '',
                paisOrigenClienteConyuge: clienteBD.conyuge?.idNacionalidadConyuge || '',
                paisResidenciaClienteConyuge: clienteBD.conyuge?.idResidenciaConyuge || '',
                departamentoClienteConyuge: clienteBD.conyuge?.idDepartamentoConyuge || '',
                provinciaClienteConyuge: clienteBD.conyuge?.idProvinciaConyuge || '',
                distritoClienteConyuge: clienteBD.conyuge?.idDistritoConyuge || '',
                direccionClienteConyuge: clienteBD.conyuge?.direccionConyuge || '',
                correoUsuarioCliente: clienteBD.conyuge?.correoElectronicoConyuge || '',
                prefijoTelefonicoClienteConyuge: clienteBD.conyuge?.idPrefijoConyuge || '',
                numTelefonicoClienteConyuge: clienteBD.conyuge?.celularConyuge || '',
              }
            });

            localStorage.setItem("clienteCompleto", JSON.stringify(clienteBD));
          }
        } else {

          Object.assign(cliente, {});
          estadoCliente.value = "Cliente nuevo";
          localStorage.setItem("numeroDocumento", documento);
          localStorage.removeItem("nombreCompleto");
          localStorage.removeItem("clienteCompleto");
        }
        } else {
          const existeRes = await fetch(`https://backendcramirez.onrender.com/api/clientes/existe?numeroIdentificacion=${documento}`);
          const existe = await existeRes.json();
          estadoCliente.value = existe ? "Cliente registrado - ya existe en el sistema" : "Cliente nuevo";

          localStorage.setItem("numeroDocumento", documento);
          localStorage.removeItem("nombreCompleto");
          localStorage.removeItem("clienteCompleto");
          Object.assign(cliente, {});

          if (existe) {
            const clienteRes = await fetch(`https://backendcramirez.onrender.com/api/clientes/buscar?numeroIdentificacion=${documento}`);
            const clienteBD = await clienteRes.json();

            Object.assign(form, {
              nombreCliente: clienteBD.nombresApellidos || '',
              ocupacion: clienteBD.ocupacion || '',
              tipoIdentificacion: clienteBD.idIdentificacion || '',
              paisOrigen: clienteBD.idNacionalidad || '',
              paisdeResidencia: clienteBD.idResidencia || '',
              departamento: clienteBD.idDepartamento || '',
              provincia: clienteBD.idProvincia || '',
              distrito: clienteBD.idDistrito || '',
              direccion: clienteBD.direccion || '',
              correoUsuario: clienteBD.correoElectronico || '',
              prefijoTelefonico: clienteBD.idPrefijo || '',
              celularCliente: clienteBD.celularCliente || '',
              estadoCivil: clienteBD.estadoCivil || '',
              conyuge: {
                nombreClienteConyuge: clienteBD.nombresApellidosConyuge || '',
                ocupacionClienteConyuge: clienteBD.ocupacionConyuge || '',
                tipoIdentificacionClienteConyuge: clienteBD.idIdentificacionConyuge || '',
                numIdentificacionClienteConyuge: clienteBD.numeroIdentificacionConyuge || '',
                paisOrigenClienteConyuge: clienteBD.idNacionalidadConyuge || '',
                paisResidenciaClienteConyuge: clienteBD.idResidenciaConyuge || '',
                departamentoClienteConyuge: clienteBD.idDepartamentoConyuge || '',
                provinciaClienteConyuge: clienteBD.idProvinciaConyuge || '',
                distritoClienteConyuge: clienteBD.idDistritoConyuge || '',
                direccionClienteConyuge: clienteBD.direccionConyuge || '',
                correoUsuarioCliente: clienteBD.correoElectronicoConyuge || '',
                prefijoTelefonicoClienteConyuge: clienteBD.idPrefijoConyuge || '',
                numTelefonicoClienteConyuge: clienteBD.celularConyuge || '',
              }
            });

            localStorage.setItem("clienteCompleto", JSON.stringify(clienteBD));
          }
        }
      } catch (error) {
        console.error("Error en búsqueda de cliente:", error);
        Object.assign(cliente, {});
        estadoCliente.value = "Cliente nuevo";
        localStorage.removeItem("clienteCompleto");
      }
      }, 600);
  };

  const irFormulario = () => {
    const documento = dni.value || carnetExtranjeria.value;
    const tipoDocumento = nacionalidad.value === "peruano" ? "DNI" : "CE";

    const datos = {
      nombreCompleto: cliente.nombreCompleto,
      numeroDocumento: cliente.numeroDocumento,
    };

    localStorage.setItem("numeroDocumento", documento);
    if (datos.nombreCompleto) {
      localStorage.setItem("nombreCompleto", datos.nombreCompleto);
    }

    router.push({ path: "/dashboard/formularios/detalle-cliente", query: datos });
  };
</script>