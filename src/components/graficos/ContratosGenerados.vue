  <template>
  <div class="summary-card-contrato-generado">
    <div class="icon-text">
      <span class="icon">📝</span>
      <div class="text">
        <p class="title">Contratos<br />Generados</p>
      </div>
    </div>
    <div class="count">
      <span class="number">{{ clientesHoy }}</span>
      <span class="label">Contratos</span>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import axios from "axios";

// Puedes reemplazar este valor con uno que venga de una API o prop
const clientesHoy = ref(0);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/clientes/registrados/count')
    clientesHoy.value = response.data
  } catch (error) {
    console.error('Error al obtener los clientes registrados hoy:', error)
  }
})
</script>

<style scoped>
.summary-card-contrato-generado {
  width: 160px;
  padding: 16px;
  border-radius: 12px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 110px;
  font-family: sans-serif;
  margin-left: 340px;
  margin-top: -145px;
}

.icon-text {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  font-size: 24px;
}

.title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
}

.count {
  margin-top: 6px;
  text-align: left;
}

.number {
  font-size: 32px;
  font-weight: 800;
  color: #111;
}

.label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #555;
  margin-top: 4px;
}

@media (max-width: 768px) {
  .summary-card-contrato-generado {
    width: 160px;
    padding: 16px;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 20px;
    margin-left: 10px;
    font-family: sans-serif;
  }

  .icon-text {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .icon {
    font-size: 24px;
  }

  .title {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.2;
  }

  .count {
    margin-top: 12px;
    text-align: left;
  }

  .number {
    font-size: 32px;
    font-weight: 800;
    color: #111;
  }

  .label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #555;
    margin-top: -4px;
  }
}
</style>
