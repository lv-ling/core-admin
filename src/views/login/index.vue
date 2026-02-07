<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const form = reactive({ username: '', password: '' })
const loading = ref(false)

async function onSubmit() {
  loading.value = true
  try {
    auth.setToken('mock-token')
    auth.setUserInfo({ name: form.username || '用户' })
    ElMessage.success('登录成功')
    await router.push('/')
  } catch {
    ElMessage.error('登录失败')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-[var(--app-bg)]">
    <ElCard class="w-[400px]" shadow="always">
      <template #header>
        <span>登录</span>
      </template>
      <ElForm :model="form" label-width="80px">
        <ElFormItem label="用户名">
          <ElInput v-model="form.username" placeholder="请输入" />
        </ElFormItem>
        <ElFormItem label="密码">
          <ElInput v-model="form.password" type="password" placeholder="请输入" show-password />
        </ElFormItem>
        <ElFormItem>
          <ElButton type="primary" :loading="loading" @click="onSubmit"> 登录 </ElButton>
        </ElFormItem>
      </ElForm>
    </ElCard>
  </div>
</template>
