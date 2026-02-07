<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}

function goBack() {
  router.back()
}
</script>

<template>
  <div
    class="not-found min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[var(--app-bg)] relative"
  >
    <!-- 装饰性背景 -->
    <div
      class="absolute inset-0 opacity-[0.03]"
      style="background-image: radial-gradient(circle at 2px 2px, var(--app-text) 1px, transparent 0); background-size: 32px 32px"
    />
    <div
      class="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-20"
      style="background: radial-gradient(circle, var(--theme-primary) 0%, transparent 70%)"
    />
    <div
      class="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-15"
      style="background: radial-gradient(circle, var(--theme-primary) 0%, transparent 70%)"
    />

    <div class="relative z-10 text-center px-6">
      <!-- 404 数字 -->
      <div class="relative inline-block mb-6">
        <span
          class="block text-[clamp(8rem,25vw,14rem)] font-bold leading-none tracking-tighter text-transparent select-none"
          style="-webkit-text-stroke: 2px color-mix(in srgb, var(--theme-primary) 30%, transparent);"
        >
          404
        </span>
        <span
          class="absolute inset-0 block text-[clamp(8rem,25vw,14rem)] font-bold leading-none tracking-tighter text-[var(--app-text)] select-none"
          style="clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);"
        >
          404
        </span>
      </div>

      <h1 class="text-xl sm:text-2xl font-semibold text-[var(--app-text)] mb-2">
        页面走丢了
      </h1>
      <p class="text-sm text-[var(--el-text-color-secondary)] max-w-sm mx-auto mb-10">
        您访问的页面不存在或已被移除，请检查链接或返回首页。
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <ElButton type="primary" size="large" @click="goHome">
          返回首页
        </ElButton>
        <ElButton size="large" @click="goBack">
          返回上一页
        </ElButton>
      </div>
    </div>
  </div>
</template>
