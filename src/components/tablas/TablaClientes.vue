<template>
  <div class="primary-container">
    <div class="secundary-container">
      <div class="items">
        <input class="buscador" type="text" v-model="busquedaGlobal" placeholder="Buscar cliente..."/>

        <button @click="exportar" class="btn-accion btn-exportar">Exportar Clientes</button>
      </div>

      <div class="table-container">
        <table class="table">
          <thead>
          <tr>
            <th v-for="col in columnasClientes" :key="col.key">{{ col.label }}</th>
            <th>SELECCIONE SU OPERARIO</th>
            <th></th>
          </tr>

          </thead>
          <tbody>
          <tr v-for="cliente in clientes" :key="cliente.idCliente ">

            <CeldaEditable
                v-for="col in columnasClientes"
                :key="col.key"
                :cliente="cliente"
                :columna="col"
                :fila="cliente"
                :tiposContrato="tiposContrato"
            />

            <td>
              <select
                  v-if="cliente.esPrimeroGrupo"
                  :value="selectedTemporal[cliente.idCliente]"
                  @change="onCambioOperario($event, cliente)"
              >
                <option disabled value="">Seleccione un operario</option>
                <option v-for="op in operarios" :key="op.id" :value="op.usuario">
                  {{ op.nombre }}
                </option>
              </select>
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

<script setup>
import "@/assets/tablas/Tablas.css";
import axios from "axios";
import * as XLSX from "xlsx";
import {operarios} from "@/data/operarios.js";
import {tiposContrato} from "@/data/tiposContrato.js";
import {computed, onMounted, reactive, ref} from "vue";
import {columnasClientes} from "@/data/columnasClientes.js";
import CeldaEditable from "@/components/tablas/CeldaEditable.vue";
import {exportarClientesXLSX} from "@/data/exportClientes.js";


const clientes = ref([]);
const selectedTemporal = reactive({});
const busquedaGlobal = ref("");

const filtros = reactive({
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
});

const obtenerDatosCombinados = async () => {
  try {
    const userData = JSON.parse(localStorage.getItem("user"));
    const idOperario = userData?.idOperario;

    const response = await axios.get(
        `https://backendcramirez.onrender.com/api/clientes/por-operario/${idOperario}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-User-ID": idOperario,
          },
          withCredentials: true,
        }
    );

    console.log("Respuesta del backend:", response.data);

    clientes.value = response.data.map((clienteLote) => {
      const cliente = clienteLote.cliente;
      const lote = clienteLote.lote;
      selectedTemporal[cliente.idCliente] = cliente.operario || "";

      return {
        ...cliente,
        ...cliente.cliente,
        lote: lote,
        editando: false,
      };
    });

    const gruposVistos = new Set();
    clientes.value.forEach((cliente) => {
      if (!gruposVistos.has(cliente.idCliente)) {
        cliente.esPrimeroGrupo = true;
        gruposVistos.add(cliente.idCliente);
      } else {
        cliente.esPrimeroGrupo = false;
      }
    });

    console.log("Clientes luego de mapear:", clientes.value);

  } catch (error) {
    console.error("Error al obtener datos combinados:", error);
    alert("Error al obtener datos de clientes y lotes.");
  }
};



const activarEdicion = (cliente) => {
  if (cliente) {
    cliente.editando = true;
  }
};

const guardarEdicion = async (cliente) => {
  if (!cliente || !cliente.lote) return;

  const clienteLimpio = { ...cliente };
  delete clienteLimpio.editando;

  const loteLimpio = { ...cliente.lote };
  delete loteLimpio.editando;

  const payload = {
    cliente: clienteLimpio,
    lote: loteLimpio,
  };

  console.log("Payload a enviar:", payload);

  try {
    const response = await axios.put("https://backendcramirez.onrender.com/api/clientes/editar", payload);
    console.log("Cliente y lote actualizados:", response.data);

    Object.assign(cliente, response.data.cliente || {});
    Object.assign(cliente.lote, response.data.lote || {});

    cliente.editando = false;
    if (cliente.lote) {
      cliente.lote.editando = false;
    }
  } catch (error) {
    console.error("Error al actualizar cliente y lote:", error.response?.data || error.message);
    alert("Hubo un error al guardar los cambios.");
  }
};


const formatearFecha = (event, tipo) => {
  let input = event.target.value;
  input = input.replace(/[^0-9]/g, '');

  if (input.length > 2) input = input.slice(0, 2) + '/' + input.slice(2);
  if (input.length > 5) input = input.slice(0, 5) + '/' + input.slice(5);
  if (input.length > 10) input = input.slice(0, 10);

  event.target.value = input;

};


onMounted(() => {
  obtenerDatosCombinados();
});

const onCambioOperario = async (event, cliente) => {
  const nuevoUsuario = event.target.value;
  const idCliente = cliente.idCliente;

  const operarioAnterior = selectedTemporal[idCliente];

  if (nuevoUsuario === operarioAnterior) {
    return;
  }

  const confirmacion = confirm(`¿Estás seguro que quieres cambiar el operario?`);
  if (!confirmacion) {
    selectedTemporal[idCliente] = operarioAnterior; // Restauramos el operario anterior
    return;
  }

  try {

    await axios.put(`https://backendcramirez.onrender.com/api/clientes/transferir/${idCliente}`, {
      nuevoUsuarioOperario: nuevoUsuario,
    }, {
      withCredentials: true,
    });

    alert("Cliente transferido correctamente");

    cliente.operario = nuevoUsuario;  // Actualizamos el operario en el objeto cliente
    selectedTemporal[idCliente] = nuevoUsuario;  // Actualizamos el operario en el estado temporal

  } catch (error) {
    // Si hubo un error, mostramos un mensaje y restauramos el operario anterior
    console.error("Error detallado:", error);
    alert("Error al transferir cliente: " + (error.response?.data?.message || error.message));

    selectedTemporal[idCliente] = operarioAnterior;  // Restauramos el operario anterior
  }
};



const exportar = () => {
  exportarClientesXLSX(clientes.value);
};


</script>