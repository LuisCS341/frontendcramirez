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
<script>

import BarraSuperiorDashboard from "@/layouts/BarraSuperiorDashboard.vue";
import BarraLateralDashboard from "@/layouts/BarraLateralDashboard.vue";
import "@/components/formularios/Verificacion/Verificacion.css";
import RegistroEmpresa from "@/components/formularios/Verificacion/RegistroEmpresa.vue";
import RegistroCliente from "@/components/formularios/Verificacion/RegistroCliente.vue";

export default {
  components: {
    RegistroCliente,
    RegistroEmpresa,
    BarraLateralDashboard,
    BarraSuperiorDashboard,
  },
  data() {
    return {
      isEmpresa: false,
      ruc:"",
      empresa: {},
      nacionalidad: "",
      dni: "",
      carnetExtranjeria: "",
      cliente: {},
      estadoCliente: "",
      timeoutId: null,
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
    buscarEmpresa(){
},
    buscarCliente() {

      // Cancelar cualquier intento anterior
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }

      this.timeoutId = setTimeout(() => {
        const documento = this.nacionalidad === "peruano" ? this.dni : this.carnetExtranjeria;
        const tipoDocumento = this.nacionalidad === "peruano" ? "DNI" : "CE";

        if (
            (tipoDocumento === "DNI" && documento.length !== 8) ||
            (tipoDocumento === "CE" && documento.length !== 11)
        ) {
          this.cliente = {};
          this.estadoCliente = "";
          return;
        }

        if (tipoDocumento === "DNI") {
          // Si es peruano, consulta Reniec
          fetch(`http://localhost:8080/api/buscarCliente/${documento}`)
              .then((response) => response.json())
              .then((data) => {
                if (data && data.nombres) {
                  fetch(`http://localhost:8080/api/clientes/existe?numeroIdentificacion=${documento}`)
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

                          fetch(`http://localhost:8080/api/clientes/buscar?numeroIdentificacion=${documento}`)
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

          fetch(`http://localhost:8080/api/clientes/existe?numeroIdentificacion=${documento}`)
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
                  fetch(`http://localhost:8080/api/clientes/buscar?numeroIdentificacion=${documento}`)
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
      }, 600);
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