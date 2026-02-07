<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const form = reactive({ username: '', password: '', remember: false })
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
  <div
    class="login-page min-h-screen flex items-stretch overflow-hidden bg-[var(--app-bg)]"
  >
    <!-- 左侧品牌区 -->
    <div
      class="login-brand hidden lg:flex lg:w-[52%] flex-col justify-between p-12 relative overflow-hidden"
    >
      <div class="relative z-10">
        <div
          class="inline-flex items-center gap-3 rounded-xl px-4 py-2 bg-white/10 dark:bg-white/5 backdrop-blur-sm"
        >
          <div
            class="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
            style="background: linear-gradient(135deg, var(--theme-primary), #5c7cfa)"
          >
            管
          </div>
          <span class="text-lg font-semibold text-[var(--app-text)]">管理系统</span>
        </div>
      </div>

      <div class="relative z-10 max-w-md">
        <h1
          class="text-3xl xl:text-4xl font-bold leading-tight text-[var(--app-text)] mb-4"
        >
          高效协作<br />从这里开始
        </h1>
        <p class="text-base text-[var(--el-text-color-secondary)] leading-relaxed">
          统一的数字化工作台，助力团队提升效率、沉淀知识、实现目标。
        </p>
      </div>

      <!-- 装饰性背景 -->
      <div class="absolute inset-0 login-brand-bg" />
      <div
        class="absolute -bottom-24 -right-24 w-96 h-96 rounded-full opacity-30"
        style="background: radial-gradient(circle, var(--theme-primary) 0%, transparent 70%)"
      />
      <div
        class="absolute top-1/3 -left-16 w-64 h-64 rounded-full opacity-20"
        style="background: radial-gradient(circle, var(--theme-primary) 0%, transparent 70%)"
      />
    </div>

    <!-- 右侧登录表单区 -->
    <div
      class="login-form flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-16 relative"
    >
      <div class="w-full max-w-[400px]">
        <!-- 移动端 Logo -->
        <div class="lg:hidden flex justify-center mb-8">
          <div
            class="inline-flex items-center gap-3 rounded-xl px-4 py-2 bg-white/80 dark:bg-white/5 backdrop-blur-sm shadow-sm"
          >
            <div
              class="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
              style="background: linear-gradient(135deg, var(--theme-primary), #5c7cfa)"
            >
              管
            </div>
            <span class="text-lg font-semibold text-[var(--app-text)]">管理系统</span>
          </div>
        </div>

        <div class="mb-8">
          <h2
            class="text-2xl font-bold text-[var(--app-text)] mb-2"
          >
            欢迎回来
          </h2>
          <p class="text-sm text-[var(--el-text-color-secondary)]">
            请输入您的账号信息登录系统
          </p>
        </div>

        <ElForm
          :model="form"
          label-position="top"
          size="large"
          class="login-form-el"
        >
          <ElFormItem label="用户名" required>
            <ElInput
              v-model="form.username"
              placeholder="请输入用户名"
              :prefix-icon="User"
              clearable
              autocomplete
            />
          </ElFormItem>
          <ElFormItem label="密码" required>
            <ElInput
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              :prefix-icon="Lock"
              show-password
              autocomplete="current-password"
              @keyup.enter="onSubmit"
            />
          </ElFormItem>
          <div class="flex items-center justify-between mb-6">
            <ElFormItem class="!mb-0">
              <ElCheckbox v-model="form.remember" label="记住我" />
            </ElFormItem>
            <ElLink type="primary" :underline="false" class="text-sm">
              忘记密码？
            </ElLink>
          </div>
          <ElFormItem>
            <ElButton
              type="primary"
              :loading="loading"
              class="w-full h-12 text-base font-medium"
              @click="onSubmit"
            >
              登 录
            </ElButton>
          </ElFormItem>
        </ElForm>

        <p class="text-center text-xs text-[var(--el-text-color-secondary)] mt-8">
          登录即表示您同意服务条款与隐私政策
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-brand-bg {
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--theme-primary) 12%, transparent) 0%, transparent 50%),
    linear-gradient(225deg, color-mix(in srgb, var(--theme-primary) 8%, transparent) 0%, transparent 50%),
    var(--app-bg);
}

html.dark .login-brand-bg {
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--theme-primary) 15%, transparent) 0%, transparent 50%),
    linear-gradient(225deg, color-mix(in srgb, var(--theme-primary) 10%, transparent) 0%, transparent 50%),
    var(--app-bg);
}

.login-form {
  background: var(--app-bg);
}

/* 表单标签样式 */
:deep(.login-form-el .el-form-item__label) {
  font-weight: 500;
  color: var(--el-text-color-regular);
}
</style>
