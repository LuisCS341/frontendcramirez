<template>
  <div class="dashboard-container">
    <BarraLateralDashboard />
    <div class="main-content">
      <BarraSuperiorDashboard />
      <div class="content-container form-verificacion">
        <div class="content">
          <h1 class="title">Registro de Cliente</h1>

          <div class="input-container">
            <label>¿Es peruano o extranjero?</label>
            <div class="nacionalidad-toggle">
              <button :class="{ active: nacionalidad === 'peruano' }" @click="nacionalidad = 'peruano'; limpiarDatos()">🇵🇪 Peruano</button>
              <button :class="{ active: nacionalidad === 'extranjero' }" @click="nacionalidad = 'extranjero'; limpiarDatos()">🌍 Extranjero</button>
            </div>
          </div>

          <div class="input-container" v-if="nacionalidad === 'peruano'">
            <input type="text" v-model="dni" placeholder="Ingresar DNI (8 dígitos)" maxlength="8" @input="buscarCliente"/>
          </div>
          <div class="input-container" v-if="nacionalidad === 'extranjero'">
            <input type="text" v-model="carnetExtranjeria" placeholder="Ingresar Carnet de Extranjería (12 dígitos)" maxlength="12" @input="buscarCliente"/>
          </div>

          <div v-if="estadoCliente === 'Cliente nuevo'" class="alerta-nuevo">
            <p>⚠️ Cliente no encontrado en el sistema. Puedes continuar para registrar sus datos.</p>
            <button class="btn" @click="irFormulario">Continuar</button>
          </div>

          <div v-if="estadoCliente === 'Cliente registrado - ya existe en el sistema'" class="alerta-registrado">
            <p>✅ Cliente ya fue registrado en el sistema</p>
            <button class="btn" @click="irFormulario">Continuar</button>
          </div>

          <div v-if="cliente && cliente.nombreCompleto" class="datos-cliente">
            <h2>🧾 Datos del Cliente</h2>
            <ul>
              <li><strong>Nombres:</strong> {{ cliente.nombres }}</li>
              <li><strong>Apellido Paterno:</strong> {{ cliente.apellidoPaterno }}</li>
              <li><strong>Apellido Materno:</strong> {{ cliente.apellidoMaterno }}</li>
              <li><strong>Nombre Completo:</strong> {{ cliente.nombreCompleto }}</li>
              <li><strong>Tipo de Documento:</strong> {{ cliente.tipoDocumento }}</li>
              <li><strong>Número de Documento:</strong> {{ cliente.numeroDocumento }}</li>
              <li><strong>Dígito Verificador:</strong> {{ cliente.digitoVerificador }}</li>
            </ul>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BarraSuperiorDashboard from "@/components/dashboard/BarraSuperiorDashboard.vue";
import BarraLateralDashboard from "@/components/dashboard/BarraLateralDashboard.vue";
import "@/assets/formulario/FormularioVerificacion.css";

