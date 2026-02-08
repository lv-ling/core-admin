<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const greeting = '早上好'
</script>

<template>
  <div class="flex items-center justify-between">
    <h1 class="m-0 text-xl font-semibold text-[var(--app-text)]">
      {{ greeting }}, {{ auth.userInfo?.name ?? '用户' }}
    </h1>
    <ElButton
      type="primary"
      link
      >修改工作台</ElButton
    >
  </div>
</template>
