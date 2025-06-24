<template>
  <div >
    <h4>Documento para Lote {{ index + 1 }}</h4>

    <div>
      <label>Carta de No Adeudo:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.documento.cartaNoAdeudo"
          placeholder="Ingrese arta de No Adeudo"
          required
      />
    </div>


    <div>
      <label>Certificado de Lote:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.documento.certificadoLote"
          placeholder="Ingrese Certificado de Lote"
          required
      />
    </div>

    <div>
      <label>Planos 1:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.documento.plano1"
          placeholder="Ingrese Planos 1"
          required
      />
    </div>

    <div>
      <label>Planos 2:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.documento.plano2"
          placeholder="Ingrese Planos 2"
          required
      />
    </div>


    <div>
      <label>Envio de Minuta:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.documento.envioMinuta"
          placeholder="Ingrese Envio de Minuta"
          required
      />
    </div>

    <div>
      <label>Fecha de Cita:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.fechaCita"
          placeholder="Ingrese Fecha de Cita"
          required
      />
    </div>
    <div>
      <label>Hora de Cita:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.horaCita"
          placeholder="Ingrese Hora de Cita"
          required
      />
    </div>
    <div>
      <label>Modif. Minuta:-------- hora de edicion , solo va en edicion para ver tiempo</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.modificarMinuta"
          placeholder="Ingrese Modif. Minuta"
          required
      />
    </div>
    <div>
      <label>Minuta Escaneada:----------va fuera del proyecto</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.minutaEscaneada"
          placeholder="Ingrese Minuta Escaneada"
          required
      />
    </div>

    <div>
      <label>Exp Notaria:--------eliminado de proyecto</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.expNotaria"
          placeholder="Ingrese Exp Notaria"
          required
      />
    </div>

  </div>
</template>

<script setup>
import {ref} from "vue";

const fechaInicioContrato = ref('');
const fechaCancelacionContrato = ref('');

defineProps({
  cuotaextraordinaria: {type: Object,},
  lote: {type: Object, required: true},
  index: {type: Number, required: true}
});


</script>
