<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const greeting = '早上好'
</script>

<template>
  <div class="welcome-header">
    <h1 class="welcome-header__title">
      {{ greeting }}, {{ auth.userInfo?.name ?? '用户' }}
    </h1>
    <ElButton type="primary" link>修改工作台</ElButton>
  </div>
</template>

<style scoped>
.welcome-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.welcome-header__title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: var(--app-text);
}
</style>
