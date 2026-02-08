<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Fold, Expand } from '@element-plus/icons-vue'
import { useLayoutStore } from '@/stores/layout'
import HeaderUserMenu from '@/layouts/components/header-user-menu/index.vue'

const route = useRoute()
const layoutStore = useLayoutStore()

const breadcrumbItems = computed(() => {
  const withTitle = route.matched.filter((r) => r.meta?.title)
  return withTitle.map((r) => {
    const j = route.matched.indexOf(r)
    const fullPath =
      j === -1
        ? r.path
        : route.matched
            .slice(0, j + 1)
            .map((x) => x.path)
            .join('/')
            .replace(/\/+/g, '/') || '/'
    return {
      path: r.path,
      fullPath,
      title: r.meta?.title as string,
    }
  })
})
</script>

<template>
  <ElHeader class="app-header-root">
    <div class="app-header-left flex items-center">
      <ElButton
        link
        class="app-header-collapse-btn"
        @click="layoutStore.toggleSidebar()"
      >
        <ElIcon :size="20">
          <Expand v-if="layoutStore.sidebarCollapsed" />
          <Fold v-else />
        </ElIcon>
      </ElButton>
      <ElBreadcrumb separator="/">
        <ElBreadcrumbItem
          v-for="(crumb, i) in breadcrumbItems"
          :key="crumb.path"
          :to="i < breadcrumbItems.length - 1 ? { path: crumb.fullPath } : undefined"
        >
          {{ crumb.title }}
        </ElBreadcrumbItem>
      </ElBreadcrumb>
    </div>
    <div class="app-header-right">
      <HeaderUserMenu />
    </div>
  </ElHeader>
</template>

<style scoped>
.app-header-root {
  background-color: var(--layout-header-bg);
  box-shadow: 0 1px 4px var(--layout-header-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 50px;
}
.app-header-left {
  flex: 1;
  min-width: 0;
}
.app-header-right {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}
.app-header-collapse-btn {
  margin-right: 8px;
}
</style>