export default {
  components: {
    BarraLateralDashboard,
    BarraSuperiorDashboard,
  },
  data() {
    return {
      nacionalidad: "",
      dni: "",
      carnetExtranjeria: "",
      cliente: {},
      estadoCliente: "",
      form: {
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
      },
    };
    localStorage.removeItem("clienteCompleto");
  },
  methods: {
    limpiarDatos() {
      this.dni = "";
      this.carnetExtranjeria = "";
      this.cliente = {};
      this.estadoCliente = "";
      localStorage.removeItem("clienteCompleto");
    },

    buscarCliente()   {
      const documento = this.nacionalidad === "peruano" ? this.dni : this.carnetExtranjeria;
      const tipoDocumento = this.nacionalidad === "peruano" ? "DNI" : "CE";

      if (
          (tipoDocumento === "DNI" && documento.length !== 8) ||
          (tipoDocumento === "CE" && documento.length !== 12)
      ) {
        this.cliente = {};
        this.estadoCliente = "";
        return;
      }

      if (tipoDocumento === "DNI") {
        // Si es peruano, consulta Reniec
        fetch(`https://backendcramirez.onrender.com/api/buscarCliente/${documento}`)
            .then((response) => response.json())
            .then((data) => {
              if (data && data.nombres) {
                fetch(`https://backendcramirez.onrender.com/api/clientes/existe?numeroIdentificacion=${documento}`)
                    .then((response) => response.json())
                    .then((existe) => {
                      this.cliente = {
                        nombres: data.nombres,
                        apellidoPaterno: data.apellidoPaterno,
                        apellidoMaterno: data.apellidoMaterno,
                        nombreCompleto: data.nombreCompleto,
                        tipoDocumento: data.tipoDocumento,
                        numeroDocumento: data.numeroDocumento,
                        digitoVerificador: data.digitoVerificador,
                      };
                      this.estadoCliente = existe
                          ? "Cliente registrado - ya existe en el sistema"
                          : "Cliente nuevo";

                      localStorage.setItem("numeroDocumento", documento);
                      if (this.cliente.nombreCompleto) {
                        localStorage.setItem("nombreCompleto", this.cliente.nombreCompleto);
                      }
                      if (existe) {

                        fetch(`https://backendcramirez.onrender.com/api/clientes/buscar?numeroIdentificacion=${documento}`)
                            .then((response) => response.json())
                            .then((clienteBD) => {
                              this.form.ocupacionCliente = clienteBD.ocupacion || '';
                              this.form.tipoIdentificacion = clienteBD.idIdentificacion || '';
                              this.form.paisOrigen = clienteBD.idNacionalidad || '';
                              this.form.paisdeResidencia = clienteBD.idResidencia || '';
                              this.form.departamento = clienteBD.idDepartamento || '';
                              this.form.provincia = clienteBD.idProvincia || '';
                              this.form.distrito = clienteBD.idDistrito || '';
                              this.form.direccion = clienteBD.direccion || '';
                              this.form.correoUsuario = clienteBD.correoElectronico || '';
                              this.form.prefijoTelefonico = clienteBD.idPrefijo || '';
                              this.form.numTelefonico = clienteBD.celularCliente || '';
                              this.form.estadoCivil = clienteBD.estadoCivil || '';

                              localStorage.setItem("clienteCompleto", JSON.stringify(clienteBD));
                            })
                            .catch((error) => {
                              console.error("Error al obtener datos del cliente desde BD:", error);
                            });
                      }
                    })
                    .catch((error) => {
                      console.error("Error al verificar existencia del cliente:", error);
                      this.estadoCliente = "Cliente nuevo";
                    });
              } else {
                this.cliente = {};
                this.estadoCliente = "Cliente nuevo";
                localStorage.setItem("numeroDocumento", documento);
                localStorage.removeItem("nombreCompleto");
                localStorage.removeItem("clienteCompleto");
              }


            })
            .catch((error) => {
              console.error("Error al consultar el backend (Reniec):", error);
              this.cliente = {};
              this.estadoCliente = "Cliente nuevo";
              localStorage.removeItem("nombreCompleto");
              localStorage.removeItem("clienteCompleto");
            });
      } else {

        fetch(`https://backendcramirez.onrender.com/api/clientes/existe?numeroIdentificacion=${documento}`)
            .then((response) => response.json())
            .then((existe) => {
              this.estadoCliente = existe
                  ? "Cliente registrado - ya existe en el sistema"
                  : "Cliente nuevo";

              localStorage.setItem("numeroDocumento", documento);
              localStorage.removeItem("nombreCompleto");
              localStorage.removeItem("clienteCompleto");
              this.cliente = {};

              if (existe) {
                fetch(`https://backendcramirez.onrender.com/api/clientes/buscar?numeroIdentificacion=${documento}`)
                    .then((response) => response.json())
                    .then((clienteBD) => {
                      this.form.nombreCliente = clienteBD.nombresApellidos || '';
                      this.form.ocupacionCliente = clienteBD.ocupacion || '';
                      this.form.tipoIdentificacion = clienteBD.idIdentificacion || '';
                      this.form.paisOrigen = clienteBD.idNacionalidad || '';
                      this.form.paisdeResidencia = clienteBD.idResidencia || '';
                      this.form.departamento = clienteBD.idDepartamento || '';
                      this.form.provincia = clienteBD.idProvincia || '';
                      this.form.distrito = clienteBD.idDistrito || '';
                      this.form.direccion = clienteBD.direccion || '';
                      this.form.correoUsuario = clienteBD.correoElectronico || '';
                      this.form.prefijoTelefonico = clienteBD.idPrefijo || '';
                      this.form.numTelefonico = clienteBD.celularCliente || '';
                      this.form.estadoCivil = clienteBD.estadoCivil || '';

                      localStorage.setItem("clienteCompleto", JSON.stringify(clienteBD));
                    })
                    .catch((error) => {
                      console.error("Error al obtener datos del cliente desde BD:", error);
                    });
              }
            })
            .catch((error) => {
              console.error("Error al verificar existencia del cliente:", error);
              this.estadoCliente = "Cliente nuevo";
              this.cliente = {};
            });
      }
    },

    irFormulario() {
      const documento = this.dni || this.carnetExtranjeria;
      const tipoDocumento = this.nacionalidad === "peruano" ? "DNI" : "CE";

      const datos = {
        nombreCompleto: this.cliente.nombreCompleto,
        numeroDocumento: this.cliente.numeroDocumento,
      };

      localStorage.setItem("numeroDocumento", documento);
      if (datos.nombreCompleto) {
        localStorage.setItem("nombreCompleto", datos.nombreCompleto);
      }
      this.$router.push({ path: "/dashboard/formularios/detalle-cliente", query: datos });
    },
  },
};
</script>


