<script setup lang="ts">
defineOptions({
  name: 'CusInput',
})

const value = defineModel<string>('modelValue')
</script>

<template>
  <ElInput v-model="value" />
</template>
