<script setup lang="ts">
interface ShortcutItem {
  icon: string
  label: string
}

const shortcuts: ShortcutItem[] = [
  { icon: 'X', label: '项目协作' },
  { icon: 'r', label: '效能洞察' },
  { icon: 'B', label: '钉钉文档' },
  { icon: 'C', label: '代码管理' },
  { icon: 'F', label: '流水线' },
  { icon: 'P', label: '制品仓库' },
  { icon: 'A', label: '应用交付' },
  { icon: 'r', label: '测试管理' },
]
</script>

<template>
  <ElCard
    class="mb-4"
    shadow="never"
  >
    <template #header>
      <span>云效产品</span>
    </template>
    <div class="flex flex-wrap gap-6">
      <a
        v-for="(item, i) in shortcuts"
        :key="i"
        class="flex min-w-20 flex-col items-center gap-2 text-[var(--el-color-primary)] no-underline hover:opacity-80"
        href="javascript:;"
      >
        <span
          class="product-shortcuts__icon flex h-12 w-12 items-center justify-center rounded-lg text-xl font-semibold"
        >
          {{ item.icon }}
        </span>
        <span class="text-xs">{{ item.label }}</span>
      </a>
    </div>
  </ElCard>
</template>

<style scoped>
/* color-mix 原子类无法表达 */
.product-shortcuts__icon {
  background: color-mix(in srgb, var(--el-color-primary) 15%, transparent);
}
</style>
