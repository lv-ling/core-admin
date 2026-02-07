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
  <ElCard class="product-shortcuts" shadow="never">
    <template #header>
      <span>云效产品</span>
    </template>
    <div class="product-shortcuts__list">
      <a
        v-for="(item, i) in shortcuts"
        :key="i"
        class="product-shortcuts__item"
        href="javascript:;"
      >
        <span class="product-shortcuts__icon">{{ item.icon }}</span>
        <span class="product-shortcuts__label">{{ item.label }}</span>
      </a>
    </div>
  </ElCard>
</template>

<style scoped>
.product-shortcuts {
  margin-bottom: 16px;
}
.product-shortcuts__list {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}
.product-shortcuts__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 80px;
  color: var(--el-color-primary);
  text-decoration: none;
}
.product-shortcuts__item:hover {
  opacity: 0.8;
}
.product-shortcuts__icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--el-color-primary) 15%, transparent);
  border-radius: 8px;
  font-size: 20px;
  font-weight: 600;
}
.product-shortcuts__label {
  font-size: 12px;
}
</style>
