<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useLayoutStore } from '@/stores/layout'

const route = useRoute()
const router = useRouter()
const layoutStore = useLayoutStore()

function goToTag(fullPath: string) {
  if (fullPath === route.fullPath) return
  router.push(fullPath)
}

function closeTag(fullPath: string, e: Event) {
  e.stopPropagation()
  layoutStore.removeView(fullPath)
  if (route.fullPath === fullPath) {
    const list = layoutStore.visitedViews
    const idx = list.findIndex((v) => v.fullPath === fullPath)
    const next = list[idx + 1] ?? list[idx - 1]
    router.push(next ? next.fullPath : '/dashboard')
  }
}
</script>

<template>
  <div class="tag-nav-wrap">
    <ElScrollbar>
      <div class="tag-nav-list">
        <div
          v-for="view in layoutStore.visitedViews"
          :key="view.fullPath"
          class="tag-nav-item"
          :class="{ active: view.fullPath === route.fullPath }"
          @click="goToTag(view.fullPath)"
        >
          <span class="tag-nav-title">{{
            view.meta?.title ?? view.fullPath
          }}</span>
          <span
            class="tag-nav-close"
            @click="closeTag(view.fullPath, $event)"
          >
            ×
          </span>
        </div>
      </div>
    </ElScrollbar>
  </div>
</template>

<style scoped>
.tag-nav-wrap {
  background: var(--layout-tag-bg);
  border-bottom: 1px solid var(--layout-tag-border);
  padding: 0 8px;
}
.tag-nav-wrap :deep(.el-scrollbar__wrap) {
  overflow-x: auto;
  overflow-y: hidden;
}
.tag-nav-list {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 0;
  white-space: nowrap;
}
.tag-nav-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  border: 1px solid var(--layout-tag-border);
  background: var(--layout-tag-item-bg);
}
.tag-nav-item:hover {
  color: var(--el-color-primary);
}
.tag-nav-item.active {
  color: var(--el-color-primary);
  border-color: var(--el-color-primary);
  background: var(--el-color-primary-light-9);
}
.tag-nav-close {
  font-size: 12px;
  margin-left: 2px;
}
.tag-nav-close:hover {
  color: var(--el-color-danger);
}
</style>
