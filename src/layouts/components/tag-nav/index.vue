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

function closeTag(fullPath: string) {
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
        >
          <button
            type="button"
            class="tag-nav-link"
            :aria-current="view.fullPath === route.fullPath ? 'page' : undefined"
            @click="goToTag(view.fullPath)"
          >
            <span class="tag-nav-title">{{ view.meta?.title ?? view.fullPath }}</span>
          </button>
          <button
            type="button"
            class="tag-nav-close"
            :aria-label="`关闭标签 ${view.meta?.title ?? view.fullPath}`"
            @click="closeTag(view.fullPath)"
          >
            ×
          </button>
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
  border: 1px solid var(--layout-tag-border);
  background: var(--layout-tag-item-bg);
}
.tag-nav-item:hover {
  color: var(--el-color-primary);
}
.tag-nav-link {
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}
.tag-nav-item.active {
  color: var(--el-color-primary);
  border-color: var(--el-color-primary);
  background: var(--el-color-primary-light-9);
}
.tag-nav-close {
  font-size: 12px;
  margin-left: 2px;
  padding: 0;
  margin: 0 0 0 2px;
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
}
.tag-nav-link:focus-visible,
.tag-nav-close:focus-visible {
  outline: 2px solid var(--el-color-primary);
  outline-offset: 2px;
  border-radius: 2px;
}
.tag-nav-close:hover {
  color: var(--el-color-danger);
}
</style>
