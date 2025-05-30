<template>
  <input v-if="editable" v-model="modelValue" @click.stop class="input-editar"/>
  <span v-else>{{ modelValue || '-' }}</span>
</template>

<script setup>
defineProps(['editable', 'modelValue'])
defineEmits(['update:modelValue'])
</script>
